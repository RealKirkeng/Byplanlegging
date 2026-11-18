-- Bysjon — Produksjonsklart PostgreSQL / Supabase-skjema
-- Kjør denne filen i Supabase SQL Editor når plattformen kobles til database.

create extension if not exists "pgcrypto";

-- 1. Transformasjonsområder (bydeler / havneområder under utvikling)
create table if not exists public.areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text not null,
  municipality text not null,
  region text not null,
  coordinates text not null,
  status text not null check (status in ('Åpen høring', 'Under utredning', 'Konseptfase')),
  area_dekar integer not null,
  planned_homes text not null,
  timeline text not null,
  summary text not null,
  context_body text not null,
  key_questions jsonb not null default '[]'::jsonb,
  hero_image_url text not null,
  created_at timestamptz not null default now()
);

-- 2. Aktører (arkitektkontorer, designbyråer, bevegelsesaktører)
create table if not exists public.actors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('Arkitekturbevegelse', 'Arkitektkontor', 'Urbanisme-studio', 'Landskap & Byform')),
  city text not null,
  tagline text not null,
  philosophy text not null,
  focus_tags jsonb not null default '[]'::jsonb,
  website_label text,
  is_demo_profile boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. Innsendte arkitekturforslag for områder
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  area_slug text not null references public.areas(slug) on delete cascade,
  actor_slug text references public.actors(slug) on delete set null,
  actor_name_override text,
  title text not null,
  subtitle text not null,
  style text not null check (style in ('Klassisk', 'Nyurbanisme', 'Moderne', 'Økologisk')),
  max_floors integer not null,
  estimated_homes integer not null,
  green_space_percent integer not null check (green_space_percent between 0 and 100),
  primary_materials text not null,
  street_life_summary text not null,
  architectural_vision text not null,
  principles jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  tradeoffs jsonb not null default '[]'::jsonb,
  hero_image_url text not null,
  gallery_images jsonb not null default '[]'::jsonb,
  seed_votes integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  unique (area_slug, slug)
);

-- 4. Innbyggerstemmer per forslag (én stemme per nettleser/sesjon eller innlogget bruker per område)
create table if not exists public.proposal_votes (
  id uuid primary key default gen_random_uuid(),
  area_slug text not null references public.areas(slug) on delete cascade,
  proposal_slug text not null,
  voter_token text not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (area_slug, voter_token)
);

-- 5. Kvalitetsvekting fra innbyggere (1–5 skala per kvalitetsakse for et område)
create table if not exists public.area_quality_ratings (
  id uuid primary key default gen_random_uuid(),
  area_slug text not null references public.areas(slug) on delete cascade,
  voter_token text not null,
  klassisk_estetikk smallint not null check (klassisk_estetikk between 1 and 5),
  gronne_byrom smallint not null check (gronne_byrom between 1 and 5),
  menneskelig_skala smallint not null check (menneskelig_skala between 1 and 5),
  aktivt_byliv smallint not null check (aktivt_byliv between 1 and 5),
  created_at timestamptz not null default now(),
  unique (area_slug, voter_token)
);

-- 6. Innbyggerinnspill og fagkommentarer
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  area_slug text not null references public.areas(slug) on delete cascade,
  proposal_slug text not null,
  author_name text not null,
  author_role text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Indekser for rask lasting
create index if not exists idx_proposals_area_slug on public.proposals(area_slug);
create index if not exists idx_proposals_actor_slug on public.proposals(actor_slug);
create index if not exists idx_votes_area_proposal on public.proposal_votes(area_slug, proposal_slug);
create index if not exists idx_comments_area_proposal on public.comments(area_slug, proposal_slug);

-- Aggregerte visninger (views) for lynraske poll-resultater
create or replace view public.proposal_vote_totals as
select
  p.area_slug,
  p.slug as proposal_slug,
  p.seed_votes + count(v.id)::integer as total_votes
from public.proposals p
left join public.proposal_votes v
  on v.area_slug = p.area_slug and v.proposal_slug = p.slug
where p.status = 'published'
group by p.area_slug, p.slug, p.seed_votes;

create or replace view public.area_quality_averages as
select
  area_slug,
  count(*)::integer as response_count,
  round(avg(klassisk_estetikk)::numeric, 2) as klassisk_estetikk,
  round(avg(gronne_byrom)::numeric, 2) as gronne_byrom,
  round(avg(menneskelig_skala)::numeric, 2) as menneskelig_skala,
  round(avg(aktivt_byliv)::numeric, 2) as aktivt_byliv
from public.area_quality_ratings
group by area_slug;

-- Row Level Security (RLS)
alter table public.areas enable row level security;
alter table public.actors enable row level security;
alter table public.proposals enable row level security;
alter table public.proposal_votes enable row level security;
alter table public.area_quality_ratings enable row level security;
alter table public.comments enable row level security;

-- Offentlig lesing av publisert innhold
create policy "Public read areas" on public.areas for select using (true);
create policy "Public read actors" on public.actors for select using (true);
create policy "Public read published proposals" on public.proposals for select using (status = 'published');
create policy "Public read votes" on public.proposal_votes for select using (true);
create policy "Public read quality ratings" on public.area_quality_ratings for select using (true);
create policy "Public read comments" on public.comments for select using (true);

-- Åpen innbyggerdeltakelse og forslagsinnsending (kan strammes inn med auth eller modereringskø)
create policy "Public insert proposal votes" on public.proposal_votes for insert with check (true);
create policy "Public insert quality ratings" on public.area_quality_ratings for insert with check (true);
create policy "Public insert comments" on public.comments for insert with check (true);
create policy "Public insert proposals" on public.proposals for insert with check (true);
