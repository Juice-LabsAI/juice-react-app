-- Redeem feature: discount codes + leads, accessed only via SECURITY DEFINER functions.

create table if not exists public.discount_codes (
  code        text primary key,
  redeemed    boolean not null default false,
  redeemed_at timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  first_name    text not null,
  last_name     text not null,
  country_code  text not null,
  phone         text not null,
  email         text not null,
  organization  text not null,
  discount_code text not null references public.discount_codes(code)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Lock the tables down; the public reaches them only through the functions below.
alter table public.discount_codes enable row level security;
alter table public.leads enable row level security;

-- Validate code (exists & unused), insert the lead, mark the code used — atomically.
create or replace function public.redeem_code(
  p_first_name   text,
  p_last_name    text,
  p_country_code text,
  p_phone        text,
  p_email        text,
  p_organization text,
  p_code         text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_raw  text := upper(regexp_replace(coalesce(p_code,''), '[^A-Za-z0-9]', '', 'g'));
  v_code text;
  v_row  discount_codes%rowtype;
  v_id   uuid;
begin
  if btrim(coalesce(p_first_name,'')) = ''
     or btrim(coalesce(p_last_name,'')) = ''
     or btrim(coalesce(p_email,'')) = ''
     or btrim(coalesce(p_phone,'')) = ''
     or btrim(coalesce(p_organization,'')) = ''
     or length(v_raw) <> 8 then
    return jsonb_build_object('ok', false, 'error', 'missing_fields');
  end if;

  v_code := substr(v_raw,1,4) || '-' || substr(v_raw,5,4);

  select * into v_row from discount_codes where code = v_code for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;
  if v_row.redeemed then
    return jsonb_build_object('ok', false, 'error', 'code_used');
  end if;

  insert into leads (first_name, last_name, country_code, phone, email, organization, discount_code)
  values (btrim(p_first_name), btrim(p_last_name), btrim(p_country_code), btrim(p_phone),
          btrim(p_email), btrim(p_organization), v_code)
  returning id into v_id;

  update discount_codes set redeemed = true, redeemed_at = now() where code = v_code;

  return jsonb_build_object('ok', true, 'lead_id', v_id);
end;
$$;

revoke all on function public.redeem_code(text,text,text,text,text,text,text) from public;
grant execute on function public.redeem_code(text,text,text,text,text,text,text) to anon, authenticated;

-- Admin list: returns all leads only when the passphrase matches (server-side gate).
create or replace function public.admin_list_leads(p_pass text)
returns setof public.leads
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_pass is distinct from 'admin@juice' then
    raise exception 'unauthorized' using errcode = '28000';
  end if;
  return query select * from leads order by created_at desc;
end;
$$;

revoke all on function public.admin_list_leads(text) from public;
grant execute on function public.admin_list_leads(text) to anon, authenticated;
