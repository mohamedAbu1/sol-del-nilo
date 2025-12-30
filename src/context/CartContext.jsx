// context/CartContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ عند أول تحميل نقرأ الكوكيز
  useEffect(() => {
    const savedCart = Cookies.get("userCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ✅ كل مرة تتغير السلة نخزنها في الكوكيز
  useEffect(() => {
    Cookies.set("userCart", JSON.stringify(cartItems), { expires: 7 }); 
    // expires: 7 يعني تظل محفوظة 7 أيام
  }, [cartItems]);

  const addToCart = (tour) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === tour.id);
      if (existing) {
        return prev.map((item) =>
          item.id === tour.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...tour, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (tourId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === tourId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.id === tourId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.id !== tourId);
      }
    });
  };
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart ,total}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
