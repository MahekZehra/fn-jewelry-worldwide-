import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

/* =========================================================
   CURRENCY RATES
   BASE CURRENCY = AED

   1 AED = X selected currency
========================================================= */

const currencyRates = {
  AED: 1,
  PKR: 275,
  SAR: 1.02,
  QAR: 1.0,
  KWD: 0.084,
  GBP: 0.215,
  USD: 0.272,
  CAD: 0.375,
  AUD: 0.420,
  EUR: 0.250,
};

/* =========================================================
   CURRENCY SYMBOLS
========================================================= */

const currencySymbols = {
  AED: "AED",
  PKR: "Rs.",
  SAR: "SAR",
  QAR: "QAR",
  KWD: "KWD",
  GBP: "£",
  USD: "$",
  CAD: "CA$",
  AUD: "A$",
  EUR: "€",
};

/* =========================================================
   GET SAVED CURRENCY
========================================================= */

const getSavedCurrency = () => {
  try {
    const savedCountry =
      localStorage.getItem("selectedCountry");

    if (!savedCountry) {
      return "AED";
    }

    const parsed = JSON.parse(savedCountry);

    const selectedCurrency =
      parsed?.currency;

    if (
      selectedCurrency &&
      Object.prototype.hasOwnProperty.call(
        currencyRates,
        selectedCurrency
      )
    ) {
      return selectedCurrency;
    }

    return "AED";
  } catch (error) {
    console.error(
      "Unable to read selected currency:",
      error
    );

    return "AED";
  }
};

/* =========================================================
   SAFE NUMBER
========================================================= */

const safeNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
};

/* =========================================================
   CART PROVIDER
========================================================= */

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [currency, setCurrency] = useState(
    getSavedCurrency()
  );

  /* =======================================================
     LISTEN FOR COUNTRY CHANGES
  ======================================================= */

  useEffect(() => {
    const updateCurrency = () => {
      setCurrency(getSavedCurrency());
    };

    window.addEventListener(
      "countryChanged",
      updateCurrency
    );

    return () => {
      window.removeEventListener(
        "countryChanged",
        updateCurrency
      );
    };
  }, []);

  /* =========================================================
     GET BASE PRICE AED
========================================================= */

  const getProductPriceAED = (item) => {
    const price = safeNumber(
      item?.priceAED ?? item?.price,
      0
    );

    return price;
  };

  /* =========================================================
     GET SALE PRICE AED
========================================================= */

  const getProductSalePriceAED = (item) => {
    const salePrice = safeNumber(
      item?.salePriceAED,
      0
    );

    /*
      Sale price is only valid when:
      - onSale === true
      - sale price exists
      - sale price is greater than 0
    */

    if (
      item?.onSale === true &&
      salePrice > 0
    ) {
      return salePrice;
    }

    return null;
  };

  /* =========================================================
     GET ACTUAL SELLING PRICE AED

     If product is on sale:
       salePriceAED

     Otherwise:
       priceAED
========================================================= */

  const getActualPriceAED = (item) => {
    const salePriceAED =
      getProductSalePriceAED(item);

    if (salePriceAED !== null) {
      return salePriceAED;
    }

    return getProductPriceAED(item);
  };

  /* =========================================================
     ADD TO CART
========================================================= */

  const addToCart = (product) => {
    if (!product) {
      return;
    }

    setCart((prevCart) => {
      const existingProduct =
        prevCart.find(
          (item) => item.id === product.id
        );

      /* =====================================================
         PRODUCT ALREADY IN CART
      ===================================================== */

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,

                /*
                 * Make sure latest pricing information
                 * is preserved.
                 */

                priceAED: safeNumber(
                  product.priceAED ??
                    product.price,
                  0
                ),

                salePriceAED:
                  product.salePriceAED !==
                    null &&
                  product.salePriceAED !==
                    undefined
                    ? safeNumber(
                        product.salePriceAED,
                        0
                      )
                    : null,

                onSale:
                  product.onSale === true,

                quantity:
                  safeNumber(
                    item.quantity,
                    0
                  ) + 1,
              }
            : item
        );
      }

      /* =====================================================
         NEW PRODUCT
      ===================================================== */

      return [
        ...prevCart,

        {
          ...product,

          /*
           * ALWAYS preserve original AED price.
           */

          priceAED: safeNumber(
            product.priceAED ??
              product.price,
            0
          ),

          /*
           * Preserve sale price.
           */

          salePriceAED:
            product.salePriceAED !==
              null &&
            product.salePriceAED !==
              undefined
              ? safeNumber(
                  product.salePriceAED,
                  0
                )
              : null,

          /*
           * Preserve sale status.
           */

          onSale:
            product.onSale === true,

          quantity: 1,
        },
      ];
    });
  };

  /* =========================================================
     REMOVE FROM CART
========================================================= */

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================================
     INCREASE QUANTITY
========================================================= */

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,

              quantity:
                safeNumber(
                  item.quantity,
                  0
                ) + 1,
            }
          : item
      )
    );
  };

  /* =========================================================
     DECREASE QUANTITY
========================================================= */

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,

                quantity: Math.max(
                  safeNumber(
                    item.quantity,
                    1
                  ) - 1,
                  0
                ),
              }
            : item
        )
        .filter(
          (item) =>
            safeNumber(
              item.quantity,
              0
            ) > 0
        )
    );
  };

  /* =========================================================
     CLEAR CART
========================================================= */

  const clearCart = () => {
    setCart([]);
  };

  /* =========================================================
     CART COUNT
========================================================= */

  const cartCount = cart.reduce(
    (total, item) => {
      return (
        total +
        safeNumber(
          item.quantity,
          0
        )
      );
    },
    0
  );

  /* =========================================================
     CONVERT AED → SELECTED CURRENCY
========================================================= */

  const convertPrice = (priceAED) => {
    const numericPrice =
      safeNumber(priceAED, 0);

    const rate =
      currencyRates[currency] ??
      currencyRates.AED;

    const convertedPrice =
      numericPrice * rate;

    return Number.isFinite(
      convertedPrice
    )
      ? convertedPrice
      : 0;
  };

  /* =========================================================
     GET ORIGINAL PRICE IN SELECTED CURRENCY
========================================================= */

  const getProductOriginalPrice = (
    item
  ) => {
    const priceAED =
      getProductPriceAED(item);

    return convertPrice(priceAED);
  };

  /* =========================================================
     GET SALE PRICE IN SELECTED CURRENCY
========================================================= */

  const getProductSalePrice = (
    item
  ) => {
    const salePriceAED =
      getProductSalePriceAED(item);

    if (salePriceAED === null) {
      return null;
    }

    return convertPrice(
      salePriceAED
    );
  };

  /* =========================================================
     GET ACTUAL SELLING PRICE
========================================================= */

  const getProductPrice = (item) => {
    const actualPriceAED =
      getActualPriceAED(item);

    return convertPrice(
      actualPriceAED
    );
  };

  /* =========================================================
     CART TOTAL
========================================================= */

  const cartTotal = cart.reduce(
    (total, item) => {
      const actualPrice =
        getProductPrice(item);

      const quantity =
        safeNumber(
          item.quantity,
          0
        );

      return (
        total +
        actualPrice * quantity
      );
    },
    0
  );

  /* =========================================================
     FORMAT PRICE
========================================================= */

  const formatPrice = (price) => {
    const numericPrice =
      safeNumber(price, 0);

    return numericPrice.toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  };

  /* =========================================================
     CHECKOUT / EMAIL ITEMS
     
     IMPORTANT:
     These values are ALREADY converted into the
     customer's selected currency.

     This prevents NaN / undefined problems.
========================================================= */

  const getCheckoutItems = () => {
    return cart.map((item) => {
      const originalPriceAED =
        getProductPriceAED(item);

      const salePriceAED =
        getProductSalePriceAED(item);

      const actualPriceAED =
        getActualPriceAED(item);

      const originalPrice =
        convertPrice(
          originalPriceAED
        );

      const salePrice =
        salePriceAED !== null
          ? convertPrice(
              salePriceAED
            )
          : null;

      const actualPrice =
        convertPrice(
          actualPriceAED
        );

      const quantity =
        safeNumber(
          item.quantity,
          1
        );

      const itemTotal =
        actualPrice * quantity;

      return {
        /* Product information */

        id: item.id,
        name: item.name,
        image: item.image,
        category: item.category,
        subCategory:
          item.subCategory,

        /* =================================================
           PRICES
        ================================================= */

        priceAED:
          originalPriceAED,

        salePriceAED:
          salePriceAED,

        price:
          actualPrice,

        originalPrice:
          originalPrice,

        salePrice:
          salePrice,

        /* =================================================
           SALE
        ================================================= */

        onSale:
          salePriceAED !== null,

        /* =================================================
           QUANTITY
        ================================================= */

        quantity,

        /* =================================================
           ITEM TOTAL
        ================================================= */

        itemTotal,

        /* =================================================
           CURRENCY
        ================================================= */

        currency,

        currencySymbol:
          currencySymbols[currency] ||
          currency,
      };
    });
  };

  /* =========================================================
     CONTEXT VALUE
========================================================= */

  return (
    <CartContext.Provider
      value={{
        /* Cart */

        cart,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        cartCount,

        /* Currency */

        currency,
        currencyRates,
        currencySymbols,

        /* Prices */

        cartTotal,

        convertPrice,

        getProductPriceAED,
        getProductSalePriceAED,
        getActualPriceAED,

        getProductOriginalPrice,
        getProductSalePrice,
        getProductPrice,

        /* Checkout */

        getCheckoutItems,

        /* Formatting */

        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =========================================================
   USE CART HOOK
========================================================= */

export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
};