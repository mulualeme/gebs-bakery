import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (newItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === newItem.id && item.notes === newItem.notes,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id && item.notes === newItem.notes
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [...currentItems, newItem];
    });
  };

  const removeFromCart = (itemId, notes) => {
    setItems((items) =>
      items.filter((item) => !(item.id === itemId && item.notes === notes)),
    );
  };

  const updateQuantity = (itemId, quantity, notes) => {
    if (quantity < 1) {
      removeFromCart(itemId, notes);
      return;
    }

    setItems((items) =>
      items.map((item) =>
        item.id === itemId && item.notes === notes
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
