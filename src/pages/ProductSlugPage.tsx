import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/products";
import { getProductBySlug } from "../services/products";

export function ProductSlugPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductBySlug(slug!).then((data) => {
      if (data !== null) setProduct(data);
      setIsLoading(false);
    });
  }, []);
  console.log(product);

  if (isLoading)
    return (
      <div className="flex items-center justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-orange-800 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
    );

  return (
    <div className="flex gap-4 custom-text">
      <div className="grid grid-rows-3 grid-flow-col ">
        <img
          className="w-72 h-80 object-contain row-span-3"
          src={product?.image}
          alt={product?.name}
        />
        <div className=" ">
          <p className="text-xl font-bold text-orange-900">{product?.name}</p>
          <div className="">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              מחיר: {product?.price} ₪
            </p>
            <p className="text-sm font-semibold text-gray-500 cursor-auto my-2">
              מחיר אילת: {product?.eilatPrice} ₪
            </p>
            <div className="">
              <p className="mt-5">{product?.description}</p>
              <div className="mt-10">
                <button className="w-full bg-orange-700 text-white font-bold px-10 py-2 rounded-md">
                  הוסף לעגלה
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
