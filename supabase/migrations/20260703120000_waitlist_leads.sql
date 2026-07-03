-- Waitlist leads.
-- Captured by the "Join the waitlist" popup (opened from the navbar / footer).
-- Same principles as public.cmo_leads: the table is locked down and reached only
-- through SECURITY DEFINER functions, and the admin gate reuses admin_assert().

create table if not exists public.waitlist_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  organization text not null,
  email        text not null,
  message      text,          -- free text: "What can Juice AI do for you?"
  status       text not null default 'New'
);

alter table public.waitlist_leads
  add constraint waitlist_leads_status_check
  check (status in ('New','Reached Out','Demo Set','Closed'));

create index if not exists waitlist_leads_created_at_idx on public.waitlist_leads (created_at desc);

-- Locked down; the public reaches it only through the functions below.
alter table public.waitlist_leads enable row level security;

-- Public insert: capture a waitlist lead. Name, organization and email required;
-- the message ("What can Juice AI do for you?") is optional.
create or replace function public.submit_waitlist_lead(
  p_name         text,
  p_organization text,
  p_email        text,
  p_message      text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if btrim(coalesce(p_name,'')) = ''
     or btrim(coalesce(p_organization,'')) = ''
     or btrim(coalesce(p_email,'')) = '' then
    return jsonb_build_object('ok', false, 'error', 'missing_fields');
  end if;

  insert into waitlist_leads (name, organization, email, message)
  values (btrim(p_name), btrim(p_organization), btrim(p_email),
          nullif(btrim(coalesce(p_message,'')),''))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'lead_id', v_id);
end;
$$;

revoke all on function public.submit_waitlist_lead(text,text,text,text) from public;
grant execute on function public.submit_waitlist_lead(text,text,text,text) to anon, authenticated;

-- Admin list (gated by the shared admin_assert passphrase).
create or replace function public.admin_list_waitlist_leads(p_pass text)
returns setof public.waitlist_leads
language plpgsql security definer set search_path = public as $$
begin
  perform admin_assert(p_pass);
  return query select * from waitlist_leads order by created_at desc;
end; $$;

create or replace function public.admin_create_waitlist_lead(
  p_pass text, p_name text, p_organization text, p_email text, p_message text, p_status text
) returns public.waitlist_leads language plpgsql security definer set search_path = public as $$
declare v public.waitlist_leads;
begin
  perform admin_assert(p_pass);
  insert into waitlist_leads (name, organization, email, message, status)
  values (btrim(coalesce(p_name,'')), btrim(coalesce(p_organization,'')), btrim(coalesce(p_email,'')),
          nullif(btrim(coalesce(p_message,'')),''),
          coalesce(nullif(btrim(coalesce(p_status,'')),''),'New'))
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_update_waitlist_lead(
  p_pass text, p_id uuid, p_name text, p_organization text, p_email text, p_message text, p_status text
) returns public.waitlist_leads language plpgsql security definer set search_path = public as $$
declare v public.waitlist_leads;
begin
  perform admin_assert(p_pass);
  update waitlist_leads set
    name         = btrim(coalesce(p_name,'')),
    organization = btrim(coalesce(p_organization,'')),
    email        = btrim(coalesce(p_email,'')),
    message      = nullif(btrim(coalesce(p_message,'')),''),
    status       = coalesce(nullif(btrim(coalesce(p_status,'')),''),'New')
  where id = p_id
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_set_waitlist_status(p_pass text, p_id uuid, p_status text)
returns public.waitlist_leads language plpgsql security definer set search_path = public as $$
declare v public.waitlist_leads;
begin
  perform admin_assert(p_pass);
  if p_status not in ('New','Reached Out','Demo Set','Closed') then
    raise exception 'invalid status';
  end if;
  update waitlist_leads set status = p_status where id = p_id returning * into v;
  return v;
end; $$;

create or replace function public.admin_delete_waitlist_lead(p_pass text, p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform admin_assert(p_pass);
  delete from waitlist_leads where id = p_id;
end; $$;

grant execute on function public.admin_list_waitlist_leads(text) to anon, authenticated;
grant execute on function public.admin_create_waitlist_lead(text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.admin_update_waitlist_lead(text,uuid,text,text,text,text,text) to anon, authenticated;
grant execute on function public.admin_set_waitlist_status(text,uuid,text) to anon, authenticated;
grant execute on function public.admin_delete_waitlist_lead(text,uuid) to anon, authenticated;
