import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createPersist } from "./persist";
import { productsSlice } from "./products/products.slice";

export const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
});

const persist = createPersist({
  key: "organilog:state",
  storage: window.localStorage,
  version: 1,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persist.loadState(),
});

export const subscribePersist = () =>
  store.subscribe(persist.subscribe(store.getState));

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
