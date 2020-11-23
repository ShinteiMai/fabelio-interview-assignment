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
  data: Product | null;
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

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getProductsReducer: (
      state,
      action: PayloadAction<{ product: Product }>
    ) => {
      const { product } = action.payload;
      state.data = product;
    },
  },
});

export const productDetailsReducer = productDetailsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getProductsReducer,
} = productDetailsSlice.actions;

const statusHandler = { initialize, error, success };

export const productDetailsSelector = (state: RootState) =>
  state.productDetails;

export const fetchProductDetails = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { id }) => {
    const product = await fromApi.getProductDetails(id);

    dispatch(getProductsReducer({ product }));
  }
);
