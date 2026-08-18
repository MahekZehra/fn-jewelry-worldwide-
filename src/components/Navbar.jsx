import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import CountrySelector from "./CountrySelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <h1 className="font-serif text-3xl tracking-[6px] text-white sm:text-4xl lg:text-5xl">
              FN
            </h1>

            <p className="mt-[-4px] text-[7px] font-medium tracking-[0.35em] text-white/60 sm:text-[8px]">
              JEWELRY WORLDWIDE
            </p>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              to="/"
              className={`text-sm font-medium transition ${
                isActive("/")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`text-sm font-medium transition ${
                isActive("/shop")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Shop
            </Link>

            <Link
              to="/shop?category=Jewellery"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Jewellery
            </Link>

            <Link
              to="/shop?category=Garments"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Garments
            </Link>

            <Link
              to="/shop?category=Accessories"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Accessories
            </Link>

          </nav>

          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden items-center gap-3 lg:flex">

            {/* Country Selector */}

            <CountrySelector />

            {/* Cart */}

            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white hover:text-black"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-lg" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          {/* =================================================
              MOBILE RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-2 lg:hidden">

            {/* Mobile Cart */}

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-base" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu Button */}

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-black px-5 py-6 lg:hidden">

            <nav className="flex flex-col">

              <Link
                to="/"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium ${
                  isActive("/")
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium ${
                  isActive("/shop")
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                Shop
              </Link>

              <Link
                to="/shop?category=Jewellery"
                onClick={closeMenu}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/60"
              >
                Jewellery
              </Link>

              <Link
                to="/shop?category=Garments"
                onClick={closeMenu}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/60"
              >
                Garments
              </Link>

              <Link
                to="/shop?category=Accessories"
                onClick={closeMenu}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/60"
              >
                Accessories
              </Link>

              {/* Country Selector */}

              <div className="pt-5">

                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Shopping Country
                </p>

                <CountrySelector />

              </div>

            </nav>

          </div>
        )}

      </header>

      {/* Navbar spacing */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;