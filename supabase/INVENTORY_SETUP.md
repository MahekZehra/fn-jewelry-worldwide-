# One-of-one inventory setup

This feature treats every catalog product as a single, unique piece (quantity 1). The product catalogue remains in `src/data/Products.js`; inventory state is stored separately in Supabase.

## 1. Create the inventory database

1. Create a Supabase project at https://supabase.com/dashboard.
2. Open the project's **SQL Editor**.
3. Run the complete migration in `supabase/migrations/202611070001_one_of_one_inventory.sql`.
4. In **Project Settings → API**, copy the Project URL and the server-side Secret key (`sb_secret_...`) from Settings → API Keys → Secret keys. The code also supports the legacy `service_role` key if required.

The inventory table has Row Level Security enabled and no browser-role access. The service-role key is used only by Vercel server-side API functions. Never put it in frontend code, a `VITE_` variable, or Git.

## 2. Add Vercel environment variables

In the Vercel project connected to this repository, open **Settings → Environment Variables** and add:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SECRET_KEY` | Supabase server-side Secret key (`sb_secret_...`) |
| `INVENTORY_ADMIN_SECRET` | A new, long, random secret used only for the protected inventory admin endpoint |

Add them to **Preview** and **Production**. Redeploy after saving them. Do not commit any of these values to GitHub.

The live inventory API is `GET /api/inventory`. If the database is not configured, the storefront intentionally disables Add to Cart rather than pretending stock has been verified.

## 3. Stripe webhook events

In Stripe Dashboard, open the webhook pointing to `/api/stripe-webhook`. Keep the existing payment events and also enable:

- `checkout.session.expired`
- `checkout.session.async_payment_failed`

Paid Checkout Sessions mark the reserved products as `sold`. Expired or failed sessions release the reservation. Checkout Sessions are limited to 32 minutes; a database expiry is also used as a fallback if an expiry webhook is delayed.

## 4. How stock works

- An item can appear in a visitor's bag only once, and its quantity is fixed at 1.
- At checkout, the server atomically reserves all requested items. If another shopper already reserved or purchased one, checkout is rejected.
- A successful Stripe payment changes the item to `sold`; the product card and detail page then show **Sold Out**.
- An abandoned Stripe Checkout Session releases its reservation when the expiry webhook arrives. A timed database expiry is the fallback.
- A Cash on Delivery order changes the item to `reserved`, not `sold`, because COD is not paid at checkout. The owner email includes an inventory reservation reference. After payment is collected, mark the item sold; if the COD order is cancelled, release it back to available.

## 5. COD inventory management

Use the protected endpoint from a trusted admin tool (never from public frontend code):

`POST https://YOUR-DOMAIN/api/admin-inventory`

Headers:
- `Content-Type: application/json`
- `x-inventory-admin-secret: YOUR_INVENTORY_ADMIN_SECRET`

Mark the item sold after COD payment is collected:

```json
{
  "productId": "123",
  "status": "sold",
  "orderNumber": "FA-123456"
}
```

Release a cancelled COD reservation:

```json
{
  "productId": "123",
  "status": "available"
}
```

Use the actual product ID from `src/data/Products.js`. Keep the admin secret private.

## Important limitation: customer accounts

The current storefront uses guest checkout and does not have customer login/accounts. This change prevents duplicate quantities in one shopping bag and guarantees that only one customer can reserve/buy a one-of-one product globally. It cannot recognize the same human across separate phones/browsers before checkout. Enforcing a person-level limit across devices would require adding customer authentication first.
