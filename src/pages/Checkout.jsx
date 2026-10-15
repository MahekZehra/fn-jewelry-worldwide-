
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShield,
  FiTruck,
  FiArrowLeft,
  FiCreditCard,
  FiPackage,
  FiLoader,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

const Checkout = () => {
  const {
    cart,
    currency,
    currencySymbols,
    cartTotal,
    formatPrice,
    getCheckoutItems,
    getActualPriceAED,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerCity: "",
    customerAddress: "",
  });

  const symbol = currencySymbols?.[currency] || currency || "AED";

  // Get checkout items once and reuse their actual selling prices.
  const checkoutItems = getCheckoutItems();

  const formatMoney = (amount) => {
    return `${symbol} ${formatPrice(Number(amount) || 0)}`;
  };

  // Stripe charges in AED using server-side catalogue prices.
  const cartTotalAED = cart.reduce((total, item) => {
    const priceAED = Number(getActualPriceAED(item)) || 0;
    const quantity = Number(item.quantity) || 0;

    return total + priceAED * quantity;
  }, 0);

  const formatAED = (amount) => {
    return `AED ${Number(amount || 0).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!cart.length) {
      setErrorMessage("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // STRIPE CARD CHECKOUT
      if (paymentMethod === "stripe") {
        const response = await fetch(
          "/api/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...form,
              items: cart.map((item) => ({
                id: item.id,
                quantity: Number(item.quantity) || 1,
              })),
            }),
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success || !result.url) {
          throw new Error(
            result.message ||
              "Unable to start card checkout."
          );
        }

        // Stripe securely collects card details on its hosted page.
        window.location.assign(result.url);
        return;
      }

      // CASH ON DELIVERY
      const orderNumber = `FA-${Date.now()}`;

      // Email API expects item.price and item.quantity.
      const emailItems = checkoutItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      }));

      const response = await fetch(
        "/api/send-order-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            orderNumber,
            items: emailItems,
            total: Number(cartTotal) || 0,
            currency: currency || "AED",
            paymentMethod: "cod",
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success ||
        !result.customerEmailSent ||
        !result.ownerEmailSent
      ) {
        throw new Error(
          result.message ||
            "Order emails could not both be sent. Please try again."
        );
      }

      // Clear cart only after both emails have been confirmed sent.
      clearCart();

      // Preserve the existing confirmation route.
      navigate("/order-confirmation", {
        replace: true,
        state: {
          orderNumber,
          paymentMethod: "cod",
          total: Number(cartTotal) || 0,
          currency: currency || "AED",
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // EMPTY CART
  if (!cart.length) {
    return (
      <main className="min-h-screen bg-[#FFFDF9] px-5 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl text-[#3E302D]">
            Your Bag Is Empty
          </h1>

          <p className="mt-4 text-sm text-[#907C76]">
            Add something beautiful to your bag before checkout.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-[#4A3935] px-8 py-3 text-sm text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF9] px-5 py-10 sm:px-8 lg:px-16 lg:py-16">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#EEDBD7]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#907C76] transition hover:text-[#4A3935]"
        >
          <FiArrowLeft />
          Back to Shopping Bag
        </Link>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A66B]/50" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B18A83] sm:text-xs">
            F&A Fashion and Jewellery Collection
          </p>
        </div>

        <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#3E302D] sm:text-5xl">
          Checkout
        </h1>

        <p className="mt-3 text-sm text-[#907C76]">
          Enter your delivery details and choose your payment method.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12"
        >
          {/* CUSTOMER DETAILS */}
          <section className="h-fit rounded-[1.5rem] border border-[#D8B9B5]/20 bg-white/90 p-5 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl text-[#3E302D]">
              Delivery Information
            </h2>

            <p className="mt-2 text-sm text-[#907C76]">
              Please provide your details so our team can process your order.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="customerName"
                  className="mb-2 block text-sm font-medium text-[#4A3935]"
                >
                  Full Name *
                </label>

                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  autoComplete="name"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full rounded-xl border border-[#D8B9B5]/40 bg-[#FFFDF9] px-4 py-3 text-sm text-[#4A3935] outline-none transition focus:border-[#A97972]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="customerEmail"
                  className="mb-2 block text-sm font-medium text-[#4A3935]"
                >
                  Email Address *
                </label>

                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  autoComplete="email"
                  value={form.customerEmail}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full rounded-xl border border-[#D8B9B5]/40 bg-[#FFFDF9] px-4 py-3 text-sm text-[#4A3935] outline-none transition focus:border-[#A97972]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="customerPhone"
                  className="mb-2 block text-sm font-medium text-[#4A3935]"
                >
                  Phone Number *
                </label>

                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  value={form.customerPhone}
                  onChange={handleChange}
                  required
                  maxLength={30}
                  className="w-full rounded-xl border border-[#D8B9B5]/40 bg-[#FFFDF9] px-4 py-3 text-sm text-[#4A3935] outline-none transition focus:border-[#A97972]"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="customerCity"
                  className="mb-2 block text-sm font-medium text-[#4A3935]"
                >
                  City *
                </label>

                <input
                  id="customerCity"
                  name="customerCity"
                  type="text"
                  autoComplete="address-level2"
                  value={form.customerCity}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-[#D8B9B5]/40 bg-[#FFFDF9] px-4 py-3 text-sm text-[#4A3935] outline-none transition focus:border-[#A97972]"
                  placeholder="Enter your city"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="customerAddress"
                  className="mb-2 block text-sm font-medium text-[#4A3935]"
                >
                  Complete Delivery Address *
                </label>

                <textarea
                  id="customerAddress"
                  name="customerAddress"
                  autoComplete="street-address"
                  value={form.customerAddress}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full resize-y rounded-xl border border-[#D8B9B5]/40 bg-[#FFFDF9] px-4 py-3 text-sm text-[#4A3935] outline-none transition focus:border-[#A97972]"
                  placeholder="House, street, area and other delivery details"
                />
              </div>
            </div>

            <div className="my-8 border-t border-[#C9A66B]/20" />

            {/* PAYMENT METHOD */}
            <h2 className="font-serif text-2xl text-[#3E302D]">
              Payment Method
            </h2>

            <div className="mt-5 space-y-3">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "cod"
                    ? "border-[#A97972] bg-[#FFF9F7]"
                    : "border-[#D8B9B5]/25 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-[#4A3935]"
                />

                <FiTruck className="mt-0.5 shrink-0 text-[#A97972]" />

                <span>
                  <span className="block text-sm font-semibold text-[#4A3935]">
                    Cash on Delivery
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-[#907C76]">
                    Pay when your order is delivered.
                  </span>
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "stripe"
                    ? "border-[#A97972] bg-[#FFF9F7]"
                    : "border-[#D8B9B5]/25 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                  className="mt-1 accent-[#4A3935]"
                />

                <FiCreditCard className="mt-0.5 shrink-0 text-[#A97972]" />

                <span>
                  <span className="block text-sm font-semibold text-[#4A3935]">
                    Credit / Debit Card
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-[#907C76]">
                    Continue to Stripe's secure card payment page.
                  </span>

                  {currency !== "AED" && (
                    <span className="mt-2 block text-xs font-medium text-[#806D68]">
                      Online card payment is calculated in{" "}
                      {formatAED(cartTotalAED)}. Your displayed total is{" "}
                      {formatMoney(cartTotal)}.
                    </span>
                  )}
                </span>
              </label>
            </div>

            <div className="mt-6 flex gap-3 rounded-xl border border-[#D8B9B5]/15 bg-[#FFF9F7] p-4">
              <FiShield className="mt-0.5 shrink-0 text-[#B18A83]" />

              <p className="text-xs leading-5 text-[#907C76]">
                Your card details are entered on Stripe's hosted checkout
                page. This website does not ask you to enter card details
                directly.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#4A3935] px-6 py-4 text-sm font-medium tracking-wide text-white shadow-[0_6px_20px_rgba(67,48,43,0.13)] transition hover:bg-[#5A4540] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === "cod" ? (
                <>
                  <FiPackage />
                  Place COD Order
                </>
              ) : (
                <>
                  <FiCreditCard />
                  Continue to Card Payment
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#907C76]">
              Please check your delivery details before placing your order.
            </p>
          </section>

          {/* ORDER SUMMARY */}
          <aside className="h-fit rounded-[1.75rem] border border-[#D8B9B5]/20 bg-gradient-to-br from-[#FFFDF9] to-[#F8F0EB] p-6 shadow-[0_10px_35px_rgba(82,58,52,0.07)] sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#C9A66B]/50" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B18A83]">
                Summary
              </p>
            </div>

            <h2 className="mt-2 font-serif text-2xl text-[#3E302D]">
              Your Order
            </h2>

            <div className="mt-6 space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3"
                >
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                      src={item.image}
                      alt={item.name || "Product"}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#4A3935]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#907C76]">
                      Qty: {Number(item.quantity) || 1}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-[#4A3935]">
                    {formatMoney(
                      (Number(item.price) || 0) *
                        (Number(item.quantity) || 1)
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-[#C9A66B]/20" />

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#907C76]">Subtotal</span>

              <span className="font-medium text-[#4A3935]">
                {formatMoney(cartTotal)}
              </span>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-sm">
              <span className="text-[#907C76]">Delivery</span>

              <span className="text-right text-xs text-[#A28E88]">
                Confirmed by our team
              </span>
            </div>

            <div className="my-6 border-t border-[#C9A66B]/20" />

            <div className="flex justify-between gap-4">
              <span className="font-semibold text-[#4A3935]">
                Total
              </span>

              <span className="text-lg font-semibold text-[#4A3935]">
                {formatMoney(cartTotal)}
              </span>
            </div>

            {paymentMethod === "stripe" && currency !== "AED" && (
              <p className="mt-3 text-xs leading-5 text-[#806D68]">
                Card checkout amount: {formatAED(cartTotalAED)}. Stripe uses
                the product catalogue's AED prices.
              </p>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex gap-3 rounded-xl border border-[#D8B9B5]/15 bg-[#FFF9F7] p-3">
                <FiTruck className="mt-0.5 shrink-0 text-[#B18A83]" />

                <div>
                  <p className="text-xs font-semibold text-[#4A3935]">
                    Delivery Available
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#A28E88]">
                    Our team will contact you to confirm delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-[#D8B9B5]/15 bg-[#FFF9F7] p-3">
                <FiShield className="mt-0.5 shrink-0 text-[#B18A83]" />

                <div>
                  <p className="text-xs font-semibold text-[#4A3935]">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#A28E88]">
                    Your order details are handled securely.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
