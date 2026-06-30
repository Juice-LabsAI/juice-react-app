-- Reusable admin codes.
-- Customer codes are single-use (reusable = false). Admin/internal codes are
-- multi-use: they validate every time and are never marked redeemed.

alter table public.discount_codes
  add column if not exists reusable boolean not null default false;

-- The four internal admin codes. Stored in canonical XXXX-XXXX form so they
-- match what redeem_code() builds from user input.
insert into public.discount_codes (code, reusable) values
  ('DEVA-CODE', true),
  ('HEMA-CODE', true),
  ('KRUP-CODE', true),
  ('KAMA-CODE', true)
on conflict (code) do update set reusable = excluded.reusable;

-- redeem_code(): a reusable code skips the "already used" check and is never
-- consumed; single-use codes behave exactly as before.
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
  -- all fields required EXCEPT the discount code
  if btrim(coalesce(p_first_name,'')) = ''
     or btrim(coalesce(p_last_name,'')) = ''
     or btrim(coalesce(p_email,'')) = ''
     or btrim(coalesce(p_phone,'')) = ''
     or btrim(coalesce(p_country_code,'')) = ''
     or btrim(coalesce(p_organization,'')) = '' then
    return jsonb_build_object('ok', false, 'error', 'missing_fields');
  end if;

  if v_raw = '' then
    -- register without a code
    insert into leads (first_name, last_name, country_code, phone, email, organization, discount_code)
    values (btrim(p_first_name), btrim(p_last_name), btrim(p_country_code), btrim(p_phone),
            btrim(p_email), btrim(p_organization), null)
    returning id into v_id;
    return jsonb_build_object('ok', true, 'lead_id', v_id);
  end if;

  -- a code was supplied -> it must be valid
  if length(v_raw) <> 8 then
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;
  v_code := substr(v_raw,1,4) || '-' || substr(v_raw,5,4);

  select * into v_row from discount_codes where code = v_code for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;
  -- single-use codes can only be redeemed once; reusable codes never lock
  if v_row.redeemed and not v_row.reusable then
    return jsonb_build_object('ok', false, 'error', 'code_used');
  end if;

  insert into leads (first_name, last_name, country_code, phone, email, organization, discount_code)
  values (btrim(p_first_name), btrim(p_last_name), btrim(p_country_code), btrim(p_phone),
          btrim(p_email), btrim(p_organization), v_code)
  returning id into v_id;

  -- only consume single-use codes
  if not v_row.reusable then
    update discount_codes set redeemed = true, redeemed_at = now() where code = v_code;
  end if;
  return jsonb_build_object('ok', true, 'lead_id', v_id);
end;
$$;
