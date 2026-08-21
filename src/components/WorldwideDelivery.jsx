import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiGlobe,
  FiX,
} from "react-icons/fi";

const deliveryCountries = [
  {
    code: "PK",
    flag: "https://flagcdn.com/w80/pk.png",
    name: "Pakistan",
    currency: "PKR",
    symbol: "Rs.",
  },
  {
    code: "AE",
    flag: "https://flagcdn.com/w80/ae.png",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "AED",
  },
  {
    code: "SA",
    flag: "https://flagcdn.com/w80/sa.png",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "SAR",
  },
  {
    code: "QA",
    flag: "https://flagcdn.com/w80/qa.png",
    name: "Qatar",
    currency: "QAR",
    symbol: "QAR",
  },
  {
    code: "KW",
    flag: "https://flagcdn.com/w80/kw.png",
    name: "Kuwait",
    currency: "KWD",
    symbol: "KWD",
  },
  {
    code: "GB",
    flag: "https://flagcdn.com/w80/gb.png",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    code: "US",
    flag: "https://flagcdn.com/w80/us.png",
    name: "United States",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "CA",
    flag: "https://flagcdn.com/w80/ca.png",
    name: "Canada",
    currency: "CAD",
    symbol: "CA$",
  },
  {
    code: "AU",
    flag: "https://flagcdn.com/w80/au.png",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
  },
  {
    code: "DE",
    flag: "https://flagcdn.com/w80/de.png",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "FR",
    flag: "https://flagcdn.com/w80/fr.png",
    name: "France",
    currency: "EUR",
    symbol: "€",
  },
];

const WorldwideDelivery = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCountry");

      if (saved) {
        const parsed = JSON.parse(saved);

        const country = deliveryCountries.find(
          (item) => item.code === parsed.code
        );

        return country || deliveryCountries[0];
      }
    } catch (error) {
      console.error(
        "Unable to load selected country:",
        error
      );
    }

    return deliveryCountries[0];
  });

  /* =====================================================
     SYNC WITH NAVBAR COUNTRY SELECTOR
  ===================================================== */

  useEffect(() => {
    const handleCountryChanged = () => {
      try {
        const saved = localStorage.getItem(
          "selectedCountry"
        );

        if (!saved) return;

        const parsed = JSON.parse(saved);

        const country = deliveryCountries.find(
          (item) => item.code === parsed.code
        );

        if (country) {
          setSelectedCountry(country);
        }
      } catch (error) {
        console.error(
          "Unable to sync selected country:",
          error
        );
      }
    };

    window.addEventListener(
      "countryChanged",
      handleCountryChanged
    );

    return () => {
      window.removeEventListener(
        "countryChanged",
        handleCountryChanged
      );
    };
  }, []);

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!isLocationOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocationOpen]);

  /* =====================================================
     ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsLocationOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =====================================================
     OPEN LOCATION
  ===================================================== */

  const handleLocationClick = () => {
    setIsLocationOpen(true);
  };

  /* =====================================================
     SELECT COUNTRY
  ===================================================== */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(country)
    );

    window.dispatchEvent(
      new Event("countryChanged")
    );

    setIsLocationOpen(false);
  };

  return (
    <>
      {/* =================================================
          WORLDWIDE DELIVERY
      ================================================= */}

      <section className="relative w-full overflow-hidden bg-[#F3E9E5] px-5 py-20 text-[#292323] sm:px-8 sm:py-24 lg:px-16 lg:py-28">

        {/* SOFT DECORATIVE GLOWS */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#D9A9AD]/25 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 right-[-80px] h-96 w-96 rounded-full bg-[#D7B982]/20 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div className="flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B88B6D]/25 bg-white/50 text-[#A87868] shadow-sm">
                  <FiGlobe className="text-sm" />
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8E6965] sm:text-xs">
                  Worldwide Delivery
                </p>

              </div>

              <h2 className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] tracking-tight text-[#2B2525] sm:text-5xl lg:text-6xl">

                Your style,
                <br />

                <span className="italic text-[#A87878]">
                  wherever you are.
                </span>

              </h2>

              {/* GOLD DETAIL */}

              <div className="mt-6 flex items-center gap-3">

                <span className="h-px w-10 bg-[#B99A67]/60" />

                <span className="h-1.5 w-1.5 rounded-full bg-[#B99A67]" />

                <span className="h-px w-16 bg-[#B99A67]/30" />

              </div>

            </div>

            <div className="lg:pb-1">

              <p className="max-w-xl text-sm leading-7 text-[#6F6060] sm:text-base">

                FN Jewelry Worldwide brings elegant jewellery,
                garments and statement accessories to customers
                around the world. Select your shopping location
                to view prices in your preferred currency.

              </p>

              {/* CHANGE LOCATION */}

              <button
                type="button"
                onClick={handleLocationClick}
                className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#292323] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(75,50,50,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#403535] hover:shadow-xl active:scale-[0.98] sm:w-auto"
              >

                Change Shopping Location

                <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

              </button>

            </div>

          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="my-12 flex items-center gap-4 sm:my-16">

            <span className="h-px flex-1 bg-[#B88B6D]/15" />

            <span className="h-1.5 w-1.5 rounded-full bg-[#B99A67]/50" />

            <span className="h-px flex-1 bg-[#B88B6D]/15" />

          </div>

          {/* =================================================
              COUNTRIES
          ================================================= */}

          <div>

            <div className="flex items-center justify-between gap-4">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#927978]">
                We currently serve customers in
              </p>

              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#B99A67] sm:block">
                11 destinations
              </span>

            </div>

            {/* MOBILE HORIZONTAL SCROLL */}

            <div
              className="mt-6 w-full overflow-x-auto overscroll-x-contain pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x",
              }}
            >

              <div className="flex w-max gap-3 sm:grid sm:w-full sm:grid-cols-3 lg:grid-cols-4">

                {deliveryCountries.map((country) => (

                  <div
                    key={country.code}
                    className="group relative flex min-w-[255px] items-center justify-between overflow-hidden rounded-2xl border border-[#B88B6D]/15 bg-white/55 px-4 py-4 shadow-[0_8px_30px_rgba(90,60,60,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B88B6D]/30 hover:bg-white/80 hover:shadow-[0_15px_35px_rgba(90,60,60,0.09)] sm:min-w-0"
                  >

                    {/* SUBTLE GOLD SHIMMER */}

                    <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#D8B978]/10 blur-2xl transition duration-500 group-hover:scale-150" />

                    <div className="relative flex min-w-0 items-center gap-3">

                      {/* FLAG */}

                      <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white bg-white shadow-sm">

                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="block h-full w-full object-cover"
                          loading="eager"
                          draggable="false"
                        />

                      </span>

                      {/* COUNTRY */}

                      <div className="min-w-0">

                        <p className="truncate text-sm font-medium text-[#3A3030]">
                          {country.name}
                        </p>

                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-[#A18D8D]">
                          {country.code} · {country.currency}
                        </p>

                      </div>

                    </div>

                    <FiArrowUpRight className="relative ml-3 shrink-0 text-sm text-[#B99A67]/50 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A87868]" />

                  </div>

                ))}

              </div>

            </div>

            {/* MOBILE INDICATOR */}

            <div className="mt-1 flex items-center gap-2 sm:hidden">

              <span className="h-px w-8 bg-[#B88B6D]/25" />

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#A18D8D]">
                Swipe to explore
              </p>

              <FiArrowUpRight className="rotate-45 text-[10px] text-[#B99A67]/70" />

            </div>

          </div>

          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#B88B6D]/15 bg-white/45 px-5 py-5 shadow-sm backdrop-blur-sm sm:px-6">

            <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#D8B978]/10 blur-2xl" />

            <p className="relative text-xs leading-6 text-[#7D6C6C]">

              Delivery availability, shipping charges and estimated
              delivery times may vary by destination. Final delivery
              details will be confirmed during checkout.

            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CHANGE SHOPPING LOCATION MODAL
      ===================================================== */}

      {isLocationOpen && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close shopping location"
            onClick={() => setIsLocationOpen(false)}
            className="absolute inset-0 bg-[#332626]/45 backdrop-blur-md"
          />

          {/* =================================================
              MODAL
          ================================================= */}

          <div className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] border border-[#B88B6D]/15 bg-[#FFFDFC] text-[#292323] shadow-[0_30px_80px_rgba(50,30,30,0.18)] sm:max-h-[85vh] sm:rounded-[2rem]">

            {/* DECORATIVE GLOW */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#D9A9AD]/20 blur-3xl" />

            {/* HEADER */}

            <div className="relative flex shrink-0 items-center justify-between border-b border-[#B88B6D]/10 px-5 py-4 sm:px-6">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A87868]">
                  Worldwide Shopping
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#2B2525]">
                  Choose your location
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setIsLocationOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B88B6D]/15 bg-[#F7EEEB] text-[#735F5F] transition hover:bg-[#292323] hover:text-white"
                aria-label="Close"
              >
                <FiX />
              </button>

            </div>

            {/* =================================================
                SELECTED COUNTRY
            ================================================= */}

            <div className="relative shrink-0 border-b border-[#B88B6D]/10 px-5 py-4 sm:px-6">

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A18D8D]">
                Currently selected
              </p>

              <div className="flex items-center gap-3 rounded-2xl border border-[#B88B6D]/10 bg-[#F8EFEC] p-3">

                {/* FLAG */}

                <span className="flex h-9 w-12 shrink-0 overflow-hidden rounded-md border border-white bg-white shadow-sm">

                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="block h-full w-full object-cover"
                    draggable="false"
                  />

                </span>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-[#3A3030]">
                    {selectedCountry.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#9A8585]">
                    {selectedCountry.code} ·{" "}
                    {selectedCountry.currency}
                  </p>

                </div>

                <span className="ml-auto text-xs font-semibold text-[#B08D57]">
                  {selectedCountry.symbol}
                </span>

              </div>

            </div>

            {/* =================================================
                COUNTRY LIST
            ================================================= */}

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >

              <div className="space-y-2">

                {deliveryCountries.map((country) => {

                  const isSelected =
                    selectedCountry.code === country.code;

                  return (

                    <button
                      key={country.code}
                      type="button"
                      onClick={() =>
                        handleCountryChange(country)
                      }
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3.5 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-[#B99A67]/35 bg-[#F3E4E0] text-[#342929] shadow-sm"
                          : "border-[#B88B6D]/10 bg-white text-[#3A3030] hover:border-[#B88B6D]/25 hover:bg-[#FCF5F2]"
                      }`}
                    >

                      <span className="flex min-w-0 items-center gap-3">

                        {/* FLAG */}

                        <span className="flex h-9 w-12 shrink-0 overflow-hidden rounded-md border border-white bg-[#F8EFEC] shadow-sm">

                          <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            className="block h-full w-full object-cover"
                            loading="eager"
                            draggable="false"
                          />

                        </span>

                        {/* NAME + CODE */}

                        <span className="min-w-0">

                          <span className="block truncate text-sm font-medium">
                            {country.name}
                          </span>

                          <span
                            className={`mt-0.5 block text-[11px] ${
                              isSelected
                                ? "text-[#967676]"
                                : "text-[#A18D8D]"
                            }`}
                          >
                            {country.code} ·{" "}
                            {country.currency}
                          </span>

                        </span>

                      </span>

                      <span className="flex shrink-0 items-center gap-2">

                        <span className="text-xs font-semibold text-[#B08D57]">
                          {country.symbol}
                        </span>

                        {isSelected && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#292323] text-white">
                            <FiCheck className="text-xs" />
                          </span>
                        )}

                      </span>

                    </button>

                  );
                })}

              </div>

            </div>

            {/* FOOTER */}

            <div className="relative shrink-0 border-t border-[#B88B6D]/10 bg-[#FCF6F3] px-5 py-3 text-center sm:px-6">

              <p className="text-[10px] leading-5 text-[#9A8585]">
                Prices will update automatically after selecting
                your shopping country.
              </p>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default WorldwideDelivery;