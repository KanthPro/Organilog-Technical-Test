export type Product = {
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

export interface ProductDto {
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
}

export type ProductsRequest = {
  limit?: number;
};
