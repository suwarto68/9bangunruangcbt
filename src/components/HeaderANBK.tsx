import React from 'react';
import { Clock, LogOut, Grid, CheckCircle, Wifi, AlertTriangle } from 'lucide-react';
import { StudentUser } from '../types';

interface HeaderANBKProps {
  student?: StudentUser | null;
  timeRemainingSeconds: number;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  onOpenQuestionList?: () => void;
  onLogout: () => void;
  answeredCount: number;
  totalQuestions: number;
  connectionStatus: 'connected' | 'disconnected' | 'syncing' | 'idle';
  onOpenAdmin?: () => void;
  isExamActive?: boolean;
}

export const HeaderANBK: React.FC<HeaderANBKProps> = ({
  student,
  timeRemainingSeconds,
  fontSize,
  setFontSize,
  onOpenQuestionList,
  onLogout,
  answeredCount,
  totalQuestions,
  connectionStatus,
  onOpenAdmin,
  isExamActive = true,
}) => {
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const isUrgent = timeRemainingSeconds < 300 && isExamActive; // under 5 minutes

  return (
    <header className="bg-[#1e3a8a] text-white shadow-md select-none sticky top-0 z-30">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-blue-800/60">
        {/* Logo and Exam Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="https://i.ibb.co/LX62Y77g/Logo-tut.jpg"
              alt="Logo Tut Wuri Handayani Kemdikbud"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to SVG emblem if image blocked
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-700/80 px-2 py-0.5 rounded text-blue-100">
                CBT ANBK
              </span>
              <span className="text-xs text-blue-200 hidden sm:inline">
                Puspendik Kemendikbudristek
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
              ASESMEN MATEMATIKA FASE D (KELAS 8) - BANGUN RUANG
            </h1>
          </div>
        </div>

        {/* Database Connection Status Indicator */}
        <div className="flex items-center gap-3">
          <div
            id="connection-indicator"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              connectionStatus === 'connected'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : connectionStatus === 'syncing'
                ? 'bg-sky-950/80 border-sky-500 text-sky-300 animate-pulse'
                : 'bg-amber-950/80 border-amber-500 text-amber-300'
            }`}
            title="Indikator Koneksi Google Spreadsheet"
          >
            <Wifi className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {connectionStatus === 'connected'
                ? '🟢 Terhubung Spreadsheet'
                : connectionStatus === 'syncing'
                ? '🔵 Menyinkronkan...'
                : '🟡 Mode Mandiri (Tersimpan Lokal)'}
            </span>
            <span className="md:hidden">
              {connectionStatus === 'connected' ? '🟢 Online' : '🟡 Lokal'}
            </span>
          </div>

          {/* Admin Switcher Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-100 px-2.5 py-1 rounded border border-blue-700 transition"
              title="Masuk Menu Pengawas / Admin"
            >
              Menu Admin
            </button>
          )}
        </div>
      </div>

      {/* Exam Status Bar (Only visible when logged in as student) */}
      {student && (
        <div className="bg-[#172554] px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Student Info */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-blue-300 font-medium">Peserta:</span>
                <span className="font-semibold text-white bg-blue-900/60 px-2 py-0.5 rounded">
                  {student.nama} ({student.username})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-300 font-medium">Kelas:</span>
                <span className="font-bold text-amber-300 bg-blue-900/60 px-2 py-0.5 rounded">
                  {student.kelas}
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="text-blue-300 font-medium">Token:</span>
                <span className="font-mono text-emerald-300 bg-blue-900/60 px-2 py-0.5 rounded">
                  {student.token}
                </span>
              </div>
            </div>

            {/* Middle: Timer & Font Control */}
            <div className="flex items-center gap-3 sm:gap-5">
              {isExamActive && (
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono font-bold text-sm sm:text-base border shadow-inner ${
                    isUrgent
                      ? 'bg-red-700 text-white border-red-500 animate-pulse'
                      : 'bg-blue-950/80 text-amber-300 border-blue-700'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>
                    Sisa Waktu: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                  {isUrgent && <AlertTriangle className="w-4 h-4 text-white" />}
                </div>
              )}

              {/* Font Size Adjuster (ANBK Standard: A- A A+) */}
              <div className="flex items-center bg-blue-900/70 rounded p-0.5 border border-blue-700">
                <span className="text-[10px] text-blue-300 px-1.5 font-medium hidden sm:inline">
                  Ukuran Teks:
                </span>
                <button
                  type="button"
                  onClick={() => setFontSize('small')}
                  className={`px-2 py-0.5 text-xs rounded font-bold transition ${
                    fontSize === 'small' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'
                  }`}
                  title="Ukuran font kecil"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('medium')}
                  className={`px-2 py-0.5 text-sm rounded font-bold transition ${
                    fontSize === 'medium' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'
                  }`}
                  title="Ukuran font sedang (default)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 text-base rounded font-bold transition ${
                    fontSize === 'large' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'
                  }`}
                  title="Ukuran font besar"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Right: Question List Modal Trigger & Logout Button */}
            <div className="flex items-center gap-2">
              {onOpenQuestionList && isExamActive && (
                <button
                  onClick={onOpenQuestionList}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs sm:text-sm font-semibold shadow transition active:scale-95 border border-blue-400/50"
                  id="btn-daftar-soal-header"
                >
                  <Grid className="w-4 h-4" />
                  <span>Daftar Soal</span>
                  <span className="bg-blue-900 text-white text-[11px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                    {answeredCount}/{totalQuestions}
                  </span>
                </button>
              )}

              {/* Logout button as requested */}
              <button
                onClick={onLogout}
                className="flex items-center gap-1 bg-red-800/80 hover:bg-red-700 text-red-100 hover:text-white px-2.5 py-1 rounded text-xs font-semibold transition"
                title="Keluar dari Akun Siswa"
                id="btn-logout-header"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
