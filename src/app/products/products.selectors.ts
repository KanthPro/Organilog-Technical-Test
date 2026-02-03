import type { AppState } from "../store";

export const selectProducts = (state: AppState) => state.products.products;

export const selectProductsLoaded = (state: AppState) => state.products.loaded;

export const selectProductsByCategory =
  (category: string) => (state: AppState) =>
    state.products.productsByCategory[category] || [];
