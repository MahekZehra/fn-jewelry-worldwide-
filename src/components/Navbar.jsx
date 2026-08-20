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

  /* =====================================================
     ACTIVE PATH
  ===================================================== */

  const isActive = (path) => {
    return location.pathname === path;
  };

  /* =====================================================
     ACTIVE CATEGORY
  ===================================================== */

  const isCategoryActive = (category) => {
    const params = new URLSearchParams(location.search);

    return (
      location.pathname === "/shop" &&
      params.get("category") === category
    );
  };

  /* =====================================================
     ACTIVE SALE
  ===================================================== */

  const isSaleActive = () => {
    const params = new URLSearchParams(location.search);

    return (
      location.pathname === "/shop" &&
      params.get("sale") === "true"
    );
  };

  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-8 lg:px-10">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <h1 className="font-serif text-3xl tracking-[5px] text-white sm:text-4xl sm:tracking-[6px] lg:text-5xl">
              FN
            </h1>

            <p className="mt-[-3px] text-[6px] font-medium tracking-[0.32em] text-white/55 sm:text-[8px] sm:tracking-[0.35em]">
              JEWELRY WORLDWIDE
            </p>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">

            {/* HOME */}

            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive("/")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* SHOP */}

            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive("/shop") && !location.search
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Shop
            </Link>

            {/* JEWELLERY */}

            <Link
              to="/shop?category=Jewellery"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Jewellery")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Jewellery
            </Link>

            {/* GARMENTS */}

            <Link
              to="/shop?category=Garments"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Garments")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Garments
            </Link>

            {/* ACCESSORIES */}

            <Link
              to="/shop?category=Accessories"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Accessories")
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Accessories
            </Link>

            {/* =================================================
                SALE
            ================================================= */}

            <Link
              to="/shop?sale=true"
              className={`text-sm font-semibold transition-colors duration-300 ${
                isSaleActive()
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Sale
            </Link>

          </nav>

          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden items-center gap-3 lg:flex">

            {/* COUNTRY SELECTOR */}

            <CountrySelector />

            {/* CART */}

            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-lg" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          {/* =================================================
              MOBILE RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-2 lg:hidden">

            {/* MOBILE CART */}

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 active:scale-95"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-base" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 active:scale-95"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
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
          <div className="border-t border-white/10 bg-black/95 px-5 py-5 backdrop-blur-xl lg:hidden">

            <nav className="flex flex-col">

              {/* HOME */}

              <Link
                to="/"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Home
              </Link>

              {/* SHOP */}

              <Link
                to="/shop"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium transition-colors ${
                  isActive("/shop") && !location.search
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Shop
              </Link>

              {/* JEWELLERY */}

              <Link
                to="/shop?category=Jewellery"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Jewellery")
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Jewellery
              </Link>

              {/* GARMENTS */}

              <Link
                to="/shop?category=Garments"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Garments")
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Garments
              </Link>

              {/* ACCESSORIES */}

              <Link
                to="/shop?category=Accessories"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Accessories")
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Accessories
              </Link>

              {/* =================================================
                  SALE
              ================================================= */}

              <Link
                to="/shop?sale=true"
                onClick={closeMenu}
                className={`border-b border-white/10 py-4 text-sm font-semibold transition-colors ${
                  isSaleActive()
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                Sale
              </Link>

              {/* =================================================
                  MOBILE COUNTRY SELECTOR
              ================================================= */}

              <div className="pt-6">

                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                  Shopping Country
                </p>

                <div className="w-full">
                  <CountrySelector />
                </div>

              </div>

            </nav>

          </div>
        )}

      </header>

      {/* =====================================================
          NAVBAR SPACING
      ===================================================== */}

      <div className="h-20 sm:h-24" />
    </>
  );
};

export default Navbar;