import { FiCheck, FiMapPin, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

function WorldwideDelivery() {
  return (
    <section
      id="uae-delivery"
      className="relative overflow-hidden bg-[#F3E9E5] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#D9B7A6]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#C9A58E]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B88B6D]/20 bg-white/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8E6A5A] backdrop-blur-sm">
            <FiTruck className="text-sm" />
            UAE Delivery Only
          </div>

          <h2 className="text-4xl font-light tracking-[-0.03em] text-[#332724] sm:text-5xl lg:text-6xl">
            Your style,
            <br />
            <span className="italic text-[#9B7563]">
              delivered across the Emirates.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#6F5B54] sm:text-base">
            Discover artificial jewellery, elegant jewellery sets and Kundan
            clutches online at F&amp;A Collective. We currently offer delivery
            within the United Arab Emirates only. International shipping is
            temporarily unavailable.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#B88B6D]/25 bg-white/80 px-6 py-3 text-xs font-semibold tracking-wide text-[#332724] shadow-[0_8px_30px_rgba(91,65,53,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Explore the Collection
            <FiMapPin className="text-sm text-[#9B7563]" />
          </Link>
        </div>

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[#B88B6D]/20 to-transparent" />

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8E6A5A]">
              Delivery locations
            </p>
            <span className="w-fit rounded-full border border-[#B88B6D]/15 bg-white/50 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#8E6A5A]">
              All 7 Emirates
            </span>
          </div>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {emirates.map((emirate) => (
              <li
                key={emirate}
                className="flex items-center gap-3 rounded-2xl border border-[#B88B6D]/15 bg-white/55 px-4 py-4 text-sm font-medium text-[#4B3933] shadow-[0_8px_24px_rgba(91,65,53,0.04)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#9B7563]">
                  <FiCheck className="text-sm" />
                </span>
                {emirate}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-[#7B655D] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-[#9B7563]">
              <FiCheck />
            </span>
            <span>Secure ordering and delivery within the UAE.</span>
          </div>
          <span className="text-[#8E6A5A]/80">
            International shipping is temporarily unavailable.
          </span>
        </div>
      </div>
    </section>
  );
}

export default WorldwideDelivery;
