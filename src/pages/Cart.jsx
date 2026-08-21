import { useEffect, useState } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

/* =========================================================
   CURRENCY RATES
   Base currency = AED
========================================================= */

const currencyRates = {
  AED: 1,
  PKR: 275,
  SAR: 1.02,
  QAR: 1.0,
  KWD: 0.084,
  GBP: 0.215,
  USD: 0.272,
  CAD: 0.375,
  AUD: 0.42,
  EUR: 0.25,
};

/* =========================================================
   CURRENCY SYMBOLS
========================================================= */

const currencySymbols = {
  AED: "AED",
  PKR: "Rs.",
  SAR: "SAR",
  QAR: "QAR",
  KWD: "KWD",
  GBP: "£",
  USD: "$",
  CAD: "CA$",
  AUD: "A$",
  EUR: "€",
};

/* =========================================================
   CART
========================================================= */

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  /* =========================================================
     SELECTED CURRENCY
  ========================================================= */

  const [currency, setCurrency] = useState("AED");

  useEffect(() => {
    const updateCurrency = () => {
      try {
        const savedCountry = JSON.parse(
          localStorage.getItem("selectedCountry")
        );

        const selectedCurrency =
          savedCountry?.currency || "AED";

        setCurrency(
          currencyRates[selectedCurrency]
            ? selectedCurrency
            : "AED"
        );
      } catch (error) {
        setCurrency("AED");
      }
    };

    updateCurrency();

    window.addEventListener(
      "countryChanged",
      updateCurrency
    );

    return () => {
      window.removeEventListener(
        "countryChanged",
        updateCurrency
      );
    };
  }, []);

  /* =========================================================
     CONVERT AED → SELECTED CURRENCY
  ========================================================= */

  const convertPrice = (priceAED) => {
    const numericPrice = Number(priceAED) || 0;
    const rate = currencyRates[currency] || 1;

    return numericPrice * rate;
  };

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    return Math.round(price).toLocaleString();
  };

  /* =========================================================
     GET ITEM BASE PRICE
  ========================================================= */

  const getItemPriceAED = (item) => {
    return Number(
      item.priceAED ?? item.price ?? 0
    );
  };

  /* =========================================================
     CART TOTAL
  ========================================================= */

  const cartTotal = cart.reduce(
    (total, item) => {
      const priceAED = getItemPriceAED(item);
      const quantity = Number(item.quantity) || 0;

      return (
        total +
        convertPrice(priceAED) * quantity
      );
    },
    0
  );

  /* =========================================================
     EMPTY CART
  ========================================================= */

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

        {/* Soft Background */}

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
              Shopping Bag
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
            Your Bag Is Empty
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
            There are currently no pieces in your
            shopping bag. Explore our collection
            and discover something you'll love.
          </p>

          <Link
            to="/shop"
            className="
              mt-8
              inline-flex
              items-center
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
            Start Shopping
          </Link>

        </div>

      </main>
    );
  }

  /* =========================================================
     MAIN CART
  ========================================================= */

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

      {/* Background Details */}

      <div
        className="
          pointer-events-none
          absolute -right-40 top-20
          h-96 w-96
          rounded-full
          bg-[#EEDBD7]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -left-40 bottom-20
          h-80 w-80
          rounded-full
          bg-[#E8D7B8]/15
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/shop")}
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
          Continue Shopping
        </button>

        <div>

          <div className="flex items-center gap-3">

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
            Your Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-[#907C76]">
            {cart.length}{" "}
            {cart.length === 1
              ? "item"
              : "items"}{" "}
            in your bag
          </p>

        </div>

        {/* =================================================
            MAIN LAYOUT
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
              CART ITEMS
          ================================================= */}

          <div className="space-y-4">

            {cart.map((item) => {

              const priceAED =
                getItemPriceAED(item);

              const convertedPrice =
                convertPrice(priceAED);

              const quantity =
                Number(item.quantity) || 1;

              const itemTotal =
                convertedPrice * quantity;

              return (
                <article
                  key={item.id}
                  className="
                    rounded-[1.5rem]
                    border border-[#D8B9B5]/18
                    bg-white/90
                    p-4
                    shadow-[0_5px_22px_rgba(82,58,52,0.04)]
                    transition-all
                    duration-300
                    hover:shadow-[0_8px_28px_rgba(82,58,52,0.07)]
                    sm:p-5
                  "
                >

                  <div className="flex gap-4 sm:gap-6">

                    {/* IMAGE */}

                    <Link
                      to={`/product/${item.id}`}
                      className="
                        h-28 w-24
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-[#F5ECE8]
                        ring-1
                        ring-[#D8B9B5]/15
                        sm:h-36 sm:w-28
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full w-full
                          object-cover
                          transition
                          duration-700
                          hover:scale-105
                        "
                      />
                    </Link>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <div
                        className="
                          flex items-start
                          justify-between
                          gap-4
                        "
                      >

                        <div className="min-w-0">

                          {/* CATEGORY */}

                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-[#B18A83]
                            "
                          >
                            {item.category}
                          </p>

                          {/* PRODUCT NAME */}

                          <Link
                            to={`/product/${item.id}`}
                            className="
                              mt-1
                              block truncate
                              text-sm
                              font-semibold
                              text-[#4A3935]
                              transition
                              hover:text-[#A97972]
                              sm:text-base
                            "
                          >
                            {item.name}
                          </Link>

                          {/* PRICE */}

                          <p className="mt-1 text-sm text-[#907C76]">
                            {currencySymbols[currency]}{" "}
                            {formatPrice(convertedPrice)}
                          </p>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="
                            flex h-9 w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-[#B09B96]
                            transition-all
                            duration-200
                            hover:bg-[#F8E7E4]
                            hover:text-[#A97972]
                          "
                        >
                          <FiTrash2 className="text-sm" />
                        </button>

                      </div>

                      {/* QUANTITY + TOTAL */}

                      <div
                        className="
                          mt-auto
                          flex items-end
                          justify-between
                          gap-3
                          pt-5
                        "
                      >

                        {/* QUANTITY */}

                        <div
                          className="
                            flex items-center
                            rounded-full
                            border
                            border-[#D8B9B5]/25
                            bg-[#FFF9F7]
                            p-1
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            aria-label="Decrease quantity"
                            className="
                              flex h-8 w-8
                              items-center
                              justify-center
                              rounded-full
                              text-[#806D68]
                              transition
                              hover:bg-[#F2E2DE]
                              hover:text-[#4A3935]
                            "
                          >
                            <FiMinus className="text-xs" />
                          </button>

                          <span
                            className="
                              min-w-8
                              text-center
                              text-sm
                              font-medium
                              text-[#4A3935]
                            "
                          >
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            aria-label="Increase quantity"
                            className="
                              flex h-8 w-8
                              items-center
                              justify-center
                              rounded-full
                              text-[#806D68]
                              transition
                              hover:bg-[#F2E2DE]
                              hover:text-[#4A3935]
                            "
                          >
                            <FiPlus className="text-xs" />
                          </button>

                        </div>

                        {/* ITEM TOTAL */}

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#4A3935]
                          "
                        >
                          {currencySymbols[currency]}{" "}
                          {formatPrice(itemTotal)}
                        </p>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

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
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">

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

              <div className="flex justify-between gap-4 text-sm">

                <span className="text-[#907C76]">
                  Delivery
                </span>

                <span className="text-right text-xs text-[#A28E88]">
                  Calculated at checkout
                </span>

              </div>

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

              <span className="text-base font-semibold text-[#4A3935]">
                Total
              </span>

              <span className="text-lg font-semibold text-[#4A3935]">
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="
                mt-7
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
              "
            >
              Proceed to Checkout
            </Link>

            {/* COD */}

            <div
              className="
                mt-5
                rounded-xl
                border
                border-[#D8B9B5]/15
                bg-[#FFF9F7]
                p-4
              "
            >

              <p className="text-xs font-medium text-[#4A3935]">
                Cash on Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-[#907C76]">
                Payment will be collected when
                your order is delivered.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Cart;