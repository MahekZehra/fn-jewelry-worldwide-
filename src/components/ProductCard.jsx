import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiArrowUpRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article className="group">

      {/* Product Image */}
      <div
        onClick={handleProductClick}
        className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[1.5rem] bg-[#EEE9E3]"
      >

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition duration-500 group-hover:bg-black/[0.06]" />

        {/* View Product */}
        <button
          type="button"
          onClick={handleProductClick}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white group-hover:opacity-100"
          aria-label={`View ${product.name}`}
        >
          <FiArrowUpRight className="text-lg" />
        </button>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 flex h-11 items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-black shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          <FiShoppingBag className="text-base" />
          Add to Cart
        </button>

      </div>

      {/* Product Information */}
      <div className="pt-4">

        {/* Category */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
          {product.category}
        </p>

        {/* Subcategory */}
        {product.subCategory && (
          <p className="mt-1 text-[11px] text-black/35">
            {product.subCategory}
          </p>
        )}

        {/* Product Name */}
        <h3
          onClick={handleProductClick}
          className="mt-2 cursor-pointer text-sm font-medium leading-5 text-black transition-opacity hover:opacity-60 sm:text-base"
        >
          {product.name}
        </h3>

        {/* Price */}
        <p className="mt-2 text-sm font-semibold text-black">
          Rs. {product.price.toLocaleString()}
        </p>

      </div>

    </article>
  );
};

export default ProductCard;