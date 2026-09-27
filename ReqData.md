# Data yang Dibutuhkan untuk Kustomisasi Undangan

Dokumen ini merinci semua data yang perlu diganti dari klien untuk menyesuaikan undangan pernikahan.

---

## 1. Identitas Mempelai

| Data | Contoh Saat Ini | Lokasi File |
|------|----------------|-------------|
| Nama panggilan pria | `Martio` | `Cover.tsx`, `FooterSection.tsx`, `Gift.tsx` |
| Nama panggilan wanita | `Mia` | `Cover.tsx`, `FooterSection.tsx`, `Gift.tsx` |
| Nama lengkap pria | `Martio Hirvino` | `Couple.tsx` |
| Nama lengkap wanita | `Mia` | `Couple.tsx` |
| Urutan anak pria | `Putra pertama dari` | `Couple.tsx` |
| Nama orang tua pria | `Bpk. Ahmad Santoso & Ibu Siti Rahayu` | `Couple.tsx` |
| Urutan anak wanita | `Putri pertama dari` | `Couple.tsx` |
| Nama orang tua wanita | `Bpk. Hendra Wijaya & Ibu Dewi Kartika` | `Couple.tsx` |

---

## 2. Tanggal & Waktu Pernikahan

| Data | Contoh Saat Ini | Lokasi File |
|------|----------------|-------------|
| Tanggal pernikahan (teks) | `Sabtu, 14 Februari 2026` | `Cover.tsx`, `EventSection.tsx`, `FooterSection.tsx` |
| Tanggal pernikahan (angka) | `14 · 02 · 2026` | `FooterSection.tsx` |
| Tanggal untuk countdown | `2026-02-14T08:00:00` | `Countdown.tsx` |

---

## 3. Akad Nikah

| Data | Contoh Saat Ini | Lokasi File |
|------|----------------|-------------|
| Nama acara | `Ijab Kabul` | `EventSection.tsx` |
| Tanggal | `Sabtu, 14 Februari 2026` | `EventSection.tsx` |
| Jam | `08.00 – 10.00 WIB` | `EventSection.tsx` |
| Nama tempat | `Masjid Al-Ikhlas` | `EventSection.tsx` |
| Alamat tempat | `Jl. Raya Kemang No. 12, Jakarta Selatan` | `EventSection.tsx` |
| Link Google Maps | `https://maps.google.com/?q=...` | `EventSection.tsx` |
| Link Waze | `https://waze.com/ul?q=...` | `EventSection.tsx` |
| Calendar start (format ISO) | `20260214T080000` | `EventSection.tsx` |
| Calendar end (format ISO) | `20260214T100000` | `EventSection.tsx` |

---

## 4. Resepsi Pernikahan

| Data | Contoh Saat Ini | Lokasi File |
|------|----------------|-------------|
| Nama acara | `Walimatul 'Ursy` | `EventSection.tsx` |
| Tanggal | `Sabtu, 14 Februari 2026` | `EventSection.tsx` |
| Jam | `11.00 – 15.00 WIB` | `EventSection.tsx` |
| Nama tempat | `The Grand Ballroom Hotel Mulia` | `EventSection.tsx` |
| Alamat tempat | `Jl. Asia Afrika Senayan, Jakarta Pusat` | `EventSection.tsx` |
| Link Google Maps | `https://maps.google.com/?q=...` | `EventSection.tsx` |
| Link Waze | `https://waze.com/ul?q=...` | `EventSection.tsx` |
| Calendar start (format ISO) | `20260214T110000` | `EventSection.tsx` |
| Calendar end (format ISO) | `20260214T150000` | `EventSection.tsx` |

---

## 5. Foto

| Data | Keterangan | Lokasi File |
|------|-----------|-------------|
| Foto prewedding utama (portrait) | Rasio 3:4 — tampil di Hero section | `Hero.tsx` |
| Foto 1 gallery (landscape wide) | Rasio 16:9 — posisi paling atas, lebar penuh | `Gallery.tsx` |
| Foto 2 gallery | Rasio 1:1 | `Gallery.tsx` |
| Foto 3 gallery | Rasio 1:1 | `Gallery.tsx` |
| Foto 4 gallery | Rasio 1:1 | `Gallery.tsx` |
| Foto 5 gallery | Rasio 1:1 | `Gallery.tsx` |
| Foto profil pria | Rasio 1:1 (bulat) — di Couple section | `Couple.tsx` |
| Foto profil wanita | Rasio 1:1 (bulat) — di Couple section | `Couple.tsx` |

> Saat ini foto menggunakan placeholder gradient & emoji. Ganti dengan tag `<Image>` Next.js atau URL gambar.

---

## 6. Kisah Cinta (Our Story / Timeline)

Tiap milestone butuh 3 data:

| Data | Keterangan |
|------|-----------|
| Periode / Tahun | Contoh: `Maret 2020` |
| Judul | Contoh: `Pertemuan Pertama` |
| Deskripsi singkat | 1–2 kalimat cerita |

Saat ini ada **5 milestone**. Bisa ditambah atau dikurangi sesuai cerita nyata klien.

> Lokasi: `Story.tsx` — array `events`

---

## 7. Hadiah / Amplop Digital

### Transfer Bank
Bisa lebih dari 1 rekening:

| Data | Contoh Saat Ini |
|------|----------------|
| Nama bank | `Bank BCA` |
| Nomor rekening | `1234 5678 90` |
| Nama pemilik rekening | `Martio Hirvino` |

### QRIS
| Data | Keterangan |
|------|-----------|
| Gambar QRIS | File gambar QR code (format PNG/JPG) |
| Nama pemilik QRIS | `Martio Hirvino` |

### Kado Fisik
| Data | Contoh Saat Ini |
|------|----------------|
| Alamat lengkap | `Jl. Mawar Indah No. 5A, RT 03/RW 07, Kel. Jagakarsa, Jakarta Selatan 12620` |
| Nama penerima | `Ibu Siti Rahayu` |
| No. HP penerima | `0812-3456-7890` |

> Lokasi: `Gift.tsx`

---

## 8. Musik Latar

| Data | Keterangan | Lokasi File |
|------|-----------|-------------|
| File musik | Format `.mp3`, taruh di `public/music/background.mp3` | `AudioButton.tsx` |

## Ringkasan Checklist

- [ ] Nama & data mempelai (lengkap + orang tua)
- [ ] Tanggal, jam, tempat akad + resepsi
- [ ] Link Google Maps & Waze kedua lokasi
- [ ] Foto prewedding (1 portrait utama + 5 gallery + 2 profil)
- [ ] Kisah cinta (min. 3 milestone)
- [ ] Info rekening bank / QRIS / alamat kado
- [ ] File musik latar (.mp3)
- [ ] Konfigurasi Supabase & password admin
