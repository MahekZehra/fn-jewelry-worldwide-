import Stripe from "stripe";
import {
  getOrder,
  updateOrder,
  verifyCustomerCancelToken,
} from "../lib/orders.js";
import {
  inventoryRpc,
  releaseProductReservation,
} from "../lib/inventory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const adminSecret = process.env.INVENTORY_ADMIN_SECRET;
  const receivedAdminSecret = req.headers["x-inventory-admin-secret"];
  const isAdmin = Boolean(
    adminSecret &&
    typeof receivedAdminSecret === "string" &&
    receivedAdminSecret === adminSecret
  );

  const { orderNumber, token, reason = "Customer requested cancellation" } = req.body || {};

  if (typeof orderNumber !== "string" || !/^FA-[A-Za-z0-9-]{5,80}$/.test(orderNumber)) {
    return res.status(400).json({ success: false, message: "A valid order number is required." });
  }

  try {
    const order = await getOrder(orderNumber);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (!isAdmin && !verifyCustomerCancelToken(orderNumber, order.customer_email, token)) {
      return res.status(403).json({ success: false, message: "This cancellation link is invalid." });
    }

    if (order.status === "cancelled") {
      return res.status(200).json({
        success: true,
        alreadyCancelled: true,
        message: "This order has already been cancelled.",
      });
    }

    if (!["confirmed", "processing", "cancellation_pending"].includes(order.status)) {
      return res.status(409).json({
        success: false,
        message: "This order can no longer be cancelled. Please contact the store.",
      });
    }

    // Claim the order before refunding/releasing inventory. Repeated requests
    // can safely resume because Stripe refunds use a stable idempotency key.
    if (order.status !== "cancellation_pending") {
      const claimed = await updateOrder(
        orderNumber,
        { status: "cancellation_pending" },
        order.status
      );
      if (!Array.isArray(claimed) || claimed.length === 0) {
        return res.status(409).json({
          success: false,
          message: "This order is already being updated. Refresh and try again.",
        });
      }
    }

    let refundId = order.refund_id || null;

    if (order.payment_method === "stripe" && order.payment_status === "paid") {
      if (!process.env.STRIPE_SECRET_KEY_NEW) {
        throw new Error("Stripe refunds are not configured on the server.");
      }
      if (!order.stripe_payment_intent_id) {
        throw new Error("The payment reference is missing. Please contact the store to arrange the refund.");
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_NEW);
      const refund = await stripe.refunds.create(
        {
          payment_intent: order.stripe_payment_intent_id,
          reason: "requested_by_customer",
          metadata: { orderNumber },
        },
        { idempotencyKey: "fa-order-cancel-refund-" + orderNumber }
      );
      refundId = refund.id;

      const inventoryResult = await inventoryRpc(
        "cancel_sold_product_items",
        { p_order_number: orderNumber }
      );
      if (!inventoryResult?.success) {
        throw new Error("Refund was initiated, but inventory could not be released. Please retry or contact support.");
      }
    } else {
      if (order.reservation_id) {
        await releaseProductReservation(order.reservation_id);
      }
    }

    const cancelledAt = new Date().toISOString();
    await updateOrder(orderNumber, {
      status: "cancelled",
      payment_status:
        order.payment_method === "stripe" && order.payment_status === "paid"
          ? "refunded"
          : order.payment_status,
      refund_id: refundId,
      cancelled_by: isAdmin ? "admin" : "customer",
      cancellation_reason: String(reason).slice(0, 500),
      cancelled_at: cancelledAt,
    });

    return res.status(200).json({
      success: true,
      orderNumber,
      status: "cancelled",
      refundInitiated: Boolean(refundId),
      message: refundId
        ? "Your order has been cancelled and the refund has been initiated to the original payment method."
        : "Your Cash on Delivery order has been cancelled successfully.",
    });
  } catch (error) {
    console.error("Order cancellation failed:", error);
    return res.status(503).json({
      success: false,
      message: error.message || "Could not cancel this order. Please try again or contact support.",
    });
  }
}
