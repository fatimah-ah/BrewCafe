import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to cart (if exists increase quantity)
  const addToCart = (product) => {
    setCartItems((items) => {
      const index = items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        // Create a new array and update the specific item immutably
        const newItems = [...items];
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
        return newItems;
      } else {
        return [...items, { ...product, quantity: 1, selected: true }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Change quantity by delta, clamp minimum quantity to 1
  const changeQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Toggle the selected state of an item
  const toggleSelect = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Memoize the context value to optimize renders
  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      toggleSelect,
    }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access to cart context
export const useCart = () => useContext(CartContext);

