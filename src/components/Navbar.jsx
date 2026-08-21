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

      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#E8D8DA]/80 bg-[#FFF9F7]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-8 lg:px-10">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <h1 className="font-serif text-3xl tracking-[5px] text-[#3B3032] sm:text-4xl sm:tracking-[6px] lg:text-5xl">
              FN
            </h1>

            <p className="mt-[-3px] text-[6px] font-medium tracking-[0.32em] text-[#8C777B] sm:text-[8px] sm:tracking-[0.35em]">
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
                  ? "text-[#A86F77]"
                  : "text-[#6F5B5F] hover:text-[#A86F77]"
              }`}
            >
              Home
            </Link>

            {/* SHOP */}

            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive("/shop") && !location.search
                  ? "text-[#A86F77]"
                  : "text-[#6F5B5F] hover:text-[#A86F77]"
              }`}
            >
              Shop
            </Link>

            {/* JEWELLERY */}

            <Link
              to="/shop?category=Jewellery"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Jewellery")
                  ? "text-[#A86F77]"
                  : "text-[#6F5B5F] hover:text-[#A86F77]"
              }`}
            >
              Jewellery
            </Link>

            {/* GARMENTS */}

            <Link
              to="/shop?category=Garments"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Garments")
                  ? "text-[#A86F77]"
                  : "text-[#6F5B5F] hover:text-[#A86F77]"
              }`}
            >
              Garments
            </Link>

            {/* ACCESSORIES */}

            <Link
              to="/shop?category=Accessories"
              className={`text-sm font-medium transition-colors duration-300 ${
                isCategoryActive("Accessories")
                  ? "text-[#A86F77]"
                  : "text-[#6F5B5F] hover:text-[#A86F77]"
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
                  ? "text-[#A86F77]"
                  : "text-[#9C626B] hover:text-[#A86F77]"
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
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E5D4D7] bg-[#F7E8EA] text-[#5A4549] transition-all duration-300 hover:border-[#D4A6AC] hover:bg-[#B98288] hover:text-white"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-lg" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B98288] px-1 text-[10px] font-bold text-white shadow-sm">
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
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5D4D7] bg-[#F7E8EA] text-[#5A4549] transition-all duration-300 active:scale-95"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="text-base" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B98288] px-1 text-[9px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen((current) => !current)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5D4D7] bg-[#F7E8EA] text-[#5A4549] transition-all duration-300 active:scale-95"
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
          <div className="border-t border-[#E8D8DA] bg-[#FFF9F7]/98 px-5 py-5 backdrop-blur-xl lg:hidden">

            <nav className="flex flex-col">

              {/* HOME */}

              <Link
                to="/"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-[#A86F77]"
                    : "text-[#6F5B5F] hover:text-[#A86F77]"
                }`}
              >
                Home
              </Link>

              {/* SHOP */}

              <Link
                to="/shop"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-medium transition-colors ${
                  isActive("/shop") && !location.search
                    ? "text-[#A86F77]"
                    : "text-[#6F5B5F] hover:text-[#A86F77]"
                }`}
              >
                Shop
              </Link>

              {/* JEWELLERY */}

              <Link
                to="/shop?category=Jewellery"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Jewellery")
                    ? "text-[#A86F77]"
                    : "text-[#6F5B5F] hover:text-[#A86F77]"
                }`}
              >
                Jewellery
              </Link>

              {/* GARMENTS */}

              <Link
                to="/shop?category=Garments"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Garments")
                    ? "text-[#A86F77]"
                    : "text-[#6F5B5F] hover:text-[#A86F77]"
                }`}
              >
                Garments
              </Link>

              {/* ACCESSORIES */}

              <Link
                to="/shop?category=Accessories"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-medium transition-colors ${
                  isCategoryActive("Accessories")
                    ? "text-[#A86F77]"
                    : "text-[#6F5B5F] hover:text-[#A86F77]"
                }`}
              >
                Accessories
              </Link>

              {/* SALE */}

              <Link
                to="/shop?sale=true"
                onClick={closeMenu}
                className={`border-b border-[#E8D8DA] py-4 text-sm font-semibold transition-colors ${
                  isSaleActive()
                    ? "text-[#A86F77]"
                    : "text-[#9C626B] hover:text-[#A86F77]"
                }`}
              >
                Sale
              </Link>

              {/* =================================================
                  MOBILE COUNTRY SELECTOR
              ================================================= */}

              <div className="pt-6">

                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9C8589]">
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