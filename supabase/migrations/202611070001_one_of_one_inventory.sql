-- One-of-one product inventory for F&A Collective.
-- Run once in Supabase SQL Editor before enabling the Vercel feature.

create table if not exists public.product_inventory (
  product_id text primary key,
  status text not null default 'available'
    check (status in ('available', 'reserved', 'sold')),
  reservation_id text,
  reserved_email text,
  reservation_expires_at timestamptz,
  sold_order_number text,
  sold_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists product_inventory_reservation_id_idx
  on public.product_inventory (reservation_id)
  where reservation_id is not null;

create index if not exists product_inventory_status_idx
  on public.product_inventory (status);

alter table public.product_inventory enable row level security;
revoke all on table public.product_inventory from anon, authenticated;

create or replace function public.release_expired_product_reservations()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  update public.product_inventory
     set status = 'available',
         reservation_id = null,
         reserved_email = null,
         reservation_expires_at = null,
         updated_at = now()
   where status = 'reserved'
     and reservation_expires_at is not null
     and reservation_expires_at <= now();

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

create or replace function public.reserve_product_items(
  p_product_ids text[],
  p_reservation_id text,
  p_customer_email text,
  p_expiry_minutes integer default 35
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_unavailable text[];
  v_count integer;
begin
  if p_product_ids is null
     or cardinality(p_product_ids) = 0
     or cardinality(p_product_ids) > 20
     or p_reservation_id is null
     or length(trim(p_reservation_id)) = 0
     or p_customer_email is null
     or length(trim(p_customer_email)) = 0
     or (p_expiry_minutes is not null and (p_expiry_minutes < 1 or p_expiry_minutes > 1440)) then
    return jsonb_build_object('success', false, 'reason', 'invalid_request');
  end if;

  if cardinality(p_product_ids) <> (
    select count(distinct x) from unnest(p_product_ids) as x
  ) then
    return jsonb_build_object('success', false, 'reason', 'duplicate_product');
  end if;

  insert into public.product_inventory (product_id, status)
  select distinct trim(x), 'available'
    from unnest(p_product_ids) as x
   where trim(x) <> ''
  order by trim(x)
  on conflict (product_id) do nothing;

  perform public.release_expired_product_reservations();

  -- Lock every requested row in a stable order. Competing checkouts
  -- wait here, then re-check status after the first transaction commits.
  perform inv.product_id
    from public.product_inventory as inv
   where inv.product_id = any(p_product_ids)
   order by inv.product_id
   for update;

  select array_agg(inv.product_id order by inv.product_id)
    into v_unavailable
    from public.product_inventory as inv
   where inv.product_id = any(p_product_ids)
     and not (
       inv.status = 'available'
       or (inv.status = 'reserved' and inv.reservation_id = p_reservation_id)
     );

  if v_unavailable is not null then
    return jsonb_build_object(
      'success', false,
      'reason', 'unavailable',
      'unavailableProductIds', to_jsonb(v_unavailable)
    );
  end if;

  update public.product_inventory
     set status = 'reserved',
         reservation_id = p_reservation_id,
         reserved_email = lower(trim(p_customer_email)),
         reservation_expires_at = case
           when p_expiry_minutes is null then null
           else now() + make_interval(mins => p_expiry_minutes)
         end,
         sold_order_number = null,
         sold_at = null,
         updated_at = now()
   where product_id = any(p_product_ids);

  get diagnostics v_count = row_count;
  return jsonb_build_object('success', true, 'reservedCount', v_count);
end;
$$;

create or replace function public.complete_product_reservation(
  p_reservation_id text,
  p_order_number text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_total integer;
  v_ready integer;
  v_sold integer;
begin
  if p_reservation_id is null or p_order_number is null then
    return jsonb_build_object('success', false, 'reason', 'invalid_request');
  end if;

  perform inv.product_id
    from public.product_inventory as inv
   where inv.reservation_id = p_reservation_id
   order by inv.product_id
   for update;

  select count(*),
         count(*) filter (
           where status = 'reserved'
             and (reservation_expires_at is null or reservation_expires_at > now())
         ),
         count(*) filter (
           where status = 'sold' and sold_order_number = p_order_number
         )
    into v_total, v_ready, v_sold
    from public.product_inventory
   where reservation_id = p_reservation_id;

  if v_total > 0 and v_sold = v_total then
    return jsonb_build_object('success', true, 'alreadySold', true);
  end if;

  if v_total = 0 or v_ready <> v_total then
    return jsonb_build_object('success', false, 'reason', 'reservation_not_active');
  end if;

  update public.product_inventory
     set status = 'sold',
         sold_order_number = p_order_number,
         sold_at = now(),
         reservation_expires_at = null,
         updated_at = now()
   where reservation_id = p_reservation_id
     and status = 'reserved';

  return jsonb_build_object('success', true, 'soldCount', v_total);
end;
$$;

create or replace function public.release_product_reservation(
  p_reservation_id text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_reservation_id is null then
    return jsonb_build_object('success', false, 'reason', 'invalid_request');
  end if;

  update public.product_inventory
     set status = 'available',
         reservation_id = null,
         reserved_email = null,
         reservation_expires_at = null,
         updated_at = now()
   where reservation_id = p_reservation_id
     and status = 'reserved';

  get diagnostics v_count = row_count;
  return jsonb_build_object('success', true, 'releasedCount', v_count);
end;
$$;

create or replace function public.admin_set_product_inventory_status(
  p_product_id text,
  p_status text,
  p_order_number text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_product_id is null or p_status not in ('available', 'sold') then
    return jsonb_build_object('success', false, 'reason', 'invalid_request');
  end if;

  insert into public.product_inventory (product_id, status)
  values (p_product_id, 'available')
  on conflict (product_id) do nothing;

  update public.product_inventory
     set status = p_status,
         reservation_id = null,
         reserved_email = null,
         reservation_expires_at = null,
         sold_order_number = case when p_status = 'sold' then p_order_number else null end,
         sold_at = case when p_status = 'sold' then now() else null end,
         updated_at = now()
   where product_id = p_product_id;

  return jsonb_build_object('success', true, 'productId', p_product_id, 'status', p_status);
end;
$$;

revoke all on function public.release_expired_product_reservations() from public, anon, authenticated;
revoke all on function public.reserve_product_items(text[], text, text, integer) from public, anon, authenticated;
revoke all on function public.complete_product_reservation(text, text) from public, anon, authenticated;
revoke all on function public.release_product_reservation(text) from public, anon, authenticated;
revoke all on function public.admin_set_product_inventory_status(text, text, text) from public, anon, authenticated;

grant execute on function public.release_expired_product_reservations() to service_role;
grant execute on function public.reserve_product_items(text[], text, text, integer) to service_role;
grant execute on function public.complete_product_reservation(text, text) to service_role;
grant execute on function public.release_product_reservation(text) to service_role;
grant execute on function public.admin_set_product_inventory_status(text, text, text) to service_role;
