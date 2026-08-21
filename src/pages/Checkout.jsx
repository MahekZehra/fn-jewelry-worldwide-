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

      const checkoutItems =
        getCheckoutItems();

      const response = await fetch(
        `${apiBaseUrl}/api/send-order-email`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customerName: formData.fullName,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            customerCity: formData.city,
            customerAddress: formData.address,
            orderNumber,
            items: checkoutItems,
            total: cartTotal,
            currency,
          }),
        }
      );

      let result = {};

      try {
        result = await response.json();
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

      navigate("/order-confirmation", {
        state: {
          orderNumber,
        },
      });
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
      <main
        className="
          relative min-h-screen
          overflow-hidden
          bg-[#FFFDF9]
          px-5 py-20
          sm:px-8
          lg:px-16 lg:py-28
        "
      >
        {/* Soft Decorative Background */}

        <div
          className="
            pointer-events-none
            absolute -right-32 top-20
            h-80 w-80
            rounded-full
            bg-[#EEDBD7]/25
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute -left-32 bottom-10
            h-72 w-72
            rounded-full
            bg-[#E8D7B8]/15
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto max-w-xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#C9A66B]/50" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#B18A83]
                sm:text-xs
              "
            >
              Checkout
            </p>

            <span className="h-px w-8 bg-[#C9A66B]/50" />

          </div>

          <h1
            className="
              mt-4
              font-serif
              text-4xl
              tracking-[-0.02em]
              text-[#3E302D]
              sm:text-5xl
            "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
              mx-auto mt-4
              max-w-md
              text-sm
              leading-6
              text-[#806D68]
            "
          >
            Add something beautiful to your
            shopping bag before proceeding
            to checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              mt-8
              rounded-full
              bg-[#4A3935]
              px-8 py-3.5
              text-sm
              font-medium
              tracking-wide
              text-white
              shadow-[0_6px_20px_rgba(67,48,43,0.12)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#5A4540]
              hover:shadow-[0_9px_25px_rgba(67,48,43,0.17)]
            "
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
    <main
      className="
        relative min-h-screen
        overflow-hidden
        bg-[#FFFDF9]
        px-5 py-10
        sm:px-8
        lg:px-16 lg:py-16
      "
    >

      {/* =================================================
          SOFT BACKGROUND DETAILS
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute -right-40 top-10
          h-96 w-96
          rounded-full
          bg-[#EEDBD7]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -left-40 bottom-10
          h-80 w-80
          rounded-full
          bg-[#E8D7B8]/15
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="
            mb-8
            flex items-center gap-2
            text-sm
            text-[#907C76]
            transition
            hover:text-[#4A3935]
          "
        >
          <FiArrowLeft className="text-sm" />
          Back to Cart
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <header>

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-[#C9A66B]/50" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#B18A83]
              "
            >
              FN Jewelry Worldwide
            </p>

          </div>

          <h1
            className="
              mt-3
              font-serif
              text-4xl
              tracking-[-0.02em]
              text-[#3E302D]
              sm:text-5xl
            "
          >
            Checkout
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-[#907C76]
            "
          >
            Enter your delivery details below
            to complete your order.
          </p>

        </header>

        {/* =================================================
            CHECKOUT GRID
        ================================================= */}

        <div
          className="
            mt-10
            grid
            gap-8
            lg:grid-cols-[1fr_380px]
            lg:gap-12
          "
        >

          {/* =================================================
              CUSTOMER FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="
              rounded-[1.75rem]
              border
              border-[#D8B9B5]/18
              bg-white/90
              p-6
              shadow-[0_8px_30px_rgba(82,58,52,0.05)]
              sm:p-8
            "
          >

            <div className="flex items-center gap-3">

              <span className="h-px w-7 bg-[#C9A66B]/50" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#B18A83]
                "
              >
                Delivery
              </p>

            </div>

            <h2
              className="
                mt-2
                font-serif
                text-2xl
                text-[#3E302D]
                sm:text-3xl
              "
            >
              Customer Information
            </h2>

            <div className="mt-8 space-y-5">

              {/* FULL NAME */}

              <div>
                <label
                  htmlFor="fullName"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#4A3935]
                  "
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
                  className="
                    h-12 w-full
                    rounded-xl
                    border
                    border-[#D8B9B5]/25
                    bg-[#FFF9F7]
                    px-4
                    text-sm
                    text-[#4A3935]
                    outline-none
                    transition-all
                    placeholder:text-[#B5A29D]
                    focus:border-[#B18A83]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#EEDBD7]/50
                  "
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#4A3935]
                  "
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
                  className="
                    h-12 w-full
                    rounded-xl
                    border
                    border-[#D8B9B5]/25
                    bg-[#FFF9F7]
                    px-4
                    text-sm
                    text-[#4A3935]
                    outline-none
                    transition-all
                    placeholder:text-[#B5A29D]
                    focus:border-[#B18A83]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#EEDBD7]/50
                  "
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="phone"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#4A3935]
                  "
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
                  className="
                    h-12 w-full
                    rounded-xl
                    border
                    border-[#D8B9B5]/25
                    bg-[#FFF9F7]
                    px-4
                    text-sm
                    text-[#4A3935]
                    outline-none
                    transition-all
                    placeholder:text-[#B5A29D]
                    focus:border-[#B18A83]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#EEDBD7]/50
                  "
                />
              </div>

              {/* CITY */}

              <div>
                <label
                  htmlFor="city"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#4A3935]
                  "
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
                  className="
                    h-12 w-full
                    rounded-xl
                    border
                    border-[#D8B9B5]/25
                    bg-[#FFF9F7]
                    px-4
                    text-sm
                    text-[#4A3935]
                    outline-none
                    transition-all
                    placeholder:text-[#B5A29D]
                    focus:border-[#B18A83]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#EEDBD7]/50
                  "
                />
              </div>

              {/* ADDRESS */}

              <div>
                <label
                  htmlFor="address"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#4A3935]
                  "
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
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#D8B9B5]/25
                    bg-[#FFF9F7]
                    px-4 py-3
                    text-sm
                    text-[#4A3935]
                    outline-none
                    transition-all
                    placeholder:text-[#B5A29D]
                    focus:border-[#B18A83]
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#EEDBD7]/50
                  "
                />
              </div>

            </div>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <div
              className="
                mt-10
                border-t
                border-[#C9A66B]/20
                pt-8
              "
            >

              <div className="flex items-center gap-3">

                <span className="h-px w-7 bg-[#C9A66B]/50" />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#B18A83]
                  "
                >
                  Payment
                </p>

              </div>

              <h2
                className="
                  mt-2
                  font-serif
                  text-2xl
                  text-[#3E302D]
                "
              >
                Payment Method
              </h2>

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[#C9A66B]/35
                  bg-[#FFF9F7]
                  p-5
                "
              >

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex h-6 w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#4A3935]
                    "
                  >
                    <FiCheck className="text-xs text-white" />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#4A3935]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#907C76]">
                      Pay securely when your order is delivered.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                PLACE ORDER
            ================================================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-8
                flex h-14 w-full
                items-center
                justify-center
                rounded-full
                bg-[#4A3935]
                text-sm
                font-medium
                tracking-wide
                text-white
                shadow-[0_6px_20px_rgba(67,48,43,0.13)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#5A4540]
                hover:shadow-[0_9px_25px_rgba(67,48,43,0.18)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting
                ? "Confirming Order..."
                : "Place Order"}
            </button>

            <p
              className="
                mt-4
                text-center
                text-xs
                leading-5
                text-[#A28E88]
              "
            >
              By placing your order, you confirm
              that the delivery information provided
              above is correct.
            </p>

          </form>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside
            className="
              h-fit
              rounded-[1.75rem]
              border
              border-[#D8B9B5]/18
              bg-gradient-to-br
              from-[#FFFDF9]
              to-[#F8F0EB]
              p-6
              shadow-[0_10px_35px_rgba(82,58,52,0.07)]
              sm:p-8
              lg:sticky
              lg:top-28
            "
          >

            <div className="flex items-center gap-3">

              <span className="h-px w-7 bg-[#C9A66B]/50" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#B18A83]
                "
              >
                Summary
              </p>

            </div>

            <h2
              className="
                mt-2
                font-serif
                text-2xl
                text-[#3E302D]
              "
            >
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

                    <div
                      className="
                        h-16 w-14
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-[#F5ECE8]
                        ring-1
                        ring-[#D8B9B5]/15
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full w-full
                          object-cover
                        "
                      />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-[#4A3935]
                        "
                      >
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#A28E88]">
                        Qty: {quantity}
                      </p>

                      <p className="mt-1 text-xs text-[#907C76]">
                        {currencySymbols[currency]}{" "}
                        {formatPrice(itemPrice)}
                      </p>

                    </div>

                    <p
                      className="
                        text-sm
                        font-medium
                        text-[#4A3935]
                      "
                    >
                      {currencySymbols[currency]}{" "}
                      {formatPrice(itemTotal)}
                    </p>

                  </div>
                );
              })}

            </div>

            <div
              className="
                my-6
                border-t
                border-[#C9A66B]/20
              "
            />

            {/* SUBTOTAL */}

            <div className="flex justify-between text-sm">

              <span className="text-[#907C76]">
                Subtotal
              </span>

              <span className="font-medium text-[#4A3935]">
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* DELIVERY */}

            <div className="mt-3 flex justify-between gap-4 text-sm">

              <span className="text-[#907C76]">
                Delivery
              </span>

              <span className="text-right text-xs text-[#A28E88]">
                Calculated at checkout
              </span>

            </div>

            <div
              className="
                my-6
                border-t
                border-[#C9A66B]/20
              "
            />

            {/* TOTAL */}

            <div className="flex justify-between">

              <span className="font-semibold text-[#4A3935]">
                Total
              </span>

              <span
                className="
                  text-lg
                  font-semibold
                  text-[#4A3935]
                "
              >
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* =================================================
                TRUST
            ================================================= */}

            <div className="mt-6 space-y-3">

              <div
                className="
                  flex gap-3
                  rounded-xl
                  border
                  border-[#D8B9B5]/15
                  bg-[#FFF9F7]
                  p-3
                "
              >

                <FiTruck
                  className="
                    mt-0.5
                    shrink-0
                    text-[#B18A83]
                  "
                />

                <div>

                  <p className="text-xs font-semibold text-[#4A3935]">
                    Delivery Available
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#A28E88]">
                    Our team will contact you to confirm delivery.
                  </p>

                </div>

              </div>

              <div
                className="
                  flex gap-3
                  rounded-xl
                  border
                  border-[#D8B9B5]/15
                  bg-[#FFF9F7]
                  p-3
                "
              >

                <FiShield
                  className="
                    mt-0.5
                    shrink-0
                    text-[#B18A83]
                  "
                />

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

        </div>

      </div>

    </main>
  );
};

export default Checkout;