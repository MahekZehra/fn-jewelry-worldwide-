
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiMessageCircle,
} from "react-icons/fi";

import products from "../data/Products";
import Product360Viewer from "../components/Product360Viewer";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "971529218985";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    cart,
    currency,
    formatPrice,
    getProductPrice,
    inventoryReady,
    getItemInventoryStatus,
  } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [cartNotice, setCartNotice] = useState("");

  const inventoryStatus = product
    ? getItemInventoryStatus(product.id)
    : "checking";
  const isSoldOut = inventoryStatus === "sold";
  const isReserved = inventoryStatus === "reserved";
  const alreadyInCart = product
    ? cart.some((item) => String(item.id) === String(product.id))
    : false;
  const cannotPurchase = isSoldOut || isReserved;

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            F&A Fashion and Jewellery Collection
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
    const added = addToCart(product);
    setCartNotice(
      added
        ? "This one-of-a-kind piece has been added to your bag."
        : alreadyInCart
          ? "This piece is already in your bag. It can only be added once."
          : isSoldOut
            ? "This piece has already sold out."
            : isReserved
              ? "This piece is currently reserved by another customer."
              : "This piece could not be added. Please try again."
    );
  };

  /* =====================================================
     BUY NOW
  ===================================================== */

  const handleBuyNow = () => {
    if (alreadyInCart) {
      navigate("/cart");
      return;
    }
    const added = addToCart(product);
    if (added) {
      navigate("/cart");
    } else {
      handleAddToCart();
    }
  };

  /* =====================================================
     PRODUCT WHATSAPP INQUIRY
  ===================================================== */

  const handleProductInquiry = () => {
    const productUrl = window.location.href;

    const message = [
      "Hi F&A Collective!",
      "",
      "I would like to enquire about this product.",
      `Product: ${product.name}`,
      `Category: ${product.category}`,
      `Price: ${formatPrice(currentPrice)}`,
      "Quantity: 1",
      `Product link: ${productUrl}`,
      "",
      "Please share more information about this product.",
      "Thank you!",
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 rounded-full py-2 text-sm text-black/50 transition-colors duration-300 hover:text-black"
        >
          <FiArrowLeft className="text-base" />
          Back
        </button>

        {/* PRODUCT LAYOUT */}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-start lg:gap-16">
          {/* PRODUCT IMAGE */}

          <div className="lg:sticky lg:top-28">
            <Product360Viewer product={product} />
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="lg:pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
              {product.category}
            </p>

            {product.subCategory && (
              <p className="mt-2 text-xs text-black/35">
                {product.subCategory}
              </p>
            )}

            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-4 inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55">
              {isSoldOut
                ? "Sold Out"
                : isReserved
                  ? "Reserved"
                  : !inventoryReady
                    ? "Checking Availability"
                    : alreadyInCart
                      ? "Added to Your Bag"
                      : "One of a Kind · Only 1 Available"}
            </div>

            {/* PRICE */}

            <div className="mt-6">
              <p className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                {formatPrice(currentPrice)}
              </p>

              <p className="mt-1.5 text-[11px] text-black/45">
                All prices include VAT.
              </p>
            </div>

            <div className="my-8 border-t border-black/[0.08]" />

            {/* DESCRIPTION */}

            <section>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40 sm:text-xs">
                Description
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/55 sm:text-[15px]">
                {product.description}
              </p>
            </section>

            {/* PRODUCT DETAILS */}

            {product.details && (
              <section className="mt-7 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40 sm:text-xs">
                  Product Details
                </p>

                <div className="mt-5">
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

            {/* ACTION BUTTONS */}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={cannotPurchase || alreadyInCart}
                className={`flex h-14 w-full items-center justify-center gap-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  cannotPurchase || alreadyInCart
                    ? "cursor-not-allowed bg-[#E9E1DC] text-[#806D68]"
                    : "bg-black text-white hover:-translate-y-0.5 hover:bg-black/80 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                <FiShoppingBag className="text-base" />
                {isSoldOut
                  ? "Sold Out"
                  : isReserved
                    ? "Reserved"
                    : alreadyInCart
                        ? "Already in Your Bag"
                        : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={cannotPurchase}
                className={`flex h-14 w-full items-center justify-center rounded-full border border-black/15 text-sm font-semibold transition-all duration-300 ${
                  cannotPurchase
                    ? "cursor-not-allowed bg-[#F0ECE9] text-[#9A8B86]"
                    : "bg-white text-black hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                Buy Now
              </button>

              {cartNotice && (
                <p role="status" className="text-center text-xs leading-5 text-[#806D68]">
                  {cartNotice}
                </p>
              )}

              {/* NEW: WHATSAPP PRODUCT INQUIRY */}

              <button
                type="button"
                onClick={handleProductInquiry}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#D9C6CC] bg-white text-sm font-semibold text-[#80658B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FBF5F7] hover:shadow-lg active:scale-[0.98]"
              >
                <FiMessageCircle className="text-base" />
                Enquire About This Product
              </button>
            </div>

            {/* TRUST / DELIVERY */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/[0.07] bg-white p-4">
                <FiTruck className="text-lg text-black/55" />

                <p className="mt-3 text-sm font-semibold">
                  Worldwide Delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Delivery availability depends on your selected country.
                </p>
              </div>

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

            {/* BASIC PRODUCT INFORMATION */}

            <div className="mt-8 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-6 border-b border-black/[0.07] pb-4">
                <span className="text-sm text-black/45">
                  Category
                </span>
                <span className="text-right text-sm font-medium text-black">
                  {product.category}
                </span>
              </div>

              <div className="flex items-start justify-between gap-6 border-b border-black/[0.07] py-4">
                <span className="text-sm text-black/45">
                  Collection
                </span>
                <span className="text-right text-sm font-medium text-black">
                  {product.subCategory || "F&A Collection"}
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