-- CMO Handbook (Brand OS Readiness quiz) leads.
-- Captured by the lead gate shown before the quiz results are revealed.
-- Same principles as public.leads: the table is locked down and reached only
-- through SECURITY DEFINER functions, and the admin gate reuses admin_assert().

create table if not exists public.cmo_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  phone        text not null,
  email        text not null,
  organization text not null,
  score        integer,       -- overall readiness score at submit time (0-100)
  archetype    text,          -- stage archetype, e.g. 'The Conductor'
  dimensions   jsonb,         -- per-dimension scores, e.g. {"Organizational Readiness": 88, ...}
  status       text not null default 'New'
);

-- Defensive: if an earlier version of this table already exists, add the column.
alter table public.cmo_leads add column if not exists dimensions jsonb;

alter table public.cmo_leads
  add constraint cmo_leads_status_check
  check (status in ('New','Reached Out','Demo Set','Closed'));

create index if not exists cmo_leads_created_at_idx on public.cmo_leads (created_at desc);

-- Locked down; the public reaches it only through the functions below.
alter table public.cmo_leads enable row level security;

-- Public insert: capture a quiz lead. All contact fields required; score and
-- archetype are optional metadata carried from the quiz result.
create or replace function public.submit_cmo_lead(
  p_name         text,
  p_phone        text,
  p_email        text,
  p_organization text,
  p_score        integer default null,
  p_archetype    text default null,
  p_dimensions   jsonb default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if btrim(coalesce(p_name,'')) = ''
     or btrim(coalesce(p_phone,'')) = ''
     or btrim(coalesce(p_email,'')) = ''
     or btrim(coalesce(p_organization,'')) = '' then
    return jsonb_build_object('ok', false, 'error', 'missing_fields');
  end if;

  insert into cmo_leads (name, phone, email, organization, score, archetype, dimensions)
  values (btrim(p_name), btrim(p_phone), btrim(p_email), btrim(p_organization),
          p_score, nullif(btrim(coalesce(p_archetype,'')),''), p_dimensions)
  returning id into v_id;

  return jsonb_build_object('ok', true, 'lead_id', v_id);
end;
$$;

-- Drop the pre-dimensions signature if it exists so no stale overload lingers.
drop function if exists public.submit_cmo_lead(text,text,text,text,integer,text);
revoke all on function public.submit_cmo_lead(text,text,text,text,integer,text,jsonb) from public;
grant execute on function public.submit_cmo_lead(text,text,text,text,integer,text,jsonb) to anon, authenticated;

-- Admin list (gated by the shared admin_assert passphrase).
create or replace function public.admin_list_cmo_leads(p_pass text)
returns setof public.cmo_leads
language plpgsql security definer set search_path = public as $$
begin
  perform admin_assert(p_pass);
  return query select * from cmo_leads order by created_at desc;
end; $$;

create or replace function public.admin_create_cmo_lead(
  p_pass text, p_name text, p_phone text, p_email text, p_organization text,
  p_score integer, p_archetype text, p_status text
) returns public.cmo_leads language plpgsql security definer set search_path = public as $$
declare v public.cmo_leads;
begin
  perform admin_assert(p_pass);
  insert into cmo_leads (name, phone, email, organization, score, archetype, status)
  values (btrim(coalesce(p_name,'')), btrim(coalesce(p_phone,'')), btrim(coalesce(p_email,'')),
          btrim(coalesce(p_organization,'')), p_score, nullif(btrim(coalesce(p_archetype,'')),''),
          coalesce(nullif(btrim(coalesce(p_status,'')),''),'New'))
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_update_cmo_lead(
  p_pass text, p_id uuid, p_name text, p_phone text, p_email text, p_organization text,
  p_score integer, p_archetype text, p_status text
) returns public.cmo_leads language plpgsql security definer set search_path = public as $$
declare v public.cmo_leads;
begin
  perform admin_assert(p_pass);
  update cmo_leads set
    name         = btrim(coalesce(p_name,'')),
    phone        = btrim(coalesce(p_phone,'')),
    email        = btrim(coalesce(p_email,'')),
    organization = btrim(coalesce(p_organization,'')),
    score        = p_score,
    archetype    = nullif(btrim(coalesce(p_archetype,'')),''),
    status       = coalesce(nullif(btrim(coalesce(p_status,'')),''),'New')
  where id = p_id
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_set_cmo_status(p_pass text, p_id uuid, p_status text)
returns public.cmo_leads language plpgsql security definer set search_path = public as $$
declare v public.cmo_leads;
begin
  perform admin_assert(p_pass);
  if p_status not in ('New','Reached Out','Demo Set','Closed') then
    raise exception 'invalid status';
  end if;
  update cmo_leads set status = p_status where id = p_id returning * into v;
  return v;
end; $$;

create or replace function public.admin_delete_cmo_lead(p_pass text, p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform admin_assert(p_pass);
  delete from cmo_leads where id = p_id;
end; $$;

grant execute on function public.admin_list_cmo_leads(text) to anon, authenticated;
grant execute on function public.admin_create_cmo_lead(text,text,text,text,text,integer,text,text) to anon, authenticated;
grant execute on function public.admin_update_cmo_lead(text,uuid,text,text,text,text,integer,text,text) to anon, authenticated;
grant execute on function public.admin_set_cmo_status(text,uuid,text) to anon, authenticated;
grant execute on function public.admin_delete_cmo_lead(text,uuid) to anon, authenticated;
