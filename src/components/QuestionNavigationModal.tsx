import React from 'react';
import { X, Check, HelpCircle, Circle } from 'lucide-react';
import { StudentAnswerState } from '../types';

interface QuestionNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentIndex: number;
  answers: { [id: number]: StudentAnswerState };
  questionIds: number[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionNavigationModal: React.FC<QuestionNavigationModalProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  currentIndex,
  answers,
  questionIds,
  onSelectQuestion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#1e3a8a] text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">DAFTAR SOAL UJIAN</h3>
            <p className="text-xs text-blue-200">
              Pilih nomor soal di bawah untuk berpindah langsung ke soal yang dituju
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-md hover:bg-blue-800 transition"
            id="btn-close-modal-daftar-soal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend / Petunjuk Warna */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-around text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-slate-900 rounded border border-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
            <span className="text-slate-700 font-medium">Sudah Dijawab</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-amber-400 rounded border border-amber-600 flex items-center justify-center text-[10px] text-slate-900 font-bold">
              ?
            </span>
            <span className="text-slate-700 font-medium">Ragu-ragu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-white rounded border border-slate-400 flex items-center justify-center text-[10px] text-slate-400">
              -
            </span>
            <span className="text-slate-700 font-medium">Belum Dijawab</span>
          </div>
        </div>

        {/* 20 Question Grid */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-5 gap-3">
            {questionIds.map((qId, index) => {
              const ans = answers[qId];
              const isCurrent = index === currentIndex;
              const isDoubtful = ans?.isDoubtful;

              // Check if answered
              let isAnswered = false;
              if (ans) {
                if (ans.selectedSingle) isAnswered = true;
                if (ans.selectedMultiple && ans.selectedMultiple.length > 0) isAnswered = true;
                if (ans.trueFalseAnswers && Object.keys(ans.trueFalseAnswers).length === 3) isAnswered = true;
              }

              // Color styles matching official CBT ANBK:
              // - Ragu-ragu: Yellow bg with check / mark
              // - Answered: Dark Black/Navy bg with white text
              // - Unanswered: White bg with slate border
              let buttonBgClass = 'bg-white text-slate-700 border-slate-300 hover:border-blue-500';
              if (isDoubtful) {
                buttonBgClass = 'bg-amber-400 text-slate-900 border-amber-500 font-bold';
              } else if (isAnswered) {
                buttonBgClass = 'bg-slate-900 text-white border-slate-950 font-bold';
              }

              return (
                <button
                  key={qId}
                  onClick={() => {
                    onSelectQuestion(index);
                    onClose();
                  }}
                  className={`relative flex flex-col items-center justify-center h-12 rounded border-2 transition active:scale-95 shadow-xs ${buttonBgClass} ${
                    isCurrent ? 'ring-3 ring-blue-500 ring-offset-2' : ''
                  }`}
                  id={`btn-nav-soal-${index + 1}`}
                >
                  <span className="text-sm font-bold">{index + 1}</span>
                  {/* Small status indicator in corner */}
                  {isDoubtful ? (
                    <span className="absolute top-0.5 right-1 text-[9px] font-black text-amber-900">
                      ?
                    </span>
                  ) : isAnswered ? (
                    <span className="absolute top-0.5 right-1 text-[9px] font-black text-emerald-300">
                      ✓
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded transition shadow-sm"
          >
            Tutup Daftar Soal
          </button>
        </div>
      </div>
    </div>
  );
};
