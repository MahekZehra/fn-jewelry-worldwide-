import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,

          // Keep AED as the original/base product price
          priceAED: Number(
            product.priceAED ?? product.price ?? 0
          ),

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
      prevCart.filter((item) => item.id !== id)
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
              quantity: (item.quantity || 0) + 1,
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
                  (item.quantity || 1) - 1,
                  0
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
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
    (total, item) =>
      total + (Number(item.quantity) || 0),
    0
  );

  /* =========================================================
     BASE CART TOTAL
     
     This remains based on AED.
     Currency conversion is handled by Cart.jsx.
  ========================================================= */

  const cartTotal = cart.reduce(
    (total, item) => {
      const priceAED = Number(
        item.priceAED ?? item.price ?? 0
      );

      const quantity =
        Number(item.quantity) || 0;

      return total + priceAED * quantity;
    },
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
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
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
};