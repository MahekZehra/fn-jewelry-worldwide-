import { useEffect, useState } from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";

const countries = [
  {
    name: "Pakistan",
    code: "PK",
    currency: "PKR",
    symbol: "Rs.",
    flag: "https://flagcdn.com/w80/pk.png",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    currency: "AED",
    symbol: "AED",
    flag: "https://flagcdn.com/w80/ae.png",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    currency: "SAR",
    symbol: "SAR",
    flag: "https://flagcdn.com/w80/sa.png",
  },
  {
    name: "Qatar",
    code: "QA",
    currency: "QAR",
    symbol: "QAR",
    flag: "https://flagcdn.com/w80/qa.png",
  },
  {
    name: "Kuwait",
    code: "KW",
    currency: "KWD",
    symbol: "KWD",
    flag: "https://flagcdn.com/w80/kw.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    currency: "GBP",
    symbol: "£",
    flag: "https://flagcdn.com/w80/gb.png",
  },
  {
    name: "United States",
    code: "US",
    currency: "USD",
    symbol: "$",
    flag: "https://flagcdn.com/w80/us.png",
  },
  {
    name: "Canada",
    code: "CA",
    currency: "CAD",
    symbol: "CA$",
    flag: "https://flagcdn.com/w80/ca.png",
  },
  {
    name: "Australia",
    code: "AU",
    currency: "AUD",
    symbol: "A$",
    flag: "https://flagcdn.com/w80/au.png",
  },
  {
    name: "Germany",
    code: "DE",
    currency: "EUR",
    symbol: "€",
    flag: "https://flagcdn.com/w80/de.png",
  },
  {
    name: "France",
    code: "FR",
    currency: "EUR",
    symbol: "€",
    flag: "https://flagcdn.com/w80/fr.png",
  },
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCountry");

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Unable to load selected country:", error);
    }

    return countries[0];
  });

  /* =====================================================
     OPEN FROM WORLDWIDE DELIVERY BUTTON
  ===================================================== */

  useEffect(() => {
    const openSelector = () => {
      setIsOpen(true);
    };

    window.addEventListener(
      "openCountrySelector",
      openSelector
    );

    return () => {
      window.removeEventListener(
        "openCountrySelector",
        openSelector
      );
    };
  }, []);

  /* =====================================================
     CLOSE WITH ESC
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     COUNTRY CHANGE
  ===================================================== */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(country)
    );

    setIsOpen(false);

    window.dispatchEvent(
      new Event("countryChanged")
    );
  };

  return (
    <div className="relative z-[100]">

      {/* =================================================
          SELECTOR BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-medium text-black transition hover:border-black/20 sm:w-auto"
      >

        {/* SELECTED FLAG */}

        <span className="flex h-5 w-7 shrink-0 overflow-hidden rounded-sm">
          <img
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            className="h-full w-full object-cover"
          />
        </span>

        <FiMapPin className="shrink-0 text-sm" />

        <span className="hidden sm:inline">
          {selectedCountry.name}
        </span>

        <span className="sm:hidden">
          {selectedCountry.currency}
        </span>

        <FiChevronDown
          className={`ml-auto shrink-0 text-sm transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />

      </button>

      {/* =================================================
          DROPDOWN
      ================================================= */}

      {isOpen && (
        <>

          {/* MOBILE BACKDROP */}

          <button
            type="button"
            aria-label="Close country selector"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[90] bg-black/20 sm:hidden"
          />

          <div className="fixed left-4 right-4 top-24 z-[110] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-72 sm:max-h-[min(500px,calc(100vh-120px))]">

            {/* HEADER */}

            <div className="border-b border-black/[0.06] px-4 py-3">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                Shop From
              </p>

              <p className="mt-1 text-sm font-medium text-black">
                Select your country
              </p>

            </div>

            {/* SCROLLABLE COUNTRY LIST */}

            <div
              className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain p-2 sm:max-h-80"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >

              {countries.map((country) => {

                const isSelected =
                  selectedCountry.currency ===
                  country.currency;

                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() =>
                      handleCountryChange(country)
                    }
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected
                        ? "bg-black text-white"
                        : "text-black hover:bg-[#FAF8F5]"
                    }`}
                  >

                    {/* COUNTRY */}

                    <span className="flex min-w-0 items-center gap-3">

                      {/* FLAG */}

                      <span className="flex h-8 w-11 shrink-0 overflow-hidden rounded-md">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>

                      {/* NAME */}

                      <span className="min-w-0">

                        <span className="block truncate text-sm font-medium">
                          {country.name}
                        </span>

                        <span
                          className={`block text-[11px] ${
                            isSelected
                              ? "text-white/60"
                              : "text-black/40"
                          }`}
                        >
                          {country.code} ·{" "}
                          {country.currency}
                        </span>

                      </span>

                    </span>

                    {/* SYMBOL */}

                    <span className="shrink-0 text-xs font-semibold">
                      {country.symbol}
                    </span>

                  </button>
                );
              })}

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default CountrySelector;