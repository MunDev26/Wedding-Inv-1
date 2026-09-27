# Panduan Penggunaan — Website Undangan Pernikahan Digital

## Daftar Isi
1. [Gambaran Umum](#1-gambaran-umum)
2. [Persiapan Awal](#2-persiapan-awal)
3. [Menjalankan Aplikasi Lokal](#3-menjalankan-aplikasi-lokal)
4. [Panduan Tamu (Guest)](#4-panduan-tamu-guest)
5. [Panduan Admin (Pengantin)](#5-panduan-admin-pengantin)
6. [Kustomisasi Konten](#6-kustomisasi-konten)
7. [Deploy ke Vercel (Publish Online)](#7-deploy-ke-vercel-publish-online)

---

## 1. Gambaran Umum

Aplikasi ini adalah website undangan pernikahan digital yang terdiri dari dua bagian:

| Halaman | URL | Akses |
|---|---|---|
| Undangan Tamu | `/` atau `/?to=NamaTamu` | Publik |
| Dashboard Admin | `/admin` | Password |

---

## 2. Persiapan Awal

### 2.1 Setup Supabase (Database)

1. Buka [supabase.com](https://supabase.com) → login → klik **New Project**
2. Isi nama project, password database, dan pilih region terdekat (contoh: Singapore)
3. Tunggu project selesai dibuat (~2 menit)
4. Buka menu **SQL Editor** di sidebar kiri
5. Copy seluruh isi file `supabase-schema.sql` → paste → klik **Run**
6. Buka **Project Settings → API**:
   - Copy **Project URL** → paste ke `NEXT_PUBLIC_SUPABASE_URL` di file `.env.local`
   - Copy **anon / public key** → paste ke `NEXT_PUBLIC_SUPABASE_ANON_KEY` di file `.env.local`

### 2.2 File `.env.local`

File `.env.local` berada di root folder `wedding-app/`. Isi sesuai dengan kredensial Supabase dan password admin yang diinginkan:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_ADMIN_PASSWORD=password-rahasia-anda
```

> **Penting:** Jangan bagikan file `.env.local` ke siapapun. File ini sudah masuk `.gitignore` dan tidak akan terupload ke GitHub.

### 2.3 Install Dependencies

Jalankan perintah berikut satu kali di folder `wedding-app/`:

```bash
npm install
```

---

## 3. Menjalankan Aplikasi Lokal

```bash
npm run dev
```

Buka browser dan akses: `http://localhost:3000`

---

## 4. Panduan Tamu (Guest)

### 4.1 Halaman Cover

Saat tamu membuka link undangan, mereka akan melihat halaman cover gelap dengan nama pengantin dan tombol **Buka Undangan**.

- Nama tamu ditampilkan secara personal jika link menggunakan parameter `?to=`
- Klik **Buka Undangan** untuk masuk ke konten dan memutar musik latar

### 4.2 Link Personal

Link undangan bisa dibuat personal untuk setiap tamu:

```
https://nama-undangan.vercel.app/?to=Budi
https://nama-undangan.vercel.app/?to=Siti%20dan%20Keluarga
```

Nama tamu dengan spasi perlu menggunakan URL encode. Gunakan fitur **Generator Link** di dashboard admin untuk membuatnya otomatis.

### 4.3 Fitur yang Tersedia untuk Tamu

| Fitur | Cara Pakai |
|---|---|
| Navigasi ke lokasi | Klik tombol **Google Maps** atau **Waze** di section Detail Acara |
| Salin nomor rekening | Klik tombol **Salin Nomor Rekening** di section Amplop Digital |
| Salin alamat kado | Klik tombol **Salin Alamat** di tab Kado Fisik |
| Kirim ucapan & doa | Isi form Nama, Kehadiran, dan Pesan → klik **Kirim Ucapan** |
| Musik latar | Klik tombol musik (pojok kanan bawah) untuk play/pause |

### 4.4 Ucapan Real-Time

Ucapan yang dikirim tamu akan langsung muncul di feed tanpa perlu refresh halaman, berkat Supabase Realtime.

---

## 5. Panduan Admin (Pengantin)

Akses dashboard admin di: `http://localhost:3000/admin` (lokal) atau `https://nama-undangan.vercel.app/admin` (online)

### 5.1 Login

Masukkan password admin yang telah diatur di `.env.local` pada variabel `NEXT_PUBLIC_ADMIN_PASSWORD`.

### 5.2 Statistik Ucapan

Bagian atas dashboard menampilkan ringkasan:
- **Total Ucapan** — jumlah semua ucapan yang masuk
- **Hadir** — tamu yang konfirmasi kehadiran
- **Tidak Hadir** — tamu yang tidak bisa hadir

### 5.3 Generator Link Tamu

1. Ketik nama tamu di kolom input
2. Link personal otomatis terbentuk di bawahnya
3. Pilih salah satu aksi:
   - **Salin Link** — copy link ke clipboard
   - **Kirim via WhatsApp** — buka WhatsApp dengan pesan undangan yang sudah terisi otomatis

Contoh pesan WhatsApp yang digenerate:
```
Assalamu'alaikum, kami mengundang *Budi* untuk hadir di pernikahan kami:

https://nama-undangan.vercel.app/?to=Budi
```

### 5.4 Moderasi Ucapan

- Semua ucapan tamu tampil di bagian bawah dashboard
- Klik **Hapus** pada ucapan yang tidak pantas untuk menghapusnya
- Ucapan yang dihapus tidak akan muncul lagi di halaman tamu

---

## 6. Kustomisasi Konten

Seluruh konten undangan (nama pengantin, tanggal, lokasi, cerita, rekening, dsb.) dapat diubah langsung di file komponen berikut:

### 6.1 Nama Pengantin & Tanggal

File: `components/Cover.tsx`
```tsx
// Ubah nama dan tanggal di sini
Martio
Mia
Sabtu, 14 Februari 2026
```

File: `components/sections/FooterSection.tsx`
```tsx
Martio &amp; Mia
14 · 02 · 2026
```

### 6.2 Detail Acara (Lokasi, Waktu, Link Maps)

File: `components/sections/EventSection.tsx`

Ubah nilai pada setiap `EventCard`:
```tsx
date="Sabtu, 14 Februari 2026"
time="08.00 – 10.00 WIB"
venue="Masjid Al-Ikhlas"
address="Jl. Raya Kemang No. 12, Jakarta Selatan"
mapsUrl="https://maps.google.com/?q=..."   // ganti dengan link Google Maps lokasi asli
wazeUrl="https://waze.com/ul?q=..."        // ganti dengan link Waze lokasi asli
```

### 6.3 Countdown Timer

File: `components/sections/Countdown.tsx`
```tsx
const WEDDING_DATE = new Date("2026-02-14T08:00:00"); // ubah ke tanggal & jam akad
```

### 6.4 Kisah Cinta (Timeline)

File: `components/sections/Story.tsx`

Ubah atau tambah item pada array `events`:
```tsx
const events = [
  { year: "Maret 2020", title: "Pertemuan Pertama", desc: "..." },
  // tambah lebih banyak momen di sini
];
```

### 6.5 Nomor Rekening & QRIS

File: `components/sections/Gift.tsx`

Ubah data bank:
```tsx
<BankCard bank="Bank BCA" number="1234 5678 90" holder="Martio Hirvino" />
```

Untuk QRIS, ganti gambar placeholder dengan file QRIS asli di folder `public/` dan tampilkan menggunakan `<Image>`.

### 6.6 Musik Latar

1. Siapkan file musik format `.mp3`
2. Simpan di `public/music/background.mp3`
3. Musik akan otomatis diputar saat tamu klik **Buka Undangan**

### 6.7 Foto Profil & Galeri

Untuk versi produksi, ganti placeholder warna dengan komponen `<Image>` dari Next.js:

```tsx
import Image from "next/image";

// Simpan foto di public/images/
<Image src="/images/prewedding-1.jpg" alt="Foto prewedding" fill className="object-cover" />
```

Upload file foto ke Supabase Storage atau langsung ke folder `public/images/`.

---

## 7. Deploy ke Vercel (Publish Online)

### 7.1 Upload Kode ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: wedding invitation"
git remote add origin https://github.com/username/nama-repo.git
git push -u origin main
```

### 7.2 Connect ke Vercel

1. Buka [vercel.com](https://vercel.com) → login dengan akun GitHub
2. Klik **Add New → Project**
3. Pilih repository yang baru diupload
4. Vercel otomatis mendeteksi Next.js — klik **Deploy**

### 7.3 Set Environment Variables di Vercel

Setelah deploy, masuk ke **Project Settings → Environment Variables** dan tambahkan:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Password admin |

Klik **Save** → **Redeploy** agar env vars aktif.

### 7.4 URL Undangan

Setelah deploy berhasil, website dapat diakses di:
```
https://nama-repo.vercel.app/
https://nama-repo.vercel.app/admin
```

Bagikan link personal kepada setiap tamu melalui fitur Generator Link di dashboard admin.

---

*Dibuat dengan Next.js 14 · Supabase · Tailwind CSS · Vercel*
