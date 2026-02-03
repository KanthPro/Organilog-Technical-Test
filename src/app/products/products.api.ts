import { map } from "lodash";
import type { Product } from "./products";

type ProductsRequest = {
  limit?: number;
  offset?: number;
};

type ProductDto = {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
  thumbnail: string;
  category: string;
};

export const fetchProducts = async ({
  limit,
  offset,
}: ProductsRequest = {}) => {
  const url = new URL("https://dummyjson.com/products");
  const searchParams = new URLSearchParams();

  if (limit !== undefined) {
    searchParams.set("limit", String(limit));
  }

  if (offset !== undefined) {
    searchParams.set("skip", String(offset));
  }

  const query = searchParams.toString();

  if (query) {
    url.search = query;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const payload = await response.json();

  return map<ProductDto, Product>(payload.products, (product) => {
    return {
      title: product.title,
      description: product.description,
      id: product.id,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      images: product.images,
      thumbnail: product.thumbnail,
    };
  });
};
