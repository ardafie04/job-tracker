# Job Tracker 🧭

Job Tracker adalah aplikasi web untuk mencatat dan mengelola lamaran kerja agar lebih rapi, terstruktur, dan mudah dipantau.  
Kamu bisa menyimpan semua informasi lowongan di satu tempat, memberi prioritas, melihat status aktif / expired, dan melacak follow-up dengan nyaman.

Live Demo: https://job-tracker-nine-virid.vercel.app

## ✨ Fitur Utama

- ✅ Autentikasi dengan email/password & Google (Supabase Auth)
- ✅ Tambah, edit, dan hapus job application
- ✅ Prioritas lamaran (High / Medium / Low)
- ✅ Status aktif vs expired (otomatis berdasarkan tanggal kadaluarsa)
- ✅ Detail job lengkap (lokasi, posisi, gaji, deskripsi, keterangan status)
- ✅ Follow-up date tracking
- ✅ Card view dengan dark mode dan UI modern
- ✅ Detail modal (read-only) + Edit modal
- ✅ Pagination (10 job per halaman) agar dashboard tetap rapi
- ✅ Auto-update keterangan untuk job yang sudah lewat tanggal kadaluarsa
- ✅ Auto-logout ketika sesi Supabase kadaluarsa (hindari error aneh saat refresh)

## 🧱 Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Auth & Database: Supabase
- Hosting: Vercel

## 📦 Instalasi & Menjalankan Project

1. Clone repo
`git clone https://github.com/ardafie04/job-tracker.git`
cd job-tracker


2. Install dependencies
3. Siapkan file `.env` di root project
`VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. Jalankan development server
`npm run dev`


Buka http://localhost:5173 di browser.

## 🔐 Konfigurasi Supabase (Singkat)

1. Buat project Supabase baru.
2. Aktifkan Auth → Email + Google Provider.
3. Di Authentication → URL Configuration:
   - Site URL: `https://job-tracker-nine-vivid.vercel.app` (atau `http://localhost:5173` saat dev)
   - Redirect URLs:
     - `https://job-tracker-nine-vivid.vercel.app`
     - `http://localhost:5173`
4. Copy Project URL & anon key ke `.env` seperti di atas.

## 🧭 Arsitektur Singkat

- `src/pages/Dashboard.jsx`  
  Logika utama dashboard: fetch jobs, filter, sorting, pagination, dan handle modal (Add / Edit / Delete / Detail).

- `src/hooks/useJobs.js`  
  Abstraksi untuk operasi Supabase: fetch, create, update, delete.

- `src/hooks/useDashboard.js`  
  Mengurus user aktif, cache user di localStorage, dan redirect kalau belum login / session kadaluarsa.

- `src/components/dashboard/JobCard.jsx`  
  Kartu job dengan status aktif/expired, prioritas, countdown, dan tombol aksi.

- `src/components/dashboard/EditModal.jsx`  
  Form edit lamaran (company, title, lokasi, gaji, detail, tanggal, dsb).

- `src/components/dashboard/DetailModal.jsx`  
  Modal read-only yang menampilkan semua detail lamaran + tombol Edit & Hapus.

- `src/utils/jobFilters.js`  
  Helper untuk search, filter (status), sort, dan prioritas.

- `src/utils/jobHelpers.js`  
  Fungsi `autoUpdateExpiredJobs` untuk mengubah keterangan job yang sudah lewat tanggal kadaluarsa.

## 🚀 Deploy ke Vercel

1. Push project ke GitHub.
2. Di Vercel, “Import Project” dari repo ini.
3. Atur:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Tambahkan Environment Variables di Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy.  
   Set domain yang muncul sebagai Site URL & Redirect URL di Supabase.

