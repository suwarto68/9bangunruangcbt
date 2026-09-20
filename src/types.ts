export type QuestionType = 'pg' | 'pgk' | 'bs';
export type CognitiveLevel = 'pemahaman' | 'aplikasi' | 'penalaran';

export interface QuestionOption {
  key: string;
  text: string;
}

export interface StatementItem {
  id: string;
  text: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface QuestionSolution {
  formulaUsed: string;
  stepByStep: string[];
  finalAnswerText: string;
  rubric: string;
}

export interface Question {
  id: number;
  indicatorCode: '2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6';
  indicatorTitle: string;
  subElement: 'Bangun Ruang';
  level: CognitiveLevel;
  type: QuestionType;
  title: string;
  stimulusTitle: string;
  stimulusText: string;
  svgType: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  prompt: string;
  options?: QuestionOption[]; // for 'pg' (1 correct) and 'pgk' (multiple correct)
  statements?: StatementItem[]; // for 'bs' (3 statements)
  correctAnswers: string[]; // e.g. ['B'] for PG, or ['A', 'C'] for PGK
  solution: QuestionSolution;
}

export interface StudentAnswerState {
  selectedSingle?: string; // 'A', 'B', 'C', 'D'
  selectedMultiple?: string[]; // ['A', 'C']
  trueFalseAnswers?: { [statementIndex: number]: boolean }; // { 0: true, 1: false, 2: true }
  isDoubtful: boolean;
}

export interface StudentUser {
  id: string;
  username: string;
  password: string;
  nama: string;
  kelas: '9A' | '9B' | string;
  token: string;
  statusUjian: 'Belum Ujian' | 'Sedang Mengerjakan' | 'Selesai';
  waktuSelesai?: string;
  nilai?: number;
}

export interface ExamResult {
  id: string;
  kodeSiswa: string;
  nama: string;
  kelas: string;
  token: string;
  waktuMulai: string;
  waktuSelesai: string;
  durasiPengerjaan: string; // e.g. "42 menit 15 detik"
  totalSoal: number;
  jumlahBenar: number;
  skorAkhir: number; // 0 - 100
  skorPemahaman: number; // out of 4
  skorAplikasi: number; // out of 8
  skorPenalaran: number; // out of 8
  jawabanDetail: {
    [questionId: number]: {
      type: QuestionType;
      jawabanSiswa: any;
      kunciJawaban: any;
      isCorrect: boolean;
      scoreEarned: number;
    };
  };
  syncedToSheet: boolean;
  sheetTimestamp?: string;
}

export interface SheetConfig {
  scriptUrl: string;
  autoSync: boolean;
  lastSyncStatus: 'connected' | 'disconnected' | 'syncing' | 'idle';
  lastSyncMessage: string;
  lastSyncTime?: string;
}
