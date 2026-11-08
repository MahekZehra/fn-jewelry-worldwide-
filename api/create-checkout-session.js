import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import products from "../src/data/Products.js";
import {
  reserveProductItems,
  releaseProductReservation,
} from "../lib/inventory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  let reservationId = null;

  try {
    if (!process.env.STRIPE_SECRET_KEY_NEW) {
      return res.status(500).json({
        success: false,
        message: "Stripe is not configured on the server.",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_NEW);

    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      customerCity,
      customerAddress,
      selectedCountryCode,
    } = req.body || {};

    if (String(selectedCountryCode || "").toUpperCase() !== "AE") {
      return res.status(403).json({
        success: false,
        message: "We're currently delivering only within the United Arab Emirates. International shipping is not available right now.",
      });
    }

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
        message: "Please provide customer details and cart items.",
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
        message: "Each one-of-one piece can only be purchased once.",
      });
    }

    // Always calculate prices from the server's product catalogue.
    const lineItems = normalizedItems.map((item) => {
      const product = products.find(
        (p) => String(p.id) === item.id
      );

      if (!product) {
        throw new Error("One or more selected products could not be found.");
      }

      const unitPrice =
        product.onSale === true &&
        Number(product.salePriceAED) > 0
          ? Number(product.salePriceAED)
          : Number(product.priceAED ?? product.price);

      if (!Number.isFinite(unitPrice) || unitPrice < 2) {
        throw new Error(`Invalid price for ${product.name}.`);
      }

      return {
        price_data: {
          currency: "aed",
          product_data: {
            name: product.name,
            metadata: {
              productId: String(product.id),
            },
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: 1,
      };
    });

    const siteUrl = process.env.SITE_URL;
    if (!siteUrl) {
      return res.status(500).json({
        success: false,
        message: "SITE_URL is not configured on the server.",
      });
    }

    const orderNumber = `FA-${Date.now()}`;
    reservationId = `FA-STRIPE-${randomUUID()}`;

    // Reserve all selected items in one atomic database operation.
    // A concurrent customer cannot reserve the same product.
    await reserveProductItems({
      productIds,
      reservationId,
      customerEmail,
      expiryMinutes: 40,
    });

    try {
      const expiresAt = Math.floor(Date.now() / 1000) + 32 * 60;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        customer_email: customerEmail,
        billing_address_collection: "required",
        expires_at: expiresAt,
        client_reference_id: orderNumber,

        metadata: {
          orderNumber,
          reservationId,
          productIds: productIds.join(","),
          customerName: String(customerName).slice(0, 200),
          customerEmail: String(customerEmail).slice(0, 200),
          customerPhone: String(customerPhone || "").slice(0, 200),
          customerCity: String(customerCity || "").slice(0, 200),
          customerAddress: String(customerAddress || "").slice(0, 200),
        },

        success_url:
          `${siteUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${siteUrl}/checkout?payment=cancelled`,
      });

      return res.status(200).json({
        success: true,
        url: session.url,
      });
    } catch (error) {
      await releaseProductReservation(reservationId).catch((releaseError) => {
        console.error("Could not release failed Stripe reservation:", releaseError);
      });
      throw error;
    }
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Could not start secure online checkout.",
    });
  }
}
