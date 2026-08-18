import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowUpRight,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

/* =====================================================
   CURRENCY RATES
   Base currency: AED
===================================================== */

const currencyRates = {
  PKR: 1,
  AED: 0.0102,
  SAR: 0.0105,
  QAR: 0.0101,
  KWD: 0.0032,
  GBP: 0.0022,
  USD: 0.0026,
  CAD: 0.0035,
  AUD: 0.0040,
  EUR: 0.0024,
};

/* =====================================================
   CURRENCY SYMBOLS
===================================================== */

const currencySymbols = {
  PKR: "Rs.",
  AED: "AED",
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
     COUNTRY / CURRENCY LISTENER
  =================================================== */

  useEffect(() => {
    const updateCurrency = () => {
      try {
        const savedCountry = JSON.parse(
          localStorage.getItem("selectedCountry")
        );

        setCurrency(savedCountry?.currency || "AED");
      } catch {
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
     PRICE CALCULATION
  =================================================== */

  const priceAED = Number(product?.priceAED) || 0;

  const rate = currencyRates[currency] || currencyRates.AED;

  const convertedPrice =
    currency === "AED"
      ? priceAED
      : priceAED / rate;

  const formatPrice = (value) => {
    return Math.round(value).toLocaleString();
  };

  /* ===================================================
     ACTIONS
  =================================================== */

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(product);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
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

        {/* Subtle Overlay */}

        <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-colors duration-500 group-hover:bg-black/[0.06]" />

        {/* =================================================
            VIEW PRODUCT
        ================================================= */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
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

        {/* Category */}

        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
          {product.category}
        </p>

        {/* Subcategory */}

        {product.subCategory && (
          <p className="mt-1 min-h-[16px] text-[11px] text-black/35">
            {product.subCategory}
          </p>
        )}

        {/* Product Name */}

        <h3
          onClick={handleProductClick}
          className="mt-2 min-h-[40px] cursor-pointer text-sm font-medium leading-5 text-black transition-opacity duration-300 hover:opacity-60 sm:text-base"
        >
          {product.name}
        </h3>

        {/* =================================================
            PRICE
        ================================================= */}

        <p className="mt-2 text-sm font-semibold tracking-tight text-black sm:text-[15px]">
          {currencySymbols[currency] || currency}{" "}
          {formatPrice(convertedPrice)}
        </p>

      </div>

    </article>
  );
};

export default ProductCard;