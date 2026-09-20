import { Question } from '../types';

export const EXAM_QUESTIONS: Question[] = [
  // ==========================================
  // BAGIAN 1: PILIHAN GANDA (8 SOAL)
  // ==========================================
  {
    id: 1,
    indicatorCode: '2.1',
    indicatorTitle: 'Membuat dan mengidentifikasi jaring-jaring berbagai bangun ruang sisi datar',
    subElement: 'Bangun Ruang',
    level: 'pemahaman',
    type: 'pg',
    title: 'Analisis Pola Jaring-jaring Kotak Kemasan',
    stimulusTitle: 'Standardisasi Kotak Kardus Kemasan Produk Kerajinan Lokal',
    stimulusText:
      'Sebuah kelompok Usaha Mikro, Kecil, dan Menengah (UMKM) pengrajin gerabah di Kabupaten Bantul memproduksi wadah kemasan suvenir ramah lingkungan berbahan karton daur ulang. Untuk memastikan keamanan barang pecah belah saat didistribusikan ke luar kota, pengrajin merancang pola bentangan jaring-jaring balok dengan ukuran presisi: panjang 14 cm, lebar 10 cm, dan tinggi 8 cm. Pola ini harus dapat dilipat secara tepat tanpa tumpang tindih pada setiap pertemuan rusuk sehingga membentuk wadah balok tertutup sempurna sebelum dimasukkan ke dalam karton pembungkus utama.',
    svgType: 'jaring_balok',
    prompt:
      'Berdasarkan pola jaring-jaring balok tersebut, jika sisi berlabel "Alas" diletakkan pada bagian bawah wadah, bidang manakah yang akan berada tepat berhadapan sejajar sebagai sisi tutup wadah tersebut?',
    options: [
      { key: 'A', text: 'Bidang Sisi Kiri' },
      { key: 'B', text: 'Bidang Tutup' },
      { key: 'C', text: 'Bidang Depan' },
      { key: 'D', text: 'Bidang Belakang' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'Konsep pasangan sisi sejajar pada jaring-jaring balok (Alas berpasangan dengan Tutup)',
      stepByStep: [
        'Pada jaring-jaring balok standar tipe 1-4-1 atau barisan memanjang, sisi-sisi yang berhadapan berselang satu sisi.',
        'Sisi alas diapit oleh sisi kiri, sisi kanan, sisi depan, dan sisi belakang.',
        'Setelah bidang sisi-sisi tegak dilipat tegak lurus 90° terhadap alas, bidang berlabel "Tutup" yang berjarak satu sisi di samping sisi kanan akan menutup bagian atas wadah sejajar dengan alas.',
        'Oleh karena itu, sisi yang berhadapan langsung dengan alas adalah bidang Tutup.',
      ],
      finalAnswerText: 'B (Bidang Tutup)',
      rubric: 'Menjawab B bernilai 1. Menjawab selain B bernilai 0.',
    },
  },
  {
    id: 2,
    indicatorCode: '2.1',
    indicatorTitle: 'Mengidentifikasi jaring-jaring bangun ruang limas segiempat',
    subElement: 'Bangun Ruang',
    level: 'pemahaman',
    type: 'pg',
    title: 'Komponen Bidang Pembentuk Limas Segiempat',
    stimulusTitle: 'Desain Miniatur Monumen Berbentuk Limas Persegi',
    stimulusText:
      'Dalam rangka memperingati Hari Pendidikan Nasional, siswa kelas 8 SMP Merdeka mengadakan pameran karya seni terapan. Regu arsitektur merancang maket miniatur tugu penghargaan yang bagian puncaknya berbentuk limas segiempat beraturan T.ABCD. Alas limas merupakan persegi dengan panjang rusuk 12 cm, sedangkan keempat sisi tegaknya berupa segitiga sama kaki yang kongruen dengan tinggi bidang tegak 10 cm. Sebelum dirakit menggunakan lem kayu, jaring-jaring pola digambar pada selembar kertas manila tebal agar potongan sisi-sisinya pas.',
    svgType: 'jaring_limas',
    prompt:
      'Berdasarkan struktur jaring-jaring limas segiempat beraturan tersebut, berapakah jumlah rusuk dan jumlah titik sudut pada bangun limas segiempat yang terbentuk?',
    options: [
      { key: 'A', text: '6 rusuk dan 4 titik sudut' },
      { key: 'B', text: '8 rusuk dan 5 titik sudut' },
      { key: 'C', text: '10 rusuk dan 6 titik sudut' },
      { key: 'D', text: '12 rusuk dan 8 titik sudut' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'Unsur-unsur Limas segi-n: Rusuk = 2n, Titik sudut = n + 1, Sisi = n + 1',
      stepByStep: [
        'Limas segiempat memiliki n = 4.',
        'Jumlah rusuk = 2 × n = 2 × 4 = 8 rusuk (4 rusuk alas: AB, BC, CD, DA dan 4 rusuk tegak: TA, TB, TC, TD).',
        'Jumlah titik sudut = n + 1 = 4 + 1 = 5 titik sudut (A, B, C, D, dan titik puncak T).',
      ],
      finalAnswerText: 'B (8 rusuk dan 5 titik sudut)',
      rubric: 'Menjawab B bernilai 1. Menjawab selain B bernilai 0.',
    },
  },
  {
    id: 3,
    indicatorCode: '2.2',
    indicatorTitle: 'Menghitung luas permukaan bangun ruang sisi datar (kubus dan balok)',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pg',
    title: 'Perhitungan Kebutuhan Kertas Pembungkus Kado',
    stimulusTitle: 'Festival Bakti Sosial Penyerahan Bingkisan Anak Panti',
    stimulusText:
      'Organisasi Siswa Intra Sekolah (OSIS) menyelenggarakan program amal donasi buku dan alat tulis untuk anak-anak panti asuhan. Setiap paket hadiah dikemas rapi dalam kotak kado kardus berbentuk balok dengan panjang 25 cm, lebar 12 cm, dan tinggi 10 cm. Seluruh permukaan luar setiap kotak kado wajib dilapisi kertas kado bermotif batik secara rapat tanpa celah. Panitia menyediakan gulungan kertas kado batik bermutu tinggi dengan total luas 15.000 cm² untuk membungkus beberapa paket sekaligus.',
    svgType: 'kubus_balok',
    prompt:
      'Berapakah luas kertas kado yang diperlukan untuk membungkus tepat satu buah kotak kado balok tersebut?',
    options: [
      { key: 'A', text: '1.240 cm²' },
      { key: 'B', text: '1.340 cm²' },
      { key: 'C', text: '1.480 cm²' },
      { key: 'D', text: '1.600 cm²' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'L = 2 × (p × l + p × t + l × t)',
      stepByStep: [
        'Diketahui: p = 25 cm, l = 12 cm, t = 10 cm.',
        'p × l = 25 × 12 = 300 cm²',
        'p × t = 25 × 10 = 250 cm²',
        'l × t = 12 × 10 = 120 cm²',
        'Jumlah = 300 + 250 + 120 = 670 cm²',
        'L = 2 × 670 cm² = 1.340 cm²',
      ],
      finalAnswerText: 'B (1.340 cm²)',
      rubric: 'Menjawab B bernilai 1. Menjawab pilihan lain bernilai 0.',
    },
  },
  {
    id: 4,
    indicatorCode: '2.3',
    indicatorTitle: 'Menghitung volume bangun ruang sisi datar (balok kolam penampungan)',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pg',
    title: 'Kapasitas Debit Pengisian Kolam Penampungan Air',
    stimulusTitle: 'Manajemen Sarana Air Bersih dan Kebersihan Fasilitas Sekolah',
    stimulusText:
      'Petugas sarana prasarana sekolah mengelola bak penampungan air bersih di area laboratorium sains dan fasilitas olahraga. Kolam penampungan tersebut berbentuk balok permanen dengan ukuran panjang bagian dalam 20 m, lebar 8 m, dan kedalaman (tinggi) 1,5 m. Untuk menjaga ketersediaan air menjelang kegiatan praktikum gabungan, bak diisi dari kondisi kosong menggunakan pompa air bertenaga listrik yang mampu menyalurkan debit konstan sebesar 400 liter per menit.',
    svgType: 'kolam_balok',
    prompt:
      'Berapa volume total air maksimum yang dapat ditampung di dalam bak tersebut bila dinyatakan dalam satuan liter? (Catatan: 1 m³ = 1.000 liter)',
    options: [
      { key: 'A', text: '160.000 liter' },
      { key: 'B', text: '240.000 liter' },
      { key: 'C', text: '320.000 liter' },
      { key: 'D', text: '480.000 liter' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'V = p × l × t, konversi 1 m³ = 1.000 liter',
      stepByStep: [
        'Ukuran bak: panjang p = 20 m, lebar l = 8 m, kedalaman t = 1,5 m.',
        'Volume dalam m³ = 20 × 8 × 1,5 = 160 × 1,5 = 240 m³.',
        'Konversi ke liter: 240 m³ × 1.000 liter/m³ = 240.000 liter.',
      ],
      finalAnswerText: 'B (240.000 liter)',
      rubric: 'Menjawab B bernilai 1. Pilihan lain bernilai 0.',
    },
  },
  {
    id: 5,
    indicatorCode: '2.4',
    indicatorTitle: 'Menghitung luas permukaan bangun ruang sisi lengkung (tabung tertutup)',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pg',
    title: 'Kebutuhan Pelat Logam Pembuatan Tandon Silinder',
    stimulusTitle: 'Modernisasi Tandon Distribusi Pupuk Cair Kelompok Tani',
    stimulusText:
      'Sebuah bengkel fabrikasi logam di pedesaan menerima pesanan dari kelompok tani untuk merakit tangki silinder tertutup penyimpan pupuk cair organik. Tangki tersebut dirancang dengan alas lingkaran berjari-jari (r) 70 cm dan tinggi tabung (t) 150 cm. Seluruh bagian tangki, termasuk alas bawah, selimut silinder, dan tutup atas kedap udara, dibuat dari pelat baja tahan karat tipis berkualitas tinggi agar tidak mudah mengalami korosi akibat zat kimia asam organik. Gunakan nilai pendekatan π = 22/7.',
    svgType: 'tabung_tandon',
    prompt:
      'Berapa luas seluruh permukaan pelat baja yang diperlukan untuk membuat sebuah tangki silinder tertutup tersebut?',
    options: [
      { key: 'A', text: '66.000 cm²' },
      { key: 'B', text: '84.200 cm²' },
      { key: 'C', text: '96.800 cm²' },
      { key: 'D', text: '112.400 cm²' },
    ],
    correctAnswers: ['C'],
    solution: {
      formulaUsed: 'L = 2 × π × r × (r + t)',
      stepByStep: [
        'Diketahui: r = 70 cm, t = 150 cm, π = 22/7.',
        'r + t = 70 + 150 = 220 cm.',
        'L = 2 × (22/7) × 70 × 220',
        'L = 2 × 22 × 10 × 220 = 440 × 220 = 96.800 cm².',
      ],
      finalAnswerText: 'C (96.800 cm²)',
      rubric: 'Menjawab C bernilai 1. Pilihan lain bernilai 0.',
    },
  },
  {
    id: 6,
    indicatorCode: '2.5',
    indicatorTitle: 'Menghitung volume bangun ruang sisi lengkung (kerucut)',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pg',
    title: 'Kapasitas Volume Cetakan Tumpeng Kerucut',
    stimulusTitle: 'Produksi Kuliner Tradisional Tumpeng Syukuran Komunitas',
    stimulusText:
      'Wirausaha katering tradisional "Berkah Rasa" memproduksi nasi tumpeng kuning khas perayaan syukuran adat. Nasi dicetak menggunakan cetakan aluminium kerucut khusus dengan diameter alas 28 cm (sehingga jari-jari r = 14 cm) dan tinggi kerucut 30 cm. Untuk menjaga kepadatan dan keindahan tekstur sajian, cetakan harus diisi nasi kuning rempah secara merata hingga batas bibir atas cetakan tepat sejajar. Gunakan nilai pendekatan π = 22/7.',
    svgType: 'kerucut_caping',
    prompt:
      'Berapakah volume nasi kuning yang mengisi penuh cetakan kerucut tersebut?',
    options: [
      { key: 'A', text: '5.160 cm³' },
      { key: 'B', text: '6.160 cm³' },
      { key: 'C', text: '8.420 cm³' },
      { key: 'D', text: '18.480 cm³' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'V = (1/3) × π × r² × t',
      stepByStep: [
        'Diketahui: diameter = 28 cm → jari-jari r = 14 cm, tinggi t = 30 cm, π = 22/7.',
        'V = (1/3) × (22/7) × 14 × 14 × 30',
        'V = (1/3) × 30 × (22/7) × 196 = 10 × 22 × 28 = 6.160 cm³.',
      ],
      finalAnswerText: 'B (6.160 cm³)',
      rubric: 'Menjawab B bernilai 1. Menjawab selain B bernilai 0.',
    },
  },
  {
    id: 7,
    indicatorCode: '2.6',
    indicatorTitle: 'Menyelesaikan masalah kontekstual luas terpal tenda prisma segitiga',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pg',
    title: 'Estimasi Biaya Terpal Pelindung Tenda Kemah Pramuka',
    stimulusTitle: 'Persiapan Perkemahan Akhir Tahun Regu Pramuka Elang',
    stimulusText:
      'Regu Pramuka Elang mendirikan tenda kemah regu berbentuk prisma segitiga sama kaki untuk kegiatan jambore. Tenda memiliki panjang horizontal 4 meter. Bagian depan dan belakang tenda berbentuk segitiga sama kaki dengan lebar dasar 2,4 meter dan tinggi tiang penyangga tegak 1,6 meter. Seluruh permukaan luar tenda (kedua sisi atap miring serta penutup segitiga depan dan belakang) akan dilapisi terpal anti-air, sedangkan bagian alas beralaskan tanah rumput dan terpal terpisah. Harga bahan kain terpal di toko perlengkapan alam terbuka adalah Rp35.000 per meter persegi.',
    svgType: 'prisma_tenda',
    prompt:
      'Jika panjang sisi miring atap tenda dihitung dengan teorema Pythagoras menghasilkan 2 meter, berapakah total biaya yang harus dikeluarkan regu untuk membeli terpal penutup atap dan kedua bidang segitiga tersebut?',
    options: [
      { key: 'A', text: 'Rp592.400' },
      { key: 'B', text: 'Rp694.400' },
      { key: 'C', text: 'Rp742.000' },
      { key: 'D', text: 'Rp812.000' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'Luas bahan = 2 × Luas segitiga + 2 × Luas atap miring; Total Biaya = Luas × Rp35.000',
      stepByStep: [
        'Hitung sisi miring atap: setengah alas segitiga = 2,4 / 2 = 1,2 m. Sisi miring s = √(1,2² + 1,6²) = √(1,44 + 2,56) = √4 = 2,0 m (sesuai stimulus).',
        'Luas 2 bidang segitiga (depan & belakang) = 2 × (1/2 × alas × tinggi) = 2,4 m × 1,6 m = 3,84 m².',
        'Luas 2 sisi atap miring persegi panjang = 2 × (sisi miring × panjang tenda) = 2 × (2,0 m × 4,0 m) = 16,0 m².',
        'Total luas terpal yang dibutuhkan = 3,84 m² + 16,0 m² = 19,84 m².',
        'Total biaya = 19,84 m² × Rp35.000 = Rp694.400.',
      ],
      finalAnswerText: 'B (Rp694.400)',
      rubric: 'Menjawab B bernilai 1. Pilihan lain bernilai 0.',
    },
  },
  {
    id: 8,
    indicatorCode: '2.6',
    indicatorTitle: 'Menyelesaikan masalah kontekstual perubahan volume tabung dan penambahan tinggi air',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pg',
    title: 'Kenaikan Permukaan Air Akibat Pencelupan Benda Padat',
    stimulusTitle: 'Uji Coba Laboratorium Fisika: Pengukuran Volume Tak Beraturan',
    stimulusText:
      'Siswa kelas 8 sedang melakukan eksperimen hukum Archimedes dan pengukuran volume benda tak beraturan di laboratorium IPA. Sebuah bejana kaca silinder (tabung) tegak dengan jari-jari penampang dalam 10 cm berisi air murni hingga setengah kapasitasnya. Siswa kemudian memasukkan sebuah bola logam pejal berbahan kuningan dengan jari-jari r_bola = 6 cm ke dalam bejana kaca hingga bola tenggelam seluruhnya di dasar wadah tanpa ada air yang tumpah keluar. Gunakan nilai π yang sama pada kedua rumus volume.',
    svgType: 'tabung_tandon',
    prompt:
      'Berapakah pertambahan ketinggian (naiknya) permukaan air di dalam bejana silinder tersebut setelah bola logam tenggelam sempurna?',
    options: [
      { key: 'A', text: '2,44 cm' },
      { key: 'B', text: '2,88 cm' },
      { key: 'C', text: '3,20 cm' },
      { key: 'D', text: '3,84 cm' },
    ],
    correctAnswers: ['B'],
    solution: {
      formulaUsed: 'Volume air yang naik = Volume bola logam → π × (r_tabung)² × Δt = (4/3) × π × (r_bola)³',
      stepByStep: [
        'Diketahui: r_tabung = 10 cm, r_bola = 6 cm.',
        'Volume bola = (4/3) × π × 6³ = (4/3) × π × 216 = 288π cm³.',
        'Pertambahan volume pada tabung silinder = π × (r_tabung)² × Δt = π × 10² × Δt = 100π × Δt.',
        'Persamaan: 100π × Δt = 288π → 100 × Δt = 288 → Δt = 288 / 100 = 2,88 cm.',
      ],
      finalAnswerText: 'B (2,88 cm)',
      rubric: 'Menjawab B bernilai 1. Pilihan lain bernilai 0.',
    },
  },

  // ==========================================
  // BAGIAN 2: PILIHAN GANDA KOMPLEKS (8 SOAL)
  // Jawaban lebih dari satu benar, 4 pernyataan
  // ==========================================
  {
    id: 9,
    indicatorCode: '2.1',
    indicatorTitle: 'Menganalisis jaring-jaring kubus dan posisi sisi berhadapan',
    subElement: 'Bangun Ruang',
    level: 'pemahaman',
    type: 'pgk',
    title: 'Karakteristik Pola Jaring-jaring Kubus Dadu',
    stimulusTitle: 'Rancangan Dadu Edukasi Matematika untuk Anak Berkebutuhan Khusus',
    stimulusText:
      'Pendidik inklusi merancang media pembelajaran dadu berukuran besar dengan panjang rusuk 10 cm. Pada dadu standar, jumlah titik (pips) pada dua sisi yang saling berhadapan selalu berjumlah 7 (1 berhadapan dengan 6, 2 berhadapan dengan 5, dan 3 berhadapan dengan 4). Untuk mencetak dadu tersebut secara presisi dari pola lembaran plastik polipropilen, tim perancang menyusun beberapa pola jaring-jaring kubus yang valid. Mereka perlu memastikan bahwa setiap pola dapat dilipat membentuk kubus yang simetris tanpa rusuk yang bertabrakan.',
    svgType: 'jaring_balok',
    prompt:
      'Manakah dari pernyataan-pernyataan berikut yang BENAR mengenai jaring-jaring kubus? (Pilihlah semua pernyataan yang benar, lebih dari satu)',
    options: [
      { key: 'A', text: 'Terdapat tepat 11 variasi pola jaring-jaring kubus yang berbeda bentuk susunannya.' },
      { key: 'B', text: 'Jaring-jaring kubus selalu terdiri dari 6 buah bujur sangkar (persegi) yang kongruen.' },
      { key: 'C', text: 'Suatu pola jaring-jaring kubus dapat memuat 5 persegi yang tersusun dalam satu baris lurus.' },
      { key: 'D', text: 'Pada kubus yang terbentuk, setiap titik sudut merupakan pertemuan dari tepat 3 buah rusuk.' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    solution: {
      formulaUsed: 'Teorema jaring-jaring kubus dan karakteristik geometri kubus',
      stepByStep: [
        'Pernyataan A: Benar. Secara matematis ada tepat 11 jaring-jaring kubus unik (pola 1-4-1 ada 6 buah, pola 2-3-1 ada 3 buah, pola 2-2-2 ada 1 buah, dan pola 3-3 ada 1 buah).',
        'Pernyataan B: Benar. Kubus tersusun atas 6 sisi persegi yang kongruen sempurna.',
        'Pernyataan C: Salah. Susunan 5 persegi dalam satu baris tidak bisa dilipat menjadi kubus karena akan terjadi penumpukan sisi dan kehilangan sisi penutup samping.',
        'Pernyataan D: Benar. Setiap titik sudut kubus merupakan pertemuan tepat 3 rusuk.',
      ],
      finalAnswerText: 'A, B, dan D',
      rubric: 'Jawaban benar adalah A, B, dan D. Memilih seluruh jawaban benar bernilai penuh.',
    },
  },
  {
    id: 10,
    indicatorCode: '2.2',
    indicatorTitle: 'Menganalisis luas permukaan prisma segitiga dan limas segiempat',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pgk',
    title: 'Perhitungan Luas Kemasan Cokelat Prisma dan Limas Souvenir',
    stimulusTitle: 'Diversifikasi Desain Kemasan Industri Cokelat Lokal',
    stimulusText:
      'Perusahaan artisan cokelat "Nusantara Cacao" meluncurkan lini produk premium dengan dua bentuk kemasan unik: Kemasan A berbentuk prisma segitiga siku-siku (alas segitiga memiliki sisi siku-siku 6 cm dan 8 cm, hipotenusa 10 cm, dengan tinggi prisma 15 cm) dan Kemasan B berbentuk limas persegi beraturan (panjang rusuk alas 10 cm dengan tinggi segitiga sisi tegak 13 cm). Bagian litografi kemasan memerlukan data luas karton bersih agar kalkulasi pelapisan foil emas berlangsung ekonomis.',
    svgType: 'jaring_prisma_segitiga',
    prompt:
      'Berdasarkan data ukuran kemasan tersebut, tentukan kebenaran pernyataan-pernyataan berikut! (Pilihlah semua pernyataan yang BENAR)',
    options: [
      { key: 'A', text: 'Luas alas kemasan A berbentuk segitiga siku-siku adalah 24 cm².' },
      { key: 'B', text: 'Luas seluruh permukaan kemasan A adalah 408 cm².' },
      { key: 'C', text: 'Luas seluruh sisi tegak kemasan B berbentuk limas adalah 260 cm².' },
      { key: 'D', text: 'Luas total permukaan kemasan B lebih kecil daripada luas total permukaan kemasan A.' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    solution: {
      formulaUsed: 'L_prisma = 2 × L_alas + Keliling_alas × t; L_limas = L_alas + 4 × L_segitiga_tegak',
      stepByStep: [
        'Kemasan A: Alas segitiga siku-siku: L_alas = (1/2) × 6 × 8 = 24 cm² (Pernyataan A BENAR). Keliling alas = 6 + 8 + 10 = 24 cm. Luas permukaan A = 2 × 24 + 24 × 15 = 48 + 360 = 408 cm² (Pernyataan B BENAR).',
        'Kemasan B: Alas persegi = 10 × 10 = 100 cm². Luas 4 sisi tegak segitiga = 4 × (1/2 × 10 × 13) = 4 × 65 = 260 cm² (Pernyataan C BENAR). Luas total B = 100 + 260 = 360 cm².',
        'Pernyataan D: Luas B (360 cm²) memang lebih kecil daripada luas A (408 cm²). Maka D juga BENAR.',
      ],
      finalAnswerText: 'A, B, C, dan D (Semua benar, verifikasi D: 360 < 408)',
      rubric: 'Pilihan A, B, C, dan D semuanya benar secara matematis.',
    },
  },
  {
    id: 11,
    indicatorCode: '2.3',
    indicatorTitle: 'Menganalisis perbandingan volume dua buah kubus atau balok',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pgk',
    title: 'Hubungan Perubahan Panjang Rusuk Terhadap Volume Kubus',
    stimulusTitle: 'Pencetakan Blok Es Balok di Pabrik Pengolahan Hasil Laut',
    stimulusText:
      'Sebuah pabrik es batu di pelabuhan perikanan memproduksi balok es kubus padat untuk menjaga kesegaran tangkapan ikan nelayan. Pada lini produksi reguler, dihasilkan kubus es kecil bernama "Tipe Alpha" dengan panjang rusuk 10 cm. Menjelang musim panen ikan tuna, manajemen menambahkan lini produksi "Tipe Beta" dengan memperbesar panjang rusuk kubus menjadi 20 cm (dua kali panjang rusuk semula). Operator pabrik perlu memproyeksikan konsumsi air dan beban energi pembekuan.',
    svgType: 'kubus_balok',
    prompt:
      'Manakah pernyataan berikut yang BENAR mengenai perbandingan fisik antara es kubus Tipe Alpha dan Tipe Beta? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Volume es kubus Tipe Alpha adalah 1.000 cm³.' },
      { key: 'B', text: 'Volume es kubus Tipe Beta adalah 8.000 cm³.' },
      { key: 'C', text: 'Jika rusuk kubus diperbesar 2 kali lipat, maka volumenya meningkat menjadi 8 kali lipat volume semula.' },
      { key: 'D', text: 'Luas permukaan kubus Tipe Beta adalah 4 kali luas permukaan kubus Tipe Alpha.' },
    ],
    correctAnswers: ['A', 'B', 'C', 'D'],
    solution: {
      formulaUsed: 'V = s³, Luas = 6s², Faktor skala k → V baru = k³ × V lama, L baru = k² × L lama',
      stepByStep: [
        'V_Alpha = 10³ = 1.000 cm³ (A Benar).',
        'V_Beta = 20³ = 8.000 cm³ (B Benar).',
        'Faktor pembesaran rusuk k = 2 → Perbandingan volume = 2³ = 8 kali lipat (C Benar).',
        'Perbandingan luas permukaan = 2² = 4 kali lipat (L_Alpha = 6 × 100 = 600 cm², L_Beta = 6 × 400 = 2.400 cm² = 4 × 600) (D Benar).',
      ],
      finalAnswerText: 'A, B, C, dan D',
      rubric: 'Semua pilihan A, B, C, dan D bernilai benar.',
    },
  },
  {
    id: 12,
    indicatorCode: '2.4',
    indicatorTitle: 'Menganalisis luas selimut dan luas permukaan tabung tanpa tutup',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'pgk',
    title: 'Kebutuhan Cat Lapisan Anti-Karat Pipa Silinder Terbuka',
    stimulusTitle: 'Pengecatan Pipa Penyalur Limbah Industri Ramah Lingkungan',
    stimulusText:
      'Dinas Lingkungan Hidup mengawasi proyek pemasangan pipa saluran drainase primer berbentuk silinder pipa terbuka (tanpa alas dan tanpa tutup) dengan diameter dalam 1,4 meter (jari-jari r = 0,7 m = 70 cm) dan panjang pipa 10 meter. Pipa tersebut harus dicat pelapis epoksi anti-korosi pada bagian luar selimutnya. Satu kaleng cat khusus dapat menutup bidang selimut seluas 11 m². Gunakan nilai pendekatan π = 22/7.',
    svgType: 'tabung_tandon',
    prompt:
      'Manakah pernyataan berikut yang BENAR terkait luas selimut silinder dan kebutuhan cat pipa tersebut? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Keliling penampang lingkaran pipa tersebut adalah 4,4 meter.' },
      { key: 'B', text: 'Luas selimut luar satu pipa sepanjang 10 meter tersebut adalah 44 m².' },
      { key: 'C', text: 'Dibutuhkan tepat 4 kaleng cat epoksi untuk mengecat selimut luar satu unit pipa tersebut.' },
      { key: 'D', text: 'Jika pipa memiliki tutup di kedua ujungnya, luas permukaannya bertambah sebesar 3,08 m².' },
    ],
    correctAnswers: ['A', 'B', 'C', 'D'],
    solution: {
      formulaUsed: 'K = 2πr = πd; L_selimut = 2πrt; L_2lingkaran = 2 × π × r²',
      stepByStep: [
        'Keliling penampang K = π × d = (22/7) × 1,4 = 4,4 meter (A Benar).',
        'Luas selimut = Keliling × t = 4,4 × 10 = 44 m² (B Benar).',
        'Kebutuhan cat = 44 m² / 11 m² per kaleng = 4 kaleng cat (C Benar).',
        'Luas 2 tutup lingkaran = 2 × (22/7) × 0,7 × 0,7 = 2 × 1,54 = 3,08 m² (D Benar).',
      ],
      finalAnswerText: 'A, B, C, dan D',
      rubric: 'Semua pilihan A, B, C, D bernilai benar.',
    },
  },
  {
    id: 13,
    indicatorCode: '2.5',
    indicatorTitle: 'Menganalisis volume bangun ruang gabungan (tabung dan kerucut)',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pgk',
    title: 'Kapasitas Penyimpanan Gabah pada Silo Modern',
    stimulusTitle: 'Optimalisasi Cadangan Pangan Gabah Kering Koperasi Tani',
    stimulusText:
      'Koperasi Lumbung Tani Mandiri membangun silo penyimpanan gabah kering untuk antisipasi musim paceklik. Silo terdiri atas dua bagian bangun ruang terpadu: bagian bawah berupa tabung silinder tegak dengan jari-jari r = 7 m dan tinggi 10 m, sedangkan bagian atap kubah berupa kerucut dengan jari-jari alas yang sama (r = 7 m) dan tinggi kerucut 12 m. Gabah dimasukkan dari corong puncak kerucut dan didistribusikan secara otomatis melalui katup dasar tabung. Gunakan π = 22/7.',
    svgType: 'tabung_kerucut',
    prompt:
      'Berdasarkan rancangan struktur silo terpadu tersebut, manakah pernyataan di bawah ini yang BENAR? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Volume bagian tabung silinder adalah 1.540 m³.' },
      { key: 'B', text: 'Volume bagian atap kerucut adalah 616 m³.' },
      { key: 'C', text: 'Kapasitas daya tampung total silo gabungan tersebut adalah 2.156 m³.' },
      { key: 'D', text: 'Volume bagian kerucut lebih besar daripada setengah volume bagian tabung.' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    solution: {
      formulaUsed: 'V_tabung = π × r² × t_tabung; V_kerucut = (1/3) × π × r² × t_kerucut',
      stepByStep: [
        'V_tabung = (22/7) × 7 × 7 × 10 = 154 × 10 = 1.540 m³ (A Benar).',
        'V_kerucut = (1/3) × (22/7) × 7 × 7 × 12 = 4 × 154 = 616 m³ (B Benar).',
        'V_total = 1.540 + 616 = 2.156 m³ (C Benar).',
        'Setengah volume tabung = 1.540 / 2 = 770 m³. Karena 616 m³ < 770 m³, maka volume kerucut LEBIH KECIL dari setengah volume tabung (D Salah).',
      ],
      finalAnswerText: 'A, B, dan C',
      rubric: 'Pernyataan yang tepat adalah A, B, dan C.',
    },
  },
  {
    id: 14,
    indicatorCode: '2.5',
    indicatorTitle: 'Menganalisis perbandingan volume dan luas permukaan bangun ruang bola',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pgk',
    title: 'Karakteristik Geometris Tangki Gas Berbentuk Bola Sempurna',
    stimulusTitle: 'Desain Tangki Bertekanan Tinggi untuk Stasiun Pengisian Bahan Bakar Gas',
    stimulusText:
      'Insinyur energi memilih bentuk bola sempurna untuk tangki penyimpanan bahan bakar gas cair (LPG) bertekanan tinggi di kawasan pelabuhan industri. Bentuk bola dipilih karena memiliki luas permukaan paling minimum untuk volume tertentu dan mampu mendistribusikan tekanan fluida secara seragam ke segala arah tanpa titik konsentrasi tegangan (stress point). Sebuah tangki bola prototipe memiliki diameter 42 dm (sehingga jari-jari r = 21 dm). Gunakan nilai pendekatan π = 22/7.',
    svgType: 'bola_tangki',
    prompt:
      'Manakah pernyataan berikut yang BENAR mengenai sifat geometris tangki gas berbentuk bola tersebut? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Luas seluruh permukaan kulit bola tangki adalah 5.544 dm².' },
      { key: 'B', text: 'Volume kapasitas gas maksimum dalam tangki bola tersebut adalah 38.808 dm³ (liter).' },
      { key: 'C', text: 'Jika jari-jari bola diperbesar menjadi 2 kali lipat, maka luas permukaannya meningkat menjadi 4 kali lipat.' },
      { key: 'D', text: 'Bangun ruang bola memiliki 1 buah sisi lengkung dan tidak memiliki rusuk maupun titik sudut.' },
    ],
    correctAnswers: ['A', 'B', 'C', 'D'],
    solution: {
      formulaUsed: 'L_bola = 4πr²; V_bola = (4/3)πr³; Unsur bola: 1 sisi lengkung, 0 rusuk, 0 titik sudut',
      stepByStep: [
        'r = 21 dm, π = 22/7.',
        'L_bola = 4 × (22/7) × 21 × 21 = 4 × 22 × 3 × 21 = 88 × 63 = 5.544 dm² (A Benar).',
        'V_bola = (4/3) × (22/7) × 21 × 21 × 21 = 4 × 22 × 21 × 21 = 88 × 441 = 38.808 dm³ (B Benar).',
        'Faktor skala k = 2 → Luas bertambah k² = 4 kali lipat (C Benar).',
        'Karakteristik bola: memiliki 1 bidang lengkung, 0 rusuk, 0 titik sudut (D Benar).',
      ],
      finalAnswerText: 'A, B, C, dan D',
      rubric: 'Semua pernyataan A, B, C, dan D bernilai benar.',
    },
  },
  {
    id: 15,
    indicatorCode: '2.6',
    indicatorTitle: 'Menyelesaikan masalah kontekstual optimasi kardus karton dan kemasan',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pgk',
    title: 'Penataan Kotak Suvenir ke Dalam Kardus Master Pengiriman',
    stimulusTitle: 'Efisiensi Logistik Distribusi Barang Ekspor Kerajinan Tangan',
    stimulusText:
      'Perusahaan logistik ekspor mengirimkan kotak suvenir berukuran panjang 10 cm, lebar 8 cm, dan tinggi 5 cm. Kotak-kotak kecil ini disusun rapi tanpa rongga kosong ke dalam kardus master pengiriman berbentuk balok besar berukuran bagian dalam panjang 60 cm, lebar 40 cm, dan tinggi 30 cm. Untuk menjaga integritas produk selama pelayaran kapal kontainer, berat total kardus beserta isinya dibatasi dan kardus harus terisi penuh sempurna.',
    svgType: 'kubus_balok',
    prompt:
      'Manakah pernyataan berikut yang BENAR mengenai penataan kotak suvenir di dalam kardus master tersebut? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Volume satu buah kotak suvenir kecil adalah 400 cm³.' },
      { key: 'B', text: 'Volume bagian dalam kardus master pengiriman adalah 72.000 cm³.' },
      { key: 'C', text: 'Jumlah maksimum kotak suvenir kecil yang dapat dimasukkan secara utuh adalah 180 buah.' },
      { key: 'D', text: 'Kardus master dapat memuat tepat 200 buah kotak suvenir jika disusun menyamping.' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    solution: {
      formulaUsed: 'V_kecil = p × l × t; V_besar = P × L × T; Jumlah = (P/p) × (L/l) × (T/t)',
      stepByStep: [
        'V_kecil = 10 × 8 × 5 = 400 cm³ (A Benar).',
        'V_besar = 60 × 40 × 30 = 72.000 cm³ (B Benar).',
        'Penataan teratur: arah panjang: 60 / 10 = 6 buah; arah lebar: 40 / 8 = 5 buah; arah tinggi: 30 / 5 = 6 buah.',
        'Jumlah kotak = 6 × 5 × 6 = 180 buah (C Benar).',
        'Karena volume total 72.000 / 400 = 180 buah, tidak mungkin memuat 200 buah karena akan melebihi volume total kardus (D Salah).',
      ],
      finalAnswerText: 'A, B, dan C',
      rubric: 'Pernyataan yang benar adalah A, B, dan C.',
    },
  },
  {
    id: 16,
    indicatorCode: '2.6',
    indicatorTitle: 'Menyelesaikan masalah kontekstual biaya pengecatan kubah setengah bola dan gedung tabung',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'pgk',
    title: 'Renovasi Pengecatan Kubah Gedung Pertemuan Komunitas',
    stimulusTitle: 'Pemugaran Balai Warga Budaya: Revitalisasi Arsitektur Tropis',
    stimulusText:
      'Pemerintah daerah mengalokasikan anggaran perbaikan untuk mengecat ulang atap kubah gedung serbaguna balai pertemuan pemuda. Bangunan tersebut memiliki atap berbentuk setengah bola (hemisfer) terbuka bagian bawahnya dengan jari-jari r = 7 meter. Bagian luar kubah akan dicat dengan cat pelindung cuaca premium berdaya tahan panas tinggi. Biaya pengerjaan cat (termasuk upah tenaga kerja dan perancah scaffolding) dipatok Rp25.000 per meter persegi. Gunakan nilai pendekatan π = 22/7.',
    svgType: 'kubah_setengah_bola',
    prompt:
      'Manakah pernyataan berikut yang BENAR mengenai pengerjaan proyek pengecatan atap kubah setengah bola tersebut? (Pilihlah semua yang benar)',
    options: [
      { key: 'A', text: 'Rumus luas permukaan luar kubah setengah bola tanpa alas adalah 2 × π × r².' },
      { key: 'B', text: 'Luas permukaan luar kubah yang harus dicat adalah 308 m².' },
      { key: 'C', text: 'Total estimasi biaya pengerjaan pengecatan kubah tersebut adalah Rp7.700.000.' },
      { key: 'D', text: 'Jika diameter kubah diperbesar 2 kali lipat, luas kubah yang harus dicat menjadi 616 m².' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    solution: {
      formulaUsed: 'L_kubah_setengah_bola_terbuka = 2πr²; Total Biaya = L × Biaya/m²',
      stepByStep: [
        'Kubah terbuka (tanpa alas penutup) memiliki luas selimut setengah bola = (1/2) × 4πr² = 2πr² (A Benar).',
        'r = 7 m, π = 22/7 → L = 2 × (22/7) × 7 × 7 = 2 × 154 = 308 m² (B Benar).',
        'Total biaya = 308 m² × Rp25.000 = Rp7.700.000 (C Benar).',
        'Jika diameter/jari-jari diperbesar 2 kali lipat, luasnya menjadi 2² = 4 kali lipat semula (4 × 308 = 1.232 m², bukan 616 m²) (D Salah).',
      ],
      finalAnswerText: 'A, B, dan C',
      rubric: 'Pernyataan A, B, dan C bernilai benar.',
    },
  },

  // ==========================================
  // BAGIAN 3: BENAR - SALAH (4 SOAL)
  // Setiap soal memiliki 3 pernyataan (True/False)
  // ==========================================
  {
    id: 17,
    indicatorCode: '2.1',
    indicatorTitle: 'Menelaah unsur dan sifat jaring-jaring bangun ruang prisma dan balok',
    subElement: 'Bangun Ruang',
    level: 'pemahaman',
    type: 'bs',
    title: 'Verifikasi Pernyataan Karakteristik Jaring-Jaring Bangun Ruang',
    stimulusTitle: 'Lokakarya Geometri Ruang Berbasis Pendekatan STEM',
    stimulusText:
      'Pada lokakarya pembelajaran sains dan geometri SMP, guru mendemonstrasikan pembongkaran model bangun ruang padat transparan menjadi lembaran datar jaring-jaring. Peserta didik diminta menganalisis relasi antara jumlah sisi, rusuk, titik sudut, serta hubungan sisi alas dan tutup pada prisma segitiga, balok, dan limas segiempat. Pemahaman ini krusial sebelum mereka memprogram mesin pemotong laser (laser cutting) untuk pembuatan prototipe arsitektur.',
    svgType: 'jaring_prisma_segitiga',
    prompt:
      'Tentukan apakah setiap pernyataan berikut bernilai BENAR atau SALAH berdasarkan konsep jaring-jaring dan karakteristik bangun ruang!',
    statements: [
      {
        id: 's1',
        text: 'Jaring-jaring prisma segitiga terdiri dari 2 buah segitiga yang kongruen dan 3 buah persegipanjang.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Sebuah balok memiliki 12 rusuk dengan panjang yang semuanya selalu sama persis.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Limas segiempat beraturan memiliki 4 bidang sisi tegak yang berbentuk segitiga sama kaki.',
        correctAnswer: true,
      },
    ],
    correctAnswers: ['true', 'false', 'true'],
    solution: {
      formulaUsed: 'Karakteristik bidang sisi pembentuk prisma segitiga, balok, dan limas',
      stepByStep: [
        'Pernyataan 1: BENAR. Prisma segitiga memiliki 2 alas segitiga yang kongruen dan sejajar, serta 3 sisi tegak persegipanjang.',
        'Pernyataan 2: SALAH. Balok memiliki 12 rusuk, tetapi terbagi dalam 3 kelompok ukuran (4 panjang, 4 lebar, 4 tinggi) yang tidak selalu sama persis (jika semuanya sama persis, bangun tersebut adalah kubus).',
        'Pernyataan 3: BENAR. Limas segiempat beraturan memiliki alas persegi dan 4 sisi tegak segitiga sama kaki yang saling kongruen.',
      ],
      finalAnswerText: '1: Benar, 2: Salah, 3: Benar',
      rubric: 'Setiap butir dinilai objektif.',
    },
  },
  {
    id: 18,
    indicatorCode: '2.2',
    indicatorTitle: 'Menghitung dan membandingkan luas permukaan kubus dan balok',
    subElement: 'Bangun Ruang',
    level: 'aplikasi',
    type: 'bs',
    title: 'Validasi Komputasi Luas Permukaan Bangun Ruang Sisi Datar',
    stimulusTitle: 'Uji Kelayakan Desain Wadah Logam Tempat Penyimpanan Alat Bedah',
    stimulusText:
      'Pabrik instrumen medis memproduksi dua varian kotak sterilisasi berbahan baja nirkarat. Kotak Medis A berbentuk kubus dengan panjang rusuk 15 cm. Kotak Medis B berbentuk balok dengan panjang 20 cm, lebar 10 cm, dan tinggi 10 cm. Bagian quality control melakukan audit luas permukaan untuk memastikan waktu pemanasan sinar ultraviolet berlangsung efisien dan merata.',
    svgType: 'kubus_balok',
    prompt:
      'Tentukan nilai kebenaran (BENAR atau SALAH) dari setiap pernyataan kalkulasi luas permukaan berikut!',
    statements: [
      {
        id: 's1',
        text: 'Luas permukaan Kotak Medis A (kubus rusuk 15 cm) adalah 1.350 cm².',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Luas permukaan Kotak Medis B (balok 20 × 10 × 10 cm) adalah 1.000 cm².',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Luas permukaan Kotak Medis A lebih kecil daripada luas permukaan Kotak Medis B.',
        correctAnswer: false,
      },
    ],
    correctAnswers: ['true', 'true', 'false'],
    solution: {
      formulaUsed: 'L_kubus = 6s²; L_balok = 2(pl + pt + lt)',
      stepByStep: [
        'Pernyataan 1: L_A = 6 × 15² = 6 × 225 = 1.350 cm² (BENAR).',
        'Pernyataan 2: L_B = 2 × (20×10 + 20×10 + 10×10) = 2 × (200 + 200 + 100) = 2 × 500 = 1.000 cm² (BENAR).',
        'Pernyataan 3: Luas A (1.350 cm²) lebih BESAR dari luas B (1.000 cm²). Maka pernyataan bahwa Luas A lebih kecil adalah SALAH.',
      ],
      finalAnswerText: '1: Benar, 2: Benar, 3: Salah',
      rubric: 'Setiap butir dinilai objektif.',
    },
  },
  {
    id: 19,
    indicatorCode: '2.5',
    indicatorTitle: 'Menilai relasi volume tabung, kerucut, dan bola dengan jari-jari sama',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'bs',
    title: 'Relasi Volume Archimedes Antara Tabung, Kerucut, dan Bola',
    stimulusTitle: 'Kajian Klasik Teorema Archimedes Mengenai Bangun Sisi Lengkung',
    stimulusText:
      'Dalam sejarah matematika, Archimedes merasa paling bangga atas penemuannya mengenai perbandingan rasio volume antara kerucut, bola, dan tabung silinder yang memiliki jari-jari alas sama (r) dan tinggi sama (t = 2r, di mana tinggi tabung dan kerucut sama dengan diameter bola). Gambar bola di dalam silinder bahkan dipahat pada batu nisannya. Siswa kelas 8 mengkaji teorema ini menggunakan peraga cairan berwarna untuk memverifikasi rasio volume ketiga bangun tersebut.',
    svgType: 'bola_tangki',
    prompt:
      'Berdasarkan kondisi di mana jari-jari ketiga bangun sama (r) dan tinggi tabung serta kerucut sama dengan diameter bola (t = 2r), tentukan BENAR atau SALAH pernyataan berikut!',
    statements: [
      {
        id: 's1',
        text: 'Volume kerucut dengan t = 2r bernilai tepat sepertiga dari volume tabung dengan ukuran yang sama.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Volume bola pejal berjari-jari r sama dengan dua pertiga (2/3) dari volume tabung dengan jari-jari r dan tinggi 2r.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Perbandingan rasio Volume Kerucut : Volume Bola : Volume Tabung adalah 1 : 3 : 2.',
        correctAnswer: false,
      },
    ],
    correctAnswers: ['true', 'true', 'false'],
    solution: {
      formulaUsed: 'V_kerucut = (1/3)πr²(2r) = (2/3)πr³; V_bola = (4/3)πr³; V_tabung = πr²(2r) = 2πr³ = (6/3)πr³',
      stepByStep: [
        'Pernyataan 1: BENAR. Untuk t yang sama, V_kerucut = (1/3) × V_tabung.',
        'Pernyataan 2: BENAR. V_bola = (4/3)πr³, V_tabung = 2πr³ = (6/3)πr³. Rasio V_bola / V_tabung = (4/3) / 2 = 2/3.',
        'Pernyataan 3: SALAH. Rasio sesungguhnya adalah V_kerucut : V_bola : V_tabung = (2/3) : (4/3) : (6/3) = 1 : 2 : 3 (bukan 1 : 3 : 2).',
      ],
      finalAnswerText: '1: Benar, 2: Benar, 3: Salah',
      rubric: 'Setiap butir dinilai secara independen.',
    },
  },
  {
    id: 20,
    indicatorCode: '2.6',
    indicatorTitle: 'Menyelesaikan masalah kontekstual kapasitas wadah es krim kerucut dan setengah bola',
    subElement: 'Bangun Ruang',
    level: 'penalaran',
    type: 'bs',
    title: 'Analisis Porsi Penyajian Es Krim Kerucut Wafel',
    stimulusTitle: 'Desain Menu Kafe Gelato: Kombinasi Kerucut Wafel dan Scoop Es Krim',
    stimulusText:
      'Sebuah gerai gelato populer di Bandung menyajikan es krim wafel berbentuk kerucut dengan diameter bibir atas 6 cm (jari-jari r = 3 cm) dan kedalaman wafel 12 cm. Di atas wadah wafel kerucut diletakkan satu sekop (scoop) es krim berbentuk setengah bola sempurna yang menutupi pas bibir kerucut dengan jari-jari r = 3 cm yang sama. Manajer operasional menghitung volume total lelehan es krim untuk menghindari tumpahan pada baki pelanggan. Gunakan nilai pendekatan π = 3,14.',
    svgType: 'tabung_kerucut',
    prompt:
      'Tentukan nilai kebenaran (BENAR atau SALAH) dari setiap pernyataan kalkulasi penyajian es krim berikut!',
    statements: [
      {
        id: 's1',
        text: 'Volume es krim yang mengisi ruang dalam wafel kerucut adalah 113,04 cm³.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Volume satu sekop es krim setengah bola di atas wafel adalah 56,52 cm³.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Volume total seluruh es krim pada wafel kerucut dan scoop setengah bola tersebut melebihi 200 cm³.',
        correctAnswer: false,
      },
    ],
    correctAnswers: ['true', 'true', 'false'],
    solution: {
      formulaUsed: 'V_kerucut = (1/3)πr²t; V_setengah_bola = (2/3)πr³; V_total = V_kerucut + V_setengah_bola',
      stepByStep: [
        'r = 3 cm, t = 12 cm, π = 3,14.',
        'Pernyataan 1: V_kerucut = (1/3) × 3,14 × 3² × 12 = 3,14 × 9 × 4 = 36 × 3,14 = 113,04 cm³ (BENAR).',
        'Pernyataan 2: V_setengah_bola = (2/3) × 3,14 × 3³ = (2/3) × 3,14 × 27 = 18 × 3,14 = 56,52 cm³ (BENAR).',
        'Pernyataan 3: V_total = 113,04 + 56,52 = 169,56 cm³. Karena 169,56 cm³ < 200 cm³, maka pernyataan bahwa volume total melebihi 200 cm³ adalah SALAH.',
      ],
      finalAnswerText: '1: Benar, 2: Benar, 3: Salah',
      rubric: 'Setiap butir dinilai secara independen.',
    },
  },
];
