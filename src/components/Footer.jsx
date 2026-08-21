import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiArrowUpRight,
  FiHeart,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#F4EDEA] px-5 pb-7 pt-16 text-[#2B2525] sm:px-8 sm:pt-20 lg:px-16 lg:pt-24">

      {/* =====================================================
          DREAMY DECORATIVE GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D8B6B8]/25 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-[-120px] h-96 w-96 rounded-full bg-[#E7D5C7]/40 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            TOP BRAND STATEMENT
        ===================================================== */}

        <div className="relative mb-16 border-b border-[#2B2525]/10 pb-12 sm:mb-20 sm:pb-14">

          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9B7477] sm:text-xs">
            A little luxury, wherever you go
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-center font-serif text-4xl leading-tight tracking-tight text-[#2B2525] sm:text-5xl lg:text-6xl">
            Made for the girl who
            <span className="block italic text-[#9B7477]">
              loves to be noticed.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-[#2B2525]/55">
            Beautiful details, effortless elegance and pieces that make
            every outfit feel just a little more unforgettable.
          </p>

        </div>

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <Link
              to="/"
              className="group inline-block"
            >

              <span className="block font-serif text-4xl tracking-[5px] text-[#2B2525] transition duration-300 group-hover:text-[#9B7477]">
                FN
              </span>

              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[3px] text-[#9B7477]">
                Jewelry Worldwide
              </span>

            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#2B2525]/55">
              Artificial jewellery, premium cloth materials and elegant
              accessories curated for the woman who never settles for
              ordinary.
            </p>

            {/* Social */}

            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B2525]/10 bg-white/40 text-[#2B2525]/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7477]/40 hover:bg-[#D8B6B8]/25 hover:text-[#9B7477]"
              >
                <FiInstagram className="text-sm" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B2525]/10 bg-white/40 text-[#2B2525]/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7477]/40 hover:bg-[#D8B6B8]/25 hover:text-[#9B7477]"
              >
                <FiFacebook className="text-sm" />
              </a>

              <a
                href="mailto:info@fnjewelryworldwide.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B2525]/10 bg-white/40 text-[#2B2525]/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7477]/40 hover:bg-[#D8B6B8]/25 hover:text-[#9B7477]"
              >
                <FiMail className="text-sm" />
              </a>

            </div>

          </div>

          {/* =================================================
              SHOP
          ================================================= */}

          <div>

            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B7477]">
              Shop
            </h3>

            <nav className="mt-6 flex flex-col gap-4">

              <Link
                to="/shop?category=Jewellery"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Jewellery
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

              <Link
                to="/shop?category=Garments"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Garments
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

              <Link
                to="/shop?category=Accessories"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Accessories
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

              <Link
                to="/shop"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                New Arrivals
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

            </nav>

          </div>

          {/* =================================================
              CUSTOMER CARE
          ================================================= */}

          <div>

            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B7477]">
              Customer Care
            </h3>

            <nav className="mt-6 flex flex-col gap-4">

              <Link
                to="/cart"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Shopping Bag
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

              <Link
                to="/checkout"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Checkout
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </Link>

              <a
                href="mailto:info@fnjewelryworldwide.com"
                className="group flex w-fit items-center gap-1 text-sm text-[#2B2525]/55 transition duration-300 hover:translate-x-1 hover:text-[#2B2525]"
              >
                Contact Us
                <FiArrowUpRight className="text-[11px] opacity-0 transition duration-300 group-hover:opacity-60" />
              </a>

            </nav>

          </div>

          {/* =================================================
              PROMISE
          ================================================= */}

          <div>

            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B7477]">
              Our Little Promise
            </h3>

            <p className="mt-6 text-sm leading-7 text-[#2B2525]/55">
              Thoughtfully selected pieces, feminine details and a
              shopping experience designed to make you feel beautiful.
            </p>

            <Link
              to="/shop"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#2B2525]/15 bg-white/35 px-5 py-3 text-xs font-semibold text-[#2B2525] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9B7477]/40 hover:bg-[#D8B6B8]/20 hover:shadow-md"
            >
              Explore Collection

              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

            </Link>

          </div>

        </div>

        {/* =====================================================
            GOLD DIVIDER
        ===================================================== */}

        <div className="mt-14 border-t border-[#B99A78]/25 pt-6 sm:mt-16">

          <div className="flex flex-col gap-3 text-xs text-[#2B2525]/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 FN Jewelry Worldwide. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5">
              Crafted with
              <FiHeart className="text-[10px] text-[#B88A8D]" />
              and a little bit of magic.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;