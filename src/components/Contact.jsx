import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FiMail,
  FiMessageCircle,
  FiClock,
  FiHeart,
  FiArrowUpRight,
} from "react-icons/fi";

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      const timer = setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#FFF9F7] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >

      {/* =====================================================
          SOFT BACKGROUND DECOR
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#F8DDE5]/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#E8DDF2]/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-[#EEDFCB]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">

        {/* =====================================================
            SECTION INTRO
        ====================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D8B7A8]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A87585]">
              We’re Here For You
            </span>

            <span className="h-px w-10 bg-[#D8B7A8]" />
          </div>

          <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#3B2930] sm:text-5xl lg:text-6xl">
            Contact
            <span className="block italic text-[#B9788B]">
              Information
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6F5A61] sm:text-base">
            We’re here to help. Whether you have a question about your
            order, need assistance choosing a piece, or simply want to
            know more about our collection, we’d love to hear from you.
          </p>

        </div>

        {/* =====================================================
            CONTACT CARDS
        ====================================================== */}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* EMAIL */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-[#E8D6D8] bg-white/75 p-7 shadow-[0_12px_40px_rgba(105,75,75,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(105,75,75,0.10)]">

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F8DDE5]/50 blur-2xl" />

            <div className="relative">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#E5C9D0] bg-[#FDF1F4] text-[#A87585]">
                <FiMail className="text-xl" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A87585]">
                Email Support
              </p>

              <h3 className="mt-2 font-serif text-2xl text-[#3B2930]">
                Business & General
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#76636A]">
                For business enquiries, collaborations and general questions.
              </p>

              <p className="mt-5 break-all text-sm font-medium text-[#9D687A]">
                yourbusiness@email.com
              </p>

            </div>
          </div>

          {/* WHATSAPP */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-[#DED5E8] bg-white/75 p-7 shadow-[0_12px_40px_rgba(105,75,75,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(105,75,75,0.10)]">

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#E8DDF2]/50 blur-2xl" />

            <div className="relative">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#D9CCE3] bg-[#F7F2FA] text-[#80658B]">
                <FiMessageCircle className="text-xl" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#80658B]">
                WhatsApp Support
              </p>

              <h3 className="mt-2 font-serif text-2xl text-[#3B2930]">
                Let’s Chat
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#76636A]">
                Need quick assistance? Send us a message on WhatsApp.
              </p>

              <p className="mt-5 text-sm font-medium text-[#80658B]">
                +00 000 000 0000
              </p>

            </div>
          </div>

          {/* RESPONSE TIME */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-[#E6D9C9] bg-white/75 p-7 shadow-[0_12px_40px_rgba(105,75,75,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(105,75,75,0.10)] sm:col-span-2 lg:col-span-1">

            <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-[#EEDFCB]/50 blur-2xl" />

            <div className="relative">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#E4D3BA] bg-[#FCF5EA] text-[#9A8062]">
                <FiClock className="text-xl" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A8062]">
                Response Time
              </p>

              <h3 className="mt-2 font-serif text-2xl text-[#3B2930]">
                We’ll Be In Touch
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#76636A]">
                We aim to respond to all enquiries within
                <span className="font-semibold text-[#5B414B]">
                  {" "}24–48 hours
                </span>
                .
              </p>

              <p className="mt-5 text-sm font-medium text-[#9A8062]">
                Monday – Saturday
              </p>

            </div>
          </div>

        </div>

        {/* =====================================================
            CUSTOM / BULK / WEDDING ORDERS
        ====================================================== */}

        <div className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-[#E6D4C8] bg-gradient-to-br from-[#FFFDFB] via-[#FFF5F5] to-[#F8F1FA] px-7 py-10 shadow-[0_18px_55px_rgba(105,75,75,0.07)] sm:px-10 lg:px-14 lg:py-12">

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#F4D6DF]/40 blur-2xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#E7D9F0]/40 blur-2xl"
          />

          <div className="relative flex flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">

            <div className="max-w-2xl">

              <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
                <FiHeart className="text-[#B9788B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A87585]">
                  Special Occasions
                </span>
              </div>

              <h3 className="font-serif text-3xl leading-tight text-[#3B2930] sm:text-4xl">
                Planning something
                <span className="italic text-[#B9788B]">
                  {" "}beautiful?
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6F5A61] sm:text-base">
                We welcome custom, bulk and wedding-related orders.
                Whether you’re preparing for your big day or a special
                celebration, get in touch and let’s create something
                memorable together.
              </p>

            </div>

            <button
              type="button"
              className="group flex shrink-0 items-center gap-3 rounded-full bg-[#B9788B] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(185,120,139,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9677A] hover:shadow-[0_15px_35px_rgba(185,120,139,0.28)]"
            >
              Enquire With Us

              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

          </div>
        </div>

        {/* =====================================================
            LITTLE CLOSING LINE
        ====================================================== */}

        <div className="mt-10 text-center">

          <p className="font-serif text-base italic text-[#806D66]">
            Made with care, curated for your moments. ✨
          </p>

        </div>

      </div>
    </section>
  );
};

export default Contact;