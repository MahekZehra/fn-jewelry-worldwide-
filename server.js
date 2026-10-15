
import express from "express";
import cors from "cors";
import { Resend } from "resend";
import Stripe from "stripe";
import products from "./src/data/Products.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================================================
   CURRENCY SYMBOLS
========================================================= */

const currencySymbols = {
  AED: "AED",
  PKR: "Rs.",
  SAR: "SAR",
  QAR: "QAR",
  KWD: "KWD",
  GBP: "£",
  USD: "$",
  CAD: "CA$",
  AUD: "A$",
  EUR: "€",
};

/* =========================================================
   STRIPE CHECKOUT SESSION
========================================================= */

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe is not configured on the server.",
      });
    }

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

    // Validate products and calculate prices from the server catalogue.
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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
});

/* =========================================================
   SEND ORDER EMAIL
========================================================= */

app.post("/api/send-order-email", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerCity,
      customerAddress,
      orderNumber,
      items,
      total,
      currency = "AED",
      paymentMethod = "cod",
    } = req.body || {};

    /* VALIDATION */

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product.",
      });
    }

    const selectedCurrency = currencySymbols[currency]
      ? currency
      : "AED";

    const symbol = currencySymbols[selectedCurrency];

    const paymentLabel =
      paymentMethod === "stripe"
        ? "Credit / Debit Card"
        : "Cash on Delivery";

    /* PRODUCT ROWS */

    const productRows = items
      .map((item) => {
        const unitPrice = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        const itemTotal = unitPrice * quantity;

        return `
          <tr style="border-bottom:1px solid #eee;">
            <td style="padding:14px 0;font-size:14px;font-weight:600;color:#222;">
              ${item.name || "Product"}
            </td>
            <td style="padding:14px 10px;text-align:center;color:#666;">
              ${quantity}
            </td>
            <td style="padding:14px 0;text-align:right;font-weight:600;color:#222;">
              ${symbol} ${itemTotal.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        `;
      })
      .join("");

    const numericTotal = Number(total) || 0;

    /* EMAIL TEMPLATE */

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Order Confirmation</title>
        </head>

        <body style="margin:0;padding:0;background:#f5f2ed;font-family:Arial,Helvetica,sans-serif;color:#222;">
          <div style="width:100%;padding:40px 15px;box-sizing:border-box;">
            <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,0.06);">

              <div style="background:#111;padding:36px 30px;text-align:center;">
                <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:4px;color:#fff;font-weight:bold;">
                  FN JEWELRY
                </div>
                <div style="margin-top:8px;font-size:10px;letter-spacing:4px;color:#c7a96b;text-transform:uppercase;">
                  Worldwide
                </div>
              </div>

              <div style="padding:40px 35px;">
                <div style="text-align:center;margin-bottom:30px;">
                  <div style="display:inline-block;width:52px;height:52px;line-height:52px;border-radius:50%;background:#111;color:#fff;font-size:24px;">
                    ✓
                  </div>
                  <h1 style="margin:20px 0 8px;font-family:Georgia,serif;font-size:30px;font-weight:normal;color:#111;">
                    Order Confirmed
                  </h1>
                  <p style="margin:0;color:#888;font-size:14px;">
                    Thank you for choosing F&A Fashion and Jewellery Collection.
                  </p>
                </div>

                <div style="background:#faf8f5;border-radius:16px;padding:22px;margin-bottom:28px;">
                  <p style="margin:0 0 8px;font-size:16px;font-weight:600;">
                    Hello ${customerName},
                  </p>
                  <p style="margin:0;color:#666;font-size:14px;line-height:1.7;">
                    Your order has been successfully placed. We are preparing your beautiful pieces and will contact you regarding delivery.
                  </p>
                </div>

                <div style="padding:18px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:28px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:13px;color:#888;">Order Number</td>
                      <td style="text-align:right;font-size:14px;font-weight:bold;color:#111;">
                        ${orderNumber || "N/A"}
                      </td>
                    </tr>
                  </table>
                </div>

                <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:20px;font-weight:normal;">
                  Delivery Details
                </h2>

                <div style="background:#faf8f5;border-radius:16px;padding:20px;margin-bottom:30px;">
                  <p style="margin:0 0 10px;font-size:14px;">
                    <strong>Name:</strong> ${customerName}
                  </p>
                  <p style="margin:0 0 10px;font-size:14px;">
                    <strong>Email:</strong> ${customerEmail}
                  </p>
                  <p style="margin:0 0 10px;font-size:14px;">
                    <strong>Phone:</strong> ${customerPhone || "Not provided"}
                  </p>
                  <p style="margin:0 0 10px;font-size:14px;">
                    <strong>City:</strong> ${customerCity || "Not provided"}
                  </p>
                  <p style="margin:0;font-size:14px;line-height:1.6;">
                    <strong>Address:</strong><br />
                    ${customerAddress || "Not provided"}
                  </p>
                </div>

                <h2 style="margin:0 0 18px;font-family:Georgia,serif;font-size:20px;font-weight:normal;">
                  Order Summary
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <thead>
                    <tr style="border-bottom:1px solid #eee;">
                      <th style="padding:10px 0;text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#999;">Product</th>
                      <th style="padding:10px;text-align:center;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#999;">Qty</th>
                      <th style="padding:10px 0;text-align:right;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#999;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productRows}
                  </tbody>
                </table>

                <div style="margin-top:25px;padding-top:20px;border-top:1px solid #eee;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:16px;font-weight:bold;">Total</td>
                      <td style="text-align:right;font-size:20px;font-weight:bold;">
                        ${symbol} ${numericTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:24px;padding:18px;background:#111;border-radius:14px;color:#fff;">
                  <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#c7a96b;">
                    Payment Method
                  </div>
                  <div style="margin-top:6px;font-size:15px;font-weight:bold;">
                    ${paymentLabel}
                  </div>
                </div>

                <div style="margin-top:35px;text-align:center;">
                  <p style="margin:0;font-family:Georgia,serif;font-size:18px;">
                    Thank you for shopping with us.
                  </p>
                  <p style="margin:10px 0 0;color:#999;font-size:12px;line-height:1.6;">
                    We appreciate your trust in F&A Fashion and Jewellery Collection.
                  </p>
                </div>
              </div>

              <div style="background:#111;padding:24px;text-align:center;">
                <p style="margin:0;color:#fff;font-family:Georgia,serif;font-size:16px;letter-spacing:2px;">
                  F&A Fashion and Jewellery Collection
                </p>
                <p style="margin:8px 0 0;color:#777;font-size:11px;">
                  This is an automated order confirmation email.
                </p>
              </div>

            </div>
          </div>
        </body>
      </html>
    `;

    /* SEND EMAIL */

    const emailPayload = {
      from: `F&A Fashion and Jewellery Collection <${process.env.FROM_EMAIL}>`,
      to: [customerEmail],
      subject: `Order ${orderNumber || ""} Confirmed — F&A Fashion and Jewellery Collection`,
      html,
    };

    if (process.env.OWNER_EMAIL) {
      emailPayload.bcc = [process.env.OWNER_EMAIL];
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend Error:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Email could not be sent.",
      });
    }

    return res.status(200).json({
      success: true,
      customerEmailSent: true,
      ownerEmailSent: Boolean(process.env.OWNER_EMAIL),
      data,
    });
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process the request.",
    });
  }
});

/* =========================================================
   START SERVER
========================================================= */

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
