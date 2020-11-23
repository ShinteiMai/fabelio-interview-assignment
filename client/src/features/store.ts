import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { productsReducer } from "./productSlice";
import { productDetailsReducer } from "./productDetailsSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
