import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

export type Product = {
  id: string;
  name: string;
  material: string;
  price: number;
  productImages: any[];
  views: any[];
  width: number;
  height: number;
  depth: number;
};

type SliceState = {
  data: Product[] | null;
  status: {
    state: SliceStatus;
    error: string;
  };
};

const initialState: SliceState = {
  data: null,
  status: {
    state: SliceStatus.IDLE,
    error: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getProductsReducer: (
      state,
      action: PayloadAction<{ products: Product[] }>
    ) => {
      const { products } = action.payload;
      state.data = products;
    },
    getFilteredProductsReducer: (state, action) => {},
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getProductsReducer,
  getFilteredProductsReducer,
} = productsSlice.actions;

const statusHandler = { initialize, error, success };

export const productsSelector = (state: RootState) => state.products;

export const fetchProducts = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const products = !localStorage.getItem("jwt")
      ? await fromApi.getProducts()
      : await fromApi.getFilteredProducts();

    dispatch(getProductsReducer({ products }));
  }
);

export const viewProduct = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { productId }) => {
    await fromApi.viewProduct(productId);
  }
);
