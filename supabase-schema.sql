-- Jalankan SQL ini di Supabase Dashboard → SQL Editor

-- Tabel ucapan/doa tamu
create table if not exists wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  attendance text not null check (attendance in ('hadir', 'tidak', 'ragu')),
  message text not null,
  is_deleted boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table wishes enable row level security;

-- Tamu bisa insert (kirim ucapan)
create policy "Anyone can insert wishes"
  on wishes for insert
  with check (true);

-- Semua bisa baca ucapan yang belum dihapus
create policy "Anyone can read active wishes"
  on wishes for select
  using (is_deleted = false);

-- Hanya user ter-autentikasi (admin) yang bisa soft-delete
create policy "Auth users can soft-delete wishes"
  on wishes for update
  using (auth.role() = 'authenticated');

-- Enable Realtime untuk tabel wishes
alter publication supabase_realtime add table wishes;
