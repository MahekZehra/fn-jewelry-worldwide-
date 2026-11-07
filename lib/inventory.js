const getInventoryConfig = () => {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Inventory database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.");
  }

  return { url: url.replace(/\/+$/, ""), serviceKey };
};

async function supabaseRequest(path, options = {}) {
  const { url, serviceKey } = getInventoryConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
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
    const message = data?.message || data?.hint || "Inventory database request failed.";
    throw new Error(message);
  }

  return data;
}

export async function inventoryRpc(name, args = {}) {
  return supabaseRequest(`rpc/${name}`, {
    method: "POST",
    body: JSON.stringify(args),
  });
}

export async function reserveProductItems({
  productIds,
  reservationId,
  customerEmail,
  expiryMinutes = 35,
}) {
  const result = await inventoryRpc("reserve_product_items", {
    p_product_ids: productIds.map(String),
    p_reservation_id: reservationId,
    p_customer_email: customerEmail,
    p_expiry_minutes: expiryMinutes,
  });

  if (!result?.success) {
    const unavailable = Array.isArray(result?.unavailableProductIds)
      ? result.unavailableProductIds.join(", ")
      : "";

    throw new Error(
      result?.reason === "unavailable"
        ? `This piece is no longer available (product ID: ${unavailable}). Please refresh the collection.`
        : result?.reason === "duplicate_product"
          ? "The same piece can only be selected once."
          : "Could not reserve the selected piece. Please refresh and try again."
    );
  }

  return result;
}

export async function releaseProductReservation(reservationId) {
  if (!reservationId) return null;
  return inventoryRpc("release_product_reservation", {
    p_reservation_id: reservationId,
  });
}

export async function completeProductReservation(reservationId, orderNumber) {
  return inventoryRpc("complete_product_reservation", {
    p_reservation_id: reservationId,
    p_order_number: orderNumber,
  });
}

export async function loadUnavailableInventory() {
  await inventoryRpc("release_expired_product_reservations");
  return supabaseRequest(
    "product_inventory?select=product_id,status,reservation_expires_at&status=in.(reserved,sold)",
    { method: "GET" }
  );
}

export async function setProductInventoryStatus(productId, status, orderNumber = null) {
  return inventoryRpc("admin_set_product_inventory_status", {
    p_product_id: String(productId),
    p_status: status,
    p_order_number: orderNumber,
  });
}
