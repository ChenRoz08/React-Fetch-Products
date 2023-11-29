import axios from "axios";
import { Product } from "../models/products";

const url = import.meta.env.VITE_API_URL;
export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${url}/products`);
    if (!data.status) return null;
    return data.products as Product[];
  } catch (error) {
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data } = await axios.get(`${url}/products/${slug}`);
    if (!data.status) return null;
    return data.product as Product;
  } catch (error) {
    return null;
  }
}

export async function getProductsByIds(ids: string[]) {
  try {
    const { data } = await axios.get(
      `${url}/products/ids/${JSON.stringify(ids)}`
    );
    if (!data.status) return null;

    return data.products as Product[];
  } catch (error) {
    console.log(error);
    return null;
  }
}
