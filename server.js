import express from "express";
import cors from "cors";
import { Resend } from "resend";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

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
    } = req.body;

    // Validate required information
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product",
      });
    }

    // Create product rows
    const productRows = items
      .map(
        (item) => `
          <tr style="border-bottom:1px solid #eee;">
            <td style="padding:14px 0;">
              <div style="font-size:14px;font-weight:600;color:#222;">
                ${item.name}
              </div>
            </td>

            <td style="padding:14px 10px;text-align:center;color:#666;">
              ${item.quantity}
            </td>

            <td style="padding:14px 0;text-align:right;font-weight:600;color:#222;">
              Rs. ${(item.price * item.quantity).toLocaleString()}
            </td>
          </tr>
        `
      )
      .join("");

    // Send email
    const { data, error } = await resend.emails.send({
      from: "FN Jewelry Worldwide <onboarding@resend.dev>",
      to: [customerEmail],

      subject: `Order ${orderNumber} Confirmed — FN Jewelry Worldwide`,

      html: `
        <!DOCTYPE html>

        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              Order Confirmation
            </title>
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f5f2ed;
              font-family:Arial,Helvetica,sans-serif;
              color:#222;
            "
          >

            <div
              style="
                width:100%;
                padding:40px 15px;
                box-sizing:border-box;
              "
            >

              <div
                style="
                  max-width:620px;
                  margin:0 auto;
                  background:#ffffff;
                  border-radius:24px;
                  overflow:hidden;
                  box-shadow:0 10px 35px rgba(0,0,0,0.06);
                "
              >

                <!-- HEADER -->

                <div
                  style="
                    background:#111111;
                    padding:36px 30px;
                    text-align:center;
                  "
                >

                  <div
                    style="
                      font-family:Georgia,serif;
                      font-size:28px;
                      letter-spacing:4px;
                      color:#ffffff;
                      font-weight:bold;
                    "
                  >
                    FN JEWELRY
                  </div>

                  <div
                    style="
                      margin-top:8px;
                      font-size:10px;
                      letter-spacing:4px;
                      color:#c7a96b;
                      text-transform:uppercase;
                    "
                  >
                    Worldwide
                  </div>

                </div>


                <!-- CONFIRMATION -->

                <div
                  style="
                    padding:40px 35px;
                  "
                >

                  <div
                    style="
                      text-align:center;
                      margin-bottom:30px;
                    "
                  >

                    <div
                      style="
                        display:inline-block;
                        width:52px;
                        height:52px;
                        line-height:52px;
                        border-radius:50%;
                        background:#111111;
                        color:#ffffff;
                        font-size:24px;
                      "
                    >
                      ✓
                    </div>

                    <h1
                      style="
                        margin:20px 0 8px;
                        font-family:Georgia,serif;
                        font-size:30px;
                        font-weight:normal;
                        color:#111111;
                      "
                    >
                      Order Confirmed
                    </h1>

                    <p
                      style="
                        margin:0;
                        color:#888888;
                        font-size:14px;
                      "
                    >
                      Thank you for choosing FN Jewelry Worldwide.
                    </p>

                  </div>


                  <!-- CUSTOMER GREETING -->

                  <div
                    style="
                      background:#faf8f5;
                      border-radius:16px;
                      padding:22px;
                      margin-bottom:28px;
                    "
                  >

                    <p
                      style="
                        margin:0 0 8px;
                        font-size:16px;
                        font-weight:600;
                      "
                    >
                      Hello ${customerName},
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#666666;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      Your order has been successfully placed.
                      We are preparing your beautiful pieces and will
                      contact you regarding delivery.
                    </p>

                  </div>


                  <!-- ORDER NUMBER -->

                  <div
                    style="
                      padding:18px 0;
                      border-top:1px solid #eeeeee;
                      border-bottom:1px solid #eeeeee;
                      margin-bottom:28px;
                    "
                  >

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                    >

                      <tr>

                        <td
                          style="
                            font-size:13px;
                            color:#888888;
                          "
                        >
                          Order Number
                        </td>

                        <td
                          style="
                            text-align:right;
                            font-size:14px;
                            font-weight:bold;
                            color:#111111;
                          "
                        >
                          ${orderNumber}
                        </td>

                      </tr>

                    </table>

                  </div>


                  <!-- CUSTOMER DETAILS -->

                  <h2
                    style="
                      margin:0 0 16px;
                      font-family:Georgia,serif;
                      font-size:20px;
                      font-weight:normal;
                    "
                  >
                    Delivery Details
                  </h2>

                  <div
                    style="
                      background:#faf8f5;
                      border-radius:16px;
                      padding:20px;
                      margin-bottom:30px;
                    "
                  >

                    <p
                      style="
                        margin:0 0 10px;
                        font-size:14px;
                      "
                    >
                      <strong>Name:</strong>
                      ${customerName}
                    </p>

                    <p
                      style="
                        margin:0 0 10px;
                        font-size:14px;
                      "
                    >
                      <strong>Email:</strong>
                      ${customerEmail}
                    </p>

                    <p
                      style="
                        margin:0 0 10px;
                        font-size:14px;
                      "
                    >
                      <strong>Phone:</strong>
                      ${customerPhone || "Not provided"}
                    </p>

                    <p
                      style="
                        margin:0 0 10px;
                        font-size:14px;
                      "
                    >
                      <strong>City:</strong>
                      ${customerCity || "Not provided"}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.6;
                      "
                    >
                      <strong>Address:</strong><br />
                      ${customerAddress || "Not provided"}
                    </p>

                  </div>


                  <!-- ORDER SUMMARY -->

                  <h2
                    style="
                      margin:0 0 18px;
                      font-family:Georgia,serif;
                      font-size:20px;
                      font-weight:normal;
                    "
                  >
                    Order Summary
                  </h2>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse:collapse;
                    "
                  >

                    <thead>

                      <tr
                        style="
                          border-bottom:1px solid #eeeeee;
                        "
                      >

                        <th
                          style="
                            padding:10px 0;
                            text-align:left;
                            font-size:11px;
                            letter-spacing:1px;
                            text-transform:uppercase;
                            color:#999999;
                          "
                        >
                          Product
                        </th>

                        <th
                          style="
                            padding:10px;
                            text-align:center;
                            font-size:11px;
                            letter-spacing:1px;
                            text-transform:uppercase;
                            color:#999999;
                          "
                        >
                          Qty
                        </th>

                        <th
                          style="
                            padding:10px 0;
                            text-align:right;
                            font-size:11px;
                            letter-spacing:1px;
                            text-transform:uppercase;
                            color:#999999;
                          "
                        >
                          Price
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      ${productRows}

                    </tbody>

                  </table>


                  <!-- TOTAL -->

                  <div
                    style="
                      margin-top:25px;
                      padding-top:20px;
                      border-top:1px solid #eeeeee;
                    "
                  >

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                    >

                      <tr>

                        <td
                          style="
                            font-size:16px;
                            font-weight:bold;
                          "
                        >
                          Total
                        </td>

                        <td
                          style="
                            text-align:right;
                            font-size:20px;
                            font-weight:bold;
                          "
                        >
                          Rs. ${total.toLocaleString()}
                        </td>

                      </tr>

                    </table>

                  </div>


                  <!-- PAYMENT -->

                  <div
                    style="
                      margin-top:24px;
                      padding:18px;
                      background:#111111;
                      border-radius:14px;
                      color:#ffffff;
                    "
                  >

                    <div
                      style="
                        font-size:11px;
                        letter-spacing:1px;
                        text-transform:uppercase;
                        color:#c7a96b;
                      "
                    >
                      Payment Method
                    </div>

                    <div
                      style="
                        margin-top:6px;
                        font-size:15px;
                        font-weight:bold;
                      "
                    >
                      Cash on Delivery
                    </div>

                  </div>


                  <!-- FOOTER MESSAGE -->

                  <div
                    style="
                      margin-top:35px;
                      text-align:center;
                    "
                  >

                    <p
                      style="
                        margin:0;
                        font-family:Georgia,serif;
                        font-size:18px;
                      "
                    >
                      Thank you for shopping with us.
                    </p>

                    <p
                      style="
                        margin:10px 0 0;
                        color:#999999;
                        font-size:12px;
                        line-height:1.6;
                      "
                    >
                      We appreciate your trust in FN Jewelry Worldwide.
                    </p>

                  </div>

                </div>


                <!-- FOOTER -->

                <div
                  style="
                    background:#111111;
                    padding:24px;
                    text-align:center;
                  "
                >

                  <p
                    style="
                      margin:0;
                      color:#ffffff;
                      font-family:Georgia,serif;
                      font-size:16px;
                      letter-spacing:2px;
                    "
                  >
                    FN JEWELRY WORLDWIDE
                  </p>

                  <p
                    style="
                      margin:8px 0 0;
                      color:#777777;
                      font-size:11px;
                    "
                  >
                    This is an automated order confirmation email.
                  </p>

                </div>

              </div>

            </div>

          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Email could not be sent",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send order confirmation email",
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});