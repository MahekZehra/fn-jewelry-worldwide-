import { useEffect, useState } from "react";
import { FiChevronDown, FiMapPin, FiCheck } from "react-icons/fi";

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
        const parsed = JSON.parse(saved);

        const matchingCountry = countries.find(
          (country) => country.code === parsed.code
        );

        return matchingCountry || countries[0];
      }
    } catch (error) {
      console.error("Unable to load selected country:", error);
    }

    return countries[0];
  });

  /* =====================================================
     OPEN SELECTOR FROM WORLDWIDE DELIVERY
  ===================================================== */

  useEffect(() => {
    const openSelector = () => {
      setIsOpen(true);
    };

    window.addEventListener("openCountrySelector", openSelector);

    return () => {
      window.removeEventListener(
        "openCountrySelector",
        openSelector
      );
    };
  }, []);

  /* =====================================================
     ESCAPE
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
     LOCK BODY SCROLL ON MOBILE DROPDOWN
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* =====================================================
     COUNTRY CHANGE
  ===================================================== */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(country)
    );

    window.dispatchEvent(new Event("countryChanged"));

    setIsOpen(false);
  };

  return (
    <div className="relative z-[200]">

      {/* =================================================
          SELECTOR BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-medium text-black transition hover:border-black/20 sm:w-auto"
      >

        {/* FLAG */}

        <span className="flex h-5 w-7 shrink-0 overflow-hidden rounded-sm bg-gray-100">
          <img
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            className="block h-full w-full object-cover"
            loading="eager"
            draggable="false"
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

          <div
            className="fixed inset-0 z-[190] bg-black/30 sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* =================================================
              DROPDOWN PANEL
          ================================================= */}

          <div className="fixed left-3 right-3 top-20 z-[210] flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-80 sm:max-h-[500px]">

            {/* HEADER */}

            <div className="shrink-0 border-b border-black/[0.06] px-4 py-4">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                Worldwide Shopping
              </p>

              <p className="mt-1 text-sm font-medium text-black">
                Select your country
              </p>

            </div>

            {/* =================================================
                SCROLLABLE LIST
            ================================================= */}

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >

              {countries.map((country) => {

                const isSelected =
                  selectedCountry.code === country.code;

                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() =>
                      handleCountryChange(country)
                    }
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3.5 text-left transition ${
                      isSelected
                        ? "bg-black text-white"
                        : "text-black hover:bg-[#FAF8F5]"
                    }`}
                  >

                    {/* LEFT */}

                    <span className="flex min-w-0 items-center gap-3">

                      {/* FLAG */}

                      <span className="flex h-9 w-12 shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="block h-full w-full object-cover"
                          loading="eager"
                          draggable="false"
                        />
                      </span>

                      {/* COUNTRY INFO */}

                      <span className="min-w-0">

                        <span className="block truncate text-sm font-medium">
                          {country.name}
                        </span>

                        <span
                          className={`mt-0.5 block text-[11px] ${
                            isSelected
                              ? "text-white/60"
                              : "text-black/40"
                          }`}
                        >
                          {country.code} · {country.currency}
                        </span>

                      </span>

                    </span>

                    {/* RIGHT */}

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

        </>
      )}

    </div>
  );
};

export default CountrySelector;