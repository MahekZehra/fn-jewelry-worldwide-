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

import products from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

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

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
            FN Jewelry Worldwide
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#171717] sm:text-5xl">
            Product Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
            Sorry, this product is no longer available. Please explore
            our collection to discover something new.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-8 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Back to Shop
          </button>

        </div>

      </main>
    );
  }

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
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-8 sm:px-8 lg:px-16 lg:py-14">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-black/50 transition hover:text-black"
        >
          <FiArrowLeft className="text-base" />
          Back
        </button>

        {/* =================================================
            PRODUCT LAYOUT
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] lg:items-start lg:gap-16">

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="lg:sticky lg:top-28">

            <div className="group relative overflow-hidden rounded-[2rem] bg-[#EEE9E3]">

              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />

            </div>

            {/* Image Caption */}
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-black/30">
              FN Jewelry Worldwide
            </p>

          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="lg:pt-4">

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

            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-[1.05] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* Price */}

            <p className="mt-6 text-xl font-semibold text-black sm:text-2xl">
              Rs. {product.price.toLocaleString()}
            </p>

            {/* Divider */}

            <div className="my-8 border-t border-black/[0.08]" />

            {/* Description */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
                Description
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/55 sm:text-[15px]">
                {product.description}
              </p>

            </div>

            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="mt-8">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-full border border-black/10 bg-white p-1">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
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
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg"
              >
                <FiShoppingBag className="text-base" />
                Add to Cart
              </button>

              {/* Buy Now */}

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex h-14 w-full items-center justify-center rounded-full border border-black/15 bg-white text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg"
              >
                Buy Now
              </button>

            </div>

            {/* =================================================
                TRUST / DELIVERY INFORMATION
            ================================================= */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <div className="rounded-2xl border border-black/[0.07] bg-white p-4">

                <FiTruck className="text-lg text-black/60" />

                <p className="mt-3 text-sm font-semibold">
                  Delivery Available
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  We'll contact you to confirm your delivery details.
                </p>

              </div>

              <div className="rounded-2xl border border-black/[0.07] bg-white p-4">

                <FiShield className="text-lg text-black/60" />

                <p className="mt-3 text-sm font-semibold">
                  Secure Ordering
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Your order information is handled securely.
                </p>

              </div>

            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="mt-8 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">

              <div className="flex items-center justify-between border-b border-black/[0.07] pb-4">

                <span className="text-sm text-black/45">
                  Category
                </span>

                <span className="text-sm font-medium text-black">
                  {product.category}
                </span>

              </div>

              <div className="flex items-center justify-between border-b border-black/[0.07] py-4">

                <span className="text-sm text-black/45">
                  Availability
                </span>

                <span className="text-sm font-medium text-black">
                  In Stock
                </span>

              </div>

              <div className="flex items-center justify-between pt-4">

                <span className="text-sm text-black/45">
                  Payment
                </span>

                <span className="text-sm font-medium text-black">
                  Cash on Delivery
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