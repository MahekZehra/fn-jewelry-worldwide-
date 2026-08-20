import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheck,
  FiShield,
  FiTruck,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,

    currency,
    currencySymbols,

    getProductPrice,
    getCheckoutItems,
    formatPrice,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     SUBMIT ORDER
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const orderNumber = `FN-${Date.now()
        .toString()
        .slice(-6)}`;

      const apiBaseUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:3001";

      /*
       * IMPORTANT:
       * getCheckoutItems() gives the SERVER
       * the already-converted prices.
       */

      const checkoutItems =
        getCheckoutItems();

      const response = await fetch(
        `${apiBaseUrl}/api/send-order-email`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            customerName:
              formData.fullName,

            customerEmail:
              formData.email,

            customerPhone:
              formData.phone,

            customerCity:
              formData.city,

            customerAddress:
              formData.address,

            orderNumber,

            /*
             * Converted product prices
             */
            items: checkoutItems,

            /*
             * Converted total
             */
            total: cartTotal,

            /*
             * Selected currency
             */
            currency,
          }),
        }
      );

      let result = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Order confirmation could not be completed."
        );
      }

      console.log(
        "Order confirmation email sent:",
        result
      );

      clearCart();

      navigate(
        "/order-confirmation",
        {
          state: {
            orderNumber,
          },
        }
      );
    } catch (error) {
      console.error(
        "Order confirmation error:",
        error
      );

      alert(
        error.message ||
          "Your order could not be confirmed right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-20">
        <div className="mx-auto max-w-xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
            Checkout
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#171717] sm:text-5xl">
            Your Cart Is Empty
          </h1>

          <p className="mt-4 text-sm leading-6 text-black/50">
            Add something beautiful to your
            shopping bag before proceeding
            to checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/shop")
            }
            className="mt-8 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Continue Shopping
          </button>

        </div>
      </main>
    );
  }

  /* =====================================================
     MAIN CHECKOUT
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-10 sm:px-8 lg:px-16 lg:py-16">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/cart")
          }
          className="mb-8 flex items-center gap-2 text-sm text-black/50 transition hover:text-black"
        >
          <FiArrowLeft />
          Back to Cart
        </button>

        {/* HEADER */}

        <header>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
            FN Jewelry Worldwide
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#171717] sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/50">
            Enter your delivery details below
            to complete your order.
          </p>

        </header>

        {/* CHECKOUT GRID */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">

          {/* CUSTOMER FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] bg-white p-6 sm:p-8"
          >

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
              Delivery
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#171717] sm:text-3xl">
              Customer Information
            </h2>

            <div className="mt-8 space-y-5">

              {/* FULL NAME */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black"
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black"
                />
              </div>

              {/* CITY */}

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black"
                />
              </div>

              {/* ADDRESS */}

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Complete Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-black/10 bg-[#FAF8F5] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black"
                />
              </div>

            </div>

            {/* PAYMENT */}

            <div className="mt-10 border-t border-black/[0.08] pt-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                Payment
              </p>

              <h2 className="mt-2 font-serif text-2xl">
                Payment Method
              </h2>

              <div className="mt-5 rounded-2xl border border-black bg-[#FAF8F5] p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black">
                    <FiCheck className="text-xs text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-black/50">
                      Pay securely when your order is delivered.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Confirming Order..."
                : "Place Order"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-black/35">
              By placing your order, you confirm
              that the delivery information provided
              above is correct.
            </p>

          </form>

          {/* ORDER SUMMARY */}

          <aside className="h-fit rounded-[1.75rem] bg-white p-6 sm:p-8 lg:sticky lg:top-28">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
              Summary
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#171717]">
              Your Order
            </h2>

            <div className="mt-7 space-y-4">

              {cart.map((item) => {

                const itemPrice =
                  getProductPrice(item);

                const quantity =
                  Number(item.quantity) || 0;

                const itemTotal =
                  itemPrice * quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >

                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#EEE9E3]">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-black/45">
                        Qty: {quantity}
                      </p>

                      <p className="mt-1 text-xs text-black/45">
                        {currencySymbols[currency]}{" "}
                        {formatPrice(itemPrice)}
                      </p>

                    </div>

                    <p className="text-sm font-medium">
                      {currencySymbols[currency]}{" "}
                      {formatPrice(itemTotal)}
                    </p>

                  </div>
                );
              })}

            </div>

            <div className="my-6 border-t border-black/[0.08]" />

            {/* SUBTOTAL */}

            <div className="flex justify-between text-sm">

              <span className="text-black/50">
                Subtotal
              </span>

              <span>
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* DELIVERY */}

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-black/50">
                Delivery
              </span>

              <span className="text-xs text-black/45">
                Calculated at checkout
              </span>

            </div>

            <div className="my-6 border-t border-black/[0.08]" />

            {/* TOTAL */}

            <div className="flex justify-between">

              <span className="font-semibold">
                Total
              </span>

              <span className="text-lg font-semibold">
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* TRUST */}

            <div className="mt-6 space-y-3">

              <div className="flex gap-3 rounded-xl bg-[#FAF8F5] p-3">

                <FiTruck className="mt-0.5 shrink-0 text-black/55" />

                <div>

                  <p className="text-xs font-semibold">
                    Delivery Available
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/40">
                    Our team will contact you to confirm delivery.
                  </p>

                </div>

              </div>

              <div className="flex gap-3 rounded-xl bg-[#FAF8F5] p-3">

                <FiShield className="mt-0.5 shrink-0 text-black/55" />

                <div>

                  <p className="text-xs font-semibold">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/40">
                    Your order details are handled securely.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Checkout;