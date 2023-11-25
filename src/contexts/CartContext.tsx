import { ReactNode, createContext, useContext, useState } from "react";
import { CartItem } from "../models/cartItem";

type CartContextType = {
  cartItems: CartItem;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  getItemQuantity: (id: string) => number;
  deleteItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function incrementQuantity(id: string) {
    const index = items.findIndex((item) => item.id === id);
    setItems((prevItems) => {
      if (index === -1) return [...prevItems, { id, quantity: 1 }];

      return prevItems.map((item) => {
        if (index !== -1) return { ...item, quantity: item.quantity + 1 };
        return { ...item };
      });
    });
  }
  function decrementQuantity(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (index !== -1) return { ...item, quantity: item.quantity - 1 };
        return { ...item };
      });
    });
  }

  function getItemQuantity(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return 0;
    return items[index].quantity;
  }

  function deleteItem(id: string) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        incrementQuantity,
        decrementQuantity,
        clearCart,
        deleteItem,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
