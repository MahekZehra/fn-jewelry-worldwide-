import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../data/Products";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "All"
  );

  const categories = [
    "All",
    "Jewellery",
    "Garments",
    "Accessories",
  ];

  useEffect(() => {
    setActiveCategory(categoryFromUrl || "All");
  }, [categoryFromUrl]);

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.trim().toLowerCase() ===
            activeCategory.trim().toLowerCase()
        );

  /* ================= CATEGORY CHANGE ================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-20">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <header className="mx-auto max-w-3xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            FN Collection
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Shop Our Collection
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
            Explore elegant artificial jewellery, beautiful cloth materials
            and statement accessories carefully selected to elevate every
            occasion.
          </p>

        </header>

        {/* =====================================================
            CATEGORY FILTERS
        ===================================================== */}

        <div className="mt-10 border-y border-black/[0.06] py-4 sm:mt-14">

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide sm:justify-center">

            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap rounded-full px-6 py-3 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-black/55 ring-1 ring-black/[0.07] hover:bg-black hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            PRODUCTS META
        ===================================================== */}

        <div className="mt-8 flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-black">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"}
            </p>

            <p className="mt-1 text-xs text-black/40">
              {activeCategory === "All"
                ? "Showing our complete collection"
                : `Showing ${activeCategory.toLowerCase()}`}
            </p>
          </div>

          <p className="hidden text-xs uppercase tracking-[0.2em] text-black/30 sm:block">
            FN Jewelry Worldwide
          </p>

        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        {filteredProducts.length > 0 ? (

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        ) : (

          /* =====================================================
              EMPTY STATE
          ===================================================== */

          <div className="mx-auto mt-16 max-w-lg rounded-[2rem] border border-black/[0.06] bg-white px-6 py-16 text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/35">
              Collection
            </p>

            <h2 className="mt-4 font-serif text-3xl text-[#171717]">
              No products found
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/45">
              We couldn't find any products in this category.
              Please explore another collection.
            </p>

            <button
              type="button"
              onClick={() => handleCategoryChange("All")}
              className="mt-7 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              View All Products
            </button>

          </div>

        )}

      </div>

    </main>
  );
};

export default Shop;