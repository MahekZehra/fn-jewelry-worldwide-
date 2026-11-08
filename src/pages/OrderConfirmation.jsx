import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiCheck,
  FiShoppingBag,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isStripePayment = searchParams.has("session_id");

  const orderNumber =
    location.state?.orderNumber ||
    `FA-${Date.now().toString().slice(-6)}`;

  const cancelToken = location.state?.cancelToken || "";
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");
  const [cancelError, setCancelError] = useState("");

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setIsCancelling(true);
    setCancelError("");
    try {
      const response = await fetch("/api/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          token: cancelToken,
          reason: "Customer requested cancellation",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to cancel this order.");
      }
      setCancelMessage(data.message || "Your order has been cancelled.");
    } catch (error) {
      setCancelError(error.message || "Unable to cancel this order.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24">

      <div className="mx-auto max-w-3xl">

        {/* Success Area */}
        <div className="text-center">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black shadow-lg sm:h-24 sm:w-24">

            <FiCheck className="text-3xl text-white sm:text-4xl" />

          </div>

          {/* Small Label */}
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            Order Confirmed
          </p>

          {/* Heading */}
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Thank You For Your Order
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/50 sm:text-base">
            Your order has been successfully placed. Our team will contact
            you shortly to confirm your order and delivery details.
          </p>

        </div>


        {/* Order Details Card */}
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] p-6 sm:p-8">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40">
                Order Number
              </p>

              <p className="mt-2 text-sm font-semibold tracking-wide sm:text-base">
                {orderNumber}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5]">
              <FiShoppingBag className="text-lg" />
            </div>

          </div>


          {/* Order Information */}
          <div className="space-y-5 p-6 sm:p-8">

            {/* Payment */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Payment Method
              </span>

              <span className="text-right text-sm font-medium">
              {isStripePayment ? "Paid Online through Stripe" : "Cash on Delivery"}
              </span>

            </div>


            {/* Status */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Order Status
              </span>

              <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Confirmed
              </span>

            </div>


            {/* Delivery */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Delivery
              </span>

              <span className="text-right text-sm font-medium">
                Available
              </span>

            </div>

          </div>

        </div>



        {cancelToken && (
          <div className="mt-5 rounded-[1.5rem] border border-red-100 bg-white p-6 sm:p-7">
            {cancelMessage ? (
              <p className="text-sm leading-6 text-[#665955]">{cancelMessage}</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-[#3E302D]">Need to cancel your order?</p>
                <p className="mt-2 text-xs leading-5 text-[#907C76]">You can request cancellation before the order is dispatched.</p>
                {cancelError && <p role="alert" className="mt-3 text-xs text-red-700">{cancelError}</p>}
                <button type="button" onClick={handleCancelOrder} disabled={isCancelling} className="mt-4 min-h-12 rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50">
                  {isCancelling ? "Cancelling..." : "Cancel This Order"}
                </button>
              </>
            )}
          </div>
        )}

        {/* What's Next */}
        <div className="mt-5 rounded-[1.5rem] border border-black/[0.07] bg-white p-6 sm:p-7">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5]">
              <FiCheck className="text-sm" />
            </div>

            <div>

              <p className="text-sm font-semibold">
                What happens next?
              </p>

              <p className="mt-2 text-sm leading-6 text-black/50">
                Our team will contact you to confirm your order before it
                is dispatched. Please keep your phone available for
                confirmation.
              </p>

            </div>

          </div>

        </div>


        {/* Buttons */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/80"
          >
            Continue Shopping

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            <FiHome className="text-sm" />

            Back to Home

          </button>

        </div>


        {/* Footer Note */}
        <p className="mt-8 text-center text-[11px] leading-5 text-black/35">
          Thank you for choosing F&A Fashion and Jewellery Collection.
        </p>

      </div>

    </main>
  );
};

export default OrderConfirmation;