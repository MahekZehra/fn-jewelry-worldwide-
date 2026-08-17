import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path, category) => {
    if (category) {
      return (
        location.pathname === "/shop" &&
        new URLSearchParams(location.search).get("category") === category
      );
    }

    return location.pathname === path;
  };

  const navItems = [
    {
      label: "Home",
      to: "/",
      active: isActive("/"),
    },
    {
      label: "Jewellery",
      to: "/shop?category=Jewellery",
      active: isActive("/shop", "Jewellery"),
    },
    {
      label: "Garments",
      to: "/shop?category=Garments",
      active: isActive("/shop", "Garments"),
    },
    {
      label: "Accessories",
      to: "/shop?category=Accessories",
      active: isActive("/shop", "Accessories"),
    },
    {
      label: "New Arrivals",
      to: "/shop",
      active: location.pathname === "/shop" && !location.search,
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#FAF8F5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <div className="flex items-center">
              <span className="font-serif text-2xl font-semibold tracking-[4px]">
                FN
              </span>

              <span className="ml-2 hidden text-[11px] font-medium tracking-[2.5px] text-black/70 sm:inline">
                JEWELRY WORLDWIDE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative py-2 text-[13px] font-medium tracking-wide transition ${
                  item.active
                    ? "text-black"
                    : "text-black/55 hover:text-black"
                }`}
              >
                {item.label}

                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-black transition-all duration-300 ${
                    item.active ? "w-5" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">

            {/* Account */}
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:bg-black/5 hover:text-black sm:flex"
              aria-label="Account"
            >
              <FiUser className="text-[18px]" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-black/80 transition hover:bg-black/5 hover:text-black"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <FiShoppingBag className="text-[19px]" />

              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[76px] z-40 border-b border-black/[0.06] bg-[#FAF8F5]/98 shadow-xl backdrop-blur-xl lg:hidden">

          <nav className="mx-auto max-w-7xl px-6 py-3">

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className={`flex items-center justify-between border-b border-black/[0.06] py-4 text-sm transition ${
                  item.active
                    ? "font-semibold text-black"
                    : "font-medium text-black/65"
                }`}
              >
                <span>{item.label}</span>

                {item.active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                )}
              </Link>
            ))}

            {/* Mobile Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between py-4 text-sm font-semibold"
            >
              <span>Shopping Bag</span>

              <span className="rounded-full bg-black px-2.5 py-1 text-[10px] text-white">
                {cartCount}
              </span>
            </Link>

          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;