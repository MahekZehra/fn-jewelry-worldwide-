import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../data/Products";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const subCategoryFromUrl = searchParams.get("subCategory");

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "All"
  );

  const [activeSubCategory, setActiveSubCategory] = useState(
    subCategoryFromUrl || "All"
  );

  /* =====================================================
     MAIN CATEGORIES
  ===================================================== */

  const categories = ["All", "Jewellery", "Garments", "Accessories"];

  /* =====================================================
     UPDATE CATEGORY FROM URL
  ===================================================== */

  useEffect(() => {
    setActiveCategory(categoryFromUrl || "All");
    setActiveSubCategory(subCategoryFromUrl || "All");
  }, [categoryFromUrl, subCategoryFromUrl]);

  /* =====================================================
     AVAILABLE SUBCATEGORIES
     Automatically taken from Products.js
  ===================================================== */

  const subCategories = useMemo(() => {
    if (activeCategory === "All") {
      return [];
    }

    const categoryProducts = products.filter(
      (product) =>
        product.category?.trim().toLowerCase() ===
        activeCategory.trim().toLowerCase()
    );

    const uniqueSubCategories = [
      ...new Set(
        categoryProducts
          .map((product) => product.subCategory?.trim())
          .filter(Boolean)
      ),
    ];

    return uniqueSubCategories;
  }, [activeCategory]);

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category?.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase();

      const matchesSubCategory =
        activeSubCategory === "All" ||
        product.subCategory?.trim().toLowerCase() ===
          activeSubCategory.trim().toLowerCase();

      return matchesCategory && matchesSubCategory;
    });
  }, [activeCategory, activeSubCategory]);

  /* =====================================================
     MAIN CATEGORY CHANGE
  ===================================================== */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubCategory("All");

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category,
      });
    };
  };

  /* =====================================================
     SUBCATEGORY CHANGE
  ===================================================== */

  const handleSubCategoryChange = (subCategory) => {
    setActiveSubCategory(subCategory);

    if (activeCategory === "All") {
      setSearchParams({});
      return;
    }

    if (subCategory === "All") {
      setSearchParams({
        category: activeCategory,
      });
    } else {
      setSearchParams({
        category: activeCategory,
        subCategory,
      });
    }
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setSearchParams({});
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
            MAIN CATEGORY FILTERS
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
            SUBCATEGORY FILTERS
        ===================================================== */}

        {activeCategory !== "All" && subCategories.length > 0 && (

          <div className="mt-5">

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide sm:justify-center">

              {/* ALL SUBCATEGORIES */}

              <button
                type="button"
                onClick={() => handleSubCategoryChange("All")}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-medium transition-all duration-300 ${
                  activeSubCategory === "All"
                    ? "bg-[#171717] text-white"
                    : "bg-white text-black/50 ring-1 ring-black/[0.06] hover:text-black"
                }`}
              >
                All {activeCategory}
              </button>

              {/* DYNAMIC SUBCATEGORIES */}

              {subCategories.map((subCategory) => {
                const isActive = activeSubCategory === subCategory;

                return (
                  <button
                    key={subCategory}
                    type="button"
                    onClick={() => handleSubCategoryChange(subCategory)}
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#171717] text-white"
                        : "bg-white text-black/50 ring-1 ring-black/[0.06] hover:text-black"
                    }`}
                  >
                    {subCategory}
                  </button>
                );
              })}

            </div>

          </div>
        )}

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
                : activeSubCategory === "All"
                ? `Showing all ${activeCategory.toLowerCase()}`
                : `Showing ${activeSubCategory.toLowerCase()}`}

            </p>

          </div>

          <p className="hidden text-xs uppercase tracking-[0.2em] text-black/30 sm:block">
            FN Jewelry Worldwide
          </p>

        </div>

        {/* =====================================================
            PRODUCTS GRID
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
              onClick={resetFilters}
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