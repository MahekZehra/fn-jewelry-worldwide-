import { useState } from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";

const countries = [
  { name: "Pakistan", currency: "PKR", symbol: "Rs." },
  { name: "United Arab Emirates", currency: "AED", symbol: "AED" },
  { name: "Saudi Arabia", currency: "SAR", symbol: "SAR" },
  { name: "Qatar", currency: "QAR", symbol: "QAR" },
  { name: "Kuwait", currency: "KWD", symbol: "KWD" },
  { name: "United Kingdom", currency: "GBP", symbol: "£" },
  { name: "United States", currency: "USD", symbol: "$" },
  { name: "Canada", currency: "CAD", symbol: "CA$" },
  { name: "Australia", currency: "AUD", symbol: "A$" },
  { name: "Germany", currency: "EUR", symbol: "€" },
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("selectedCountry")) || countries[0]
    );
  });

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
    setIsOpen(false);

    // Refresh prices throughout the website
    window.dispatchEvent(new Event("countryChanged"));
  };

  return (
    <div className="relative">
      {/* Selector Button */}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-medium text-black transition hover:border-black/20"
      >
        <FiMapPin className="text-sm" />

        <span className="hidden sm:inline">
          {selectedCountry.name}
        </span>

        <span className="sm:hidden">
          {selectedCountry.currency}
        </span>

        <FiChevronDown
          className={`text-sm transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {isOpen && (
        <div className="absolute right-0 top-full z-[100] mt-3 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">

          <div className="border-b border-black/[0.06] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
              Shop From
            </p>

            <p className="mt-1 text-sm font-medium text-black">
              Select your country
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">

            {countries.map((country) => {
              const isSelected =
                selectedCountry.currency === country.currency;

              return (
                <button
                  key={country.name}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-black hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium">
                      {country.name}
                    </span>

                    <span
                      className={`text-[11px] ${
                        isSelected
                          ? "text-white/60"
                          : "text-black/40"
                      }`}
                    >
                      {country.currency}
                    </span>
                  </span>

                  <span className="text-xs font-semibold">
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