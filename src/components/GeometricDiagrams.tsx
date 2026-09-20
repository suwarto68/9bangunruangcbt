import React from 'react';

interface DiagramProps {
  type: string;
  className?: string;
}

export const GeometricDiagram: React.FC<DiagramProps> = ({ type, className = '' }) => {
  switch (type) {
    // Soal 1: Jaring-jaring balok
    case 'jaring_balok':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 280 180" className="w-full max-w-xs h-40">
            <rect x="20" y="60" width="50" height="40" fill="#e0e7ff" stroke="#3730a3" strokeWidth="2" />
            <rect x="70" y="60" width="70" height="40" fill="#c7d2fe" stroke="#3730a3" strokeWidth="2" />
            <rect x="140" y="60" width="50" height="40" fill="#e0e7ff" stroke="#3730a3" strokeWidth="2" />
            <rect x="190" y="60" width="70" height="40" fill="#c7d2fe" stroke="#3730a3" strokeWidth="2" />
            <rect x="70" y="20" width="70" height="40" fill="#a5b4fc" stroke="#3730a3" strokeWidth="2" />
            <rect x="70" y="100" width="70" height="40" fill="#a5b4fc" stroke="#3730a3" strokeWidth="2" />
            {/* Labels */}
            <text x="45" y="85" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Sisi Kiri</text>
            <text x="105" y="85" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Alas</text>
            <text x="165" y="85" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Sisi Kanan</text>
            <text x="225" y="85" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Tutup</text>
            <text x="105" y="45" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Depan</text>
            <text x="105" y="125" fontSize="11" textAnchor="middle" fill="#1e1b4b" fontWeight="bold">Belakang</text>
            {/* Dimension marks */}
            <text x="105" y="15" fontSize="10" textAnchor="middle" fill="#4338ca">p = 14 cm</text>
            <text x="5" y="83" fontSize="10" textAnchor="start" fill="#4338ca">t = 8 cm</text>
            <text x="105" y="152" fontSize="10" textAnchor="middle" fill="#4338ca">l = 10 cm</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Sketsa Pola Jaring-Jaring Kotak Kardus Kemasan</span>
        </div>
      );

    // Soal 2: Jaring-jaring limas segiempat
    case 'jaring_limas':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 240 200" className="w-full max-w-xs h-44">
            {/* Base */}
            <rect x="80" y="70" width="80" height="80" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="120" y="115" fontSize="12" textAnchor="middle" fill="#78350f" fontWeight="bold">Alas Persegi (s)</text>
            {/* Top triangle */}
            <polygon points="120,10 80,70 160,70" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
            {/* Bottom triangle */}
            <polygon points="120,210 80,150 160,150" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
            {/* Left triangle */}
            <polygon points="20,110 80,70 80,150" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
            {/* Right triangle */}
            <polygon points="220,110 160,70 160,150" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
            {/* Dimensions */}
            <text x="120" y="170" fontSize="10" textAnchor="middle" fill="#b45309">s = 12 cm</text>
            <text x="120" y="45" fontSize="10" textAnchor="middle" fill="#c2410c">t_segitiga = 10 cm</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Jaring-jaring Limas Segiempat Beraturan T.ABCD</span>
        </div>
      );

    // Soal 3: Luas Permukaan Balok & Kubus
    case 'kubus_balok':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 280 150" className="w-full max-w-xs h-36">
            {/* Balok 3D isometric */}
            <polygon points="30,70 90,70 120,40 60,40" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.5" />
            <polygon points="30,70 90,70 90,130 30,130" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.5" />
            <polygon points="90,70 120,40 120,100 90,130" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="60" y="143" fontSize="10" textAnchor="middle" fill="#1e40af">p = 25 cm</text>
            <text x="110" y="125" fontSize="10" textAnchor="start" fill="#1e40af">l = 12 cm</text>
            <text x="20" y="105" fontSize="10" textAnchor="end" fill="#1e40af">t = 10 cm</text>

            {/* Kubus 3D isometric */}
            <polygon points="170,60 220,60 245,35 195,35" fill="#fce7f3" stroke="#be185d" strokeWidth="1.5" />
            <polygon points="170,60 220,60 220,110 170,110" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
            <polygon points="220,60 245,35 245,85 220,110" fill="#f472b6" stroke="#be185d" strokeWidth="1.5" />
            <text x="195" y="125" fontSize="10" textAnchor="middle" fill="#9d174d">s = 15 cm</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Perbandingan Kotak Hadiah Balok & Kotak Kubus</span>
        </div>
      );

    // Soal 4: Tenda Kemah Prisma Segitiga
    case 'prisma_tenda':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 280 160" className="w-full max-w-xs h-36">
            {/* Front triangle */}
            <polygon points="30,130 90,40 150,130" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
            {/* Slanted roof */}
            <polygon points="90,40 230,20 270,100 150,130" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
            {/* Hidden dotted back */}
            <line x1="30" y1="130" x2="180" y2="100" stroke="#15803d" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="180" y1="100" x2="270" y2="100" stroke="#15803d" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="180" y1="100" x2="230" y2="20" stroke="#15803d" strokeWidth="1" strokeDasharray="3,3" />
            {/* Altitude dashed line */}
            <line x1="90" y1="40" x2="90" y2="130" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="95" y="85" fontSize="10" fill="#b91c1c" fontWeight="bold">t = 1,6 m</text>
            <text x="90" y="145" fontSize="10" textAnchor="middle" fill="#166534">Alas = 2,4 m</text>
            <text x="210" y="125" fontSize="10" textAnchor="middle" fill="#166534">Panjang Tenda = 4 m</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Model Tenda Regu Berbentuk Prisma Segitiga Sama Kaki</span>
        </div>
      );

    // Soal 5: Kolam Renang Balok
    case 'kolam_balok':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 280 150" className="w-full max-w-xs h-36">
            {/* Outer pool border */}
            <polygon points="20,50 200,50 260,110 80,110" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Inner water depth */}
            <polygon points="20,50 80,110 80,135 20,75" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="80,110 260,110 260,135 80,135" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5" />
            <text x="110" y="42" fontSize="10" fill="#0369a1">Panjang = 20 m</text>
            <text x="210" y="90" fontSize="10" fill="#0369a1">Lebar = 8 m</text>
            <text x="35" y="110" fontSize="10" fill="#0369a1">Kedalaman = 1,5 m</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Rancangan Bak Penampung Air / Kolam Fasilitas Olahraga</span>
        </div>
      );

    // Soal 6: Tandon Air Tabung
    case 'tabung_tandon':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 220 170" className="w-full max-w-xs h-40">
            {/* Top ellipse */}
            <ellipse cx="110" cy="40" rx="60" ry="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Body */}
            <path d="M 50,40 L 50,120 A 60,18 0 0,0 170,120 L 170,40 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            {/* Bottom ellipse dashed back */}
            <path d="M 50,120 A 60,18 0 0,1 170,120" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            {/* Radius and height markings */}
            <line x1="110" y1="40" x2="170" y2="40" stroke="#b91c1c" strokeWidth="1.5" />
            <text x="140" y="34" fontSize="10" fill="#b91c1c" fontWeight="bold">r = 70 cm</text>
            <line x1="180" y1="40" x2="180" y2="120" stroke="#0369a1" strokeWidth="1" />
            <text x="185" y="85" fontSize="10" fill="#0369a1">t = 150 cm</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Tandon Air Bersih Berbentuk Tabung Silinder</span>
        </div>
      );

    // Soal 7: Kerucut Caping & Tumpeng
    case 'kerucut_caping':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 240 160" className="w-full max-w-xs h-36">
            {/* Base ellipse */}
            <ellipse cx="120" cy="120" rx="70" ry="20" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Cone slant */}
            <polygon points="120,20 50,120 190,120" fill="#fde68a" stroke="#d97706" strokeWidth="2" opacity="0.9" />
            {/* Center height line */}
            <line x1="120" y1="20" x2="120" y2="120" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="120" y1="120" x2="190" y2="120" stroke="#15803d" strokeWidth="1.5" />
            <text x="125" y="70" fontSize="10" fill="#b91c1c">t = 24 cm</text>
            <text x="150" y="115" fontSize="10" fill="#15803d">r = 7 cm</text>
            <text x="165" y="65" fontSize="10" fill="#d97706">s (garis pelukis)</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Kerucut Caping Bambu dengan Jari-jari 7 cm & Tinggi 24 cm</span>
        </div>
      );

    // Soal 8: Bola Kubah & Tangki Gas
    case 'bola_tangki':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 220 160" className="w-full max-w-xs h-36">
            <circle cx="110" cy="80" r="55" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
            <ellipse cx="110" cy="80" rx="55" ry="18" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Radius */}
            <line x1="110" y1="80" x2="165" y2="80" stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="110" cy="80" r="3" fill="#b91c1c" />
            <text x="135" y="75" fontSize="10" fill="#b91c1c" fontWeight="bold">r = 21 dm</text>
            <text x="110" y="150" fontSize="10" textAnchor="middle" fill="#475569">Tangki Gas Bola (d = 42 dm)</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Model Tangki Gas Industri Berbentuk Bola Sempurna</span>
        </div>
      );

    // Soal Kombinasi Bangun Ruang (Tabung + Kerucut)
    case 'tabung_kerucut':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 220 190" className="w-full max-w-xs h-44">
            {/* Cylinder body */}
            <path d="M 60,90 L 60,150 A 50,15 0 0,0 160,150 L 160,90 Z" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
            <path d="M 60,150 A 50,15 0 0,1 160,150" stroke="#4338ca" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            {/* Connecting ellipse */}
            <ellipse cx="110" cy="90" rx="50" ry="15" fill="#c7d2fe" stroke="#4338ca" strokeWidth="2" />
            {/* Cone top */}
            <polygon points="110,25 60,90 160,90" fill="#a5b4fc" stroke="#4338ca" strokeWidth="2" />
            {/* Dimensions */}
            <text x="175" y="125" fontSize="10" fill="#312e81">t_tabung = 10 m</text>
            <text x="175" y="60" fontSize="10" fill="#312e81">t_kerucut = 12 m</text>
            <text x="110" y="105" fontSize="10" textAnchor="middle" fill="#312e81">d = 14 m (r = 7 m)</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Silo Penyimpan Gabah Pertanian (Tabung + Atap Kerucut)</span>
        </div>
      );

    // Soal Setengah Bola & Tabung (Kapsul / Kubah)
    case 'kubah_setengah_bola':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 220 180" className="w-full max-w-xs h-40">
            {/* Cylinder base */}
            <path d="M 60,100 L 60,150 A 50,15 0 0,0 160,150 L 160,100 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 60,150 A 50,15 0 0,1 160,150" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            {/* Middle junction */}
            <ellipse cx="110" cy="100" rx="50" ry="15" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
            {/* Hemisphere dome */}
            <path d="M 60,100 A 50,50 0 0,1 160,100 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <text x="110" y="70" fontSize="10" textAnchor="middle" fill="#854d0e">Kubah ½ Bola (r = 7 m)</text>
            <text x="170" y="130" fontSize="10" fill="#854d0e">t_tabung = 6 m</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Gedung Pertemuan Berbentuk Tabung dengan Kubah Setengah Bola</span>
        </div>
      );

    // Jaring-jaring Prisma Segitiga
    case 'jaring_prisma_segitiga':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <svg viewBox="0 0 260 170" className="w-full max-w-xs h-36">
            {/* 3 side rectangles */}
            <rect x="20" y="55" width="70" height="50" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
            <rect x="90" y="55" width="80" height="50" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
            <rect x="170" y="55" width="70" height="50" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
            {/* 2 triangles on middle rectangle */}
            <polygon points="90,55 170,55 130,15" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" />
            <polygon points="90,105 170,105 130,145" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" />
            <text x="55" y="85" fontSize="10" textAnchor="middle" fill="#075985">Sisi 1</text>
            <text x="130" y="85" fontSize="10" textAnchor="middle" fill="#075985">Alas</text>
            <text x="205" y="85" fontSize="10" textAnchor="middle" fill="#075985">Sisi 2</text>
            <text x="130" y="40" fontSize="10" textAnchor="middle" fill="#075985">Segitiga I</text>
            <text x="130" y="130" fontSize="10" textAnchor="middle" fill="#075985">Segitiga II</text>
          </svg>
          <span className="text-xs text-slate-500 mt-1 font-medium">Gambar: Pola Jaring-Jaring Kotak Cokelat Prisma Segitiga</span>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center p-4 bg-slate-50 rounded border border-slate-200 ${className}`}>
          <span className="text-xs text-slate-400">Diagram Geometri Matematika Fase D</span>
        </div>
      );
  }
};
