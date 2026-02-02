import { fetchProducts } from "./products.api";
import { addProducts } from "./products.slice";
import type { AppThunk } from "./store";

export const getProducts = (): AppThunk => async (dispatch) => {
  const products = await fetchProducts();

  dispatch(addProducts(products));
};
