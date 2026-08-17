import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#111111] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-16 lg:pt-20">

      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">

          {/* Brand */}
          <div>

            <Link
              to="/"
              className="inline-block font-serif text-2xl tracking-[4px] transition-opacity hover:opacity-70"
            >
              FN
            </Link>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[2.5px] text-white/45">
              Jewelry Worldwide
            </p>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              Artificial jewellery, premium cloth materials and elegant
              accessories designed to bring effortless beauty to every
              occasion.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <FiFacebook />
              </a>

              <a
                href="mailto:info@fnjewelryworldwide.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <FiMail />
              </a>

            </div>

          </div>

          {/* Shop */}
          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Shop
            </h3>

            <nav className="mt-5 flex flex-col gap-3">

              <Link
                to="/shop?category=Jewellery"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Jewellery
              </Link>

              <Link
                to="/shop?category=Garments"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Garments
              </Link>

              <Link
                to="/shop?category=Accessories"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Accessories
              </Link>

              <Link
                to="/shop"
                className="group flex w-fit items-center gap-1 text-sm text-white/45 transition hover:text-white"
              >
                New Arrivals
                <FiArrowUpRight className="text-xs opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </nav>

          </div>

          {/* Customer Care */}
          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Customer Care
            </h3>

            <nav className="mt-5 flex flex-col gap-3">

              <Link
                to="/cart"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Shopping Bag
              </Link>

              <Link
                to="/checkout"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Checkout
              </Link>

              <a
                href="mailto:info@fnjewelryworldwide.com"
                className="w-fit text-sm text-white/45 transition hover:text-white"
              >
                Contact Us
              </a>

            </nav>

          </div>

          {/* Brand Message */}
          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Our Promise
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/45">
              Thoughtfully selected pieces, elegant designs and a shopping
              experience made for effortless style.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold transition hover:bg-white hover:text-black"
            >
              Explore Collection
              <FiArrowUpRight />
            </Link>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 FN Jewelry Worldwide. All rights reserved.
            </p>

            <p>
              Crafted with elegance.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;