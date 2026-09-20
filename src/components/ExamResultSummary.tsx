import React from 'react';
import { CheckCircle2, Award, ArrowLeft, RefreshCw, Send, BookOpen, AlertCircle } from 'lucide-react';
import { ExamResult } from '../types';
import { SheetService } from '../services/sheetService';

interface ExamResultSummaryProps {
  result: ExamResult;
  onLogout: () => void;
  onResyncToSheet: () => Promise<void>;
  isSyncing: boolean;
  onOpenAdmin?: () => void;
}

export const ExamResultSummary: React.FC<ExamResultSummaryProps> = ({
  result,
  onLogout,
  onResyncToSheet,
  isSyncing,
  onOpenAdmin,
}) => {
  const getGradeInfo = (score: number) => {
    if (score >= 85) return { label: 'Mahir (Sangat Baik)', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-300' };
    if (score >= 70) return { label: 'Cakap (Baik)', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-300' };
    if (score >= 55) return { label: 'Dasar (Cukup)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-300' };
    return { label: 'Perlu Intervensi Khusus', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-300' };
  };

  const grade = getGradeInfo(result.skorAkhir);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Success Banner */}
        <div className="bg-[#1e3a8a] text-white p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-3 shadow-md">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-wide">UJIAN SELESAI</h2>
          <p className="text-blue-200 text-sm mt-1">
            Data lembar jawaban Anda telah berhasil diarsipkan oleh sistem CBT ANBK
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Student Profile & Meta Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Nama Peserta</span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{result.nama}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Kelas</span>
              <p className="text-sm font-bold text-blue-700 mt-0.5">{result.kelas}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Kode / Username</span>
              <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{result.kodeSiswa}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Token Ujian</span>
              <p className="text-sm font-mono font-bold text-amber-700 mt-0.5">{result.token}</p>
            </div>
          </div>

          {/* Score Display Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Primary Score */}
            <div className={`md:col-span-1 p-6 rounded-xl border text-center flex flex-col justify-center items-center ${grade.bg}`}>
              <span className="text-xs uppercase font-bold text-slate-600 tracking-wider">
                SKOR AKHIR ASESMEN
              </span>
              <div className="text-5xl font-black text-slate-900 my-2">
                {result.skorAkhir}
                <span className="text-xl text-slate-400 font-normal"> / 100</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${grade.color} bg-white shadow-xs`}>
                {grade.label}
              </span>
              <span className="text-[11px] text-slate-500 mt-2">
                Menjawab benar {result.jumlahBenar} dari {result.totalSoal} soal
              </span>
            </div>

            {/* Cognitive Level Breakdown (Puspendik Standard) */}
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Capaian Berdasarkan Tingkat Kognitif (Elemen Bangun Ruang)</span>
              </h4>

              {/* Pemahaman (20%) */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">1. Level Pemahaman (Bobot 20% - 4 Soal)</span>
                  <span className="text-blue-700 font-bold">{result.skorPemahaman} / 4 Benar</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(result.skorPemahaman / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Aplikasi (40%) */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">2. Level Aplikasi (Bobot 40% - 8 Soal)</span>
                  <span className="text-emerald-700 font-bold">{result.skorAplikasi} / 8 Benar</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${(result.skorAplikasi / 8) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Penalaran (40%) */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">3. Level Penalaran (Bobot 40% - 8 Soal)</span>
                  <span className="text-amber-700 font-bold">{result.skorPenalaran} / 8 Benar</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(result.skorPenalaran / 8) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Spreadsheet Sync Status Banner */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-700 mt-0.5">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-blue-900">
                  Status Sinkronisasi Google Spreadsheet (Sheet JawabanUjian)
                </h5>
                <p className="text-xs text-blue-800 mt-0.5">
                  {SheetService.getScriptUrl()
                    ? 'Data dikirim otomatis ke Google Spreadsheet sekolah.'
                    : 'Aplikasi saat ini beroperasi dalam mode penyimpanan lokal (offline-first).'}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Waktu Selesai: {result.waktuSelesai} | Durasi: {result.durasiPengerjaan}
                </p>
              </div>
            </div>

            <button
              onClick={onResyncToSheet}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-300 text-blue-700 text-xs font-semibold rounded shadow-xs transition"
              id="btn-resync-sheet"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Kirim Ulang ke Sheet'}</span>
            </button>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow transition active:scale-95"
              id="btn-kembali-login"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Logout & Kembali ke Beranda</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold px-3 py-2 border border-blue-300 rounded hover:bg-blue-50 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lihat Rekapitulasi di Halaman Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
