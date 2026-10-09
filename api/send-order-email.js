import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL =
  process.env.OWNER_EMAIL || "info@amnafacollective.com";

const FROM_EMAIL =
  process.env.FROM_EMAIL ||
  "F&A Fashion and Jewellery Collection <info@amnafacollective.com>";

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
      currency,
    } = req.body;

    if (!customerName || !customerEmail || !orderNumber || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required order information.",
      });
    }

    const safeCurrency = currency || "AED";

    const formatAmount = (amount) => {
      const number = Number(amount) || 0;

      return `${safeCurrency} ${number.toLocaleString()}`;
    };

    const productRows = items
      .map(
        (item) => `
          <tr>
            <td style="
              padding:12px 0;
              border-bottom:1px solid #eee;
              color:#3E302D;
            ">
              ${item.name || "Product"}
            </td>

            <td style="
              padding:12px 0;
              text-align:center;
              border-bottom:1px solid #eee;
              color:#6F5D58;
            ">
              ${Number(item.quantity) || 1}
            </td>

            <td style="
              padding:12px 0;
              text-align:right;
              border-bottom:1px solid #eee;
              color:#3E302D;
            ">
              ${formatAmount(
                (Number(item.price) || 0) *
                  (Number(item.quantity) || 1)
              )}
            </td>
          </tr>
        `
      )
      .join("");

    /*
      =====================================================
      CUSTOMER EMAIL
      =====================================================
    */

    const customerEmailHtml = `
      <div style="
        font-family:Arial,sans-serif;
        background:#FAF8F5;
        padding:40px 20px;
      ">

        <div style="
          max-width:620px;
          margin:auto;
          background:#ffffff;
          padding:40px;
          border-radius:24px;
          border:1px solid #eee5df;
        ">

          <div style="text-align:center;">

            <h1 style="
              margin:0;
              font-family:Georgia,serif;
              color:#3E302D;
              font-size:30px;
            ">
              F&A Collective
            </h1>

            <p style="
              margin-top:10px;
              color:#B18A83;
              font-size:12px;
              letter-spacing:2px;
              text-transform:uppercase;
            ">
              Order Confirmed
            </p>

          </div>

          <hr style="
            border:none;
            border-top:1px solid #eee;
            margin:30px 0;
          " />

          <h2 style="
            color:#3E302D;
            font-family:Georgia,serif;
            font-weight:normal;
          ">
            Thank You, ${customerName}! ❤️
          </h2>

          <p style="
            color:#665955;
            line-height:1.7;
          ">
            Your order has been successfully confirmed.
            We have received your order and our team will
            contact you shortly regarding delivery.
          </p>

          <div style="
            background:#FAF5F2;
            padding:18px;
            border-radius:14px;
            margin:25px 0;
          ">

            <p style="margin:0;color:#665955;">
              <strong>Order Number:</strong>
              ${orderNumber}
            </p>

          </div>

          <h3 style="
            color:#3E302D;
            font-family:Georgia,serif;
          ">
            Order Summary
          </h3>

          <table style="
            width:100%;
            border-collapse:collapse;
          ">

            <thead>
              <tr>

                <th style="
                  text-align:left;
                  padding:10px 0;
                  color:#8B7770;
                  font-size:12px;
                ">
                  Product
                </th>

                <th style="
                  padding:10px 0;
                  color:#8B7770;
                  font-size:12px;
                ">
                  Qty
                </th>

                <th style="
                  text-align:right;
                  padding:10px 0;
                  color:#8B7770;
                  font-size:12px;
                ">
                  Price
                </th>

              </tr>
            </thead>

            <tbody>
              ${productRows}
            </tbody>

          </table>

          <div style="
            margin-top:25px;
            padding-top:20px;
            border-top:1px solid #eee;
            display:flex;
            justify-content:space-between;
            font-size:16px;
            color:#3E302D;
          ">

            <strong>Total</strong>

            <strong>
              ${formatAmount(total)}
            </strong>

          </div>

          <div style="
            margin-top:25px;
            padding:16px;
            background:#FAF5F2;
            border-radius:12px;
            color:#665955;
          ">

            <strong>Payment Method:</strong>
            Cash on Delivery

          </div>

          <p style="
            margin-top:30px;
            text-align:center;
            color:#999;
            line-height:1.6;
          ">
            Thank you for shopping with
            F&A Fashion and Jewellery Collection.
          </p>

        </div>

      </div>
    `;

    /*
      =====================================================
      OWNER EMAIL
      =====================================================
    */

    const ownerEmailHtml = `
      <div style="
        font-family:Arial,sans-serif;
        background:#FAF8F5;
        padding:40px 20px;
      ">

        <div style="
          max-width:650px;
          margin:auto;
          background:#ffffff;
          padding:40px;
          border-radius:24px;
          border:1px solid #eee5df;
        ">

          <h1 style="
            font-family:Georgia,serif;
            color:#3E302D;
            margin-top:0;
          ">
            New Order Received
          </h1>

          <p style="
            color:#B18A83;
            font-size:12px;
            letter-spacing:2px;
            text-transform:uppercase;
          ">
            F&A Collective
          </p>

          <hr style="
            border:none;
            border-top:1px solid #eee;
            margin:25px 0;
          " />

          <h2 style="
            font-family:Georgia,serif;
            color:#3E302D;
          ">
            Order ${orderNumber}
          </h2>

          <div style="
            background:#FAF5F2;
            padding:20px;
            border-radius:14px;
            margin:20px 0;
          ">

            <p>
              <strong>Customer:</strong>
              ${customerName}
            </p>

            <p>
              <strong>Email:</strong>
              ${customerEmail}
            </p>

            <p>
              <strong>Phone:</strong>
              ${customerPhone || "Not provided"}
            </p>

            <p>
              <strong>City:</strong>
              ${customerCity || "Not provided"}
            </p>

            <p>
              <strong>Delivery Address:</strong><br />
              ${customerAddress || "Not provided"}
            </p>

          </div>

          <h3 style="
            color:#3E302D;
            font-family:Georgia,serif;
          ">
            Order Items
          </h3>

          <table style="
            width:100%;
            border-collapse:collapse;
          ">

            <thead>
              <tr>

                <th style="
                  text-align:left;
                  padding:10px 0;
                ">
                  Product
                </th>

                <th style="
                  padding:10px 0;
                ">
                  Qty
                </th>

                <th style="
                  text-align:right;
                  padding:10px 0;
                ">
                  Price
                </th>

              </tr>
            </thead>

            <tbody>
              ${productRows}
            </tbody>

          </table>

          <div style="
            margin-top:25px;
            padding-top:20px;
            border-top:1px solid #eee;
            display:flex;
            justify-content:space-between;
            font-size:18px;
            color:#3E302D;
          ">

            <strong>Total</strong>

            <strong>
              ${formatAmount(total)}
            </strong>

          </div>

          <div style="
            margin-top:25px;
            padding:15px;
            background:#F4ECE8;
            border-radius:12px;
            color:#5E4B46;
          ">
            <strong>Payment:</strong>
            Cash on Delivery
          </div>

        </div>

      </div>
    `;

    /*
      =====================================================
      SEND BOTH EMAILS
      =====================================================
    */

    const [customerResult, ownerResult] =
      await Promise.all([
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
      console.error(
        "Customer email error:",
        customerResult.error
      );

      return res.status(400).json({
        success: false,
        message: "Customer confirmation email could not be sent.",
        error: customerResult.error,
      });
    }

    if (ownerResult.error) {
      console.error(
        "Owner email error:",
        ownerResult.error
      );

      return res.status(400).json({
        success: false,
        message: "Owner order notification could not be sent.",
        error: ownerResult.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order emails sent successfully.",
      orderNumber,
      customerEmail: customerResult.data,
      ownerEmail: ownerResult.data,
    });

  } catch (error) {
    console.error("Order email API error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process order.",
      error:
        error?.message ||
        "Unknown server error",
    });
  }
}