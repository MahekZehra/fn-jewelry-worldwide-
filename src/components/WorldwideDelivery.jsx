import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
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
          WORLDWIDE DELIVERY SECTION
      ================================================= */}

      <section className="w-full overflow-hidden bg-[#171717] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">

        <div className="mx-auto w-full max-w-7xl">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div className="flex items-center gap-2">

                <FiGlobe className="text-sm text-white/50" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:text-xs">
                  Worldwide Delivery
                </p>

              </div>

              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your style,
                <br />
                wherever you are.
              </h2>

            </div>

            <div className="lg:pb-1">

              <p className="max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                FN Jewelry Worldwide brings elegant jewellery,
                garments and statement accessories to customers
                around the world. Select your shopping location
                to view prices in your preferred currency.
              </p>

              {/* CHANGE LOCATION */}

              <button
                type="button"
                onClick={handleLocationClick}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                Change Shopping Location

                <FiArrowUpRight className="text-base" />
              </button>

            </div>

          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="my-12 border-t border-white/10 sm:my-16" />

          {/* =================================================
              COUNTRIES
          ================================================= */}

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              We currently serve customers in
            </p>

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
                    className="group flex min-w-[255px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:min-w-0"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      {/* =================================================
                          FLAG
                      ================================================= */}

                      <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">

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

                        <p className="truncate text-sm font-medium text-white/85">
                          {country.name}
                        </p>

                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/30">
                          {country.code} · {country.currency}
                        </p>

                      </div>

                    </div>

                    <FiArrowUpRight className="ml-3 shrink-0 text-sm text-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />

                  </div>

                ))}

              </div>

            </div>

            {/* MOBILE INDICATOR */}

            <div className="mt-1 flex items-center gap-2 sm:hidden">

              <span className="h-px w-8 bg-white/20" />

              <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Swipe to explore
              </p>

              <FiArrowUpRight className="rotate-45 text-[10px] text-white/25" />

            </div>

          </div>

          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6">

            <p className="text-xs leading-6 text-white/40">
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* =================================================
              MODAL
          ================================================= */}

          <div className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-[1.5rem] bg-white text-black shadow-2xl sm:max-h-[85vh] sm:rounded-[2rem]">

            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] px-5 py-4 sm:px-6">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                  Worldwide Shopping
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#171717]">
                  Choose your location
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setIsLocationOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#FAF8F5] transition hover:bg-black hover:text-white"
                aria-label="Close"
              >
                <FiX />
              </button>

            </div>

            {/* =================================================
                SELECTED COUNTRY
            ================================================= */}

            <div className="shrink-0 border-b border-black/[0.07] px-5 py-4 sm:px-6">

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                Currently selected
              </p>

              <div className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3">

                {/* FLAG */}

                <span className="flex h-9 w-12 shrink-0 overflow-hidden rounded-md bg-white">

                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="block h-full w-full object-cover"
                    draggable="false"
                  />

                </span>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold">
                    {selectedCountry.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-black/45">
                    {selectedCountry.code} ·{" "}
                    {selectedCountry.currency}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SCROLLABLE COUNTRY LIST
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
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3.5 text-left transition ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-black/[0.07] bg-white text-black hover:bg-[#FAF8F5]"
                      }`}
                    >

                      <span className="flex min-w-0 items-center gap-3">

                        {/* FLAG */}

                        <span className="flex h-9 w-12 shrink-0 overflow-hidden rounded-md bg-[#FAF8F5]">

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
                                ? "text-white/55"
                                : "text-black/40"
                            }`}
                          >
                            {country.code} ·{" "}
                            {country.currency}
                          </span>

                        </span>

                      </span>

                      <span className="flex shrink-0 items-center gap-2">

                        <span className="text-xs font-semibold">
                          {country.symbol}
                        </span>

                        {isSelected && (
                          <FiCheck className="text-sm" />
                        )}

                      </span>

                    </button>
                  );
                })}

              </div>

            </div>

            {/* FOOTER */}

            <div className="shrink-0 border-t border-black/[0.07] px-5 py-3 text-center sm:px-6">

              <p className="text-[10px] text-black/35">
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