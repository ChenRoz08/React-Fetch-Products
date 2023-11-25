import { useCart } from "../contexts/CartContext";

export function CartPage() {
  const { cartItems } = useCart();
  return <div>{JSON.stringify(cartItems)}</div>;
}
