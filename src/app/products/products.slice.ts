import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./products";
import { forEach } from "lodash";

type ProductsState = {
  products: Record<number, Product>;
  productsByCategory: Record<string, Product[]>;
  loaded: boolean;
};

const initialState: ProductsState = {
  products: {},
  productsByCategory: {},
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
    addProductsByCategory: (state, action: PayloadAction<Product[]>) => {
      forEach(action.payload, (product) => {
        if (!state.productsByCategory[product.category]) {
          state.productsByCategory[product.category] = [];
        }
        state.productsByCategory[product.category].push(product);
      });
    },
  },
});

export const { addProducts, addProductsByCategory } = productsSlice.actions;
