import React, { useState } from 'react';
import { LogIn, Key, User, BookOpen, Shield, HelpCircle, CheckCircle, Wifi, AlertCircle } from 'lucide-react';
import { StudentUser } from '../types';
import { SheetService } from '../services/sheetService';

interface LoginStudentProps {
  students: StudentUser[];
  onLoginSuccess: (student: StudentUser) => void;
  onOpenAdmin: () => void;
  connectionStatus: 'connected' | 'disconnected' | 'syncing' | 'idle';
  activeToken: string;
}

export const LoginStudent: React.FC<LoginStudentProps> = ({
  students,
  onLoginSuccess,
  onOpenAdmin,
  connectionStatus,
  activeToken,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState<'9A' | '9B' | string>('9A');
  const [tokenInput, setTokenInput] = useState(activeToken);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Extract unique available classes from students list (default 9A and 9B)
  const availableClasses = Array.from(new Set(students.map((s) => s.kelas))).sort();
  if (!availableClasses.includes('9A')) availableClasses.unshift('9A');
  if (!availableClasses.includes('9B')) availableClasses.push('9B');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Silakan masukkan Username / NISN Anda.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Silakan masukkan Password Anda.');
      return;
    }

    if (!tokenInput.trim()) {
      setErrorMessage('Silakan masukkan Token Ujian yang diberikan pengawas.');
      return;
    }

    // Token verification
    if (tokenInput.trim().toUpperCase() !== activeToken.trim().toUpperCase()) {
      setErrorMessage(
        `Token ujian salah atau belum diaktifkan oleh pengawas. (Token aktif saat ini: ${activeToken})`
      );
      return;
    }

    // Find student in local/synced database
    const matchedStudent = students.find(
      (s) =>
        s.username.toLowerCase() === username.trim().toLowerCase() &&
        s.kelas === selectedClass
    );

    if (!matchedStudent) {
      setErrorMessage(
        `Pengguna dengan Username "${username}" tidak ditemukan di Kelas ${selectedClass}. Pastikan kelas dan username sesuai.`
      );
      return;
    }

    if (matchedStudent.password !== password) {
      setErrorMessage('Password yang Anda masukkan salah. Silakan periksa kembali.');
      return;
    }

    // Login success!
    onLoginSuccess({
      ...matchedStudent,
      token: tokenInput.trim().toUpperCase(),
    });
  };

  // Quick Demo Autofill Helper
  const handleQuickSelectStudent = (std: StudentUser) => {
    setUsername(std.username);
    setPassword(std.password);
    setSelectedClass(std.kelas);
    setTokenInput(activeToken);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 bg-slate-100">
      {/* Container Kotak Login Putih dengan Bayangan (Shadow) Sesuai Spesifikasi */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header Biru dengan Logo Sekolah Sesuai Spesifikasi */}
        <div className="bg-[#1e3a8a] text-white p-6 text-center relative">
          <div className="mx-auto w-16 h-16 rounded-full bg-white p-1 shadow-md flex items-center justify-center mb-3">
            <img
              src="https://i.ibb.co/LX62Y77g/Logo-tut.jpg"
              alt="Logo Tut Wuri Handayani Kemdikbud"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">CBT ANBK KELAS 8</h2>
          <p className="text-xs text-blue-200 mt-0.5">
            Puspendik - Asesmen Geometri & Bangun Ruang Fase D
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-900/90 text-blue-200 text-[11px] border border-blue-700">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>
              {connectionStatus === 'connected'
                ? 'Database Spreadsheet Terhubung'
                : 'Penyimpanan Data Lokal Aktif'}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Notification */}
            {errorMessage && (
              <div
                id="error-login-message"
                className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-xs text-red-800 flex items-start gap-2 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Dropdown Pilihan Kelas: [9A dan 9B] sesuai spesifikasi */}
            <div>
              <label
                htmlFor="select-kelas"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
              >
                Kelas Peserta
              </label>
              <select
                id="select-kelas"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              >
                {availableClasses.map((kls) => (
                  <option key={kls} value={kls}>
                    Kelas {kls}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500 mt-1 block">
                *Data kelas diambil dari Google Spreadsheet (sheet UserLogin)
              </span>
            </div>

            {/* Username Input */}
            <div>
              <label
                htmlFor="input-username"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
              >
                Username / Kode Peserta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="input-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: 9a01 atau 9b01"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="input-password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Token Ujian Field */}
            <div>
              <label
                htmlFor="input-token"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
              >
                Token Ujian (Rilis Pengawas)
              </label>
              <div className="relative">
                <input
                  id="input-token"
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                  placeholder="Contoh: ANBK26"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-300 rounded-lg text-sm font-mono font-bold tracking-widest text-amber-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[11px] font-bold text-amber-700 pointer-events-none">
                  TOKEN RESMI
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              id="btn-login-siswa"
              className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>MASUK UJIAN SEKARANG</span>
            </button>
          </form>

          {/* Quick Demo Test Student Picker */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 text-center">
              Pilihan Cepat Akun Siswa (Klik untuk Mengisi):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleQuickSelectStudent({
                    id: 'std_9a_01',
                    username: '9a01',
                    password: '123',
                    nama: 'Ahmad Fauzi (9A)',
                    kelas: '9A',
                    token: activeToken,
                    statusUjian: 'Belum Ujian',
                  })
                }
                className="p-2 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-900 transition"
              >
                <span className="font-bold block">Ahmad Fauzi (9A)</span>
                <span className="text-[10px] text-blue-700">user: 9a01 / pass: 123</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickSelectStudent({
                    id: 'std_9b_01',
                    username: '9b01',
                    password: '123',
                    nama: 'Anisa Putri (9B)',
                    kelas: '9B',
                    token: activeToken,
                    statusUjian: 'Belum Ujian',
                  })
                }
                className="p-2 text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 transition"
              >
                <span className="font-bold block">Anisa Putri (9B)</span>
                <span className="text-[10px] text-emerald-700">user: 9b01 / pass: 123</span>
              </button>
            </div>
          </div>

          {/* Switch to Admin Page */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-xs text-slate-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition"
              id="btn-switch-to-admin"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Masuk Halaman Pengawas / Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
