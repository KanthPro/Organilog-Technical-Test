import { fetchProducts } from "./products.api";
import { addProducts } from "./products.slice";
import type { AppThunk } from "./store";

type ProductsRequest = {
  limit?: number;
  offset?: number;
};

export const getProducts =
  ({ limit, offset }: ProductsRequest): AppThunk =>
  async (dispatch) => {
    const products = await fetchProducts({ limit, offset });

    dispatch(addProducts(products));
  };
