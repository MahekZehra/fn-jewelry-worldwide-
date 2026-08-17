import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      orderNumber,
      items,
      total,
    } = req.body;

    if (!customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required",
      });
    }

    const productRows = items
      .map(
        (item) => `
          <tr>
            <td style="padding: 10px 0;">
              ${item.name}
            </td>
            <td style="padding: 10px 0; text-align: center;">
              ${item.quantity}
            </td>
            <td style="padding: 10px 0; text-align: right;">
              Rs. ${(item.price * item.quantity).toLocaleString()}
            </td>
          </tr>
        `
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "FN Jewelry Worldwide <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Your Order ${orderNumber} Has Been Confirmed 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#FAF8F5; padding:40px 20px;">
          
          <div style="max-width:600px; margin:auto; background:white; padding:40px; border-radius:20px;">
            
            <h1 style="font-family:Georgia, serif; text-align:center;">
              FN Jewelry Worldwide
            </h1>

            <p style="text-align:center; color:#777;">
              Order Confirmed
            </p>

            <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

            <h2>
              Thank You, ${customerName}! ❤️
            </h2>

            <p style="color:#555; line-height:1.7;">
              Your order has been successfully confirmed.
              We will contact you shortly regarding delivery.
            </p>

            <p>
              <strong>Order Number:</strong> ${orderNumber}
            </p>

            <h3 style="margin-top:30px;">
              Order Summary
            </h3>

            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="border-bottom:1px solid #eee;">
                  <th style="text-align:left; padding:10px 0;">
                    Product
                  </th>
                  <th style="padding:10px 0;">
                    Qty
                  </th>
                  <th style="text-align:right; padding:10px 0;">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                ${productRows}
              </tbody>
            </table>

            <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

            <div style="display:flex; justify-content:space-between;">
              <strong>Total</strong>
              <strong>Rs. ${total.toLocaleString()}</strong>
            </div>

            <p style="margin-top:30px; color:#777; line-height:1.6;">
              Payment Method: Cash on Delivery
            </p>

            <p style="margin-top:30px; text-align:center; color:#999;">
              Thank you for shopping with FN Jewelry Worldwide.
            </p>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error(error);

      return res.status(400).json({
        success: false,
        error,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send order confirmation email",
    });
  }
}