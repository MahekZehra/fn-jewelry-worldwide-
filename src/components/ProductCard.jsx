import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowUpRight,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

/* =====================================================
   CURRENCY RATES
   BASE CURRENCY = AED

   Meaning:
   1 AED = selected currency amount
===================================================== */

const currencyRates = {
  AED: 1,
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

/* =====================================================
   CURRENCY SYMBOLS
===================================================== */

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

/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [currency, setCurrency] = useState("AED");

  /* ===================================================
     COUNTRY / CURRENCY
  =================================================== */

  useEffect(() => {
    const updateCurrency = () => {
      try {
        const savedCountry =
          localStorage.getItem("selectedCountry");

        if (!savedCountry) {
          setCurrency("AED");
          return;
        }

        const parsedCountry =
          JSON.parse(savedCountry);

        const selectedCurrency =
          parsedCountry?.currency;

        if (
          selectedCurrency &&
          currencyRates[selectedCurrency]
        ) {
          setCurrency(selectedCurrency);
        } else {
          setCurrency("AED");
        }
      } catch (error) {
        console.error(
          "Unable to read selected currency:",
          error
        );

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

  /* ===================================================
     GET BASE PRICE
  =================================================== */

  const getBasePrice = () => {
    const price = Number(product?.priceAED);

    return Number.isFinite(price)
      ? price
      : 0;
  };

  /* ===================================================
     GET SALE PRICE
  =================================================== */

  const getSalePrice = () => {
    const salePrice = Number(
      product?.salePriceAED
    );

    if (
      product?.onSale === true &&
      Number.isFinite(salePrice) &&
      salePrice > 0
    ) {
      return salePrice;
    }

    return null;
  };

  const originalPriceAED =
    getBasePrice();

  const salePriceAED =
    getSalePrice();

  /* ===================================================
     ACTIVE PRICE
  =================================================== */

  const activePriceAED =
    salePriceAED !== null
      ? salePriceAED
      : originalPriceAED;

  /* ===================================================
     CONVERT AED → SELECTED CURRENCY
  =================================================== */

  const convertPrice = (priceAED) => {
    const numericPrice =
      Number(priceAED);

    if (
      !Number.isFinite(numericPrice)
    ) {
      return 0;
    }

    const rate =
      currencyRates[currency] ??
      currencyRates.AED;

    const converted =
      numericPrice * rate;

    return Number.isFinite(converted)
      ? converted
      : 0;
  };

  const convertedOriginalPrice =
    convertPrice(originalPriceAED);

  const convertedActivePrice =
    convertPrice(activePriceAED);

  /* ===================================================
     FORMAT PRICE
  =================================================== */

  const formatPrice = (value) => {
    const numericValue =
      Number(value);

    if (
      !Number.isFinite(numericValue)
    ) {
      return "0";
    }

    return Math.round(
      numericValue
    ).toLocaleString();
  };

  /* ===================================================
     CURRENCY SYMBOL
  =================================================== */

  const currencySymbol =
    currencySymbols[currency] ||
    currency;

  /* ===================================================
     ACTIONS
  =================================================== */

  const handleAddToCart = (event) => {
    event.stopPropagation();

    /*
      Send the complete original product
      object to CartContext.
    */

    addToCart(product);
  };

  const handleProductClick = () => {
    navigate(
      `/product/${product.id}`
    );
  };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <article className="group min-w-0">

      {/* =================================================
          PRODUCT IMAGE
      ================================================= */}

      <div
        onClick={handleProductClick}
        className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[1.5rem] bg-[#EEE9E3]"
      >

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />

        {/* =================================================
            SUBTLE OVERLAY
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-colors duration-500 group-hover:bg-black/[0.06]" />

        {/* =================================================
            SALE BADGE
        ================================================= */}

        {product.onSale &&
          salePriceAED !== null && (
            <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
              Sale
            </div>
          )}

        {/* =================================================
            VIEW PRODUCT
        ================================================= */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleProductClick();
          }}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white group-hover:opacity-100"
          aria-label={`View ${product.name}`}
        >
          <FiArrowUpRight className="text-lg" />
        </button>

        {/* =================================================
            ADD TO CART
        ================================================= */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 flex h-11 items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-black shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          <FiShoppingBag className="text-base" />

          <span>
            Add to Cart
          </span>
        </button>

      </div>

      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <div className="pt-4">

        {/* CATEGORY */}

        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
          {product.category}
        </p>

        {/* SUBCATEGORY */}

        {product.subCategory && (
          <p className="mt-1 min-h-[16px] text-[11px] text-black/35">
            {product.subCategory}
          </p>
        )}

        {/* PRODUCT NAME */}

        <h3
          onClick={handleProductClick}
          className="mt-2 min-h-[40px] cursor-pointer text-sm font-medium leading-5 text-black transition-opacity duration-300 hover:opacity-60 sm:text-base"
        >
          {product.name}
        </h3>

        {/* =================================================
            DESCRIPTION
            MAXIMUM 6 LINES
        ================================================= */}

        {product.description && (
          <p className="mt-2 line-clamp-6 text-[11px] leading-5 text-black/45 sm:text-xs sm:leading-5">
            {product.description}
          </p>
        )}

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-3 flex items-center gap-2">

          {/* ACTIVE / SALE PRICE */}

          <span className="text-sm font-semibold tracking-tight text-black sm:text-[15px]">
            {currencySymbol}{" "}
            {formatPrice(
              convertedActivePrice
            )}
          </span>

          {/* ORIGINAL PRICE */}

          {salePriceAED !== null && (
            <span className="text-xs text-black/35 line-through">
              {currencySymbol}{" "}
              {formatPrice(
                convertedOriginalPrice
              )}
            </span>
          )}

        </div>

      </div>

    </article>
  );
};

export default ProductCard;