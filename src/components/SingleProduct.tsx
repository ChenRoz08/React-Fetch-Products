import { Link } from "react-router-dom";
import { Product } from "../models/products";
import { AddToCart } from "./AddToCart";

export function SingleProduct({ product }: { product: Product }) {
  return (
    <div
      className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl px-4 py-3"
      key={product.id}
    >
      <img
        className="w-full h-52 object-contain aspect-ratio: 1 / 1 "
        src={`${product.image}`}
        alt=""
      />
      <div className="text-lg font-bold block truncate text-right ">
        <p className="custom-text">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </p>
        <p className="text-lg font-semibold text-black cursor-auto my-3">
          ₪ מחיר: {product.price}
        </p>
        <p className="text-sm font-semibold text-gray-500 cursor-auto my-2">
          ₪ מחיר אילת: {product.eilatPrice}
        </p>
        <div>
          <AddToCart id={product.id} />
        </div>
      </div>
    </div>
  );
}
