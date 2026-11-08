import { loadUnavailableInventory } from "../lib/inventory.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  try {
    const items = await loadUnavailableInventory();
    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Inventory lookup failed:", error);
    return res.status(503).json({
      success: false,
      message: "Live inventory is temporarily unavailable. Please try again shortly.",
    });
  }
}
