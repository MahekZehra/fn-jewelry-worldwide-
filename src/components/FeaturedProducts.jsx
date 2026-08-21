import { Link } from "react-router-dom";
import products from "../data/Products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#FFFDF9]
        px-5 py-20
        sm:px-8
        lg:px-16 lg:py-28
      "
    >

      {/* =====================================================
          SOFT BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute -right-32 top-10
          h-80 w-80
          rounded-full
          bg-[#EFD9D5]/25
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -left-32 bottom-0
          h-72 w-72
          rounded-full
          bg-[#E8D7B8]/20
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <div
          className="
            mb-12
            flex items-end
            justify-between
            gap-6
            sm:mb-16
          "
        >

          <div>

            {/* Eyebrow */}

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-[#C9A66B]/50" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#B18A83]
                  sm:text-xs
                "
              >
                Customer Favorites
              </p>

            </div>

            {/* Heading */}

            <h2
              className="
                font-serif
                text-4xl
                leading-tight
                tracking-[-0.02em]
                text-[#3E302D]
                sm:text-5xl
              "
            >
              Best Sellers
            </h2>

            {/* Description */}

            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-6
                text-[#776965]
              "
            >
              Discover some of our most loved pieces, selected to bring
              effortless elegance to every occasion.
            </p>

            {/* Gold Accent */}

            <div className="mt-5 flex items-center gap-2">

              <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />

              <span className="h-px w-10 bg-[#C9A66B]/45" />

            </div>

          </div>

          {/* =================================================
              DESKTOP VIEW ALL
          ================================================= */}

          <Link
            to="/shop"
            className="
              group hidden
              items-center gap-3
              rounded-full
              border border-[#C9A66B]/35
              bg-[#FFFDF9]
              px-5 py-2.5
              text-sm
              font-medium
              text-[#5A4540]
              shadow-[0_3px_12px_rgba(82,58,52,0.04)]
              transition-all
              duration-300
              hover:border-[#C9A66B]/60
              hover:bg-[#F9F0E9]
              hover:shadow-[0_6px_18px_rgba(82,58,52,0.08)]
              sm:flex
            "
          >
            View All

            <span
              className="
                text-[#B28A55]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>

        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-12

            sm:grid-cols-3
            sm:gap-x-6
            sm:gap-y-14

            lg:grid-cols-4
            lg:gap-x-7
          "
        >

          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* =================================================
            MOBILE VIEW ALL
        ================================================= */}

        <div className="mt-12 flex justify-center sm:hidden">

          <Link
            to="/shop"
            className="
              group
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-[#B98B82]/35
              bg-[#FFF9F7]
              px-7 py-3.5
              text-sm
              font-medium
              tracking-wide
              text-[#5A4540]
              shadow-[0_4px_15px_rgba(82,58,52,0.05)]
              transition-all
              duration-300
              hover:border-[#C9A66B]/50
              hover:bg-[#F5E7E3]
              hover:shadow-[0_7px_20px_rgba(82,58,52,0.09)]
              active:scale-[0.98]
            "
          >
            View All Products

            <span
              className="
                text-[#B28A55]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;