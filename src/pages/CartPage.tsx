import { useCart } from "../contexts/CartContext";
import { getProductsByIds } from "../services/products";
import { AddToCart } from "../components/AddToCart";
import { useFetch } from "../hooks/useFetch";
import { Loading } from "../components/Loading";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

export function CartPage() {
  const { items, getItemQuantity } = useCart();
  // const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   getProductsByIds(items.map((i) => i.id)).then((data) => {
  //     if (data !== null) setProducts(data);
  //   });
  // }, []);

  //* Use of useFetch

  const {
    data: products,
    isError,
    isLoading,
  } = useFetch(() => getProductsByIds(items.map((item) => item.id)));

  if (isLoading) return <Loading />;
  if (isError || products === null)
    return (
      <Routes>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );

  function totalCart() {
    return products!.reduce((total, product) => {
      return (total += product.price * getItemQuantity(product.id));
    }, 0);
  }

  return (
    <div className="flex flex-col gap-6">
      {products.map((product) => {
        const item = items.find((i) => i.id === product.id);
        if (item === undefined) return null;

        return (
          <>
            <div
              className="flex items-baseline gap-6 p-6 custom-text bg-white shadow-md rounded-xl"
              key={product.id}
            >
              <img
                className="w-24 object-contain"
                src={product.image}
                alt={product.name}
              />
              <div className="text-m font-bold text-right">{product.name}</div>
              <div className="flex justify-between flex-col grow"></div>
              <div className="font-bold">{product.price * item.quantity} ₪</div>
            </div>
            <div>
              <AddToCart id={product.id} />
            </div>
          </>
        );
      })}
      <div className="text-lg text-right font-bold">
        ₪ סכום כולל לתשלום: {totalCart()}
      </div>
    </div>
  );
}
