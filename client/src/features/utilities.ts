import { Dispatch } from "react";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { SliceStatus } from "../globals";
import { leftPad } from "../utils/leftPad";

export const statusHandlerReducer = {
  initialize: (state: any, action: PayloadAction) => {
    state.status.state = SliceStatus.LOADING;
  },
  error: (
    state: any,
    action: PayloadAction<{ statusCode: number; message: string }>
  ) => {
    const { message } = action.payload;
    state.status.state = SliceStatus.ERROR;
    state.status.error = message;
  },
  success: (state: any, action: PayloadAction) => {
    state.status.state = SliceStatus.SUCCESS;
  },
};

type StatusHandler = {
  initialize: ActionCreatorWithPayload<any, string>;
  success: ActionCreatorWithPayload<any, string>;
  error: ActionCreatorWithPayload<any, string>;
};

export type WrapReduxAsyncHandlerType = (
  args?: any
) => (dispatch: React.Dispatch<any>) => Promise<void>;

export const wrapReduxAsyncHandler = (
  statusHandler: StatusHandler,
  callback: (dispatch: Dispatch<any>, args: any) => Promise<void>
) => (args?: any) => async (dispatch: Dispatch<any>) => {
  dispatch(statusHandler.initialize({}));

  callback(dispatch, args)
    .then(() => {
      dispatch(statusHandler.success({}));
    })
    .catch((err) => {
      console.log("Error: ");
      console.error(err);
      const { statusCode, message } = JSON.parse(err.message);
      dispatch(statusHandler.error({ statusCode, message }));
    });
};
