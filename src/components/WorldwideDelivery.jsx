import { FiArrowUpRight, FiGlobe } from "react-icons/fi";

const deliveryCountries = [
  {
    code: "PK",
    flag: "https://flagcdn.com/w80/pk.png",
    name: "Pakistan",
    currency: "PKR",
  },
  {
    code: "AE",
    flag: "https://flagcdn.com/w80/ae.png",
    name: "United Arab Emirates",
    currency: "AED",
  },
  {
    code: "SA",
    flag: "https://flagcdn.com/w80/sa.png",
    name: "Saudi Arabia",
    currency: "SAR",
  },
  {
    code: "QA",
    flag: "https://flagcdn.com/w80/qa.png",
    name: "Qatar",
    currency: "QAR",
  },
  {
    code: "KW",
    flag: "https://flagcdn.com/w80/kw.png",
    name: "Kuwait",
    currency: "KWD",
  },
  {
    code: "GB",
    flag: "https://flagcdn.com/w80/gb.png",
    name: "United Kingdom",
    currency: "GBP",
  },
  {
    code: "US",
    flag: "https://flagcdn.com/w80/us.png",
    name: "United States",
    currency: "USD",
  },
  {
    code: "CA",
    flag: "https://flagcdn.com/w80/ca.png",
    name: "Canada",
    currency: "CAD",
  },
  {
    code: "AU",
    flag: "https://flagcdn.com/w80/au.png",
    name: "Australia",
    currency: "AUD",
  },
  {
    code: "DE",
    flag: "https://flagcdn.com/w80/de.png",
    name: "Germany",
    currency: "EUR",
  },
  {
    code: "FR",
    flag: "https://flagcdn.com/w80/fr.png",
    name: "France",
    currency: "EUR",
  },
];

const WorldwideDelivery = () => {
  const handleLocationClick = () => {
    window.dispatchEvent(
      new CustomEvent("openCountrySelector")
    );
  };

  return (
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

            <button
              type="button"
              onClick={handleLocationClick}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:scale-[0.98]"
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

          <div className="mt-6 w-full overflow-x-auto overscroll-x-contain pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible">

            <div className="flex w-max gap-3 sm:grid sm:w-full sm:grid-cols-3 lg:grid-cols-4">

              {deliveryCountries.map((country) => (
                <div
                  key={country.code}
                  className="group flex min-w-[255px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:min-w-0"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    {/* FLAG */}

                    <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">

                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        draggable="false"
                      />

                    </span>

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

          {/* MOBILE SCROLL INDICATOR */}

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
  );
};

export default WorldwideDelivery;