import { map } from "lodash";
import type { Product } from "./products";

export const fetchProducts = async (/* {}: ProductsRequest */) => {
  const response = await fetch(`https://dummyjson.com/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const payload = await response.json();

  return map(payload.products, (product) => {
    return {
      title: product.title,
      description: product.description,
      id: product.id,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      images: product.images,
      thumbnail: product.thumbnail,
    };
  }) as Product[];
};
