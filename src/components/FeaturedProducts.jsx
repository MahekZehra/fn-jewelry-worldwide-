import { Link } from "react-router-dom";
import products from "../data/Products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  return (
    <section className="bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">

          <div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
              Customer Favorites
            </p>

            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl">
              Best Sellers
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
              Discover some of our most loved pieces, selected to bring
              effortless elegance to every occasion.
            </p>

          </div>

          {/* Desktop View All */}
          <Link
            to="/shop"
            className="group hidden items-center gap-2 text-sm font-semibold sm:flex"
          >
            View All

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7">

          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* Mobile View All */}
        <div className="mt-12 flex justify-center sm:hidden">

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-semibold transition duration-300 hover:bg-black hover:text-white"
          >
            View All Products
            <span>→</span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;