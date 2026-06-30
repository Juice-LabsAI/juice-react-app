-- Lead status + admin CRUD.

-- discount_code becomes free text (admin can set any value); redeem flow still
-- validates against discount_codes inside redeem_code().
alter table public.leads drop constraint if exists leads_discount_code_fkey;

alter table public.leads add column if not exists status text not null default 'New';
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check
  check (status in ('New','Reached Out','Demo Set','Closed'));

-- shared admin gate
create or replace function public.admin_assert(p_pass text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_pass is distinct from 'admin@juice' then
    raise exception 'unauthorized' using errcode = '28000';
  end if;
end; $$;

create or replace function public.admin_create_lead(
  p_pass text, p_first_name text, p_last_name text, p_country_code text,
  p_phone text, p_email text, p_organization text, p_discount_code text, p_status text
) returns public.leads language plpgsql security definer set search_path = public as $$
declare v public.leads;
begin
  perform admin_assert(p_pass);
  insert into leads (first_name,last_name,country_code,phone,email,organization,discount_code,status)
  values (btrim(coalesce(p_first_name,'')), btrim(coalesce(p_last_name,'')), btrim(coalesce(p_country_code,'')),
          btrim(coalesce(p_phone,'')), btrim(coalesce(p_email,'')), btrim(coalesce(p_organization,'')),
          nullif(btrim(coalesce(p_discount_code,'')),''), coalesce(nullif(btrim(coalesce(p_status,'')),''),'New'))
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_update_lead(
  p_pass text, p_id uuid, p_first_name text, p_last_name text, p_country_code text,
  p_phone text, p_email text, p_organization text, p_discount_code text, p_status text
) returns public.leads language plpgsql security definer set search_path = public as $$
declare v public.leads;
begin
  perform admin_assert(p_pass);
  update leads set
    first_name   = btrim(coalesce(p_first_name,'')),
    last_name    = btrim(coalesce(p_last_name,'')),
    country_code = btrim(coalesce(p_country_code,'')),
    phone        = btrim(coalesce(p_phone,'')),
    email        = btrim(coalesce(p_email,'')),
    organization = btrim(coalesce(p_organization,'')),
    discount_code= nullif(btrim(coalesce(p_discount_code,'')),''),
    status       = coalesce(nullif(btrim(coalesce(p_status,'')),''),'New')
  where id = p_id
  returning * into v;
  return v;
end; $$;

create or replace function public.admin_set_status(p_pass text, p_id uuid, p_status text)
returns public.leads language plpgsql security definer set search_path = public as $$
declare v public.leads;
begin
  perform admin_assert(p_pass);
  if p_status not in ('New','Reached Out','Demo Set','Closed') then
    raise exception 'invalid status';
  end if;
  update leads set status = p_status where id = p_id returning * into v;
  return v;
end; $$;

create or replace function public.admin_delete_lead(p_pass text, p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform admin_assert(p_pass);
  delete from leads where id = p_id;
end; $$;

grant execute on function public.admin_create_lead(text,text,text,text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.admin_update_lead(text,uuid,text,text,text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.admin_set_status(text,uuid,text) to anon, authenticated;
grant execute on function public.admin_delete_lead(text,uuid) to anon, authenticated;
