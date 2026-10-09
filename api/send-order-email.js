
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL =
  process.env.OWNER_EMAIL || "info@amnafacollective.com";

const FROM_EMAIL =
  process.env.FROM_EMAIL ||
  "F&A Fashion and Jewellery Collection <info@amnafacollective.com>";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

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
    } = req.body || {};

    if (
      !customerName ||
      !customerEmail ||
      !orderNumber ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order information.",
      });
    }

    if (
      !process.env.RESEND_API_KEY ||
      !OWNER_EMAIL ||
      !FROM_EMAIL
    ) {
      return res.status(500).json({
        success: false,
        message: "Email configuration is incomplete.",
      });
    }

    const safeName = escapeHtml(customerName);
    const safeEmail = escapeHtml(customerEmail);
    const safePhone = escapeHtml(customerPhone || "Not provided");
    const safeCity = escapeHtml(customerCity || "Not provided");
    const safeAddress = escapeHtml(
      customerAddress || "Not provided"
    );
    const safeOrderNumber = escapeHtml(orderNumber);
    const safeCurrency = escapeHtml(currency || "AED");

    const formatAmount = (amount) => {
      const value = Number(amount) || 0;
      return `${safeCurrency} ${value.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    const productRows = items
      .map((item) => {
        const name = escapeHtml(item.name || "Product");
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        const itemTotal = price * quantity;

        return `
          <tr>
            <td style="padding:14px 8px 14px 0;border-bottom:1px solid #eee5df;color:#3E302D;font-size:14px;">
              ${name}
            </td>
            <td style="padding:14px 8px;text-align:center;border-bottom:1px solid #eee5df;color:#6F5D58;font-size:14px;">
              ${quantity}
            </td>
            <td style="padding:14px 0;text-align:right;border-bottom:1px solid #eee5df;color:#3E302D;font-size:14px;">
              ${formatAmount(itemTotal)}
            </td>
          </tr>
        `;
      })
      .join("");

    const orderSummary = `
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;"
      >
        <thead>
          <tr>
            <th style="padding:12px 8px 12px 0;text-align:left;color:#8B7770;font-size:12px;border-bottom:1px solid #eee5df;">
              Product
            </th>
            <th style="padding:12px 8px;text-align:center;color:#8B7770;font-size:12px;border-bottom:1px solid #eee5df;">
              Qty
            </th>
            <th style="padding:12px 0;text-align:right;color:#8B7770;font-size:12px;border-bottom:1px solid #eee5df;">
              Price
            </th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="margin-top:22px;border-collapse:collapse;"
      >
        <tr>
          <td style="padding:12px 0;color:#3E302D;font-size:16px;font-weight:bold;">
            Total
          </td>
          <td style="padding:12px 0;text-align:right;color:#3E302D;font-size:18px;font-weight:bold;">
            ${formatAmount(total)}
          </td>
        </tr>
      </table>
    `;

    const deliveryDetails = `
      <div style="background:#FAF5F2;padding:20px;border-radius:14px;margin:24px 0;color:#665955;font-size:14px;line-height:1.8;">
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>City:</strong> ${safeCity}</p>
        <p><strong>Delivery Address:</strong><br>${safeAddress}</p>
      </div>
    `;

    const emailWrapperStart = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#FAF8F5;padding:30px 12px;color:#3E302D;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #eee5df;border-radius:22px;overflow:hidden;">
          <div style="background:#3E302D;padding:30px 20px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-family:Georgia,serif;font-size:30px;">
              F&amp;A Collective
            </h1>
            <p style="margin:10px 0 0;color:#D9B8AE;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Fashion &amp; Jewellery
            </p>
          </div>
          <div style="padding:28px 24px;">
    `;

    const emailWrapperEnd = `
          </div>
          <div style="background:#3E302D;padding:20px;text-align:center;color:#ffffff;">
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;">
              F&amp;A Fashion and Jewellery Collection
            </p>
            <p style="margin:10px 0 0;color:#D9B8AE;font-size:11px;">
              This is an automated order email.
            </p>
          </div>
        </div>
      </div>
    `;

    const customerEmailHtml = `
      ${emailWrapperStart}

      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-block;background:#FAF5F2;border-radius:50%;width:48px;height:48px;line-height:48px;font-size:24px;">
          ✓
        </div>
        <h2 style="font-family:Georgia,serif;font-size:27px;font-weight:normal;margin:18px 0 8px;">
          Order Confirmed
        </h2>
        <p style="color:#8B7770;font-size:13px;margin:0;">
          Thank you for shopping with us.
        </p>
      </div>

      <h3 style="font-family:Georgia,serif;font-size:21px;font-weight:normal;">
        Thank You, ${safeName}! ❤️
      </h3>

      <p style="color:#665955;line-height:1.8;font-size:14px;">
        Your order has been successfully confirmed. Our team will contact you shortly regarding delivery.
      </p>

      <div style="background:#FAF5F2;padding:18px;border-radius:14px;margin:24px 0;">
        <p style="margin:0;color:#665955;">
          <strong>Order Number:</strong> ${safeOrderNumber}
        </p>
      </div>

      <h3 style="font-family:Georgia,serif;font-size:21px;font-weight:normal;">
        Delivery Details
      </h3>

      ${deliveryDetails}

      <h3 style="font-family:Georgia,serif;font-size:21px;font-weight:normal;">
        Order Summary
      </h3>

      ${orderSummary}

      <div style="margin-top:24px;background:#FAF5F2;padding:18px;border-radius:14px;">
        <p style="margin:0;color:#665955;">
          <strong>Payment Method:</strong> Cash on Delivery
        </p>
      </div>

      <p style="margin:28px 0 0;text-align:center;color:#8B7770;line-height:1.7;font-size:13px;">
        We appreciate your trust in F&amp;A Fashion and Jewellery Collection.
      </p>

      ${emailWrapperEnd}
    `;

    const ownerEmailHtml = `
      ${emailWrapperStart}

      <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:normal;margin-top:0;">
        New Order Received
      </h2>

      <p style="color:#8B7770;font-size:13px;">
        A new order has been placed on your website.
      </p>

      <div style="background:#FAF5F2;padding:18px;border-radius:14px;margin:22px 0;">
        <p style="margin:0;color:#665955;">
          <strong>Order Number:</strong> ${safeOrderNumber}
        </p>
      </div>

      <h3 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;">
        Customer Details
      </h3>

      ${deliveryDetails}

      <h3 style="font-family:Georgia,serif;font-size:20px;font-weight:normal;">
        Order Items
      </h3>

      ${orderSummary}

      <div style="margin-top:24px;background:#3E302D;padding:18px;border-radius:14px;color:#ffffff;">
        <p style="margin:0;">
          <strong>Payment Method:</strong> Cash on Delivery
        </p>
      </div>

      ${emailWrapperEnd}
    `;

    // Send the customer confirmation and owner notification.
    // Both are attempted for every valid order.
    const [customerResult, ownerResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [customerEmail],
        subject: `Your Order ${orderNumber} Has Been Confirmed 🎉`,
        html: customerEmailHtml,
      }),

      resend.emails.send({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject: `New Order ${orderNumber} — ${customerName}`,
        html: ownerEmailHtml,
      }),
    ]);

    if (customerResult.error) {
      console.error("Customer email error:", customerResult.error);
    }

    if (ownerResult.error) {
      console.error("Owner notification error:", ownerResult.error);
    }

    if (customerResult.error || ownerResult.error) {
      return res.status(502).json({
        success: false,
        customerEmailSent: !customerResult.error,
        ownerEmailSent: !ownerResult.error,
        message: "One or more order emails could not be sent.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer confirmation and owner notification emails sent.",
      orderNumber,
      customerEmailSent: true,
      ownerEmailSent: true,
    });
  } catch (error) {
    console.error("Order email API error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process order emails.",
    });
  }
}
