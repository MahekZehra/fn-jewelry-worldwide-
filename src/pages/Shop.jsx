import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../data/Products";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* =====================================================
     URL FILTERS
  ===================================================== */

  const categoryFromUrl = searchParams.get("category");
  const subCategoryFromUrl =
    searchParams.get("subCategory");
  const saleFromUrl = searchParams.get("sale");

  /* =====================================================
     STATE
  ===================================================== */

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "All"
  );

  const [activeSubCategory, setActiveSubCategory] =
    useState(subCategoryFromUrl || "All");

  const [isSaleOnly, setIsSaleOnly] = useState(
    saleFromUrl === "true"
  );

  /* =====================================================
     MAIN CATEGORIES
  ===================================================== */

  const categories = [
    "All",
    "Jewellery",
    "Garments",
    "Accessories",
  ];

  /* =====================================================
     SYNC STATE WITH URL
  ===================================================== */

  useEffect(() => {
    setActiveCategory(
      categoryFromUrl || "All"
    );

    setActiveSubCategory(
      subCategoryFromUrl || "All"
    );

    setIsSaleOnly(
      saleFromUrl === "true"
    );
  }, [
    categoryFromUrl,
    subCategoryFromUrl,
    saleFromUrl,
  ]);

  /* =====================================================
     AVAILABLE SUBCATEGORIES
     Dynamically generated from Products.js
  ===================================================== */

  const subCategories = useMemo(() => {
    if (activeCategory === "All") {
      return [];
    }

    const categoryProducts = products.filter(
      (product) =>
        product.category
          ?.trim()
          .toLowerCase() ===
        activeCategory
          .trim()
          .toLowerCase()
    );

    return [
      ...new Set(
        categoryProducts
          .map((product) =>
            product.subCategory?.trim()
          )
          .filter(Boolean)
      ),
    ];
  }, [activeCategory]);

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      /* -----------------------------------------------
         CATEGORY
      ----------------------------------------------- */

      const matchesCategory =
        activeCategory === "All" ||
        product.category
          ?.trim()
          .toLowerCase() ===
          activeCategory
            .trim()
            .toLowerCase();

      /* -----------------------------------------------
         SUBCATEGORY
      ----------------------------------------------- */

      const matchesSubCategory =
        activeSubCategory === "All" ||
        product.subCategory
          ?.trim()
          .toLowerCase() ===
          activeSubCategory
            .trim()
            .toLowerCase();

      /* -----------------------------------------------
         SALE
      ----------------------------------------------- */

      const matchesSale =
        !isSaleOnly ||
        product.onSale === true;

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesSale
      );
    });
  }, [
    activeCategory,
    activeSubCategory,
    isSaleOnly,
  ]);

  /* =====================================================
     MAIN CATEGORY CHANGE
  ===================================================== */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubCategory("All");

    /*
      Selecting a normal category
      turns Sale mode off.
    */

    setIsSaleOnly(false);

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

  const handleSubCategoryChange = (
    subCategory
  ) => {
    setActiveSubCategory(subCategory);

    const params = {};

    if (activeCategory !== "All") {
      params.category = activeCategory;
    }

    if (
      subCategory !== "All" &&
      activeCategory !== "All"
    ) {
      params.subCategory =
        subCategory;
    }

    /*
      Preserve Sale mode when
      changing subcategory.
    */

    if (isSaleOnly) {
      params.sale = "true";
    }

    setSearchParams(params);
  };

  /* =====================================================
     ON SALE FILTER
  ===================================================== */

  const handleSaleChange = () => {
    const newSaleState = !isSaleOnly;

    setIsSaleOnly(newSaleState);

    const params = {};

    /*
      Keep current category.
    */

    if (activeCategory !== "All") {
      params.category = activeCategory;
    }

    /*
      Keep current subcategory.
    */

    if (
      activeSubCategory !== "All" &&
      activeCategory !== "All"
    ) {
      params.subCategory =
        activeSubCategory;
    }

    /*
      Enable / disable sale filter.
    */

    if (newSaleState) {
      params.sale = "true";
    }

    setSearchParams(params);
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setIsSaleOnly(false);

    setSearchParams({});
  };

  /* =====================================================
     FILTER DESCRIPTION
  ===================================================== */

  const filterDescription = useMemo(() => {

    /* -----------------------------------------------
       SALE + SUBCATEGORY
    ----------------------------------------------- */

    if (
      isSaleOnly &&
      activeCategory !== "All" &&
      activeSubCategory !== "All"
    ) {
      return `Showing sale items in ${activeSubCategory.toLowerCase()}`;
    }

    /* -----------------------------------------------
       SALE + CATEGORY
    ----------------------------------------------- */

    if (
      isSaleOnly &&
      activeCategory !== "All"
    ) {
      return `Showing sale items in ${activeCategory.toLowerCase()}`;
    }

    /* -----------------------------------------------
       ALL SALE ITEMS
    ----------------------------------------------- */

    if (isSaleOnly) {
      return "Showing all products currently on sale";
    }

    /* -----------------------------------------------
       ALL PRODUCTS
    ----------------------------------------------- */

    if (activeCategory === "All") {
      return "Showing our complete collection";
    }

    /* -----------------------------------------------
       CATEGORY
    ----------------------------------------------- */

    if (activeSubCategory === "All") {
      return `Showing all ${activeCategory.toLowerCase()}`;
    }

    /* -----------------------------------------------
       SUBCATEGORY
    ----------------------------------------------- */

    return `Showing ${activeSubCategory.toLowerCase()}`;

  }, [
    activeCategory,
    activeSubCategory,
    isSaleOnly,
  ]);

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-20">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="mx-auto max-w-3xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            FN Collection
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Shop Our Collection
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
            Explore elegant artificial jewellery,
            beautiful cloth materials and statement
            accessories carefully selected to elevate
            every occasion.
          </p>

        </header>

        {/* =================================================
            MAIN CATEGORY FILTERS
        ================================================= */}

        <div className="mt-10 border-y border-black/[0.06] py-4 sm:mt-14">

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide sm:justify-center">

            {/* =================================================
                ALL / JEWELLERY / GARMENTS / ACCESSORIES
            ================================================= */}

            {categories.map((category) => {

              const isActive =
                activeCategory === category &&
                !isSaleOnly;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(
                      category
                    )
                  }
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

            {/* =================================================
                ON SALE
            ================================================= */}

            <button
              type="button"
              onClick={handleSaleChange}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-xs font-semibold tracking-wide transition-all duration-300 ${
                isSaleOnly
                  ? "bg-black text-white shadow-sm"
                  : "bg-white text-black/55 ring-1 ring-black/[0.07] hover:bg-black hover:text-white"
              }`}
            >
              On Sale
            </button>

          </div>

        </div>

        {/* =================================================
            SALE STATUS
        ================================================= */}

        {isSaleOnly && (

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.05] sm:px-5">

            <div className="flex items-center gap-3">

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                %
              </span>

              <div>

                <p className="text-xs font-semibold text-black">
                  Sale Collection
                </p>

                <p className="mt-0.5 text-[11px] text-black/40">
                  Discover our current special offers
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-medium text-black/45 transition hover:text-black"
            >
              Clear
            </button>

          </div>

        )}

        {/* =================================================
            SUBCATEGORY FILTERS
        ================================================= */}

        {activeCategory !== "All" &&
          subCategories.length > 0 && (

            <div className="mt-5">

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide sm:justify-center">

                {/* =================================================
                    ALL SUBCATEGORIES
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleSubCategoryChange(
                      "All"
                    )
                  }
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-medium transition-all duration-300 ${
                    activeSubCategory === "All"
                      ? "bg-[#171717] text-white"
                      : "bg-white text-black/50 ring-1 ring-black/[0.06] hover:text-black"
                  }`}
                >
                  All {activeCategory}
                </button>

                {/* =================================================
                    DYNAMIC SUBCATEGORIES
                ================================================= */}

                {subCategories.map(
                  (subCategory) => {

                    const isActive =
                      activeSubCategory ===
                      subCategory;

                    return (
                      <button
                        key={subCategory}
                        type="button"
                        onClick={() =>
                          handleSubCategoryChange(
                            subCategory
                          )
                        }
                        className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-[#171717] text-white"
                            : "bg-white text-black/50 ring-1 ring-black/[0.06] hover:text-black"
                        }`}
                      >
                        {subCategory}
                      </button>
                    );
                  }
                )}

              </div>

            </div>
          )}

        {/* =================================================
            PRODUCTS META
        ================================================= */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-black">

              {filteredProducts.length}{" "}

              {filteredProducts.length === 1
                ? "Product"
                : "Products"}

            </p>

            <p className="mt-1 text-xs text-black/40">
              {filterDescription}
            </p>

          </div>

          <p className="hidden text-xs uppercase tracking-[0.2em] text-black/30 sm:block">
            FN Jewelry Worldwide
          </p>

        </div>

        {/* =================================================
            PRODUCTS GRID
        ================================================= */}

        {filteredProducts.length > 0 ? (

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="mx-auto mt-16 max-w-lg rounded-[2rem] border border-black/[0.06] bg-white px-6 py-16 text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/35">
              Collection
            </p>

            <h2 className="mt-4 font-serif text-3xl text-[#171717]">
              No products found
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/45">

              {isSaleOnly
                ? "There are currently no sale products matching your selected filters."
                : "We couldn't find any products in this category. Please explore another collection."}

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