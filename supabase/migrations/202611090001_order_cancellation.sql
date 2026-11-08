-- Persistent order records and safe cancellation support for F&A Collective.
-- Run this migration in the production Supabase SQL Editor before enabling order cancellation.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  customer_city text,
  customer_address text,
  items jsonb not null default '[]'::jsonb,
  total numeric(12,2) not null default 0,
  currency text not null default 'AED',
  payment_method text not null check (payment_method in ('cod', 'stripe')),
  payment_status text not null default 'pending'
    check (payment_status in ('unpaid', 'pending', 'paid', 'refunded', 'failed')),
  status text not null default 'awaiting_payment'
    check (status in ('awaiting_payment', 'confirmed', 'processing', 'cancellation_pending', 'cancelled', 'shipped', 'delivered', 'payment_failed')),
  reservation_id text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  refund_id text,
  cancelled_by text,
  cancellation_reason text,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

create index if not exists orders_status_idx
  on public.orders (status);

create index if not exists orders_customer_email_idx
  on public.orders (lower(customer_email));

alter table public.orders enable row level security;
revoke all on table public.orders from anon, authenticated;
grant select, insert, update, delete on table public.orders to service_role;

create or replace function public.cancel_sold_product_items(p_order_number text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_order_number is null or length(trim(p_order_number)) = 0 then
    return jsonb_build_object('success', false, 'reason', 'invalid_order_number');
  end if;

  update public.product_inventory
     set status = 'available',
         reservation_id = null,
         reserved_email = null,
         reservation_expires_at = null,
         sold_order_number = null,
         sold_at = null,
         updated_at = now()
   where status = 'sold'
     and sold_order_number = p_order_number;

  get diagnostics v_count = row_count;
  return jsonb_build_object('success', true, 'releasedCount', v_count);
end;
$$;

revoke all on function public.cancel_sold_product_items(text) from public, anon, authenticated;
grant execute on function public.cancel_sold_product_items(text) to service_role;
