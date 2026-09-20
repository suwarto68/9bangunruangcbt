import React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, CheckSquare, Square, Check, AlertCircle, FileText } from 'lucide-react';
import { Question, StudentAnswerState } from '../types';
import { GeometricDiagram } from './GeometricDiagrams';

interface ExamInterfaceProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer?: StudentAnswerState;
  onAnswerChange: (answer: StudentAnswerState) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinishRequest: () => void;
  fontSize: 'small' | 'medium' | 'large';
  answeredCount: number;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  onAnswerChange,
  onPrevious,
  onNext,
  onFinishRequest,
  fontSize,
  answeredCount,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  // Font size multiplier
  const textClasses = {
    small: {
      stimulus: 'text-xs sm:text-sm leading-relaxed',
      prompt: 'text-sm font-semibold',
      option: 'text-xs sm:text-sm',
    },
    medium: {
      stimulus: 'text-sm sm:text-base leading-relaxed',
      prompt: 'text-base font-semibold',
      option: 'text-sm sm:text-base',
    },
    large: {
      stimulus: 'text-base sm:text-lg leading-relaxed',
      prompt: 'text-lg font-bold',
      option: 'text-base sm:text-lg',
    },
  }[fontSize];

  // Handler for Single Choice (PG)
  const handleSingleSelect = (key: string) => {
    onAnswerChange({
      ...currentAnswer,
      selectedSingle: key,
      isDoubtful: currentAnswer?.isDoubtful || false,
    });
  };

  // Handler for Multiple Choice Complex (PGK)
  const handleMultipleSelect = (key: string) => {
    const existing = currentAnswer?.selectedMultiple || [];
    const updated = existing.includes(key)
      ? existing.filter((k) => k !== key)
      : [...existing, key];

    onAnswerChange({
      ...currentAnswer,
      selectedMultiple: updated,
      isDoubtful: currentAnswer?.isDoubtful || false,
    });
  };

  // Handler for True/False Table (BS)
  const handleTrueFalseSelect = (statementIndex: number, val: boolean) => {
    const existing = { ...(currentAnswer?.trueFalseAnswers || {}) };
    existing[statementIndex] = val;

    onAnswerChange({
      ...currentAnswer,
      trueFalseAnswers: existing,
      isDoubtful: currentAnswer?.isDoubtful || false,
    });
  };

  // Toggle Ragu-ragu (Yellow button)
  const toggleDoubtful = () => {
    onAnswerChange({
      ...currentAnswer,
      isDoubtful: !currentAnswer?.isDoubtful,
    });
  };

  // Check question type badges
  const typeLabel =
    question.type === 'pg'
      ? 'Pilihan Ganda (1 Jawaban Benar)'
      : question.type === 'pgk'
      ? 'Pilihan Ganda Kompleks (Bisa > 1 Jawaban Benar)'
      : 'Tabel Benar - Salah (3 Pernyataan)';

  const levelBadge = {
    pemahaman: { label: 'Pemahaman (20%)', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    aplikasi: { label: 'Aplikasi (40%)', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    penalaran: { label: 'Penalaran (40%)', bg: 'bg-purple-100 text-purple-800 border-purple-300' },
  }[question.level];

  return (
    <div className="flex flex-col flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5">
      {/* Top progress bar & question meta */}
      <div className="bg-white rounded-t-lg border border-slate-200 border-b-0 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="bg-[#1e3a8a] text-white font-bold text-xs sm:text-sm px-3 py-1 rounded shadow-xs">
            SOAL NO. {currentIndex + 1}
          </span>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-300">
            {typeLabel}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${levelBadge.bg}`}>
            {levelBadge.label}
          </span>
          <span className="text-xs text-slate-500 hidden md:inline">
            Indikator {question.indicatorCode}
          </span>
        </div>

        {/* Mini progress tracker */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-medium">
            Progres: <strong className="text-blue-700">{answeredCount}</strong> dari {totalQuestions} terjawab
          </span>
          <div className="w-24 sm:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main split question layout */}
      <div className="bg-white border border-slate-200 shadow-sm flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* LEFT COLUMN: Stimulus Context, Reading Passage, and Geometric Visual Diagram */}
        <div className="lg:col-span-6 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto bg-slate-50/40">
          <div className="space-y-4">
            {/* Stimulus Title */}
            <div className="border-b border-slate-200 pb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Stimulus Asesmen Nasional (TKA Puspendik)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {question.stimulusTitle}
              </h3>
            </div>

            {/* Stimulus Text (~100 words context) */}
            <p className={`text-slate-800 text-justify ${textClasses.stimulus}`}>
              {question.stimulusText}
            </p>

            {/* Geometric SVG Diagram */}
            {question.svgType && (
              <div className="my-3">
                <GeometricDiagram type={question.svgType} />
              </div>
            )}

            {/* Optional Table Data */}
            {question.tableData && (
              <div className="my-3 overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead className="bg-slate-200">
                    <tr>
                      {question.tableData.headers.map((h, i) => (
                        <th key={i} className="p-2 border border-slate-300 font-bold text-slate-800">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {question.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 border border-slate-300 text-slate-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Question Prompt & Answer Options */}
        <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Prompt */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3.5 text-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
                Pertanyaan:
              </span>
              <p className={textClasses.prompt}>{question.prompt}</p>
            </div>

            {/* 1. PILIHAN GANDA BIASA (1 Jawaban Benar) */}
            {question.type === 'pg' && question.options && (
              <div className="space-y-2.5 pt-1">
                {question.options.map((opt) => {
                  const isSelected = currentAnswer?.selectedSingle === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSingleSelect(opt.key)}
                      className={`w-full text-left p-3 rounded-lg border-2 flex items-start gap-3 transition cursor-pointer select-none active:scale-[0.99] ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/90 text-blue-950 font-medium shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                      id={`opt-pg-${opt.key.toLowerCase()}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition ${
                          isSelected
                            ? 'bg-blue-700 border-blue-700 text-white'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className={`pt-0.5 ${textClasses.option}`}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. PILIHAN GANDA KOMPLEKS (Bisa > 1 Jawaban Benar, Checkbox) */}
            {question.type === 'pgk' && question.options && (
              <div className="space-y-2.5 pt-1">
                <div className="text-xs text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded font-medium flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Pilihan Ganda Kompleks: Anda dapat memilih lebih dari satu pernyataan yang bernilai benar.</span>
                </div>
                {question.options.map((opt) => {
                  const isSelected = (currentAnswer?.selectedMultiple || []).includes(opt.key);
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleMultipleSelect(opt.key)}
                      className={`w-full text-left p-3 rounded-lg border-2 flex items-start gap-3 transition cursor-pointer select-none active:scale-[0.99] ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/90 text-blue-950 font-medium shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                      id={`opt-pgk-${opt.key.toLowerCase()}`}
                    >
                      <span
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs shrink-0 border transition mt-0.5 ${
                          isSelected
                            ? 'bg-blue-700 border-blue-700 text-white'
                            : 'bg-white border-slate-300 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </span>
                      <div className="flex-1">
                        <span className="font-bold text-slate-900 mr-2">[{opt.key}]</span>
                        <span className={textClasses.option}>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. BENAR - SALAH (Tabel 3 Pernyataan) */}
            {question.type === 'bs' && question.statements && (
              <div className="space-y-3 pt-1">
                <div className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded font-medium">
                  Petunjuk: Tentukan nilai BENAR atau SALAH pada setiap baris pernyataan di bawah ini.
                </div>
                <div className="border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1e3a8a] text-white text-xs">
                      <tr>
                        <th className="p-3 font-bold w-10 text-center">No</th>
                        <th className="p-3 font-bold">Pernyataan Konsep</th>
                        <th className="p-3 font-bold w-20 text-center bg-emerald-800">Benar</th>
                        <th className="p-3 font-bold w-20 text-center bg-rose-800">Salah</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                      {question.statements.map((stmt, idx) => {
                        const currentChoice = currentAnswer?.trueFalseAnswers?.[idx];
                        const isTrue = currentChoice === true;
                        const isFalse = currentChoice === false;

                        return (
                          <tr key={stmt.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                            <td className="p-3 font-bold text-slate-700 text-center">{idx + 1}</td>
                            <td className="p-3 text-slate-800 leading-relaxed">{stmt.text}</td>
                            <td className="p-3 text-center bg-emerald-50/40">
                              <label className="inline-flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-emerald-100 transition">
                                <input
                                  type="radio"
                                  name={`stmt_${question.id}_${idx}`}
                                  checked={isTrue}
                                  onChange={() => handleTrueFalseSelect(idx, true)}
                                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                />
                              </label>
                            </td>
                            <td className="p-3 text-center bg-rose-50/40">
                              <label className="inline-flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-rose-100 transition">
                                <input
                                  type="radio"
                                  name={`stmt_${question.id}_${idx}`}
                                  checked={isFalse}
                                  onChange={() => handleTrueFalseSelect(idx, false)}
                                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 cursor-pointer"
                                />
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Answer status summary on right column bottom */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
            <span>
              Status Soal Ini:{' '}
              {currentAnswer?.isDoubtful ? (
                <strong className="text-amber-600 font-bold">Ragu-ragu</strong>
              ) : currentAnswer?.selectedSingle ||
                (currentAnswer?.selectedMultiple && currentAnswer.selectedMultiple.length > 0) ||
                (currentAnswer?.trueFalseAnswers && Object.keys(currentAnswer.trueFalseAnswers).length === 3) ? (
                <strong className="text-emerald-600 font-bold">Sudah Terjawab</strong>
              ) : (
                <span className="text-slate-400">Belum Dijawab</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR (Exact ANBK Color Scheme Specified by User):
          - Warna tombol: merah (Soal sebelumnya)
          - kuning (Ragu-ragu)
          - biru (Soal berikutnya / Selesai)
      */}
      <div className="bg-slate-100 rounded-b-lg border border-slate-200 border-t-0 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Tombol Merah: Soal Sebelumnya */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded text-xs sm:text-sm font-bold shadow transition select-none ${
            isFirst
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95'
          }`}
          id="btn-soal-sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>SOAL SEBELUMNYA</span>
        </button>

        {/* Tombol Kuning: Ragu-ragu */}
        <button
          type="button"
          onClick={toggleDoubtful}
          className={`flex items-center gap-2 px-5 py-2.5 rounded text-xs sm:text-sm font-bold shadow transition cursor-pointer select-none active:scale-95 border ${
            currentAnswer?.isDoubtful
              ? 'bg-amber-400 border-amber-600 text-slate-900 ring-2 ring-amber-500'
              : 'bg-amber-300/80 hover:bg-amber-400 border-amber-400 text-slate-800'
          }`}
          id="btn-ragu-ragu"
        >
          <span
            className={`w-4 h-4 rounded border flex items-center justify-center text-[11px] ${
              currentAnswer?.isDoubtful
                ? 'bg-slate-900 border-slate-900 text-white font-black'
                : 'bg-white border-slate-400 text-transparent'
            }`}
          >
            ✓
          </span>
          <span>RAGU-RAGU</span>
        </button>

        {/* Tombol Biru: Soal Berikutnya / Selesai */}
        {isLast ? (
          <button
            type="button"
            onClick={onFinishRequest}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded text-xs sm:text-sm font-bold shadow bg-blue-700 hover:bg-blue-800 text-white cursor-pointer transition active:scale-95 border border-blue-500"
            id="btn-selesai-ujian"
          >
            <Check className="w-4 h-4" />
            <span>SELESAI UJIAN</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded text-xs sm:text-sm font-bold shadow bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition active:scale-95 border border-blue-500"
            id="btn-soal-berikutnya"
          >
            <span>SOAL BERIKUTNYA</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
