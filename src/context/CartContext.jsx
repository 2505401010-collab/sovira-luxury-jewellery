import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Pre-populate with initial pieces from the Stitch bag screen if empty
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("sovira_cart");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial items matching stitch_sovira_shopping_bag_acquisition_folio screen:
    const item1 = PRODUCTS.find((p) => p.id === "padmavati-jharokha-collar");
    const item2 = PRODUCTS.find((p) => p.id === "mehraab-pave-drop-earrings");
    return [
      { product: item1, quantity: 1 },
      { product: item2, quantity: 1 }
    ].filter(i => Boolean(i.product));
  });

  // 15-minute Vault Reservation Countdown Timer
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 28); // 14m 28s

  useEffect(() => {
    try {
      localStorage.setItem("sovira_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const reservationClock = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalINR = cartItems.reduce(
    (acc, item) => acc + (item.product.priceINR || 0) * item.quantity,
    0
  );
  // 3% Precious Bullion & Gemstone GST as defined in Stitch design
  const gstINR = Math.round(subtotalINR * 0.03);
  const totalValuationINR = subtotalINR + gstINR;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotalINR,
        gstINR,
        totalValuationINR,
        reservationClock,
        isReservationActive: timeLeft > 0
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
