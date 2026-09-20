import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  answeredCount: number;
  doubtfulCount: number;
  unansweredCount: number;
  totalQuestions: number;
  isSubmitting: boolean;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  answeredCount,
  doubtfulCount,
  unansweredCount,
  totalQuestions,
  isSubmitting,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const hasWarning = doubtfulCount > 0 || unansweredCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1e3a8a] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <h3 className="text-base font-bold">KONFIRMASI SELESAI UJIAN</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-blue-200 hover:text-white p-1 rounded-md hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Apakah Anda yakin ingin mengakhiri sesi ujian ini? Jawaban Anda akan langsung dikirim dan disimpan ke sistem database Google Spreadsheet.
          </p>

          {/* Status summary cards */}
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
              <span className="block text-xl font-bold text-emerald-700">{answeredCount}</span>
              <span className="text-emerald-800 font-medium">Sudah Dijawab</span>
            </div>
            <div className={`p-3 rounded-md border ${
              doubtfulCount > 0 ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`block text-xl font-bold ${
                doubtfulCount > 0 ? 'text-amber-700' : 'text-slate-600'
              }`}>{doubtfulCount}</span>
              <span className={doubtfulCount > 0 ? 'text-amber-800 font-medium' : 'text-slate-600'}>
                Ragu-ragu
              </span>
            </div>
            <div className={`p-3 rounded-md border ${
              unansweredCount > 0 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`block text-xl font-bold ${
                unansweredCount > 0 ? 'text-red-700' : 'text-slate-600'
              }`}>{unansweredCount}</span>
              <span className={unansweredCount > 0 ? 'text-red-800 font-medium' : 'text-slate-600'}>
                Kosong
              </span>
            </div>
          </div>

          {/* Warning banner if any questions are doubtful or unanswered */}
          {hasWarning && (
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Perhatian Peserta:</span>
                Masih terdapat {doubtfulCount > 0 ? `${doubtfulCount} soal bertanda ragu-ragu` : ''}{' '}
                {doubtfulCount > 0 && unansweredCount > 0 ? 'dan ' : ''}
                {unansweredCount > 0 ? `${unansweredCount} soal belum dijawab` : ''}. Anda disarankan memeriksa kembali sebelum mengirim jawaban akhir.
              </div>
            </div>
          )}

          {/* Verification checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="checkbox-confirm-submit"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 font-medium">
                Saya telah memeriksa seluruh jawaban dan secara sadar menyatakan selesai mengikuti asesmen ini.
              </span>
            </label>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded shadow-xs transition"
          >
            Batal & Lanjut Mengerjakan
          </button>
          <button
            type="button"
            id="btn-confirm-final-submit"
            disabled={!isChecked || isSubmitting}
            onClick={onConfirmSubmit}
            className={`px-5 py-2 text-xs font-bold rounded shadow transition flex items-center gap-1.5 ${
              isChecked && !isSubmitting
                ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer active:scale-95'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Mengirim ke Spreadsheet...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Kirim Jawaban & Selesai</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
