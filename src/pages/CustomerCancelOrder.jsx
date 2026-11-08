import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const CustomerCancelOrder = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = params.get("order") || "";
  const token = params.get("token") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          token,
          reason: "Customer requested cancellation",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "We could not cancel this order.");
      }
      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "We could not cancel this order. Please contact the store.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidLink = /^FA-[A-Za-z0-9-]{5,80}$/.test(orderNumber) && /^[a-f0-9]{64}$/i.test(token);

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-14 sm:px-8 sm:py-20">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-[#D8B9B5]/20 bg-white p-7 text-center shadow-[0_12px_38px_rgba(82,58,52,0.07)] sm:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B18A83]">
          F&A Collective · Order Support
        </p>
        {result ? (
          <>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5ECE8] text-2xl text-[#4A3935]">✓</div>
            <h1 className="mt-6 font-serif text-3xl text-[#3E302D]">Order Cancelled</h1>
            <p className="mt-4 text-sm leading-7 text-[#806D68]">{result.message}</p>
            {result.refundInitiated && (
              <p className="mt-3 text-xs leading-6 text-[#907C76]">
                Your bank or card provider may take additional time to show the refund.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5ECE8] text-2xl text-[#4A3935]">!</div>
            <h1 className="mt-6 font-serif text-3xl text-[#3E302D]">Cancel Your Order</h1>
            <p className="mt-4 text-sm leading-7 text-[#806D68]">
              Please confirm whether you would like to cancel order <strong className="text-[#3E302D]">{orderNumber || "—"}</strong>.
              Customer cancellations are available before dispatch.
            </p>
            {!isValidLink && (
              <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                This cancellation link is incomplete or invalid. Please use the button in your order confirmation email.
              </p>
            )}
            {error && (
              <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}
            <button
              type="button"
              disabled={!isValidLink || isSubmitting}
              onClick={handleCancel}
              className="mt-7 flex min-h-14 w-full items-center justify-center rounded-full bg-[#4A3935] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#5A4540] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Cancelling order..." : "Confirm Order Cancellation"}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 min-h-12 w-full rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#4A3935] transition hover:bg-[#FAF8F5]"
        >
          Back to Store
        </button>
      </section>
    </main>
  );
};

export default CustomerCancelOrder;
