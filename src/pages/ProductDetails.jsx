import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import products from "../data/Products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    currency,
    formatPrice,
    getProductPrice,
  } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            FN Jewelry Worldwide
          </p>

          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[#171717] sm:text-5xl">
            Product Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
            Sorry, this product is no longer available.
            Please explore our collection to discover
            something new.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg active:scale-95"
          >
            Back to Shop
          </button>

        </div>

      </main>
    );
  }

  /* =====================================================
     CURRENT PRODUCT PRICE
  ===================================================== */

  const currentPrice = getProductPrice(product);

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  /* =====================================================
     BUY NOW
  ===================================================== */

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-14">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 rounded-full py-2 text-sm text-black/50 transition-colors duration-300 hover:text-black"
        >
          <FiArrowLeft className="text-base" />
          Back
        </button>

        {/* =================================================
            PRODUCT LAYOUT
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-start lg:gap-16">

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="lg:sticky lg:top-28">

            <div className="group relative overflow-hidden rounded-[1.75rem] bg-[#EEE9E3] sm:rounded-[2rem]">

              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />

            </div>

            <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-black/25 sm:text-[10px]">
              FN Jewelry Worldwide
            </p>

          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="lg:pt-3">

            {/* Category */}

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
              {product.category}
            </p>

            {/* Subcategory */}

            {product.subCategory && (
              <p className="mt-2 text-xs text-black/35">
                {product.subCategory}
              </p>
            )}

            {/* Product Name */}

            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* =================================================
                PRICE
            ================================================= */}

            <p className="mt-6 text-xl font-semibold tracking-tight text-black sm:text-2xl">
              {formatPrice(currentPrice)}
            </p>

            {/* Divider */}

            <div className="my-8 border-t border-black/[0.08]" />

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <section>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40 sm:text-xs">
                Description
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/55 sm:text-[15px]">
                {product.description}
              </p>

            </section>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            {product.details && (
              <section className="mt-7 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40 sm:text-xs">
                  Product Details
                </p>

                <div className="mt-5">

                  {/* Material */}

                  {product.details.material && (
                    <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] py-3 first:pt-0">

                      <span className="shrink-0 text-sm text-black/45">
                        Material
                      </span>

                      <span className="text-right text-sm font-medium text-black">
                        {product.details.material}
                      </span>

                    </div>
                  )}

                  {/* Fabric Length */}

                  {product.details.fabricLength && (
                    <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] py-3">

                      <span className="shrink-0 text-sm text-black/45">
                        Fabric Length
                      </span>

                      <span className="text-right text-sm font-medium text-black">
                        {product.details.fabricLength}
                      </span>

                    </div>
                  )}

                  {/* Type */}

                  {product.details.type && (
                    <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] py-3">

                      <span className="shrink-0 text-sm text-black/45">
                        Type
                      </span>

                      <span className="text-right text-sm font-medium text-black">
                        {product.details.type}
                      </span>

                    </div>
                  )}

                  {/* Occasion */}

                  {product.details.occasion && (
                    <div className="flex items-start justify-between gap-6 py-3 last:pb-0">

                      <span className="shrink-0 text-sm text-black/45">
                        Occasion
                      </span>

                      <span className="text-right text-sm font-medium text-black">
                        {product.details.occasion}
                      </span>

                    </div>
                  )}

                </div>

              </section>
            )}

            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="mt-8">

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45 sm:text-xs">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-full border border-black/10 bg-white p-1 shadow-sm">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5 active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="text-sm" />
                </button>

                <span className="min-w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5 active:scale-90"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="text-sm" />
                </button>

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="mt-6 space-y-3">

              {/* Add To Cart */}

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg active:scale-[0.98]"
              >
                <FiShoppingBag className="text-base" />
                Add to Cart
              </button>

              {/* Buy Now */}

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex h-14 w-full items-center justify-center rounded-full border border-black/15 bg-white text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg active:scale-[0.98]"
              >
                Buy Now
              </button>

            </div>

            {/* =================================================
                TRUST / DELIVERY
            ================================================= */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              {/* Worldwide Delivery */}

              <div className="rounded-2xl border border-black/[0.07] bg-white p-4">

                <FiTruck className="text-lg text-black/55" />

                <p className="mt-3 text-sm font-semibold">
                  Worldwide Delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Delivery availability depends on your selected country.
                </p>

              </div>

              {/* Secure Ordering */}

              <div className="rounded-2xl border border-black/[0.07] bg-white p-4">

                <FiShield className="text-lg text-black/55" />

                <p className="mt-3 text-sm font-semibold">
                  Secure Ordering
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Your order information is handled securely.
                </p>

              </div>

            </div>

            {/* =================================================
                BASIC PRODUCT INFORMATION
            ================================================= */}

            <div className="mt-8 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">

              {/* Category */}

              <div className="flex items-start justify-between gap-6 border-b border-black/[0.07] pb-4">

                <span className="text-sm text-black/45">
                  Category
                </span>

                <span className="text-right text-sm font-medium text-black">
                  {product.category}
                </span>

              </div>

              {/* Collection */}

              <div className="flex items-start justify-between gap-6 border-b border-black/[0.07] py-4">

                <span className="text-sm text-black/45">
                  Collection
                </span>

                <span className="text-right text-sm font-medium text-black">
                  {product.subCategory || "FN Collection"}
                </span>

              </div>

              {/* Availability */}

              <div className="flex items-center justify-between border-b border-black/[0.07] py-4">

                <span className="text-sm text-black/45">
                  Availability
                </span>

                <span className="text-sm font-medium text-black">
                  In Stock
                </span>

              </div>

              {/* Currency */}

              <div className="flex items-center justify-between pt-4">

                <span className="text-sm text-black/45">
                  Currency
                </span>

                <span className="text-sm font-medium text-black">
                  {currency}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductDetails;