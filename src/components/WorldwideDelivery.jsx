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
    name: "Pakistan",
    flag: "https://flagcdn.com/w80/pk.png",
    currency: "PKR Rs.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "https://flagcdn.com/w80/ae.png",
    currency: "AED",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "https://flagcdn.com/w80/sa.png",
    currency: "SAR",
  },
  {
    code: "QA",
    name: "Qatar",
    flag: "https://flagcdn.com/w80/qa.png",
    currency: "QAR",
  },
  {
    code: "KW",
    name: "Kuwait",
    flag: "https://flagcdn.com/w80/kw.png",
    currency: "KWD",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "https://flagcdn.com/w80/gb.png",
    currency: "GBP £",
  },
  {
    code: "US",
    name: "United States",
    flag: "https://flagcdn.com/w80/us.png",
    currency: "USD $",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "https://flagcdn.com/w80/ca.png",
    currency: "CAD CA$",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "https://flagcdn.com/w80/au.png",
    currency: "AUD A$",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "https://flagcdn.com/w80/de.png",
    currency: "EUR €",
  },
  {
    code: "FR",
    name: "France",
    flag: "https://flagcdn.com/w80/fr.png",
    currency: "EUR €",
  },
];

function WorldwideDelivery() {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const savedCountry = localStorage.getItem("selectedCountry");

      if (savedCountry) {
        const parsedCountry = JSON.parse(savedCountry);

        const exists = deliveryCountries.some(
          (country) => country.code === parsedCountry.code
        );

        if (exists) {
          return parsedCountry;
        }
      }
    } catch (error) {
      console.error("Unable to read selected country:", error);
    }

    return deliveryCountries[0];
  });

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    const handleCountryChanged = () => {
      try {
        const savedCountry = localStorage.getItem("selectedCountry");

        if (savedCountry) {
          const parsedCountry = JSON.parse(savedCountry);

          const exists = deliveryCountries.some(
            (country) => country.code === parsedCountry.code
          );

          if (exists) {
            setSelectedCountry(parsedCountry);
          }
        }
      } catch (error) {
        console.error("Unable to sync selected country:", error);
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

  useEffect(() => {
    if (isLocationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocationOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsLocationOpen(false);
      }
    };

    if (isLocationOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isLocationOpen]);

  const handleLocationClick = () => {
    setIsLocationOpen(true);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);

    try {
      localStorage.setItem(
        "selectedCountry",
        JSON.stringify(country)
      );
    } catch (error) {
      console.error("Unable to save selected country:", error);
    }

    window.dispatchEvent(new Event("countryChanged"));

    setIsLocationOpen(false);
  };

  return (
    <>
      {/* Infinite Marquee Animation */}
      <style>{`
        @keyframes worldwideDeliveryMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .worldwide-delivery-marquee {
          animation: worldwideDeliveryMarquee 30s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .worldwide-delivery-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .worldwide-delivery-marquee {
            animation: none;
          }
        }
      `}</style>

      <section
        className="
          relative
          overflow-hidden
          bg-[#F3E9E5]
          px-5
          py-20
          sm:px-8
          lg:px-12
        "
      >
        {/* Decorative Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-10
            h-72
            w-72
            rounded-full
            bg-[#D9B7A6]/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-10
            h-80
            w-80
            rounded-full
            bg-[#C9A58E]/15
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl">
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#B88B6D]/20
                bg-white/60
                px-4
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#8E6A5A]
                backdrop-blur-sm
              "
            >
              <FiGlobe className="text-sm" />
              Worldwide Delivery
            </div>

            <h2
              className="
                text-4xl
                font-light
                tracking-[-0.03em]
                text-[#332724]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Your style,
              <br />
              <span className="italic text-[#9B7563]">
                wherever you are.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-[#6F5B54]
                sm:text-base
              "
            >
              From Dubai to the world, F&amp;A Collective brings
              timeless fashion and jewellery to customers across
              the globe.
            </p>

            {/* Location Button */}
            <button
              type="button"
              onClick={handleLocationClick}
              className="
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#B88B6D]/25
                bg-white/70
                px-5
                py-3
                text-xs
                font-semibold
                tracking-wide
                text-[#332724]
                shadow-[0_8px_30px_rgba(91,65,53,0.08)]
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-white
                hover:shadow-[0_12px_35px_rgba(91,65,53,0.12)]
              "
            >
              <span>
                Shopping from{" "}
                <span className="text-[#9B7563]">
                  {selectedCountry.name}
                </span>
              </span>

              <FiArrowUpRight className="text-sm" />
            </button>
          </div>

          {/* Divider */}
          <div
            className="
              my-12
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-[#B88B6D]/20
              to-transparent
            "
          />

          {/* Countries */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#8E6A5A]
                "
              >
                We currently serve customers in
              </p>

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#B88B6D]/15
                  bg-white/50
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-[#8E6A5A]
                "
              >
                11 destinations
              </span>
            </div>

            {/* Infinite Flag Marquee */}
            <div
              className="
                relative
                mt-7
                w-full
                overflow-hidden
                rounded-[2rem]
                border
                border-[#B88B6D]/15
                bg-white/35
                py-6
                shadow-[0_15px_50px_rgba(91,65,53,0.06)]
                backdrop-blur-sm
              "
              aria-label="Worldwide delivery destinations"
            >
              {/* Left Fade */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-10
                  w-20
                  bg-gradient-to-r
                  from-[#F3E9E5]
                  to-transparent
                "
              />

              {/* Right Fade */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  z-10
                  w-20
                  bg-gradient-to-l
                  from-[#F3E9E5]
                  to-transparent
                "
              />

              <div className="worldwide-delivery-marquee flex">
                {/* First Set */}
                <div className="flex shrink-0 items-center gap-6 pr-6">
                  {deliveryCountries.map((country) => (
                    <div
                      key={country.code}
                      className="group flex shrink-0 items-center justify-center"
                    >
                      <span
                        className="
                          flex
                          h-16
                          w-16
                          overflow-hidden
                          rounded-full
                          border
                          border-white/90
                          bg-white/80
                          p-1
                          shadow-[0_8px_25px_rgba(91,65,53,0.12)]
                          transition
                          duration-300
                          group-hover:scale-110
                          group-hover:shadow-[0_12px_30px_rgba(91,65,53,0.18)]
                          sm:h-20
                          sm:w-20
                        "
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="
                            h-full
                            w-full
                            rounded-full
                            object-cover
                          "
                          loading="lazy"
                        />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Duplicate Set for Seamless Infinite Loop */}
                <div
                  className="flex shrink-0 items-center gap-6 pr-6"
                  aria-hidden="true"
                >
                  {deliveryCountries.map((country) => (
                    <div
                      key={`duplicate-${country.code}`}
                      className="group flex shrink-0 items-center justify-center"
                    >
                      <span
                        className="
                          flex
                          h-16
                          w-16
                          overflow-hidden
                          rounded-full
                          border
                          border-white/90
                          bg-white/80
                          p-1
                          shadow-[0_8px_25px_rgba(91,65,53,0.12)]
                          transition
                          duration-300
                          group-hover:scale-110
                          group-hover:shadow-[0_12px_30px_rgba(91,65,53,0.18)]
                          sm:h-20
                          sm:w-20
                        "
                      >
                        <img
                          src={country.flag}
                          alt=""
                          className="
                            h-full
                            w-full
                            rounded-full
                            object-cover
                          "
                          loading="lazy"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              text-xs
              text-[#7B655D]
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/70
                  text-[#9B7563]
                "
              >
                <FiCheck />
              </span>

              <span>
                Secure international shipping available.
              </span>
            </div>

            <span className="text-[#8E6A5A]/70">
              Currency adjusts with your shopping location.
            </span>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      {isLocationOpen && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/35
            p-4
            backdrop-blur-sm
          "
          onClick={() => setIsLocationOpen(false)}
        >
          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-[2rem]
              border
              border-white/70
              bg-[#F8F1EE]
              p-6
              shadow-[0_30px_100px_rgba(45,32,27,0.25)]
              sm:p-8
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsLocationOpen(false)}
              className="
                absolute
                right-5
                top-5
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white/70
                text-[#6F5B54]
                transition
                hover:bg-white
                hover:text-[#332724]
              "
              aria-label="Close"
            >
              <FiX />
            </button>

            {/* Modal Header */}
            <div className="pr-10">
              <div
                className="
                  mb-4
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#9B7563]
                  shadow-sm
                "
              >
                <FiGlobe />
              </div>

              <h3
                className="
                  text-2xl
                  font-light
                  tracking-tight
                  text-[#332724]
                  sm:text-3xl
                "
              >
                Choose your
                <span className="italic text-[#9B7563]">
                  {" "}shopping location.
                </span>
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#7B655D]
                "
              >
                Select your country to personalize your
                shopping experience and currency.
              </p>
            </div>

            {/* Selected Country */}
            <div
              className="
                mt-7
                rounded-2xl
                border
                border-[#B88B6D]/15
                bg-white/65
                p-4
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#9B7563]
                "
              >
                Current location
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span
                  className="
                    flex
                    h-12
                    w-12
                    overflow-hidden
                    rounded-full
                    border
                    border-white
                    bg-white
                    p-1
                    shadow-sm
                  "
                >
                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#332724]">
                    {selectedCountry.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#8E6A5A]">
                    {selectedCountry.code} ·{" "}
                    {selectedCountry.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Country List */}
            <div className="mt-5 max-h-[45vh] space-y-2 overflow-y-auto pr-1">
              {deliveryCountries.map((country) => {
                const isSelected =
                  selectedCountry.code === country.code;

                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountryChange(country)}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-left
                      transition
                      ${
                        isSelected
                          ? "border-[#B88B6D]/35 bg-white shadow-sm"
                          : "border-transparent bg-white/45 hover:border-[#B88B6D]/15 hover:bg-white/75"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex
                          h-10
                          w-10
                          overflow-hidden
                          rounded-full
                          border
                          border-white
                          bg-white
                          p-1
                        "
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </span>

                      <div>
                        <p className="text-sm font-medium text-[#332724]">
                          {country.name}
                        </p>

                        <p className="mt-0.5 text-[11px] text-[#8E6A5A]">
                          {country.code} · {country.currency}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-[#9B7563]
                          text-white
                        "
                      >
                        <FiCheck className="text-sm" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorldwideDelivery;