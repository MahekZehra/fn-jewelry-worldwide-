import { randomUUID } from "node:crypto";
import products from "../src/data/Products.js";
import {
  reserveProductItems,
  releaseProductReservation,
} from "../lib/inventory.js";

const currencyRates = {
  AED: 1,
  PKR: 275,
  SAR: 1.02,
  QAR: 1,
  KWD: 0.084,
  GBP: 0.215,
  USD: 0.272,
  CAD: 0.375,
  AUD: 0.42,
  EUR: 0.25,
};

function getUnitPriceAED(product) {
  return product.onSale === true && Number(product.salePriceAED) > 0
    ? Number(product.salePriceAED)
    : Number(product.priceAED ?? product.price);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const body = req.body || {};
  const {
    customerName,
    customerEmail,
    customerPhone,
    customerCity,
    customerAddress,
    items,
    currency = "AED",
  } = body;

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !customerCity ||
    !customerAddress ||
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > 20
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all delivery details and your selected items.",
    });
  }

  const normalizedItems = items.map((item) => ({
    id: String(item?.id ?? ""),
    quantity: Number(item?.quantity),
  }));
  const productIds = normalizedItems.map((item) => item.id);

  if (
    normalizedItems.some((item) => !item.id || item.quantity !== 1) ||
    new Set(productIds).size !== productIds.length
  ) {
    return res.status(400).json({
      success: false,
      message: "Each one-of-one piece can only be ordered once.",
    });
  }

  const selectedCurrency = currencyRates[currency] ? currency : "AED";
  const rate = currencyRates[selectedCurrency];
  const orderProducts = normalizedItems.map(({ id }) =>
    products.find((product) => String(product.id) === id)
  );

  if (orderProducts.some((product) => !product)) {
    return res.status(400).json({
      success: false,
      message: "One or more selected products could not be found.",
    });
  }

  const emailItems = orderProducts.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: 1,
    price: Number((getUnitPriceAED(product) * rate).toFixed(2)),
  }));
  const total = Number(
    emailItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  );

  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    return res.status(500).json({
      success: false,
      message: "SITE_URL is not configured on the server.",
    });
  }

  const reservationId = `FA-COD-${randomUUID()}`;
  const orderNumber = `FA-${Date.now()}`;

  try {
    // COD orders reserve the one-of-one item until the team marks it sold
    // after collection, or releases it if the order is cancelled.
    await reserveProductItems({
      productIds,
      reservationId,
      customerEmail,
      expiryMinutes: null,
    });

    const emailResponse = await fetch(
      `${siteUrl.replace(/\/+$/, "")}/api/send-order-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          customerCity,
          customerAddress,
          orderNumber,
          reservationId,
          items: emailItems,
          total,
          currency: selectedCurrency,
          paymentMethod: "cod",
        }),
      }
    );

    const emailResult = await emailResponse.json().catch(() => null);
    if (
      !emailResponse.ok ||
      !emailResult?.success ||
      !emailResult?.customerEmailSent ||
      !emailResult?.ownerEmailSent
    ) {
      throw new Error(
        emailResult?.message || "Order emails could not both be sent."
      );
    }

    return res.status(200).json({
      success: true,
      orderNumber,
      reservationId,
      total,
      currency: selectedCurrency,
    });
  } catch (error) {
    await releaseProductReservation(reservationId).catch((releaseError) => {
      console.error("Could not release failed COD reservation:", releaseError);
    });
    console.error("COD order creation failed:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Could not place your order. Please try again.",
    });
  }
}
