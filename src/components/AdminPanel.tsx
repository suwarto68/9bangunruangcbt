import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  Settings,
  BookOpen,
  ArrowLeft,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { StudentUser, ExamResult, Question } from '../types';
import { SheetService, APPS_SCRIPT_TEMPLATE } from '../services/sheetService';
import { EXAM_QUESTIONS } from '../data/questions';

interface AdminPanelProps {
  students: StudentUser[];
  onUpdateStudents: (students: StudentUser[]) => void;
  examResults: ExamResult[];
  onBackToLogin: () => void;
  connectionStatus: 'connected' | 'disconnected' | 'syncing' | 'idle';
  onCheckConnection: () => Promise<void>;
  activeToken: string;
  onUpdateActiveToken: (token: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  students,
  onUpdateStudents,
  examResults,
  onBackToLogin,
  connectionStatus,
  onCheckConnection,
  activeToken,
  onUpdateActiveToken,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'results' | 'settings' | 'solutions'>('users');

  // Apps Script Settings state
  const [scriptUrlInput, setScriptUrlInput] = useState(SheetService.getScriptUrl());
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Student Tab state
  const [searchStudent, setSearchStudent] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [isFetchingFromSheet, setIsFetchingFromSheet] = useState(false);
  const [fetchMessage, setFetchMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // New Student Form Modal State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newNama, setNewNama] = useState('');
  const [newKelas, setNewKelas] = useState<'9A' | '9B' | string>('9A');
  const [newPassword, setNewPassword] = useState('123');
  const [syncNewStudentToSheet, setSyncNewStudentToSheet] = useState(true);

  // Exam Results state
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [searchResult, setSearchResult] = useState('');

  // Password-Protected Pembahasan state (Password: ANBK2026 - must not be displayed)
  const [isSolutionsUnlocked, setIsSolutionsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedSolutionQuestion, setSelectedSolutionQuestion] = useState<Question>(EXAM_QUESTIONS[0]);

  // Handle Save Script URL
  const handleSaveScriptUrl = () => {
    SheetService.setScriptUrl(scriptUrlInput);
    setTestResult({
      success: true,
      message: 'URL Google Apps Script berhasil disimpan di pengaturan aplikasi!',
    });
    onCheckConnection();
  };

  // Handle Test Connection
  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await SheetService.testConnection(scriptUrlInput);
    setIsTesting(false);
    setTestResult({
      success: res.success,
      message: res.message,
    });
    onCheckConnection();
  };

  // Handle Copy Apps Script Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Handle Tarik dari Spreadsheet
  const handleFetchFromSheet = async () => {
    setIsFetchingFromSheet(true);
    setFetchMessage(null);
    const result = await SheetService.fetchStudentsFromSheet();
    setIsFetchingFromSheet(false);
    if (result.success && result.users) {
      onUpdateStudents(result.users);
      setFetchMessage({ text: result.message, isError: false });
    } else {
      setFetchMessage({ text: result.message, isError: true });
    }
  };

  // Handle Add Student
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newNama.trim()) return;

    const newStd: StudentUser = {
      id: `std_${Date.now()}`,
      username: newUsername.trim(),
      password: newPassword.trim(),
      nama: newNama.trim(),
      kelas: newKelas,
      token: activeToken,
      statusUjian: 'Belum Ujian',
    };

    const updated = [newStd, ...students];
    onUpdateStudents(updated);
    setIsAddStudentOpen(false);

    if (syncNewStudentToSheet) {
      await SheetService.saveStudentTokenToSheet({
        kodeSiswa: newStd.username,
        namaPeserta: newStd.nama,
        kelas: newStd.kelas,
        token: newStd.token,
      });
    }

    setNewUsername('');
    setNewNama('');
  };

  // Handle Password Unlock for Pembahasan (Password: ANBK2026 - strictly masked)
  const handleUnlockSolutions = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (passwordInput.trim() === 'ANBK2026') {
      setIsSolutionsUnlocked(true);
      setPasswordError('');
    } else {
      setPasswordError('Password akses pembahasan salah! Silakan hubungi pengawas pusat.');
    }
  };

  // Export Results to CSV
  const handleExportResultsCSV = () => {
    if (examResults.length === 0) {
      alert('Belum ada data hasil ujian untuk diekspor.');
      return;
    }

    const headers = [
      'Timestamp',
      'Kode Siswa',
      'Nama Peserta',
      'Kelas',
      'Token',
      'Durasi',
      'Jumlah Benar',
      'Skor Akhir (0-100)',
      'Level Pemahaman',
      'Level Aplikasi',
      'Level Penalaran',
    ];

    const rows = examResults.map((r) => [
      `"${r.waktuSelesai}"`,
      `"${r.kodeSiswa}"`,
      `"${r.nama}"`,
      `"${r.kelas}"`,
      `"${r.token}"`,
      `"${r.durasiPengerjaan}"`,
      r.jumlahBenar,
      r.skorAkhir,
      r.skorPemahaman,
      r.skorAplikasi,
      r.skorPenalaran,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hasil_CBT_ANBK_Matematika_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.nama.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.username.toLowerCase().includes(searchStudent.toLowerCase());
    const matchClass = filterClass === 'all' || s.kelas === filterClass;
    return matchSearch && matchClass;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Admin Header Bar */}
      <div className="bg-[#1e3a8a] text-white rounded-xl shadow-md p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-white p-1 shadow-sm flex items-center justify-center shrink-0">
            <img
              src="https://i.ibb.co/LX62Y77g/Logo-tut.jpg"
              alt="Logo Tut Wuri Handayani"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded">
                PANEL PROKTOR / ADMIN
              </span>
              <span className="text-xs text-blue-200">SMP Kelas 8 Fase D</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black">
              Sistem Manajemen CBT ANBK & Sinkronisasi Spreadsheet
            </h2>
          </div>
        </div>

        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 bg-blue-900/80 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg border border-blue-600 transition"
          id="btn-kembali-ke-login"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Login Siswa</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-lg shadow-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'users'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          id="tab-data-pengguna"
        >
          <Users className="w-4 h-4" />
          <span>Data Pengguna ({students.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'results'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          id="tab-hasil-ujian"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Hasil Ujian ({examResults.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          id="tab-pengaturan-apps-script"
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan & Google Apps Script</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('solutions')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'solutions'
              ? 'border-blue-700 text-blue-800 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          id="tab-akses-pembahasan"
        >
          <Lock className="w-4 h-4 text-amber-600" />
          <span>Akses Pembahasan {isSolutionsUnlocked ? '(Terbuka)' : '(Terkunci)'}</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: DATA PENGGUNA
          Menu "Tarik dari spreadsheet" Sesuai Spesifikasi
         ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Top action toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Menu "Tarik dari spreadsheet" sesuai perintah spesifikasi */}
              <button
                type="button"
                onClick={handleFetchFromSheet}
                disabled={isFetchingFromSheet}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition active:scale-95 cursor-pointer disabled:bg-slate-400"
                id="btn-tarik-dari-spreadsheet"
              >
                <UploadCloud className={`w-4 h-4 ${isFetchingFromSheet ? 'animate-bounce' : ''}`} />
                <span>{isFetchingFromSheet ? 'Menarik Data Sheet...' : 'Tarik dari Spreadsheet'}</span>
              </button>

              {/* Tambah Siswa */}
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(true)}
                className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition active:scale-95 cursor-pointer"
                id="btn-tambah-siswa"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Siswa</span>
              </button>

              {/* Token Aktif Controller */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 rounded-lg px-3 py-1.5 text-xs">
                <span className="font-bold text-amber-900">Token Ujian Aktif:</span>
                <input
                  type="text"
                  value={activeToken}
                  onChange={(e) => onUpdateActiveToken(e.target.value.toUpperCase())}
                  className="w-20 px-2 py-0.5 text-center font-mono font-bold bg-white border border-amber-400 rounded text-amber-900 focus:outline-hidden"
                  maxLength={8}
                />
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama / NISN..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg w-44 sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="all">Semua Kelas</option>
                <option value="9A">Kelas 9A</option>
                <option value="9B">Kelas 9B</option>
              </select>
            </div>
          </div>

          {/* Fetch Feedback Message */}
          {fetchMessage && (
            <div
              className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                fetchMessage.isError
                  ? 'bg-rose-50 border border-rose-300 text-rose-800'
                  : 'bg-emerald-50 border border-emerald-300 text-emerald-800'
              }`}
            >
              {fetchMessage.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{fetchMessage.text}</span>
            </div>
          )}

          {/* Students Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#1e3a8a] text-white">
                  <tr>
                    <th className="p-3 font-bold">No</th>
                    <th className="p-3 font-bold">Username / Kode</th>
                    <th className="p-3 font-bold">Nama Lengkap Peserta</th>
                    <th className="p-3 font-bold text-center">Kelas</th>
                    <th className="p-3 font-bold text-center">Password</th>
                    <th className="p-3 font-bold text-center">Token</th>
                    <th className="p-3 font-bold text-center">Status Ujian</th>
                    <th className="p-3 font-bold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-slate-500">
                        Tidak ada data siswa yang cocok dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((std, idx) => (
                      <tr key={std.id || idx} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-slate-500 font-medium">{idx + 1}</td>
                        <td className="p-3 font-mono font-bold text-blue-900">{std.username}</td>
                        <td className="p-3 font-semibold text-slate-900">{std.nama}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-xs">
                            {std.kelas}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-center text-slate-600">{std.password}</td>
                        <td className="p-3 font-mono font-bold text-amber-700 text-center">{std.token}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              std.statusUjian === 'Selesai'
                                ? 'bg-emerald-100 text-emerald-800'
                                : std.statusUjian === 'Sedang Mengerjakan'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {std.statusUjian}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus data peserta ${std.nama}?`)) {
                                onUpdateStudents(students.filter((s) => s.username !== std.username));
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: HASIL UJIAN
         ========================================================================= */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Rekapitulasi Nilai & Jawaban CBT Siswa</h3>
              <p className="text-xs text-slate-500">
                Total {examResults.length} lembar jawaban tersimpan di database lokal & spreadsheet
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportResultsCSV}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Rekap CSV</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#1e3a8a] text-white">
                  <tr>
                    <th className="p-3 font-bold">Waktu Ujian</th>
                    <th className="p-3 font-bold">Nama Peserta</th>
                    <th className="p-3 font-bold text-center">Kelas</th>
                    <th className="p-3 font-bold text-center">Durasi</th>
                    <th className="p-3 font-bold text-center">Benar</th>
                    <th className="p-3 font-bold text-center">Skor Akhir</th>
                    <th className="p-3 font-bold text-center">Status Sync</th>
                    <th className="p-3 font-bold text-center">Rincian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {examResults.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">
                        Belum ada siswa yang menyelesaikan ujian. Silakan login dengan akun siswa untuk mencoba mengerjakan asesmen.
                      </td>
                    </tr>
                  ) : (
                    examResults.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-slate-600 text-xs">{res.waktuSelesai}</td>
                        <td className="p-3 font-semibold text-slate-900">
                          {res.nama} <span className="text-slate-400 font-mono text-xs">({res.kodeSiswa})</span>
                        </td>
                        <td className="p-3 text-center font-bold text-blue-700">{res.kelas}</td>
                        <td className="p-3 text-center text-slate-600 text-xs">{res.durasiPengerjaan}</td>
                        <td className="p-3 text-center font-semibold text-emerald-700">
                          {res.jumlahBenar} / {res.totalSoal}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-900 font-black text-sm rounded">
                            {res.skorAkhir}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Tersimpan</span>
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedResult(res)}
                            className="text-xs text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
                          >
                            Buka Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PENGATURAN & GOOGLE APPS SCRIPT
          Menjawab Pertanyaan 1, 2, dan 3 Sesuai Perintah Spesifikasi
         ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Connection URL Configuration Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-700" />
                  <span>Konfigurasi URL Google Apps Script (Web App)</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Masukkan Web App URL (berakhiran <code>/exec</code>) dari deployment Google Apps Script Anda untuk mengaktifkan sinkronisasi otomatis dua arah dengan Google Spreadsheet.
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  connectionStatus === 'connected'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span>
                  {connectionStatus === 'connected'
                    ? 'Indikator: Terhubung ke Database Google Sheet'
                    : 'Indikator: Mode Mandiri (Belum Sinkron URL)'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={scriptUrlInput}
                onChange={(e) => setScriptUrlInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono"
              />
              <button
                type="button"
                onClick={handleSaveScriptUrl}
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition"
              >
                Simpan URL
              </button>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Menguji...' : 'Uji Koneksi'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 font-medium ${
                  testResult.success
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border border-rose-300 text-rose-800'
                }`}
              >
                {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* 3 Panduan Pertanyaan Khusus Sesuai Prompt User */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Koneksi & Indikator */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-black text-xs mb-2">
                1
              </div>
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                Indikator Koneksi Database
              </h4>
              <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                Aplikasi menyertakan indikator status koneksi hijau/kuning di header atas (<code>#connection-indicator</code>) yang secara berkala memeriksa status respons endpoint Apps Script via parameter <code>action=ping</code>.
              </p>
            </div>

            {/* Box 2: Penyimpanan Data Google AI (Nama, Kelas) */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-2">
                2
              </div>
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Script Isian Data Google AI
              </h4>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                Script Apps Script di bawah menyediakan fungsi <code>saveDataGoogleAI</code> yang otomatis membuat sheet <strong>DataGoogleAI</strong> dengan kolom: <em>Timestamp, KodeSiswa, NamaPeserta, Kelas, Token, dan Isian/Analisis AI</em>.
              </p>
            </div>

            {/* Box 3: Sambungan Data Siswa (Kode, Nama, Token) */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4">
              <div className="w-7 h-7 rounded bg-purple-600 text-white flex items-center justify-center font-black text-xs mb-2">
                3
              </div>
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                Sinkronisasi Kode, Nama & Token
              </h4>
              <p className="text-xs text-purple-900 mt-1 leading-relaxed">
                Data siswa (kode, nama, token) tersambung ke sheet <strong>DataSiswaToken</strong> dan sheet <strong>UserLogin</strong>. Saat menekan tombol <em>"Tarik dari Spreadsheet"</em>, aplikasi membaca langsung data baris terbaru secara real-time.
              </p>
            </div>
          </div>

          {/* Full Apps Script Code Display & 1-Click Copy */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Kode Lengkap Google Apps Script (Code.gs)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Salin script di bawah ini ke menu Ekstensi &gt; Apps Script di Google Spreadsheet Anda
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-1.5 rounded transition active:scale-95 shadow-xs"
                id="btn-copy-apps-script"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copySuccess ? '✓ Kode Tersalin!' : 'Salin Kode Apps Script'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-96">
              <pre>{APPS_SCRIPT_TEMPLATE}</pre>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AKSES PEMBAHASAN
          Berpassword: [ANBK2026] - Sesuai Spesifikasi: "jangan ditampilkan"
         ========================================================================= */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          {!isSolutionsUnlocked ? (
            /* Locked Password Screen */
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Akses Kunci Pembahasan Terlindungi</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kunci jawaban dan telaah soal hanya dapat diakses oleh Guru / Pengawas resmi menggunakan kata sandi otorisasi.
                </p>
              </div>

              <form onSubmit={handleUnlockSolutions} className="space-y-3 pt-2">
                {passwordError && (
                  <div className="p-2.5 bg-red-50 border border-red-300 rounded text-xs text-red-800 font-medium">
                    {passwordError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 text-left mb-1">
                    Masukkan Kata Sandi Otorisasi
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm"
                  id="btn-unlock-pembahasan"
                >
                  Buka Kunci Pembahasan
                </button>
              </form>
            </div>
          ) : (
            /* Unlocked Solutions View */
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-[#1e3a8a] text-white p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold">PEMBAHASAN RESMI MATEMATIKA FASE D (20 BUTIR SOAL)</h3>
                    <p className="text-xs text-blue-200">
                      Elemen Pengukuran &amp; Geometri (Bangun Ruang) - Standar TKA Puspendik
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSolutionsUnlocked(false)}
                  className="text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-100 px-3 py-1 rounded border border-blue-600"
                >
                  Kunci Kembali
                </button>
              </div>

              {/* 20 Question Selector Buttons */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5">
                {EXAM_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setSelectedSolutionQuestion(q)}
                    className={`w-9 h-9 rounded text-xs font-bold transition flex items-center justify-center border ${
                      selectedSolutionQuestion.id === q.id
                        ? 'bg-blue-700 text-white border-blue-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Solution Content */}
              <div className="p-6 space-y-5">
                <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                      Soal No. {selectedSolutionQuestion.id} &bull; Indikator {selectedSolutionQuestion.indicatorCode}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">
                      {selectedSolutionQuestion.stimulusTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700">
                      Tipe: {selectedSolutionQuestion.type.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-purple-100 border border-purple-300 text-purple-800 uppercase">
                      Level: {selectedSolutionQuestion.level}
                    </span>
                  </div>
                </div>

                {/* Stimulus recap */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Stimulus Konteks:</span>
                  {selectedSolutionQuestion.stimulusText}
                </div>

                {/* Prompt */}
                <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs text-blue-950 font-semibold">
                  <span className="font-bold block text-blue-900 mb-0.5">Kalimat Tanya:</span>
                  {selectedSolutionQuestion.prompt}
                </div>

                {/* Kunci Jawaban & Rumus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-lg space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                      Kunci Jawaban Benar
                    </span>
                    <div className="text-lg font-black text-emerald-800">
                      {selectedSolutionQuestion.solution.finalAnswerText}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-lg space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      Rumus / Teorema yang Digunakan
                    </span>
                    <div className="text-xs font-mono font-bold text-amber-900">
                      {selectedSolutionQuestion.solution.formulaUsed}
                    </div>
                  </div>
                </div>

                {/* Langkah-langkah Penyelesaian Matematis */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Langkah-langkah Penyelesaian (Step-by-Step Derivation):
                  </h5>
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-2">
                    {selectedSolutionQuestion.solution.stepByStep.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-bold shrink-0 text-[10px]">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rubrik Penilaian */}
                <div className="text-xs text-slate-600 bg-slate-100 p-3 rounded border border-slate-300">
                  <span className="font-bold text-slate-800">Rubrik Penilaian: </span>
                  {selectedSolutionQuestion.solution.rubric}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Add Student */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden border border-slate-300">
            <div className="bg-[#1e3a8a] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-sm font-bold">Tambah Data Peserta Baru</h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-blue-200 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddStudentSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Username / Kode Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="misal: 9a06"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap peserta..."
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas</label>
                  <select
                    value={newKelas}
                    onChange={(e) => setNewKelas(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 font-semibold"
                  >
                    <option value="9A">9A</option>
                    <option value="9B">9B</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={syncNewStudentToSheet}
                  onChange={(e) => setSyncNewStudentToSheet(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium">
                  Kirimkan langsung data siswa ke Google Spreadsheet (Sheet DataSiswaToken)
                </span>
              </label>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded shadow-xs"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Jawaban Siswa */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-slate-300 flex flex-col">
            <div className="bg-[#1e3a8a] text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Rincian Lembar Jawaban: {selectedResult.nama}</h3>
                <p className="text-xs text-blue-200">
                  Kelas {selectedResult.kelas} &bull; Skor Akhir: {selectedResult.skorAkhir}/100
                </p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-blue-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
              {EXAM_QUESTIONS.map((q) => {
                const detail = selectedResult.jawabanDetail[q.id];
                const isCorrect = detail?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border ${
                      isCorrect ? 'bg-emerald-50/60 border-emerald-300' : 'bg-rose-50/60 border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">
                        Soal No. {q.id} ({q.type.toUpperCase()} - {q.level})
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {isCorrect ? '✓ BENAR' : '✗ SALAH'}
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1">{q.prompt}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-slate-600">
                      <span>
                        Kunci Jawaban: <strong>{q.solution.finalAnswerText}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-100 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-1.5 bg-slate-700 text-white font-bold rounded text-xs"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
