import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingBag, FiArrowUpRight } from "react-icons/fi";

import { useCart } from "../context/CartContext";
import CountrySelector from "./CountrySelector";

const navigationItems = [
  { label: "Home", to: "/", isActive: (location) => location.pathname === "/" },
  {
    label: "Shop",
    to: "/shop",
    isActive: (location) => location.pathname === "/shop" && !location.search,
  },
  {
    label: "Jewellery",
    to: "/shop?category=Jewellery",
    isActive: (location) =>
      location.pathname === "/shop" &&
      new URLSearchParams(location.search).get("category") === "Jewellery",
  },
  {
    label: "Garments",
    to: "/shop?category=Garments",
    isActive: (location) =>
      location.pathname === "/shop" &&
      new URLSearchParams(location.search).get("category") === "Garments",
  },
  {
    label: "Kundan Clutches",
    to: "/shop?category=Accessories",
    isActive: (location) =>
      location.pathname === "/shop" &&
      new URLSearchParams(location.search).get("category") === "Accessories",
  },
  {
    label: "Sale",
    to: "/shop?sale=true",
    isSale: true,
    isActive: (location) =>
      location.pathname === "/shop" &&
      new URLSearchParams(location.search).get("sale") === "true",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const renderCartLink = (mobile = false) => (
    <Link
      to="/cart"
      onClick={closeMenu}
      className={`relative flex shrink-0 items-center justify-center rounded-full border border-[#E5D4D7] bg-[#F7E8EA] text-[#5A4549] transition-all duration-300 hover:border-[#D4A6AC] hover:bg-[#B98288] hover:text-white active:scale-95 ${mobile ? "h-10 w-10" : "h-11 w-11"}`}
      aria-label={`Shopping bag, ${cartCount} items`}
    >
      <FiShoppingBag className={mobile ? "text-base" : "text-lg"} />
      {cartCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B98288] px-1 text-[10px] font-bold text-white shadow-sm">
          {cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#E8D8DA]/80 bg-[#FFF9F7]/95 shadow-[0_4px_24px_rgba(90,69,73,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:h-24 lg:px-10">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex h-full w-auto min-w-0 max-w-[44%] shrink items-center overflow-hidden"
            aria-label="F&A Collective Home"
          >
            <img
              src="/logo/fa-logo.jpg"
              alt="F&A Collective - Fashion and Jewellery"
              className="block h-[40px] max-h-[40px] w-auto max-w-[min(42vw,156px)] object-contain object-left sm:h-[54px] sm:max-h-[54px] sm:max-w-[210px] lg:h-[66px] lg:max-h-[66px] lg:max-w-[240px]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {navigationItems.map((item) => {
              const active = item.isActive(location);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`whitespace-nowrap text-[13px] font-medium transition-colors duration-300 xl:text-sm ${active ? "text-[#A86F77]" : item.isSale ? "text-[#9C626B] hover:text-[#A86F77]" : "text-[#6F5B5F] hover:text-[#A86F77]"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <CountrySelector />
            {renderCartLink()}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
            {renderCartLink(true)}
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5D4D7] bg-[#F7E8EA] text-[#5A4549] transition-all duration-300 hover:bg-[#EEDBDD] active:scale-95"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full animate-[fadeIn_180ms_ease-out] bg-[#302522]/35 backdrop-blur-[2px]"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />

          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="mobile-menu-panel absolute bottom-0 right-0 top-[72px] flex w-[min(88vw,390px)] flex-col overflow-y-auto border-l border-[#E8D8DA] bg-[#FFF9F7] px-6 pb-[max(28px,env(safe-area-inset-bottom))] pt-7 shadow-[-18px_0_55px_rgba(48,37,34,0.12)] sm:top-20 sm:px-8"
          >
            <div className="mb-7 border-b border-[#E8D8DA] pb-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#A8797D]">
                F&A Collective
              </p>
              <p className="mt-2 font-serif text-2xl text-[#493633]">
                Discover something beautiful.
              </p>
            </div>

            <nav aria-label="Mobile navigation links" className="flex flex-col">
              {navigationItems.map((item, index) => {
                const active = item.isActive(location);
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-[58px] items-center justify-between border-b border-[#E8D8DA] py-4 text-[15px] transition-colors duration-200 ${active ? "font-semibold text-[#A86F77]" : item.isSale ? "font-semibold text-[#9C626B]" : "font-medium text-[#6F5B5F] hover:text-[#A86F77]"}`}
                    style={{ animation: `mobileMenuItemIn 260ms ease both `, animationDelay: `${index * 35}ms` }}
                  >
                    <span>{item.label}</span>
                    <FiArrowUpRight className="text-base opacity-35 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-8">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9C8589]">
                Shopping Country & Currency
              </p>
              <div className="w-full">
                <CountrySelector />
              </div>
              <p className="mt-6 text-center text-[9px] uppercase tracking-[0.2em] text-[#B19A98]">
                Timeless elegance · F&A Collective
              </p>
            </div>
          </aside>
        </div>
      )}

      <div className="h-[72px] sm:h-20 lg:h-24" />
    </>
  );
};

export default Navbar;
