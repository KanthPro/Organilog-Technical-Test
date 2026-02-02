import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./products";

type ProductsState = {
  products: Product[];
  loaded: boolean;
};

const initialState: ProductsState = {
  products: [],
  loaded: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loaded = true;
    },
  },
});

export const { addProducts } = productsSlice.actions;
