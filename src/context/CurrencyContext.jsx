import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const currencies = {
  Pakistan: {
    code: "PKR",
    symbol: "Rs.",
    rate: 76,
  },

  "United Arab Emirates": {
    code: "AED",
    symbol: "AED",
    rate: 1,
  },

  "United States": {
    code: "USD",
    symbol: "$",
    rate: 0.27,
  },

  "United Kingdom": {
    code: "GBP",
    symbol: "£",
    rate: 0.21,
  },

  "Saudi Arabia": {
    code: "SAR",
    symbol: "SAR",
    rate: 1.02,
  },

  Qatar: {
    code: "QAR",
    symbol: "QAR",
    rate: 0.98,
  },

  Canada: {
    code: "CAD",
    symbol: "CAD",
    rate: 0.37,
  },

  Australia: {
    code: "AUD",
    symbol: "AUD",
    rate: 0.42,
  },

  Germany: {
    code: "EUR",
    symbol: "€",
    rate: 0.24,
  },

  France: {
    code: "EUR",
    symbol: "€",
    rate: 0.24,
  },

  India: {
    code: "INR",
    symbol: "₹",
    rate: 22.5,
  },

  Kuwait: {
    code: "KWD",
    symbol: "KWD",
    rate: 0.083,
  },

  Oman: {
    code: "OMR",
    symbol: "OMR",
    rate: 0.104,
  },

  Bahrain: {
    code: "BHD",
    symbol: "BHD",
    rate: 0.102,
  },

  Malaysia: {
    code: "MYR",
    symbol: "RM",
    rate: 1.18,
  },

  Singapore: {
    code: "SGD",
    symbol: "SGD",
    rate: 0.34,
  },

  "South Africa": {
    code: "ZAR",
    symbol: "R",
    rate: 4.85,
  },
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    "United Arab Emirates"
  );

  const currency = currencies[selectedCountry];

  const convertPrice = (priceAED) => {
    const numericPrice = Number(priceAED) || 0;

    return numericPrice * currency.rate;
  };

  const formatPrice = (priceAED) => {
    const convertedPrice = convertPrice(priceAED);

    return `${currency.symbol} ${Math.round(
      convertedPrice
    ).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        selectedCountry,
        setSelectedCountry,
        currency,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);