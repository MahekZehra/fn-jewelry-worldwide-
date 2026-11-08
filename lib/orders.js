import { createHmac, timingSafeEqual } from "node:crypto";

function getDatabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Orders database is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel.");
  }

  return {
    url: url.replace(/\/+$/, ""),
    serviceKey,
    usesLegacyKey: !serviceKey.startsWith("sb_secret_"),
  };
}

async function ordersRequest(path, options = {}) {
  const { url, serviceKey, usesLegacyKey } = getDatabaseConfig();
  const authHeaders = usesLegacyKey
    ? { Authorization: "Bearer " + serviceKey }
    : {};

  const response = await fetch(url + "/rest/v1/" + path, {
    ...options,
    headers: {
      apikey: serviceKey,
      ...authHeaders,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const body = await response.text();
  let data = null;
  try {
    data = body ? JSON.parse(body) : null;
  } catch {
    data = body;
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.hint || "Order database request failed.");
  }

  return data;
}

export async function upsertOrder(order) {
  return ordersRequest("orders?on_conflict=order_number", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(order),
  });
}

export async function getOrder(orderNumber) {
  const rows = await ordersRequest(
    "orders?select=*&order_number=eq." + encodeURIComponent(orderNumber) + "&limit=1",
    { method: "GET" }
  );
  return Array.isArray(rows) ? rows[0] || null : null;
}

export async function listOrders() {
  return ordersRequest(
    "orders?select=order_number,customer_name,customer_email,customer_phone,customer_city,customer_address,items,total,currency,payment_method,payment_status,status,created_at,cancelled_at,cancellation_reason,refund_id&order=created_at.desc&limit=100",
    { method: "GET" }
  );
}

export async function updateOrder(orderNumber, updates, expectedStatus = null) {
  let path =
    "orders?order_number=eq." + encodeURIComponent(orderNumber);
  if (expectedStatus) {
    path += "&status=eq." + encodeURIComponent(expectedStatus);
  }

  return ordersRequest(path, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      ...updates,
      updated_at: new Date().toISOString(),
    }),
  });
}

export function makeCustomerCancelToken(orderNumber, customerEmail) {
  const secret = process.env.INTERNAL_ORDER_EMAIL_SECRET;
  if (!secret) {
    throw new Error("Order cancellation signing secret is not configured.");
  }

  return createHmac("sha256", secret)
    .update(String(orderNumber) + ":" + String(customerEmail).trim().toLowerCase())
    .digest("hex");
}

export function verifyCustomerCancelToken(orderNumber, customerEmail, token) {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) {
    return false;
  }

  const expected = Buffer.from(
    makeCustomerCancelToken(orderNumber, customerEmail),
    "hex"
  );
  const supplied = Buffer.from(token, "hex");

  return expected.length === supplied.length &&
    timingSafeEqual(expected, supplied);
}
