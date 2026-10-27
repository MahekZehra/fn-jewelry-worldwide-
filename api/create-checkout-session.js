import Stripe from "stripe";
import products from "../src/data/Products.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

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
    } = req.body || {};

    if (
      !customerName ||
      !customerEmail ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide customer details and cart items.",
      });
    }

    // Always calculate prices from the server's product catalog.
    const lineItems = items.map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.id)
      );

      const quantity = Number(item.quantity);

      if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        throw new Error("Invalid product or quantity in cart.");
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
        quantity,
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customerEmail,
      billing_address_collection: "required",

      metadata: {
        orderNumber,
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
    console.error("Stripe Checkout Session Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Could not start online checkout.",
    });
  }
}
