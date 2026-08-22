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
===================================================== */

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

  const originalPriceAED = getBasePrice();
  const salePriceAED = getSalePrice();

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
    const numericPrice = Number(priceAED);

    if (!Number.isFinite(numericPrice)) {
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
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
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
        className="
          relative
          aspect-[4/5]
          cursor-pointer
          overflow-hidden
          rounded-[1.75rem]
          border
          border-[#DCCFC5]/60
          bg-gradient-to-br
          from-[#F8EDE8]
          via-[#F5E9E5]
          to-[#E9DED3]
          shadow-[0_8px_30px_rgba(80,55,45,0.06)]
          transition-all
          duration-500
          group-hover:-translate-y-1
          group-hover:shadow-[0_18px_45px_rgba(80,55,45,0.12)]
        "
      >

        {/* =================================================
            SOFT VINTAGE GLOW
        ================================================= */}

        <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#F9DCE5]/40 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#E8D8C5]/50 blur-2xl" />

        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="
            relative
            z-10
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.045]
          "
        />

        {/* =================================================
            SUBTLE LUXURY OVERLAY
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#5A4338]/[0.05] via-transparent to-white/[0.04] transition-all duration-500 group-hover:from-[#5A4338]/[0.09]" />

        {/* =================================================
            SALE BADGE
        ================================================= */}

        {product.onSale &&
          salePriceAED !== null && (
            <div className="absolute left-3 top-3 z-30 rounded-full border border-white/40 bg-[#6B4E4E]/90 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-md backdrop-blur-sm">
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
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/50
            bg-white/85
            text-[#3A2D2A]
            opacity-0
            shadow-md
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-[#3A2D2A]
            hover:text-white
            group-hover:opacity-100
          "
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
          className="
            absolute
            bottom-4
            left-4
            right-4
            z-30
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-white/60
            bg-white/90
            text-sm
            font-semibold
            text-[#332724]
            shadow-md
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-[#332724]
            hover:text-white
            sm:translate-y-3
            sm:opacity-0
            sm:group-hover:translate-y-0
            sm:group-hover:opacity-100
          "
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

      <div className="px-1 pt-4">

        {/* =================================================
            STYLE ORIGIN
        ================================================= */}

        {product.origin && (
          <div
            className="
              mb-2
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#D8BFAF]/60
              bg-[#FBF3EE]/90
              px-2.5
              py-1
              shadow-[0_3px_12px_rgba(80,55,45,0.05)]
              transition-all
              duration-300
              hover:border-[#C9A994]
              hover:bg-[#F8E9E1]
            "
          >
            <span className="text-[12px] leading-none">
              {product.originFlag}
            </span>

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#725B52]
              "
            >
              {product.origin}
            </span>
          </div>
        )}

        {/* =================================================
            CATEGORY
        ================================================= */}

        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#806D66]/70">
          {product.category}
        </p>

        {/* =================================================
            SUBCATEGORY
        ================================================= */}

        {product.subCategory && (
          <p className="mt-1 min-h-[16px] text-[11px] italic text-[#8E7A72]/65">
            {product.subCategory}
          </p>
        )}

        {/* =================================================
            PRODUCT NAME
        ================================================= */}

        <h3
          onClick={handleProductClick}
          className="
            mt-2
            min-h-[40px]
            cursor-pointer
            font-serif
            text-[15px]
            leading-5
            tracking-[-0.01em]
            text-[#2A2220]
            transition-opacity
            duration-300
            hover:opacity-60
            sm:text-base
          "
        >
          {product.name}
        </h3>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        {product.description && (
          <p className="mt-2 line-clamp-6 text-[11px] leading-5 text-[#766762]/65 sm:text-xs sm:leading-5">
            {product.description}
          </p>
        )}

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-3 flex items-center gap-2">

          {/* ACTIVE / SALE PRICE */}

          <span className="text-sm font-semibold tracking-tight text-[#332724] sm:text-[15px]">
            {currencySymbol}{" "}
            {formatPrice(
              convertedActivePrice
            )}
          </span>

          {/* ORIGINAL PRICE */}

          {salePriceAED !== null && (
            <span className="text-xs text-[#8E7A72]/55 line-through">
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