-- ============================================================
-- World Food Day quiz — schéma Supabase
-- À exécuter dans : Supabase > SQL Editor > New query > Run
-- ============================================================
-- Si vous aviez déjà exécuté l'ancien schéma (starter), supprimez l'ancienne
-- table d'abord (⚠ efface les anciennes lignes) en dé-commentant la ligne suivante :
-- drop table if exists public.quiz_results;

create table if not exists public.quiz_results (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null check (char_length(btrim(first_name)) between 2 and 60),
  last_name        text not null check (char_length(btrim(last_name))  between 2 and 60),
  email            text not null check (char_length(email) <= 254
                                        and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            text not null check (phone ~ '^\+?[0-9 ().-]{8,20}$'),
  score            integer not null check (score between 0 and 10),
  total_questions  integer not null default 10 check (total_questions = 10),
  percentage       integer not null check (percentage between 0 and 100 and percentage = score * 10),
  duration_seconds integer not null check (duration_seconds >= 0),
  answers          jsonb   not null default '[]'::jsonb
                           check (jsonb_typeof(answers) = 'array' and jsonb_array_length(answers) = 10),
  created_at       timestamptz not null default now()
);

create index if not exists quiz_results_email_idx   on public.quiz_results (lower(email));
create index if not exists quiz_results_created_idx on public.quiz_results (created_at desc);

-- Optionnel : une seule participation par e-mail (dé-commentez si souhaité)
-- create unique index if not exists quiz_results_email_unique on public.quiz_results (lower(email));

alter table public.quiz_results enable row level security;

-- Les visiteurs peuvent UNIQUEMENT ajouter leur résultat (INSERT).
-- Aucune policy SELECT : personne ne peut lire les données depuis le site.
drop policy if exists "Public can submit quiz results" on public.quiz_results;
create policy "Public can submit quiz results"
on public.quiz_results
for insert
to anon, authenticated
with check (true);   -- les contrôles sont faits par les CHECK de la table ci-dessus

-- ------------------------------------------------------------
-- Consulter les résultats (Table Editor > quiz_results, ou SQL Editor) :
--
--   select first_name, last_name, email, phone, score, percentage,
--          duration_seconds, created_at
--   from public.quiz_results
--   order by score desc, duration_seconds asc;
--
-- Classement (meilleur score, puis le plus rapide) :
--
--   select rank() over (order by score desc, duration_seconds asc) as rang,
--          first_name, last_name, score, duration_seconds
--   from public.quiz_results;
-- ------------------------------------------------------------
-- Ne mettez JAMAIS la clé service_role dans script.js.
