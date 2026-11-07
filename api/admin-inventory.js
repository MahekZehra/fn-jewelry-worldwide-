import { setProductInventoryStatus } from "./_lib/inventory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const expectedSecret = process.env.INVENTORY_ADMIN_SECRET;
  const receivedSecret = req.headers["x-inventory-admin-secret"];

  if (
    !expectedSecret ||
    typeof receivedSecret !== "string" ||
    receivedSecret !== expectedSecret
  ) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  const { productId, status, orderNumber } = req.body || {};
  if (!productId || !["available", "sold"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Provide a productId and status of available or sold.",
    });
  }

  try {
    const result = await setProductInventoryStatus(
      productId,
      status,
      orderNumber || null
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Admin inventory update failed:", error);
    return res.status(503).json({
      success: false,
      message: "Could not update product inventory.",
    });
  }
}
