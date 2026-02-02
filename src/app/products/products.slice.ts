import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./products";
import { forEach } from "lodash";

type ProductsState = {
  products: Record<number, Product>;
  loaded: boolean;
};

const initialState: ProductsState = {
  products: {},
  loaded: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      forEach(action.payload, (product) => {
        state.products[product.id] = product;
      });
      state.loaded = true;
    },
  },
});

export const { addProducts } = productsSlice.actions;
