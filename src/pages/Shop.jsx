import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiArrowUpRight,
  FiChevronRight,
  FiHeart,
  FiStar,
} from "react-icons/fi";

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
    setActiveCategory(categoryFromUrl || "All");

    setActiveSubCategory(
      subCategoryFromUrl || "All"
    );

    setIsSaleOnly(saleFromUrl === "true");
  }, [
    categoryFromUrl,
    subCategoryFromUrl,
    saleFromUrl,
  ]);

  /* =====================================================
     AVAILABLE SUBCATEGORIES
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
      const matchesCategory =
        activeCategory === "All" ||
        product.category?.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase();

      const matchesSubCategory =
        activeSubCategory === "All" ||
        product.subCategory?.trim().toLowerCase() ===
          activeSubCategory.trim().toLowerCase();

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
    setIsSaleOnly(false);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category,
      });
    }
  };

  /* =====================================================
     SUBCATEGORY CHANGE
  ===================================================== */

  const handleSubCategoryChange = (subCategory) => {
    setActiveSubCategory(subCategory);

    const params = {};

    if (activeCategory !== "All") {
      params.category = activeCategory;
    }

    if (
      subCategory !== "All" &&
      activeCategory !== "All"
    ) {
      params.subCategory = subCategory;
    }

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

    if (activeCategory !== "All") {
      params.category = activeCategory;
    }

    if (
      activeSubCategory !== "All" &&
      activeCategory !== "All"
    ) {
      params.subCategory = activeSubCategory;
    }

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
    if (
      isSaleOnly &&
      activeCategory !== "All" &&
      activeSubCategory !== "All"
    ) {
      return `Showing sale items in ${activeSubCategory.toLowerCase()}`;
    }

    if (
      isSaleOnly &&
      activeCategory !== "All"
    ) {
      return `Showing sale items in ${activeCategory.toLowerCase()}`;
    }

    if (isSaleOnly) {
      return "Showing all products currently on sale";
    }

    if (activeCategory === "All") {
      return "Showing our complete collection";
    }

    if (activeSubCategory === "All") {
      return `Showing all ${activeCategory.toLowerCase()}`;
    }

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
    <main
      className="
        relative min-h-screen
        overflow-hidden
        bg-[#F8F2EC]
        px-5 pb-24 pt-12
        sm:px-8 sm:pt-16
        lg:px-16 lg:pb-32 lg:pt-20
      "
    >

      {/* =================================================
          WHIMSICAL BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute -right-44 top-16
          h-[30rem] w-[30rem]
          rounded-full
          bg-[#E8C9CF]/30
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute -left-48 top-[28%]
          h-[32rem] w-[32rem]
          rounded-full
          bg-[#E7D4B7]/25
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute right-[20%] top-[55%]
          h-72 w-72
          rounded-full
          bg-[#DCCFE0]/20
          blur-[90px]
        "
      />

      {/* =================================================
          DECORATIVE FLOATING DETAILS
      ================================================= */}

      <div className="pointer-events-none absolute left-[7%] top-32 hidden text-[#B9937D]/30 lg:block">
        <FiStar className="text-2xl" />
      </div>

      <div className="pointer-events-none absolute right-[8%] top-[24%] hidden text-[#B9937D]/25 lg:block">
        <FiStar className="text-xl" />
      </div>

      <div className="pointer-events-none absolute bottom-[15%] left-[12%] hidden text-[#B9937D]/20 lg:block">
        <FiStar className="text-lg" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="mx-auto max-w-3xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#B9937D]/45" />

            <FiStar className="text-xs text-[#B9937D]/70" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-[#A8797D]
                sm:text-xs
              "
            >
              FN Jewelry Worldwide
            </p>

            <FiStar className="text-xs text-[#B9937D]/70" />

            <span className="h-px w-10 bg-[#B9937D]/45" />

          </div>

          <h1
            className="
              mt-5
              font-serif
              text-5xl
              leading-[0.95]
              tracking-[-0.035em]
              text-[#463532]
              sm:text-6xl
              lg:text-7xl
            "
          >
            Shop Our
            <span className="block italic text-[#A8797D]">
              Collection
            </span>
          </h1>

          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-sm
              leading-7
              text-[#776966]
              sm:text-base
            "
          >
            A curated world of delicate jewellery,
            beautiful fabrics and statement pieces —
            selected for the woman who loves to
            stand out effortlessly.
          </p>

          {/* ORNAMENT */}

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">

            <span className="h-px w-14 bg-[#B9937D]/35" />

            <FiStar className="text-lg text-[#B9937D]/60" />

            <span className="h-px w-14 bg-[#B9937D]/35" />

          </div>

        </header>

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        <div
          className="
            mt-12
            rounded-[1.75rem]
            border border-[#B9937D]/20
            bg-[#FFF9F6]/75
            p-3
            shadow-[0_18px_50px_rgba(89,62,55,0.06)]
            backdrop-blur-sm
            sm:mt-16
            sm:p-4
          "
        >

          <div
            className="
              flex items-center
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-hide
              sm:justify-center
            "
          >

            {categories.map((category) => {

              const isActive =
                activeCategory === category &&
                !isSaleOnly;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`
                    whitespace-nowrap
                    rounded-full
                    px-6 py-3
                    text-xs
                    font-medium
                    tracking-wide
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-[#493633]
                          text-[#FFF9F6]
                          shadow-[0_8px_22px_rgba(73,54,51,0.18)]
                        `
                        : `
                          border
                          border-[#D6B8B5]/35
                          bg-[#FFFDFC]
                          text-[#806D68]
                          hover:border-[#B9937D]/45
                          hover:bg-[#F5E6E3]
                          hover:text-[#513D39]
                        `
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}

            {/* SALE */}

            <button
              type="button"
              onClick={handleSaleChange}
              className={`
                whitespace-nowrap
                rounded-full
                px-6 py-3
                text-xs
                font-medium
                tracking-wide
                transition-all
                duration-300

                ${
                  isSaleOnly
                    ? `
                      bg-[#A8797D]
                      text-white
                      shadow-[0_8px_22px_rgba(168,121,125,0.22)]
                    `
                    : `
                      border
                      border-[#D6B8B5]/35
                      bg-[#FFFDFC]
                      text-[#806D68]
                      hover:border-[#B9937D]/45
                      hover:bg-[#F5E6E3]
                      hover:text-[#513D39]
                    `
                }
              `}
            >
              On Sale
            </button>

          </div>

        </div>

        {/* =================================================
            SALE STATUS
        ================================================= */}

        {isSaleOnly && (
          <div
            className="
              mt-5
              flex items-center
              justify-between
              rounded-2xl
              border border-[#D6B8B5]/25
              bg-[#F7E8E6]/80
              px-4 py-3
              shadow-[0_8px_25px_rgba(89,62,55,0.05)]
              sm:px-5
            "
          >

            <div className="flex items-center gap-3">

              <span
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  bg-[#A8797D]
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                %
              </span>

              <div>

                <p className="text-xs font-semibold text-[#493633]">
                  Sale Collection
                </p>

                <p className="mt-0.5 text-[11px] text-[#9B817B]">
                  A little something beautiful, for less.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="
                text-[11px]
                font-medium
                text-[#9C817B]
                transition
                hover:text-[#493633]
              "
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

              <div
                className="
                  flex items-center
                  gap-2
                  overflow-x-auto
                  pb-2
                  scrollbar-hide
                  sm:justify-center
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    handleSubCategoryChange("All")
                  }
                  className={`
                    whitespace-nowrap
                    rounded-full
                    px-5 py-2.5
                    text-[11px]
                    font-medium
                    transition-all
                    duration-300

                    ${
                      activeSubCategory === "All"
                        ? `
                          bg-[#6B514B]
                          text-white
                          shadow-[0_5px_15px_rgba(73,54,51,0.12)]
                        `
                        : `
                          border
                          border-[#D6B8B5]/30
                          bg-[#FFFDFC]
                          text-[#8A7772]
                          hover:bg-[#F7E9E5]
                          hover:text-[#513D39]
                        `
                    }
                  `}
                >
                  All {activeCategory}
                </button>

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
                        className={`
                          whitespace-nowrap
                          rounded-full
                          px-5 py-2.5
                          text-[11px]
                          font-medium
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? `
                                bg-[#6B514B]
                                text-white
                                shadow-[0_5px_15px_rgba(73,54,51,0.12)]
                              `
                              : `
                                border
                                border-[#D6B8B5]/30
                                bg-[#FFFDFC]
                                text-[#8A7772]
                                hover:bg-[#F7E9E5]
                                hover:text-[#513D39]
                              `
                          }
                        `}
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

        <div
          className="
            mt-10
            flex items-end
            justify-between
            border-b border-[#B9937D]/15
            pb-5
          "
        >

          <div>

            <p className="font-serif text-xl text-[#493633] sm:text-2xl">

              {filteredProducts.length}{" "}

              <span className="italic text-[#A8797D]">
                {filteredProducts.length === 1
                  ? "Piece"
                  : "Pieces"}
              </span>

            </p>

            <p className="mt-1 text-xs text-[#9A8580]">
              {filterDescription}
            </p>

          </div>

          <div className="hidden items-center gap-2 sm:flex">

            <span className="h-px w-8 bg-[#B9937D]/30" />

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#A8797D]/65
              "
            >
              Curated for you
            </p>

            <FiHeart className="text-xs text-[#B9937D]/55" />

          </div>

        </div>

        {/* =================================================
            PRODUCTS AREA
        ================================================= */}

        {filteredProducts.length > 0 ? (

          <div
            className="
              relative
              mt-8
              rounded-[2rem]
              border border-[#B9937D]/10
              bg-[#FFF9F5]/45
              p-3
              shadow-[0_20px_60px_rgba(89,62,55,0.035)]
              sm:mt-10
              sm:p-5
              lg:p-7
            "
          >

            {/* subtle inner glow */}

            <div
              className="
                pointer-events-none
                absolute inset-0
                rounded-[2rem]
                bg-gradient-to-br
                from-white/50
                via-transparent
                to-[#E8C9CF]/10
              "
            />

            <div
              className="
                relative z-10
                grid
                grid-cols-2
                gap-x-4
                gap-y-12

                sm:grid-cols-3
                sm:gap-x-6
                sm:gap-y-14

                lg:grid-cols-4
                lg:gap-x-7
                lg:gap-y-16
              "
            >

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className="
              mx-auto
              mt-16
              max-w-lg
              rounded-[2rem]
              border border-[#D6B8B5]/25
              bg-gradient-to-br
              from-[#FFFDFC]
              via-[#F9EEEB]
              to-[#F1E3DD]
              px-6 py-16
              text-center
              shadow-[0_15px_45px_rgba(82,58,52,0.06)]
            "
          >

            <div className="mx-auto flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#B9937D]/45" />

              <FiSparkles className="text-sm text-[#B9937D]/65" />

              <span className="h-px w-8 bg-[#B9937D]/45" />

            </div>

            <p
              className="
                mt-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#A8797D]
              "
            >
              The Collection
            </p>

            <h2
              className="
                mt-4
                font-serif
                text-3xl
                tracking-tight
                text-[#493633]
              "
            >
              No products found
            </h2>

            <p
              className="
                mx-auto mt-3
                max-w-sm
                text-sm
                leading-6
                text-[#8A7772]
              "
            >
              {isSaleOnly
                ? "There are currently no sale pieces matching your selected filters."
                : "We couldn't find any pieces in this collection. Perhaps another one is waiting for you."}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#493633]
                px-7 py-3
                text-sm
                font-medium
                tracking-wide
                text-white
                shadow-[0_8px_22px_rgba(67,48,43,0.14)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#604A44]
                hover:shadow-[0_10px_28px_rgba(67,48,43,0.18)]
              "
            >
              View All Pieces
              <FiArrowUpRight />
            </button>

          </div>

        )}

        {/* =================================================
            BOTTOM BRAND NOTE
        ================================================= */}

        {filteredProducts.length > 0 && (
          <div className="mt-14 flex items-center justify-center gap-3 text-center">

            <span className="h-px w-10 bg-[#B9937D]/25" />

            <p className="font-serif text-sm italic text-[#9B817B]">
              Made for beautiful moments.
            </p>

            <span className="h-px w-10 bg-[#B9937D]/25" />

          </div>
        )}

      </div>

    </main>
  );
};

export default Shop;