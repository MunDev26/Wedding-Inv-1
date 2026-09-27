// =============================================================
//  WEDDING CONFIG — isi file ini saja untuk kustomisasi website
// =============================================================

export const config = {

  // ── 1. IDENTITAS MEMPELAI ──────────────────────────────────
  groom: {
    nickname: "Aldi",           // nama panggilan (tampil di Cover & Footer)
    fullName: "Reynaldi",   // nama lengkap
    childOrder: "Putra ketiga dari 3 bersaudara",
    parents: "Bpk. Rudi hartanto &\nIbu Zahara",
    photo: "",                    // URL atau path foto profil (kosong = placeholder emoji)
    photoEmoji: "👨",             // emoji cadangan jika photo kosong
  },

  bride: {
    nickname: "Hana",
    fullName: "Hana sasmita",
    childOrder: "Putri pertama dari 3 bersaudara",
    parents: "Bpk. Alamsyah &\nIbu Nursyah",
    photo: "",
    photoEmoji: "👩",
  },

  // ── 2. TANGGAL PERNIKAHAN ──────────────────────────────────
  wedding: {
    dateText: "Senin, 1 Februari 2027",     // teks tampilan di Cover & Footer
    dateShort: "1 · 02 · 2027",             // format angka di Footer
    dateISO: "2027-02-01T08:00:00",          // untuk Countdown (format ISO)
  },

  // ── 3. AKAD NIKAH ──────────────────────────────────────────
  akad: {
    type: "Akad Nikah",
    name: "Ijab Kabul",
    date: "Sabtu, 1 Februari 2027",
    time: "08.00 – 10.00 WIB",
    venue: "Masjid Raya Bukittinggi",
    address: "Jl. Raya Bukittinggi-Maninjau",
    mapsUrl: "https://maps.app.goo.gl/a4HziDscy3De2G7m9",
    calendarStart: "20270201T080000",
    calendarEnd: "20270201T100000",
  },

  // ── 4. RESEPSI PERNIKAHAN ──────────────────────────────────
  resepsi: {
    type: "Resepsi Pernikahan",
    name: "Walimatul 'Ursy",
    date: "Sabtu, 1 Februari 2027",
    time: "10.00 – 15.00 WIB",
    venue: "Kediaman mempelai pria",
    address: "Jl. Jambak",
    mapsUrl: "https://maps.app.goo.gl/a4HziDscy3De2G7m9",
    calendarStart: "20270201T100000",
    calendarEnd: "20270201T150000",
  },

  // ── 5. FOTO ────────────────────────────────────────────────
  photos: {
    // Foto utama Hero — rasio 3:4 (portrait)
    hero: "/photos/main_cover.jpeg",   // contoh: "/photos/hero.jpg"

    // Gallery — index 0 = wide (16:9), index 1-4 = kotak (1:1)
    gallery: [
      { src: "/photos/pw1.jpeg", label: "Foto Prewedding 1 (Wide)", wide: true },
      { src: "/photos/pw2.jpeg", label: "Foto 2", wide: false },
      { src: "/photos/pw3.jpeg", label: "Foto 3", wide: false },
      { src: "/photos/pw4.jpeg", label: "Foto 4", wide: true },
    ],
  },

  // ── 6. KISAH CINTA ─────────────────────────────────────────
  story: [
    {
      year: "Maret 2023",
      title: "Pertemuan Pertama",
      desc: "Kami bertemu di sebuah seminar kampus yang tidak terduga. Sebuah tatapan pertama yang ternyata mengubah segalanya.",
    },
    {
      year: "Agustus 2023",
      title: "Mulai Dekat",
      desc: "Dari obrolan ringan menjadi cerita yang tak pernah selesai. Kami mulai menyadari betapa serasi kami berdua.",
    },
    {
      year: "Januari 2024",
      title: "Resmi Bersama",
      desc: "Aldi memberanikan diri melamar dengan cara yang sederhana namun penuh makna, dan Hana menjawab \"iya\" dengan sepenuh hati.",
    },
    {
      year: "Juni 2026",
      title: "Lamaran",
      desc: "Dihadiri oleh keluarga kedua belah pihak, sebuah janji dipererat menjadi ikatan yang resmi dan penuh harapan.",
    },
    {
      year: "1 Feb 2027 ✦",
      title: "Hari Pernikahan",
      desc: "Dan akhirnya, tibalah hari yang paling kami nantikan. Menyempurnakan separuh agama bersama orang yang dicintai.",
    },
  ],

  // ── 7. HADIAH / AMPLOP DIGITAL ─────────────────────────────
  gift: {
    banks: [
      { bank: "Bank BCA", number: "1234 5678 90", holder: "Reynaldi" },
      { bank: "Bank Mandiri", number: "1100 9988 7766", holder: "Hana sasmita" },
    ],
    qris: {
      imageSrc: "",               // path ke file gambar QRIS, contoh: "/qris.png"
      holder: "Reynaldi",
    },
    address: {
      lines: "Jl. Jambak",
      recipient: "Reynaldi",
      phone: "0812-3456-7890",
    },
  },

  // ── 8. MUSIK LATAR ─────────────────────────────────────────
  // Taruh file di: public/music/background.mp3
  // Tidak perlu diubah kecuali nama file berbeda
  music: {
    src: "/music/bg.mp3",
  },

};
