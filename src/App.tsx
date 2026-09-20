import React, { useState, useEffect, useRef } from 'react';
import { StudentUser, ExamResult, StudentAnswerState } from './types';
import { EXAM_QUESTIONS } from './data/questions';
import { INITIAL_STUDENTS } from './data/initialStudents';
import { SheetService, LOCAL_STORAGE_KEY_STUDENTS } from './services/sheetService';
import { HeaderANBK } from './components/HeaderANBK';
import { LoginStudent } from './components/LoginStudent';
import { ExamInterface } from './components/ExamInterface';
import { QuestionNavigationModal } from './components/QuestionNavigationModal';
import { SubmitConfirmModal } from './components/SubmitConfirmModal';
import { ExamResultSummary } from './components/ExamResultSummary';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  // App view navigation
  const [view, setView] = useState<'login' | 'exam' | 'result' | 'admin'>('login');

  // Database of students
  const [students, setStudents] = useState<StudentUser[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_STUDENTS);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENTS;
  });

  // Current Logged In Student
  const [currentStudent, setCurrentStudent] = useState<StudentUser | null>(null);

  // Active Token Ujian
  const [activeToken, setActiveToken] = useState<string>(() => SheetService.getActiveToken());

  // Exam state
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: StudentAnswerState }>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(60 * 60); // 60 minutes
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Exam submission results
  const [examResults, setExamResults] = useState<ExamResult[]>(() => SheetService.getLocalResults());
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [isResyncing, setIsResyncing] = useState(false);

  // Connection status with Google Spreadsheet
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'syncing' | 'idle'>('idle');

  // Timer interval reference
  const timerRef = useRef<any>(null);

  // Check connection on mount and every 60 seconds
  const verifyConnection = async () => {
    const url = SheetService.getScriptUrl();
    if (!url) {
      setConnectionStatus('disconnected');
      return;
    }
    const test = await SheetService.testConnection();
    setConnectionStatus(test.success ? 'connected' : 'disconnected');
  };

  useEffect(() => {
    verifyConnection();
    const interval = setInterval(verifyConnection, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync students to localStorage
  const handleUpdateStudents = (updated: StudentUser[]) => {
    setStudents(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync active token
  const handleUpdateActiveToken = (token: string) => {
    setActiveToken(token);
    SheetService.setActiveToken(token);
  };

  // Handle student login success
  const handleLoginSuccess = (student: StudentUser) => {
    setCurrentStudent(student);

    // 1. Soal Acak untuk Setiap Siswa (Puspendik ANBK standard)
    const baseIds = EXAM_QUESTIONS.map((q) => q.id);
    const shuffled = [...baseIds].sort(() => Math.random() - 0.5);
    setQuestionOrder(shuffled);

    // 2. Reset student exam states
    setCurrentIndex(0);
    setAnswers({});
    setTimeRemainingSeconds(60 * 60); // 60 minutes
    setIsQuestionListOpen(false);
    setIsSubmitConfirmOpen(false);

    // Update status in student list
    const updatedList = students.map((s) =>
      s.username === student.username ? { ...s, statusUjian: 'Sedang Mengerjakan' as const } : s
    );
    handleUpdateStudents(updatedList);

    setView('exam');
  };

  // Countdown timer effect during exam
  useEffect(() => {
    if (view === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Time expired: auto submit
            handleFinalSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, questionOrder, answers, currentStudent]);

  // Answer change handler
  const handleAnswerChange = (newAnswer: StudentAnswerState) => {
    const currentQId = questionOrder[currentIndex];
    if (!currentQId) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQId]: newAnswer,
    }));
  };

  // Count answered questions
  const answeredCount = Object.keys(answers).filter((idStr) => {
    const ans = answers[Number(idStr)];
    if (!ans) return false;
    if (ans.selectedSingle) return true;
    if (ans.selectedMultiple && ans.selectedMultiple.length > 0) return true;
    if (ans.trueFalseAnswers && Object.keys(ans.trueFalseAnswers).length === 3) return true;
    return false;
  }).length;

  // Count doubtful questions
  const doubtfulCount = Object.values(answers).filter((a) => a.isDoubtful).length;
  const unansweredCount = EXAM_QUESTIONS.length - answeredCount;

  // Submit & Grading Engine
  const handleFinalSubmit = async (isAutoTimeOut = false) => {
    if (!currentStudent) return;
    setIsSubmitting(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const waktuMulai = new Date(Date.now() - (3600 - timeRemainingSeconds) * 1000).toLocaleTimeString('id-ID');
    const waktuSelesai = new Date().toLocaleString('id-ID');
    const durasiMenit = Math.floor((3600 - timeRemainingSeconds) / 60);
    const durasiDetik = (3600 - timeRemainingSeconds) % 60;
    const durasiPengerjaan = `${durasiMenit} menit ${durasiDetik} detik`;

    let totalScorePoints = 0;
    let pemahamanPoints = 0;
    let aplikasiPoints = 0;
    let penalaranPoints = 0;
    let totalBenarCount = 0;

    const detailJawabanMap: any = {};

    EXAM_QUESTIONS.forEach((q) => {
      const studentAns = answers[q.id];
      let isQuestionCorrect = false;

      if (q.type === 'pg') {
        const studentChoice = studentAns?.selectedSingle;
        const correctChoice = q.correctAnswers[0];
        if (studentChoice && studentChoice === correctChoice) {
          isQuestionCorrect = true;
        }
        detailJawabanMap[q.id] = {
          type: 'pg',
          jawabanSiswa: studentChoice || '-',
          kunciJawaban: correctChoice,
          isCorrect: isQuestionCorrect,
          scoreEarned: isQuestionCorrect ? 1 : 0,
        };
      } else if (q.type === 'pgk') {
        const studentChoices = (studentAns?.selectedMultiple || []).sort();
        const correctChoices = [...q.correctAnswers].sort();
        // Fully correct if matches exact set
        const matches =
          studentChoices.length === correctChoices.length &&
          studentChoices.every((c, i) => c === correctChoices[i]);
        if (matches) {
          isQuestionCorrect = true;
        }
        detailJawabanMap[q.id] = {
          type: 'pgk',
          jawabanSiswa: studentChoices,
          kunciJawaban: correctChoices,
          isCorrect: isQuestionCorrect,
          scoreEarned: isQuestionCorrect ? 1 : 0,
        };
      } else if (q.type === 'bs') {
        const tf = studentAns?.trueFalseAnswers || {};
        const stmts = q.statements || [];
        const isAllStatementsCorrect =
          Object.keys(tf).length === 3 &&
          stmts.every((stmt, sIdx) => tf[sIdx] === stmt.correctAnswer);

        if (isAllStatementsCorrect) {
          isQuestionCorrect = true;
        }
        detailJawabanMap[q.id] = {
          type: 'bs',
          jawabanSiswa: tf,
          kunciJawaban: stmts.map((s) => s.correctAnswer),
          isCorrect: isQuestionCorrect,
          scoreEarned: isQuestionCorrect ? 1 : 0,
        };
      }

      if (isQuestionCorrect) {
        totalScorePoints += 1;
        totalBenarCount += 1;
        if (q.level === 'pemahaman') pemahamanPoints += 1;
        else if (q.level === 'aplikasi') aplikasiPoints += 1;
        else if (q.level === 'penalaran') penalaranPoints += 1;
      }
    });

    // Final score 0-100
    const skorAkhir = Math.round((totalScorePoints / EXAM_QUESTIONS.length) * 100);

    const resultObj: ExamResult = {
      id: `result_${Date.now()}`,
      kodeSiswa: currentStudent.username,
      nama: currentStudent.nama,
      kelas: currentStudent.kelas,
      token: currentStudent.token,
      waktuMulai,
      waktuSelesai,
      durasiPengerjaan,
      totalSoal: EXAM_QUESTIONS.length,
      jumlahBenar: totalBenarCount,
      skorAkhir,
      skorPemahaman: pemahamanPoints,
      skorAplikasi: aplikasiPoints,
      skorPenalaran: penalaranPoints,
      jawabanDetail: detailJawabanMap,
      syncedToSheet: false,
    };

    // Update student status to 'Selesai' with final score
    const updatedStudents = students.map((s) =>
      s.username === currentStudent.username
        ? {
            ...s,
            statusUjian: 'Selesai' as const,
            nilai: skorAkhir,
            waktuSelesai,
          }
        : s
    );
    handleUpdateStudents(updatedStudents);

    // Save exam result to local state & storage
    SheetService.saveResultLocally(resultObj);
    setExamResults((prev) => [resultObj, ...prev.filter((r) => r.id !== resultObj.id)]);
    setLatestResult(resultObj);

    // Send to Google Spreadsheet (Sheet JawabanUjian)
    setConnectionStatus('syncing');
    const syncRes = await SheetService.submitExamResult(resultObj);
    if (syncRes.success) {
      resultObj.syncedToSheet = true;
      resultObj.sheetTimestamp = new Date().toISOString();
      SheetService.saveResultLocally(resultObj);
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }

    setIsSubmitting(false);
    setIsSubmitConfirmOpen(false);
    setView('result');
  };

  // Re-sync submission to Google Spreadsheet
  const handleResyncToSheet = async () => {
    if (!latestResult) return;
    setIsResyncing(true);
    setConnectionStatus('syncing');
    const res = await SheetService.submitExamResult(latestResult);
    setIsResyncing(false);
    if (res.success) {
      setConnectionStatus('connected');
      alert(res.message);
    } else {
      setConnectionStatus('disconnected');
      alert(res.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    if (view === 'exam') {
      if (!confirm('Apakah Anda yakin ingin keluar dari sesi ujian? Jawaban yang belum dikirim akan dibatalkan.')) {
        return;
      }
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStudent(null);
    setAnswers({});
    setView('login');
  };

  const currentQId = questionOrder[currentIndex];
  const activeQuestion = EXAM_QUESTIONS.find((q) => q.id === currentQId) || EXAM_QUESTIONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top ANBK Blue Header */}
      <HeaderANBK
        student={currentStudent}
        timeRemainingSeconds={timeRemainingSeconds}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenQuestionList={() => setIsQuestionListOpen(true)}
        onLogout={handleLogout}
        answeredCount={answeredCount}
        totalQuestions={EXAM_QUESTIONS.length}
        connectionStatus={connectionStatus}
        onOpenAdmin={() => setView('admin')}
        isExamActive={view === 'exam'}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {view === 'login' && (
          <LoginStudent
            students={students}
            onLoginSuccess={handleLoginSuccess}
            onOpenAdmin={() => setView('admin')}
            connectionStatus={connectionStatus}
            activeToken={activeToken}
          />
        )}

        {view === 'exam' && activeQuestion && (
          <ExamInterface
            question={activeQuestion}
            currentIndex={currentIndex}
            totalQuestions={questionOrder.length}
            currentAnswer={answers[currentQId]}
            onAnswerChange={handleAnswerChange}
            onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            onNext={() => setCurrentIndex((prev) => Math.min(questionOrder.length - 1, prev + 1))}
            onFinishRequest={() => setIsSubmitConfirmOpen(true)}
            fontSize={fontSize}
            answeredCount={answeredCount}
          />
        )}

        {view === 'result' && latestResult && (
          <ExamResultSummary
            result={latestResult}
            onLogout={handleLogout}
            onResyncToSheet={handleResyncToSheet}
            isSyncing={isResyncing}
            onOpenAdmin={() => setView('admin')}
          />
        )}

        {view === 'admin' && (
          <AdminPanel
            students={students}
            onUpdateStudents={handleUpdateStudents}
            examResults={examResults}
            onBackToLogin={() => setView('login')}
            connectionStatus={connectionStatus}
            onCheckConnection={verifyConnection}
            activeToken={activeToken}
            onUpdateActiveToken={handleUpdateActiveToken}
          />
        )}
      </main>

      {/* Modal Daftar Soal 1-20 ANBK */}
      <QuestionNavigationModal
        isOpen={isQuestionListOpen}
        onClose={() => setIsQuestionListOpen(false)}
        totalQuestions={questionOrder.length}
        currentIndex={currentIndex}
        answers={answers}
        questionIds={questionOrder}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
      />

      {/* Modal Konfirmasi Selesai Ujian */}
      <SubmitConfirmModal
        isOpen={isSubmitConfirmOpen}
        onClose={() => setIsSubmitConfirmOpen(false)}
        onConfirmSubmit={() => handleFinalSubmit(false)}
        answeredCount={answeredCount}
        doubtfulCount={doubtfulCount}
        unansweredCount={unansweredCount}
        totalQuestions={EXAM_QUESTIONS.length}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
