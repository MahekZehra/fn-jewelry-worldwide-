import { useEffect, useState } from "react";
import { FiChevronDown, FiMapPin, FiX } from "react-icons/fi";

export const countries = [
  {
    name: "Pakistan",
    code: "PK",
    currency: "PKR",
    symbol: "Rs.",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    currency: "AED",
    symbol: "AED",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    currency: "SAR",
    symbol: "SAR",
  },
  {
    name: "Qatar",
    code: "QA",
    currency: "QAR",
    symbol: "QAR",
  },
  {
    name: "Kuwait",
    code: "KW",
    currency: "KWD",
    symbol: "KWD",
  },
  {
    name: "United Kingdom",
    code: "GB",
    currency: "GBP",
    symbol: "£",
  },
  {
    name: "United States",
    code: "US",
    currency: "USD",
    symbol: "$",
  },
  {
    name: "Canada",
    code: "CA",
    currency: "CAD",
    symbol: "CA$",
  },
  {
    name: "Australia",
    code: "AU",
    currency: "AUD",
    symbol: "A$",
  },
  {
    name: "Germany",
    code: "DE",
    currency: "EUR",
    symbol: "€",
  },
  {
    name: "France",
    code: "FR",
    currency: "EUR",
    symbol: "€",
  },
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const savedCountry =
        localStorage.getItem("selectedCountry");

      if (savedCountry) {
        const parsedCountry = JSON.parse(savedCountry);

        const matchedCountry = countries.find(
          (country) => country.code === parsedCountry.code
        );

        if (matchedCountry) {
          return matchedCountry;
        }
      }
    } catch (error) {
      console.error(
        "Could not load selected country:",
        error
      );
    }

    return countries[0];
  });

  /* =====================================================
     LISTEN FOR COUNTRY CHANGES
  ===================================================== */

  useEffect(() => {
    const handleCountryChanged = () => {
      try {
        const savedCountry =
          localStorage.getItem("selectedCountry");

        if (!savedCountry) return;

        const parsedCountry = JSON.parse(savedCountry);

        const matchedCountry = countries.find(
          (country) => country.code === parsedCountry.code
        );

        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
        }
      } catch (error) {
        console.error(
          "Could not sync selected country:",
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
     OPEN SELECTOR FROM WORLDWIDE DELIVERY SECTION
  ===================================================== */

  useEffect(() => {
    const handleOpenCountrySelector = () => {
      setIsOpen(true);
    };

    window.addEventListener(
      "openCountrySelector",
      handleOpenCountrySelector
    );

    return () => {
      window.removeEventListener(
        "openCountrySelector",
        handleOpenCountrySelector
      );
    };
  }, []);

  /* =====================================================
     CHANGE COUNTRY
  ===================================================== */

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(country)
    );

    setIsOpen(false);

    window.dispatchEvent(
      new CustomEvent("countryChanged", {
        detail: country,
      })
    );
  };

  return (
    <div className="relative z-[100]">

      {/* =================================================
          SELECTOR BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-medium text-black transition hover:border-black/20"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <FiMapPin className="text-sm" />

        <span className="hidden max-w-[150px] truncate sm:inline">
          {selectedCountry.name}
        </span>

        <span className="sm:hidden">
          {selectedCountry.currency}
        </span>

        <FiChevronDown
          className={`text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px] sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* =================================================
          DESKTOP DROPDOWN
      ================================================= */}

      {isOpen && (
        <div className="absolute right-0 top-full z-[9999] mt-3 hidden w-[280px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl sm:block">

          <div className="border-b border-black/[0.06] px-4 py-4">

            <div className="flex items-center gap-2">

              <FiMapPin className="text-sm text-black/45" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                Shopping Location
              </p>

            </div>

            <p className="mt-1 text-sm font-medium text-black">
              Select your country
            </p>

            <p className="mt-1 text-[11px] leading-5 text-black/40">
              Prices will be displayed in your local currency.
            </p>

          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">

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
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-black hover:bg-[#FAF8F5]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-[#FAF8F5] text-black/50"
                      }`}
                    >
                      {country.code}
                    </span>

                    <span>

                      <span className="block text-sm font-medium">
                        {country.name}
                      </span>

                      <span
                        className={`mt-0.5 block text-[11px] ${
                          isSelected
                            ? "text-white/60"
                            : "text-black/40"
                        }`}
                      >
                        {country.currency}
                      </span>

                    </span>

                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      isSelected
                        ? "text-white"
                        : "text-black/50"
                    }`}
                  >
                    {country.symbol}
                  </span>

                </button>
              );
            })}

          </div>

        </div>
      )}

      {/* =================================================
          MOBILE BOTTOM SHEET
      ================================================= */}

      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] max-h-[85vh] overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:hidden">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-5">

            <div>

              <div className="flex items-center gap-2">

                <FiMapPin className="text-sm text-black/45" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                  Shopping Location
                </p>

              </div>

              <p className="mt-1 text-base font-semibold text-black">
                Select your country
              </p>

              <p className="mt-1 text-[11px] text-black/40">
                Prices will be shown in your local currency.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-black/60"
              aria-label="Close country selector"
            >
              <FiX />
            </button>

          </div>

          {/* Country List */}

          <div className="max-h-[65vh] overflow-y-auto overscroll-contain px-3 pb-6 pt-3">

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
                  className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-black active:bg-[#FAF8F5]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-bold ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-[#FAF8F5] text-black/50"
                      }`}
                    >
                      {country.code}
                    </span>

                    <span>

                      <span className="block text-sm font-medium">
                        {country.name}
                      </span>

                      <span
                        className={`mt-0.5 block text-[11px] ${
                          isSelected
                            ? "text-white/60"
                            : "text-black/40"
                        }`}
                      >
                        {country.currency}
                      </span>

                    </span>

                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      isSelected
                        ? "text-white"
                        : "text-black/50"
                    }`}
                  >
                    {country.symbol}
                  </span>

                </button>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
};

export default CountrySelector;