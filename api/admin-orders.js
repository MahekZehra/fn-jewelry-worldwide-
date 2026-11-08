import { listOrders } from "../lib/orders.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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

  try {
    const orders = await listOrders();
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Admin order list failed:", error);
    return res.status(503).json({
      success: false,
      message: "Could not load orders. Check the orders migration in Supabase.",
    });
  }
}
