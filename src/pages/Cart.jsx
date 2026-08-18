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

  // Fixed made-up rates as requested
  PKR: 275,
  SAR: 1.02,
  QAR: 1.00,
  KWD: 0.084,
  GBP: 0.215,
  USD: 0.272,
  CAD: 0.375,
  AUD: 0.420,
  EUR: 0.250,
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

    // Initial currency
    updateCurrency();

    // Listen for CountrySelector changes
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
    const numericPrice =
      Number(priceAED) || 0;

    const rate =
      currencyRates[currency] || 1;

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
      const priceAED =
        getItemPriceAED(item);

      const quantity =
        Number(item.quantity) || 0;

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
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            Shopping Bag
          </p>

          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[#171717] sm:text-5xl">
            Your Bag Is Empty
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
            There are currently no pieces in your
            shopping bag. Explore our collection
            and discover something you'll love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg"
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
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-10 sm:px-8 lg:px-16 lg:py-16">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mb-8 flex items-center gap-2 text-sm text-black/50 transition hover:text-black"
        >
          <FiArrowLeft />
          Continue Shopping
        </button>

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            FN Jewelry Worldwide
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#171717] sm:text-5xl">
            Your Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-black/45">
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">

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
                  className="rounded-[1.5rem] bg-white p-4 sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-6">

                    {/* IMAGE */}

                    <Link
                      to={`/product/${item.id}`}
                      className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EEE9E3] sm:h-36 sm:w-28"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                    </Link>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          {/* CATEGORY */}

                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                            {item.category}
                          </p>

                          {/* PRODUCT NAME */}

                          <Link
                            to={`/product/${item.id}`}
                            className="mt-1 block truncate text-sm font-semibold text-black transition hover:opacity-60 sm:text-base"
                          >
                            {item.name}
                          </Link>

                          {/* PRICE */}

                          <p className="mt-1 text-sm text-black/50">
                            {currencySymbols[currency]}{" "}
                            {formatPrice(
                              convertedPrice
                            )}
                          </p>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/35 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>

                      </div>

                      {/* QUANTITY + TOTAL */}

                      <div className="mt-auto flex items-end justify-between pt-5">

                        {/* QUANTITY */}

                        <div className="flex items-center rounded-full border border-black/10 bg-[#FAF8F5] p-1">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5"
                          >
                            <FiMinus className="text-xs" />
                          </button>

                          <span className="min-w-8 text-center text-sm font-medium">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5"
                          >
                            <FiPlus className="text-xs" />
                          </button>

                        </div>

                        {/* ITEM TOTAL */}

                        <p className="text-sm font-semibold">
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

          <aside className="h-fit rounded-[1.75rem] bg-white p-6 sm:p-8 lg:sticky lg:top-28">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
              Summary
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#171717]">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">

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

              <div className="flex justify-between text-sm">

                <span className="text-black/50">
                  Delivery
                </span>

                <span className="text-right text-xs text-black/45">
                  Calculated at checkout
                </span>

              </div>

            </div>

            <div className="my-6 border-t border-black/[0.08]" />

            {/* TOTAL */}

            <div className="flex justify-between">

              <span className="text-base font-semibold">
                Total
              </span>

              <span className="text-lg font-semibold">
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>

            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="mt-7 flex h-14 w-full items-center justify-center rounded-full bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg"
            >
              Proceed to Checkout
            </Link>

            {/* COD */}

            <div className="mt-5 rounded-xl bg-[#FAF8F5] p-4">

              <p className="text-xs font-medium">
                Cash on Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-black/45">
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