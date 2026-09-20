import { ExamResult, StudentUser } from '../types';

export const LOCAL_STORAGE_KEY_SCRIPT_URL = 'cbt_anbk_script_url';
export const LOCAL_STORAGE_KEY_STUDENTS = 'cbt_anbk_students';
export const LOCAL_STORAGE_KEY_RESULTS = 'cbt_anbk_results';
export const LOCAL_STORAGE_KEY_CURRENT_TOKEN = 'cbt_anbk_active_token';

export const DEFAULT_ACTIVE_TOKEN = 'ANBK26';

export const APPS_SCRIPT_TEMPLATE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: BACKEND DATABASE CBT ANBK KELAS 8 FASE D
 * =========================================================================
 * Hubungkan Spreadsheet dengan Aplikasi CBT ANBK:
 * 1. Buka Google Spreadsheet baru (misal beri judul: "Database CBT ANBK SMP").
 * 2. Klik menu Ekstensi > Apps Script.
 * 3. Hapus seluruh isi default pada Code.gs, lalu paste seluruh script ini.
 * 4. Klik tombol "Simpan" (ikon disket).
 * 5. Klik tombol "Terapkan" (Deploy) > "Deployment baru" (New deployment).
 * 6. Pilih Jenis: "Aplikasi Web" (Web app).
 * 7. Konfigurasi:
 *    - Deskripsi: CBT ANBK Database Backend
 *    - Jalankan sebagai (Execute as): Saya (email Anda)
 *    - Yang memiliki akses (Who has access): Siapa saja (Anyone) -> [SANGAT PENTING!]
 * 8. Klik "Terapkan", berikan izin akses Google, lalu SALIN URL Aplikasi Web
 *    (berakhiran /exec) dan tempelkan ke menu Pengaturan di aplikasi CBT.
 * =========================================================================
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'ping';
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Indikator Uji Koneksi (Ping)
  if (action === 'ping') {
    return createJsonResponse({
      status: 'success',
      connected: true,
      message: 'Koneksi ke Google Spreadsheet CBT ANBK Aktif & Siap Digunakan!',
      timestamp: new Date().toISOString(),
      spreadsheetName: ss.getName()
    });
  }

  // 2. Tarik Data Siswa dari Sheet "UserLogin"
  if (action === 'getUsers') {
    var sheet = getOrCreateSheet(ss, 'UserLogin', [
      'Username', 'Password', 'NamaLengkap', 'Kelas', 'TokenAktif', 'StatusUjian'
    ]);
    var data = sheet.getDataRange().getValues();
    var users = [];
    // baris 0 adalah header
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        users.push({
          username: String(data[i][0]),
          password: String(data[i][1]),
          nama: String(data[i][2]),
          kelas: String(data[i][3]),
          token: String(data[i][4]),
          statusUjian: String(data[i][5] || 'Belum Ujian')
        });
      }
    }
    return createJsonResponse({
      status: 'success',
      total: users.length,
      users: users
    });
  }

  // 3. Tarik Data Token Siswa dari Sheet "DataSiswaToken"
  if (action === 'getTokens') {
    var sheet = getOrCreateSheet(ss, 'DataSiswaToken', [
      'KodeSiswa', 'NamaPeserta', 'Kelas', 'Token', 'WaktuGenerate'
    ]);
    var data = sheet.getDataRange().getValues();
    var list = [];
    for (var j = 1; j < data.length; j++) {
      if (data[j][0]) {
        list.push({
          kodeSiswa: String(data[j][0]),
          namaPeserta: String(data[j][1]),
          kelas: String(data[j][2]),
          token: String(data[j][3]),
          waktuGenerate: String(data[j][4])
        });
      }
    }
    return createJsonResponse({
      status: 'success',
      total: list.length,
      data: list
    });
  }

  return createJsonResponse({ status: 'error', message: 'Aksi tidak dikenali' });
}

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : '{}';
    var payload = JSON.parse(contents);
    var action = payload.action || 'submitJawaban';
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // AKSI 1: Simpan Jawaban Ujian Siswa (Sheet "JawabanUjian")
    if (action === 'submitJawaban') {
      var sheetJawaban = getOrCreateSheet(ss, 'JawabanUjian', [
        'Timestamp', 'KodeSiswa', 'NamaPeserta', 'Kelas', 'Token',
        'DurasiPengerjaan', 'JumlahBenar', 'SkorAkhir', 'LevelPemahaman',
        'LevelAplikasi', 'LevelPenalaran', 'DetailJawaban1_20'
      ]);

      var rowData = [
        payload.timestamp || new Date().toLocaleString('id-ID'),
        payload.kodeSiswa || '-',
        payload.nama || '-',
        payload.kelas || '-',
        payload.token || '-',
        payload.durasiPengerjaan || '-',
        payload.jumlahBenar || 0,
        payload.skorAkhir || 0,
        payload.skorPemahaman || 0,
        payload.skorAplikasi || 0,
        payload.skorPenalaran || 0,
        payload.detailJawabanJson ? JSON.stringify(payload.detailJawabanJson) : (payload.detailJawabanRingkas || '-')
      ];

      sheetJawaban.appendRow(rowData);

      // Otomatis update status siswa di sheet "UserLogin" menjadi "Selesai"
      updateUserStatus(ss, payload.kodeSiswa, 'Selesai');

      return createJsonResponse({
        status: 'success',
        message: 'Hasil ujian ' + payload.nama + ' berhasil tersimpan di sheet JawabanUjian!',
        skor: payload.skorAkhir
      });
    }

    // AKSI 2: Simpan Data Siswa & Token (Sheet "DataSiswaToken")
    if (action === 'saveStudentToken') {
      var sheetToken = getOrCreateSheet(ss, 'DataSiswaToken', [
        'KodeSiswa', 'NamaPeserta', 'Kelas', 'Token', 'WaktuGenerate'
      ]);

      sheetToken.appendRow([
        payload.kodeSiswa || payload.username || '-',
        payload.namaPeserta || payload.nama || '-',
        payload.kelas || '-',
        payload.token || '-',
        new Date().toLocaleString('id-ID')
      ]);

      return createJsonResponse({
        status: 'success',
        message: 'Data siswa dan token ' + payload.namaPeserta + ' berhasil dicatat di sheet DataSiswaToken!'
      });
    }

    // AKSI 3: Simpan Isian Google AI (Nama Peserta, Kelas, dll ke Sheet "DataGoogleAI")
    if (action === 'saveDataGoogleAI') {
      var sheetAI = getOrCreateSheet(ss, 'DataGoogleAI', [
        'Timestamp', 'KodeSiswa', 'NamaPeserta', 'Kelas', 'Token', 'PromptDanAnalisisAI'
      ]);

      sheetAI.appendRow([
        new Date().toLocaleString('id-ID'),
        payload.kodeSiswa || '-',
        payload.namaPeserta || payload.nama || '-',
        payload.kelas || '-',
        payload.token || '-',
        payload.aiContent || payload.catatan || '-'
      ]);

      return createJsonResponse({
        status: 'success',
        message: 'Data isian Google AI untuk ' + (payload.namaPeserta || payload.nama) + ' tersimpan di sheet DataGoogleAI!'
      });
    }

    return createJsonResponse({ status: 'error', message: 'Aksi POST tidak dikenali' });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: 'Gagal memproses permintaan: ' + err.toString()
    });
  }
}

// Fungsi pembantu: Buat Sheet baru lengkap dengan Header jika belum ada
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Beri gaya warna biru ANBK pada baris header
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1e3a8a');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Fungsi pembantu: Perbarui status pengerjaan siswa pada sheet UserLogin
function updateUserStatus(ss, username, status) {
  var sheet = ss.getSheetByName('UserLogin');
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() === String(username).toLowerCase()) {
      sheet.getRange(i + 1, 6).setValue(status);
      break;
    }
  }
}

// Format Respon JSON dengan Header CORS
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

export class SheetService {
  public static getScriptUrl(): string {
    return localStorage.getItem(LOCAL_STORAGE_KEY_SCRIPT_URL) || '';
  }

  public static setScriptUrl(url: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY_SCRIPT_URL, url.trim());
  }

  public static getActiveToken(): string {
    return localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_TOKEN) || DEFAULT_ACTIVE_TOKEN;
  }

  public static setActiveToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_TOKEN, token.trim().toUpperCase());
  }

  /**
   * Tes koneksi ke Google Apps Script
   */
  public static async testConnection(url?: string): Promise<{ success: boolean; message: string; timestamp?: string }> {
    const targetUrl = (url || this.getScriptUrl()).trim();
    if (!targetUrl) {
      return {
        success: false,
        message: 'URL Google Apps Script belum diisi. Silakan masukkan URL Web App yang berakhiran /exec.',
      };
    }

    try {
      const pingUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}action=ping&_t=${Date.now()}`;
      const response = await fetch(pingUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data && (data.status === 'success' || data.connected)) {
        return {
          success: true,
          message: data.message || 'Berhasil terhubung ke Google Spreadsheet!',
          timestamp: data.timestamp || new Date().toISOString(),
        };
      } else {
        return {
          success: true,
          message: 'Terhubung ke Apps Script (respon diterima).',
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Koneksi gagal atau terkendala CORS: ${error.message || 'Periksa apakah Deployment disetel ke "Anyone"'}.`,
      };
    }
  }

  /**
   * Mengambil data siswa dari Sheet "UserLogin"
   */
  public static async fetchStudentsFromSheet(): Promise<{ success: boolean; users?: StudentUser[]; message: string }> {
    const url = this.getScriptUrl();
    if (!url) {
      return {
        success: false,
        message: 'URL Apps Script belum diatur. Masuk ke Pengaturan Admin untuk memasukkan URL.',
      };
    }

    try {
      const fetchUrl = `${url}${url.includes('?') ? '&' : '?'}action=getUsers&_t=${Date.now()}`;
      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const result = await response.json();
      if (result && result.status === 'success' && Array.isArray(result.users)) {
        const mappedUsers: StudentUser[] = result.users.map((u: any, idx: number) => ({
          id: `sheet_std_${idx + 1}`,
          username: u.username,
          password: u.password,
          nama: u.nama,
          kelas: u.kelas,
          token: u.token || this.getActiveToken(),
          statusUjian: (u.statusUjian as any) || 'Belum Ujian',
        }));

        // Simpan ke localStorage agar bisa diakses langsung
        localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(mappedUsers));
        return {
          success: true,
          users: mappedUsers,
          message: `Berhasil menarik ${mappedUsers.length} data siswa dari Google Spreadsheet!`,
        };
      }
      throw new Error(result.message || 'Format data sheet tidak sesuai');
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal menarik data dari spreadsheet: ${err.message}`,
      };
    }
  }

  /**
   * Menyimpan hasil ujian ke Google Spreadsheet (Sheet "JawabanUjian")
   */
  public static async submitExamResult(result: ExamResult): Promise<{ success: boolean; message: string }> {
    // Selalu simpan di localStorage terlebih dahulu agar data aman
    this.saveResultLocally(result);

    const url = this.getScriptUrl();
    if (!url) {
      return {
        success: true,
        message: 'Tersimpan di Penyimpanan Lokal (Mode Mandiri). Masukkan URL Apps Script di Admin untuk sinkronisasi otomatis ke Google Spreadsheet.',
      };
    }

    try {
      // Ringkas jawaban untuk kemudahan pembacaan kolom spreadsheet
      const ringkasanJawaban = Object.entries(result.jawabanDetail)
        .map(([qId, ans]) => {
          let val = '-';
          if (ans.type === 'pg') val = ans.jawabanSiswa || '-';
          else if (ans.type === 'pgk') val = Array.isArray(ans.jawabanSiswa) ? ans.jawabanSiswa.join('+') : '-';
          else if (ans.type === 'bs') {
            val = Object.entries(ans.jawabanSiswa || {})
              .map(([idx, bool]) => `S${Number(idx) + 1}:${bool ? 'B' : 'S'}`)
              .join(',');
          }
          return `No${qId}:[${val}|${ans.isCorrect ? 'BENAR' : 'SALAH'}]`;
        })
        .join('; ');

      const payload = {
        action: 'submitJawaban',
        timestamp: result.waktuSelesai,
        kodeSiswa: result.kodeSiswa,
        nama: result.nama,
        kelas: result.kelas,
        token: result.token,
        durasiPengerjaan: result.durasiPengerjaan,
        jumlahBenar: result.jumlahBenar,
        skorAkhir: result.skorAkhir,
        skorPemahaman: result.skorPemahaman,
        skorAplikasi: result.skorAplikasi,
        skorPenalaran: result.skorPenalaran,
        detailJawabanRingkas: ringkasanJawaban,
      };

      // Gunakan fetch mode no-cors / cors
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      return {
        success: true,
        message: 'Jawaban ujian berhasil dikirim dan tersimpan di Google Spreadsheet (Sheet JawabanUjian)!',
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal mengirim ke Google Spreadsheet: ${err.message}. Data tetap tersimpan aman di database lokal.`,
      };
    }
  }

  /**
   * Menyimpan data siswa & token ke Google Spreadsheet (Sheet "DataSiswaToken")
   */
  public static async saveStudentTokenToSheet(student: {
    kodeSiswa: string;
    namaPeserta: string;
    kelas: string;
    token: string;
  }): Promise<{ success: boolean; message: string }> {
    const url = this.getScriptUrl();
    if (!url) {
      return {
        success: true,
        message: 'Token disimpan di lokal. Konfigurasikan URL Apps Script untuk sinkronisasi ke Spreadsheet.',
      };
    }

    try {
      const payload = {
        action: 'saveStudentToken',
        kodeSiswa: student.kodeSiswa,
        namaPeserta: student.namaPeserta,
        kelas: student.kelas,
        token: student.token,
      };

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      return {
        success: true,
        message: `Data siswa dan token untuk ${student.namaPeserta} berhasil dikirim ke Google Sheet!`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal menyimpan token ke spreadsheet: ${err.message}`,
      };
    }
  }

  public static saveResultLocally(result: ExamResult): void {
    try {
      const existing: ExamResult[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_RESULTS) || '[]');
      const filtered = existing.filter((r) => r.id !== result.id);
      filtered.unshift(result);
      localStorage.setItem(LOCAL_STORAGE_KEY_RESULTS, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error saving result locally', e);
    }
  }

  public static getLocalResults(): ExamResult[] {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_RESULTS) || '[]');
    } catch (e) {
      return [];
    }
  }
}
