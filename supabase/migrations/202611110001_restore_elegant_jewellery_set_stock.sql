-- Restore Elegant Jewellery Set (product ID 13) to available stock.
-- This piece has not been sold; clear any stale reservation or sold marker.
insert into public.product_inventory (
  product_id,
  status,
  reservation_id,
  reserved_email,
  reservation_expires_at,
  sold_order_number,
  sold_at,
  updated_at
)
values (
  '13',
  'available',
  null,
  null,
  null,
  null,
  null,
  now()
)
on conflict (product_id)
do update set
  status = 'available',
  reservation_id = null,
  reserved_email = null,
  reservation_expires_at = null,
  sold_order_number = null,
  sold_at = null,
  updated_at = now();
