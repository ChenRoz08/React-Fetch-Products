import { useEffect, useState } from "react";
import { Product } from "../models/products";
import { getAllProducts } from "../services/products";
import { SingleProduct } from "../components/SingleProduct";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Loading } from "../components/Loading";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data !== null) setProducts(data);
      setIsLoading(false);
      if (data === null) setIsError(true);
    });
  }, []);

  if (isLoading)
    return (
      // <div className="flex items-center justify-center ">
      //   <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     className="w-24 h-24 text-orange-800 animate-spin"
      //     fill="none"
      //     viewBox="0 0 24 24"
      //     stroke="currentColor"
      //   >
      //     <path
      //       stroke-linecap="round"
      //       stroke-linejoin="round"
      //       stroke-width="1"
      //       d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      //     />
      //   </svg>
      // </div>
      <Loading />
    );

  if (isError)
    return (
      <Routes>
        <Route path="/" element={<ErrorPage />} />
      </Routes>
    );

  return (
    <div className="grid grid-cols-3 p-5 gap-2">
      {products.map((product) => {
        return <SingleProduct key={product.id} product={product} />;
      })}
    </div>
  );
}
