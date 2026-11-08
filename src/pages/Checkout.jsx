
import { useEffect, useState } from "react";
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

const readSelectedCountry = () => {
  try {
    const saved = localStorage.getItem("selectedCountry");
    const parsed = saved ? JSON.parse(saved) : null;

    return {
      code: String(parsed?.code || "PK").toUpperCase(),
      name: parsed?.name || "Pakistan",
    };
  } catch (error) {
    console.error("Unable to read selected delivery country:", error);
    return { code: "PK", name: "Pakistan" };
  }
};

const UAE_DELIVERY_MESSAGE =
  "We're currently delivering only within the United Arab Emirates. International shipping is not available right now. Please select UAE as your country to continue.";

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
    refreshInventory,
  } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(readSelectedCountry);

  useEffect(() => {
    const updateSelectedCountry = () => {
      setSelectedCountry(readSelectedCountry());
    };

    window.addEventListener("countryChanged", updateSelectedCountry);
    return () => {
      window.removeEventListener("countryChanged", updateSelectedCountry);
    };
  }, []);

  const isUaeDeliveryAvailable = selectedCountry.code === "AE";

  const handleContinueWithUAE = () => {
    const uaeCountry = {
      name: "United Arab Emirates",
      code: "AE",
      currency: "AED",
      symbol: "AED",
      flag: "https://flagcdn.com/w80/ae.png",
    };

    try {
      localStorage.setItem("selectedCountry", JSON.stringify(uaeCountry));
      window.dispatchEvent(new Event("countryChanged"));
      setSelectedCountry({ code: "AE", name: "United Arab Emirates" });
      setErrorMessage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Unable to switch shopping country to UAE:", error);
      setErrorMessage("We couldn't update your shopping country. Please use the country selector in the header.");
    }
  };

  const handleGoBackToShopping = () => {
    setErrorMessage("");
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

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

    if (!isUaeDeliveryAvailable) {
      setErrorMessage(UAE_DELIVERY_MESSAGE);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Re-check live stock immediately before either checkout method.
      const liveInventory = await refreshInventory();
      if (!liveInventory) {
        throw new Error("We couldn't verify live stock. Please refresh and try again.");
      }

      const unavailableItem = cart.find((item) => {
        const status = liveInventory[String(item.id)]?.status || "available";
        return status !== "available";
      });

      if (unavailableItem) {
        throw new Error(
          `${unavailableItem.name} is no longer available. Your bag has not been charged.`
        );
      }

      // STRIPE ONLINE CHECKOUT (CARD / GOOGLE PAY)
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
              selectedCountryCode: selectedCountry.code,
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
              "Unable to start secure online checkout."
          );
        }

        // Stripe securely collects card details on its hosted page.
        window.location.assign(result.url);
        return;
      }

      // CASH ON DELIVERY: reserve one-of-one stock before placing the order.
      const response = await fetch("/api/create-cod-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          selectedCountryCode: selectedCountry.code,
          items: cart.map((item) => ({
            id: item.id,
            quantity: 1,
          })),
          currency: currency || "AED",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.orderNumber) {
        throw new Error(
          result.message || "Unable to place your Cash on Delivery order."
        );
      }

      // COD stock stays reserved until the team confirms collection
      // or releases the piece if the order is cancelled.
      clearCart();
      refreshInventory();

      navigate("/order-confirmation", {
        replace: true,
        state: {
          orderNumber: result.orderNumber,
          reservationId: result.reservationId,
          paymentMethod: "cod",
          total: Number(result.total) || Number(cartTotal) || 0,
          currency: result.currency || currency || "AED",
          cancelToken: result.cancelToken,
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

  // DELIVERY RESTRICTION — purchases are currently UAE-only.
  if (cart.length > 0 && !isUaeDeliveryAvailable) {
    return (
      <main className="relative flex min-h-[calc(100dvh-5rem)] items-center justify-center overflow-x-hidden bg-[#FFFDF9] px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-[#EEDBD7]/35 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#E7D4B7]/25 blur-3xl" />

        <section className="relative z-10 my-auto w-full max-w-2xl rounded-[1.5rem] border border-[#D8B9B5]/30 bg-white/95 px-5 py-8 text-center shadow-[0_18px_55px_rgba(82,58,52,0.08)] sm:rounded-[2rem] sm:px-12 sm:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D8B9B5]/45 bg-[#FFF5F2] text-[#A97972]">
            <FiTruck className="text-2xl" />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B18A83]">
            UAE Delivery Only
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[#3E302D] sm:text-4xl">
            We're currently delivering within the UAE only
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#907C76]">
            Thank you for shopping with F&A Collective. We are not offering
            international shipping at the moment, so checkout is unavailable
            for your selected country ({selectedCountry.name}).
            Please select the United Arab Emirates to place an order.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleContinueWithUAE}
              className="inline-flex min-h-14 w-full touch-manipulation select-none items-center justify-center rounded-full bg-[#4A3935] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#5A4540] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#B18A83] focus:ring-offset-2 sm:w-auto"
            >
              Continue with UAE
            </button>

            <button
              type="button"
              onClick={handleGoBackToShopping}
              className="inline-flex min-h-14 w-full touch-manipulation select-none items-center justify-center rounded-full border border-[#D8B9B5]/45 bg-white px-7 py-4 text-sm font-semibold text-[#6F5B5F] transition hover:bg-[#FFF7F4] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#D8B9B5] focus:ring-offset-2 sm:w-auto"
            >
              Go Back to Shopping
            </button>
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-[#B18A83]/75">
            International delivery is temporarily unavailable
          </p>
        </section>
      </main>
    );
  }

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
                    Card / Google Pay
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-[#907C76]">
                    Continue to Stripe’s secure checkout. Google Pay appears on supported devices and browsers.
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
                  Continue to Secure Payment
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
