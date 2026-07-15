-- =============================================================================
-- Rahmetolla Rayimqulov nomidagi maktab — Supabase sxemasi
-- (Supabase schema: tables, RLS, storage bucket)
--
-- Ishlatish: Supabase dashboard → SQL Editor → shu faylni to'liq joylashtirib
-- "Run" bosing. Keyin namuna yangiliklar uchun:  node scripts/seed.mjs
-- =============================================================================

-- ------------------------------- Yangiliklar --------------------------------
create table if not exists public.news (
  slug        text primary key,
  title       text        not null,
  excerpt     text        not null,
  content     jsonb       not null default '[]'::jsonb,
  date        date        not null,
  category    text        not null check (category in ('tadbirlar','yutuqlar','elonlar')),
  image       text        not null,
  author      text,
  created_at  timestamptz not null default now()
);

create index if not exists news_date_idx on public.news (date desc);

-- ------------------------------- Murojaatlar --------------------------------
create table if not exists public.messages (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  phone       text        not null,
  email       text,
  message     text        not null,
  read        boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists messages_created_idx on public.messages (created_at desc);

-- ------------------------------ Dars jadvali --------------------------------
create table if not exists public.schedules (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  type        text        not null check (type in ('excel','pdf','image')),
  grid        jsonb,
  file        text,
  updated_at  timestamptz not null default now()
);

create index if not exists schedules_updated_idx on public.schedules (updated_at desc);

-- ------------------------------------ RLS -----------------------------------
-- Sayt barcha ma'lumotlarga faqat server orqali (service_role kaliti bilan)
-- murojaat qiladi. service_role RLS'ni chetlab o'tadi, shuning uchun RLS'ni
-- yoqib qo'yamiz va hech qanday public (anon) siyosat bermaymiz — bu anon kalit
-- tasodifan ochilib qolsa ham murojaatlar/ma'lumotlarni himoya qiladi.
alter table public.news      enable row level security;
alter table public.messages  enable row level security;
alter table public.schedules enable row level security;

-- ------------------------------- Storage bucket -----------------------------
-- Yuklangan rasm va fayllar uchun ochiq (public) bucket.
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update set public = true;

-- Ommaviy o'qish (rasmlar say'tda ko'rinishi uchun). Yuklash server (service_role)
-- orqali bo'lgani uchun alohida insert siyosati shart emas.
drop policy if exists "uploads_public_read" on storage.objects;
create policy "uploads_public_read"
  on storage.objects for select
  using (bucket_id = 'uploads');
