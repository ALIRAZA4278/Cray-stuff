-- CRAY STUFF — Supabase schema
-- Run this once in the Supabase dashboard → SQL Editor.
-- Safe to re-run: uses "if not exists" / "or replace".

-- ─────────────────────────────────────────────────────────────
-- Contact messages (from the /contact form) + product questions.
-- Admin reads these via the service-role key (bypasses RLS).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  status     text not null default 'new'  -- new | replied | archived
);

alter table public.contact_messages enable row level security;

-- Anyone (incl. logged-out visitors) may submit a message, but nobody can
-- read them through the public/anon key — only the server (service role) can.
drop policy if exists "anon can insert contact messages" on public.contact_messages;
create policy "anon can insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
