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

-- ─────────────────────────────────────────────────────────────
-- Products (the catalog). Public read; writes only via service role (admin).
-- Seeded with the launch pieces so the storefront is populated immediately.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.products (
  id           text primary key default gen_random_uuid()::text,
  slug         text unique not null,
  name         text not null,
  brand        text,
  price        numeric not null default 0,
  min_offer    numeric,
  tags         text[] not null default '{}',
  fire_count   int not null default 0,
  category     text not null default 'unisex',
  size         text,
  condition    text,
  measurements text,
  description  text,
  sold         boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "public can read products" on public.products;
create policy "public can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

insert into public.products
  (id, slug, name, brand, price, min_offer, tags, fire_count, category, size, condition, measurements, description, sold)
values
  ('1', 'vintage-denim-jacket', 'Vintage Denim Jacket', 'Levi''s', 149, 125, '{Vintage,Denim}', 42, 'mens', 'L', 'Very Good', 'Chest 22in · Length 27in · Sleeve 25in', 'A classic trucker jacket with a lived-in fade and original stitching. No rips, minor wear at the cuffs consistent with age.', false),
  ('2', 'y2k-track-jacket', 'Y2K Track Jacket', 'Adidas', 99, 80, '{Y2K,Streetwear}', 37, 'unisex', 'M', 'Excellent', 'Chest 21in · Length 26in · Sleeve 24in', 'Full-zip track jacket with the classic three-stripe sleeve detail. Clean colourway, barely worn.', false),
  ('3', 'workwear-chore-coat', 'Workwear Chore Coat', 'Carhartt', 189, 160, '{Vintage,Workwear}', 51, 'mens', 'XL', 'Good', 'Chest 24in · Length 29in · Sleeve 26in', 'Heavyweight duck canvas chore coat, broken in with honest wear. Corduroy collar intact, all buttons present.', false),
  ('4', 'japanese-workwear-hoodie', 'Workwear Hoodie', 'Kapital', 129, 105, '{Japanese,90s}', 28, 'unisex', 'M', 'Excellent', 'Chest 21in · Length 27in · Sleeve 24in', 'Heavyweight loopback cotton hoodie with sashiko-style stitch detailing. Soft, unfaded print.', false),
  ('5', 'retro-skate-hoodie', 'Retro Skate Hoodie', 'Vans', 89, 70, '{Skate,90s}', 33, 'mens', 'S', 'Very Good', 'Chest 20in · Length 25in · Sleeve 23in', 'Boxy fit skate hoodie with faded front graphic. Drawstrings intact, no pilling.', true),
  ('6', 'archive-cargo-pants', 'Archive Cargo Pants', 'The North Face', 119, 95, '{Archive,Gorpcore}', 19, 'womens', 'M', 'Good', 'Waist 30in · Inseam 30in', 'Technical cargo pants with articulated knees and multiple zip pockets. Ripstop fabric, no tears.', false)
on conflict (id) do nothing;

-- Product image URLs — admin pastes one or more links. Empty falls back to a
-- placeholder image. Safe to run on an existing products table.
alter table public.products add column if not exists images text[] not null default '{}';

-- ─────────────────────────────────────────────────────────────
-- Orders (created at checkout). Only the server (service role) reads/writes —
-- no public policies, so customer orders stay private.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id             text primary key,
  created_at     timestamptz not null default now(),
  customer_name  text,
  email          text,
  address        text,
  city           text,
  postal_code    text,
  country        text,
  carrier        text,
  payment_method text,
  items          jsonb not null default '[]',
  total          numeric not null default 0,
  status         text not null default 'New'  -- New | Paid | Shipped | Delivered | Cancelled
);

alter table public.orders enable row level security;

-- ─────────────────────────────────────────────────────────────
-- Offers (Make an Offer). Anyone may submit; only server reads/updates.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.offers (
  id            text primary key,
  created_at    timestamptz not null default now(),
  product_slug  text,
  product_name  text,
  customer_name text,
  email         text,
  offer_price   numeric not null,
  list_price    numeric,
  min_offer     numeric,
  counter_price numeric,
  status        text not null default 'Pending'  -- Pending | Auto-accepted | Countered | Declined | Accepted
);

alter table public.offers enable row level security;

drop policy if exists "anon can insert offers" on public.offers;
create policy "anon can insert offers"
  on public.offers for insert to anon, authenticated with check (true);

-- ─────────────────────────────────────────────────────────────
-- Product Q&A. Anyone may ask; questions + answers are public on the product page.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.product_questions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  product_slug text not null,
  name         text,
  email        text,
  question     text not null,
  answer       text,
  answered_at  timestamptz,
  status       text not null default 'new'  -- new | answered
);

alter table public.product_questions enable row level security;

drop policy if exists "anon can ask questions" on public.product_questions;
create policy "anon can ask questions"
  on public.product_questions for insert to anon, authenticated with check (true);

drop policy if exists "public can read questions" on public.product_questions;
create policy "public can read questions"
  on public.product_questions for select to anon, authenticated using (true);

-- ─────────────────────────────────────────────────────────────
-- Newsletter subscribers.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text unique not null
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "anon can subscribe" on public.newsletter_subscribers;
create policy "anon can subscribe"
  on public.newsletter_subscribers for insert to anon, authenticated with check (true);
