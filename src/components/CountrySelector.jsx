import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiMapPin,
  FiCheck,
} from "react-icons/fi";

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
      console.error(
        "Unable to load selected country:",
        error
      );
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
      window.removeEventListener(
        "keydown",
        handleEscape
      );
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

    window.dispatchEvent(
      new Event("countryChanged")
    );

    setIsOpen(false);
  };

  return (
    <div className="relative z-[200]">

      {/* =================================================
          SELECTOR BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        aria-label="Select country and currency"
        className="
          group flex w-full items-center gap-2.5
          rounded-full
          border border-[#D8B9B5]/45
          bg-[#FFFDF9]
          px-3.5 py-2
          text-xs font-medium
          text-[#4A3D3A]
          shadow-[0_3px_14px_rgba(119,88,78,0.06)]
          transition-all duration-300
          hover:border-[#C99A92]/65
          hover:bg-[#FFF9F7]
          hover:shadow-[0_5px_18px_rgba(119,88,78,0.10)]
          active:scale-[0.98]
          sm:w-auto
        "
      >

        {/* FLAG */}

        <span
          className="
            flex h-5 w-7 shrink-0
            overflow-hidden rounded-[3px]
            bg-[#F7F0EB]
            ring-1 ring-[#C9A66B]/20
          "
        >
          <img
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            className="block h-full w-full object-cover"
            loading="eager"
            draggable="false"
          />
        </span>

        <FiMapPin
          className="
            shrink-0 text-sm
            text-[#B98B82]
          "
        />

        <span className="hidden max-w-[150px] truncate sm:inline">
          {selectedCountry.name}
        </span>

        <span className="sm:hidden">
          {selectedCountry.currency}
        </span>

        <FiChevronDown
          className={`
            ml-auto shrink-0
            text-sm text-[#9C817B]
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />

      </button>

      {/* =================================================
          DROPDOWN
      ================================================= */}

      {isOpen && (
        <>

          {/* MOBILE BACKDROP */}

          <div
            className="
              fixed inset-0 z-[190]
              bg-[#3C2E2B]/25
              backdrop-blur-[3px]
              sm:hidden
            "
            onClick={() => setIsOpen(false)}
          />

          {/* =================================================
              DROPDOWN PANEL
          ================================================= */}

          <div
            className="
              fixed left-3 right-3 top-20 z-[210]
              flex max-h-[calc(100dvh-6rem)]
              flex-col overflow-hidden

              rounded-[22px]
              border border-[#D8B9B5]/35
              bg-[#FFFDF9]

              shadow-[0_25px_70px_rgba(82,58,52,0.16)]

              sm:absolute
              sm:left-auto
              sm:right-0
              sm:top-full
              sm:mt-3
              sm:w-80
              sm:max-h-[500px]
            "
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                shrink-0
                border-b border-[#D8B9B5]/20
                bg-gradient-to-br
                from-[#FFF9F7]
                via-[#FFFDF9]
                to-[#F8F0EC]
                px-5 py-5
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-[#B18A83]
                    "
                  >
                    Worldwide Shopping
                  </p>

                  <p
                    className="
                      mt-1.5
                      font-serif
                      text-[17px]
                      font-medium
                      tracking-[-0.01em]
                      text-[#3E302D]
                    "
                  >
                    Select your country
                  </p>

                </div>

                <span
                  className="
                    mt-1
                    rounded-full
                    border border-[#C9A66B]/25
                    bg-[#F8F0E4]
                    px-2.5 py-1
                    text-[9px]
                    font-medium
                    tracking-wide
                    text-[#A37C48]
                  "
                >
                  {countries.length} destinations
                </span>

              </div>

              <div
                className="
                  mt-3 h-px w-10
                  bg-[#C9A66B]/60
                "
              />

            </div>

            {/* =================================================
                SCROLLABLE LIST
            ================================================= */}

            <div
              className="
                min-h-0 flex-1
                overflow-y-auto
                overscroll-contain
                p-2.5
              "
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
                    className={`
                      group flex w-full
                      items-center
                      justify-between
                      gap-3
                      rounded-[15px]
                      px-3
                      py-3
                      text-left
                      transition-all
                      duration-200

                      ${
                        isSelected
                          ? `
                            bg-[#F5E5E2]
                            text-[#493936]
                            shadow-[inset_0_0_0_1px_rgba(184,137,126,0.14)]
                          `
                          : `
                            text-[#4A3D3A]
                            hover:bg-[#FCF4F1]
                          `
                      }
                    `}
                  >

                    {/* LEFT */}

                    <span className="flex min-w-0 items-center gap-3">

                      {/* FLAG */}

                      <span
                        className={`
                          flex h-9 w-12
                          shrink-0
                          overflow-hidden
                          rounded-lg
                          bg-[#F7F0EB]
                          ring-1
                          ${
                            isSelected
                              ? "ring-[#C9A66B]/35"
                              : "ring-black/5"
                          }
                        `}
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="
                            block h-full w-full
                            object-cover
                          "
                          loading="eager"
                          draggable="false"
                        />
                      </span>

                      {/* COUNTRY INFO */}

                      <span className="min-w-0">

                        <span
                          className="
                            block truncate
                            text-sm
                            font-medium
                            tracking-[-0.01em]
                          "
                        >
                          {country.name}
                        </span>

                        <span
                          className={`
                            mt-0.5
                            block
                            text-[10px]
                            tracking-wide
                            ${
                              isSelected
                                ? "text-[#9C756D]"
                                : "text-[#A99A96]"
                            }
                          `}
                        >
                          {country.code} · {country.currency}
                        </span>

                      </span>

                    </span>

                    {/* RIGHT */}

                    <span className="flex shrink-0 items-center gap-2">

                      <span
                        className={`
                          text-xs
                          font-medium
                          ${
                            isSelected
                              ? "text-[#A47A4A]"
                              : "text-[#9D8984]"
                          }
                        `}
                      >
                        {country.symbol}
                      </span>

                      {isSelected && (
                        <span
                          className="
                            flex h-5 w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-[#C9A66B]/15
                            text-[#A47A4A]
                          "
                        >
                          <FiCheck className="text-[12px]" />
                        </span>
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