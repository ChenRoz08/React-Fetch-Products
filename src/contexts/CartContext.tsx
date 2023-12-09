import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "../models/cartItem";
import { useModal } from "./modalContext";
import { CartModal } from "../components/Modals/CartModal";

type CartContextType = {
  items: CartItem[];
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
  const { closeModal, openModal, modalChildren } = useModal();
  const [items, setItems] = useState<CartItem[]>(() => {
    const storageCart = localStorage.getItem("chen-cart");
    if (storageCart === null) return [];
    return JSON.parse(storageCart) as CartItem[];
  });

  useEffect(() => {
    localStorage.setItem("chen-cart", JSON.stringify(items));
  }, [items]);

  function incrementQuantity(id: string) {
    const index = items.findIndex((item) => item.id === id);
    setItems((prevItems) => {
      if (index === -1) return [...prevItems, { id, quantity: 1 }];

      return prevItems.map((item) => {
        if (prevItems[index].id === item.id)
          return { ...item, quantity: item.quantity + 1 };
        return { ...item };
      });
    });
  }
  function decrementQuantity(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;
    if (items[index].quantity === 1) {
      openModal(<CartModal id={id} />);
      return;
    }
    setItems((preItem) => {
      return preItem.map((item) => {
        if (preItem[index].id === item.id)
          return { ...item, quantity: item.quantity - 1 };
        return { ...item };
      });
    });
    setToLocalStorage();
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
    modalChildren && closeModal();
    setToLocalStorage();
  }

  function clearCart() {
    setItems([]);
    setToLocalStorage();
  }

  function setToLocalStorage() {
    localStorage.setItem("chen-cart", JSON.stringify(items));
  }

  return (
    <CartContext.Provider
      value={{
        incrementQuantity,
        decrementQuantity,
        clearCart,
        deleteItem,
        getItemQuantity,
        items,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
