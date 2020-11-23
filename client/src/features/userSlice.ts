import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

export type User = {
  id: string;
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: Date;
  updatedDate: Date;
  viewedProducts: any[];
};

type SliceState = {
  data: User | null;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    loginReducer: (
      state,
      action: PayloadAction<{ jwt: string; expiresIn: number; user: User }>
    ) => {
      const { jwt, user } = action.payload;
      localStorage.setItem("jwt", jwt);
      state.data = user;
    },
    registerReducer: (state, action: PayloadAction<{ user: User }>) => {
      state.status.state = SliceStatus.IDLE;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  initialize,
  error,
  success,
  loginReducer,
  registerReducer,
} = userSlice.actions;

const statusHandler = { initialize, error, success };

export const userSelector = (state: RootState) => state.user;

export const login = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { email, password }) => {
    const { jwt, expiresIn, user } = await fromApi.login(email, password);
    dispatch(loginReducer({ jwt, expiresIn, user }));
  }
);

export const register = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { firstName, lastName, password, email }) => {
    const user = await fromApi.register(firstName, lastName, email, password);

    dispatch(registerReducer({ user }));
  }
);
