import type { AppThunk } from "../store";
import { fetchProductByCategory, fetchProducts } from "./products.api";
import { addProducts, addProductsByCategory } from "./products.slice";

type ProductsRequest = {
  limit?: number;
  offset?: number;
};

type ProductsByCategoryRequest = {
  category: string;
};

export const getProducts =
  ({ limit, offset }: ProductsRequest): AppThunk =>
  async (dispatch) => {
    const products = await fetchProducts({ limit, offset });

    dispatch(addProducts(products));
  };

export const getProductsByCategory =
  ({ category }: ProductsByCategoryRequest): AppThunk =>
  async (dispatch) => {
    const products = await fetchProductByCategory({ category });

    dispatch(addProductsByCategory(products));
  };
