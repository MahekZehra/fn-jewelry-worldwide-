
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    );
  }

  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY_NEW;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const siteUrl = process.env.SITE_URL;
  const internalEmailSecret =
    process.env.INTERNAL_ORDER_EMAIL_SECRET;

  if (
    !secretKey ||
    !webhookSecret ||
    !siteUrl ||
    !internalEmailSecret
  ) {
    console.error("Stripe webhook environment configuration missing.");

    return res.status(500).json({
      success: false,
      message: "Webhook configuration is incomplete.",
    });
  }

  const signature = req.headers["stripe-signature"];

  if (!signature || typeof signature !== "string") {
    return res.status(400).json({
      success: false,
      message: "Missing Stripe signature.",
    });
  }

  const stripe = new Stripe(secretKey);

  let event;

  // Verify Stripe's signature against the original raw body.
  try {
    const rawBody = await readRawBody(req);

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error.message);

    return res.status(400).json({
      success: false,
      message: "Invalid webhook signature.",
    });
  }

  // Ignore unrelated events.
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return res.status(200).json({
      received: true,
      ignored: true,
    });
  }

  const eventSession = event.data.object;

  if (
    !eventSession ||
    eventSession.object !== "checkout.session" ||
    eventSession.mode !== "payment"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid Checkout Session event.",
    });
  }

  // A completed Checkout Session is not necessarily paid.
  if (eventSession.payment_status !== "paid") {
    return res.status(200).json({
      received: true,
      paid: false,
    });
  }

  try {
    // Retrieve the current session from Stripe rather than
    // relying only on the event's embedded session data.
    const session = await stripe.checkout.sessions.retrieve(
      eventSession.id
    );

    if (
      session.payment_status !== "paid" ||
      session.status !== "complete" ||
      session.mode !== "payment"
    ) {
      return res.status(200).json({
        received: true,
        paid: false,
      });
    }

    const metadata = session.metadata || {};

    const orderNumber = metadata.orderNumber;
    const customerName = metadata.customerName;
    const customerEmail =
      metadata.customerEmail || session.customer_details?.email;

    if (
      !orderNumber ||
      !customerName ||
      !customerEmail ||
      !metadata.customerAddress ||
      !metadata.customerCity
    ) {
      console.error("Required order metadata missing.", session.id);

      return res.status(500).json({
        success: false,
        message: "Required order details are missing.",
      });
    }

    if (
      session.currency !== "aed" ||
      !Number.isInteger(session.amount_total) ||
      session.amount_total <= 0
    ) {
      console.error("Unexpected currency or total.", session.id);

      return res.status(400).json({
        success: false,
        message: "Invalid payment currency or amount.",
      });
    }

    // Retrieve actual purchased line items from Stripe.
    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );

    if (!lineItems.data.length || lineItems.has_more) {
      return res.status(500).json({
        success: false,
        message: "Unable to verify all order items.",
      });
    }

    const items = lineItems.data.map((line) => {
      const quantity = Number(line.quantity);
      const unitAmount = line.price?.unit_amount;
      const itemCurrency = line.currency;

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !Number.isInteger(unitAmount) ||
        unitAmount < 0 ||
        itemCurrency !== "aed"
      ) {
        throw new Error("Invalid Stripe line item.");
      }

      return {
        name: line.description || "F&A Product",
        quantity,
        price: unitAmount / 100,
      };
    });

    // Confirm that the line-item totals match Stripe's
    // verified Checkout Session total.
    const calculatedTotalInMinorUnits = lineItems.data.reduce(
      (sum, line) =>
        sum + (line.price.unit_amount * line.quantity),
      0
    );

    if (calculatedTotalInMinorUnits !== session.amount_total) {
      console.error("Order total mismatch.", session.id);

      return res.status(400).json({
        success: false,
        message: "Order total verification failed.",
      });
    }

    // Send online-order emails through the existing Resend API.
    // The internal secret must match the Vercel environment variable.
    const emailResponse = await fetch(
      `${siteUrl.replace(/\/+$/, "")}/api/send-order-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-order-secret": internalEmailSecret,
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone: metadata.customerPhone || "",
          customerCity: metadata.customerCity,
          customerAddress: metadata.customerAddress,
          orderNumber,
          items,
          total: session.amount_total / 100,
          currency: "AED",
          paymentMethod: "stripe",
        }),
      }
    );

    const emailResult = await emailResponse.json().catch(() => null);

    if (!emailResponse.ok || !emailResult?.success) {
      console.error("Order email processing failed.", {
        sessionId: session.id,
        status: emailResponse.status,
      });

      // Non-2xx response asks Stripe to retry the event.
      return res.status(500).json({
        success: false,
        message: "Order email processing failed.",
      });
    }

    console.log("Paid Stripe order processed.", {
      orderNumber,
      sessionId: session.id,
      eventId: event.id,
    });

    return res.status(200).json({
      received: true,
      paid: true,
      orderNumber,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed.",
    });
  }
}
