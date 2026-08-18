import { useState } from "react";
import {
  FiArrowUpRight,
  FiGlobe,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

const deliveryCountries = [
  {
    code: "PK",
    name: "Pakistan",
    currency: "PKR",
    symbol: "Rs.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "AED",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "SAR",
  },
  {
    code: "QA",
    name: "Qatar",
    currency: "QAR",
    symbol: "QAR",
  },
  {
    code: "KW",
    name: "Kuwait",
    currency: "KWD",
    symbol: "KWD",
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    symbol: "$",
  },
  {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    symbol: "CA$",
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
  },
  {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
  },
  {
    code: "FR",
    name: "France",
    currency: "EUR",
    symbol: "€",
  },
];

const WorldwideDelivery = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const savedCountry =
        localStorage.getItem("selectedCountry");

      if (savedCountry) {
        return JSON.parse(savedCountry);
      }
    } catch (error) {
      console.error("Unable to read selected country:", error);
    }

    return deliveryCountries[0];
  });

  /* =====================================================
     OPEN LOCATION SELECTOR
  ===================================================== */

  const handleLocationClick = () => {
    setIsLocationOpen(true);
  };

  /* =====================================================
     CHANGE COUNTRY
  ===================================================== */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(country)
    );

    setIsLocationOpen(false);

    // Update prices everywhere on the website
    window.dispatchEvent(new Event("countryChanged"));
  };

  /* =====================================================
     CLOSE LOCATION SELECTOR
  ===================================================== */

  const closeLocationSelector = () => {
    setIsLocationOpen(false);
  };

  return (
    <>
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">

        <div className="mx-auto max-w-7xl">

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

              {/* =================================================
                  CHANGE SHOPPING LOCATION
              ================================================= */}

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
              COUNTRY GRID
          ================================================= */}

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              We currently serve customers in
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

              {deliveryCountries.map((country) => (
                <div
                  key={country.code}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >

                  <div className="flex items-center gap-3">

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white/60">
                      {country.code}
                    </span>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium text-white/85">
                        {country.name}
                      </p>

                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/30">
                        {country.currency}
                      </p>

                    </div>

                  </div>

                  <FiArrowUpRight className="shrink-0 text-sm text-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />

                </div>
              ))}

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
          SHOPPING LOCATION MODAL
      ===================================================== */}

      {isLocationOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onClick={closeLocationSelector}
        >

          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-h-[85vh] overflow-hidden rounded-t-[2rem] bg-white text-black shadow-2xl sm:max-w-md sm:rounded-[2rem]"
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-5 sm:px-6">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                  Shopping Location
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#171717]">
                  Choose your country
                </h3>

              </div>

              <button
                type="button"
                onClick={closeLocationSelector}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/60 transition hover:bg-black hover:text-white"
                aria-label="Close country selector"
              >
                <FiX className="text-lg" />
              </button>

            </div>

            {/* =================================================
                CURRENT COUNTRY
            ================================================= */}

            <div className="border-b border-black/[0.07] px-5 py-4 sm:px-6">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                Currently shopping from
              </p>

              <div className="mt-2 flex items-center justify-between rounded-xl bg-[#FAF8F5] px-4 py-3">

                <span className="text-sm font-medium">
                  {selectedCountry.name}
                </span>

                <span className="text-xs font-semibold text-black/50">
                  {selectedCountry.currency}
                </span>

              </div>

            </div>

            {/* =================================================
                COUNTRY LIST
            ================================================= */}

            <div className="max-h-[50vh] overflow-y-auto overscroll-contain p-3">

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
                    className={`flex min-h-14 w-full items-center justify-between rounded-xl px-4 py-3 text-left transition active:scale-[0.99] ${
                      isSelected
                        ? "bg-black text-white"
                        : "text-black hover:bg-[#FAF8F5]"
                    }`}
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                          isSelected
                            ? "bg-white/15 text-white"
                            : "bg-black/5 text-black/50"
                        }`}
                      >
                        {country.code}
                      </span>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-medium">
                          {country.name}
                        </p>

                        <p
                          className={`mt-0.5 text-[11px] ${
                            isSelected
                              ? "text-white/55"
                              : "text-black/40"
                          }`}
                        >
                          {country.currency}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 text-xs font-semibold ${
                        isSelected
                          ? "text-white"
                          : "text-black/45"
                      }`}
                    >
                      {country.symbol}
                    </span>

                  </button>
                );
              })}

            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="border-t border-black/[0.07] px-5 py-4 sm:px-6">

              <p className="text-center text-[11px] leading-5 text-black/40">
                Prices across the website will update
                automatically when you select a country.
              </p>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default WorldwideDelivery;