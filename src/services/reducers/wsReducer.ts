import {
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE,
  WS_CLEAR_STORE,
  TWsUnion
} from "../action-types/wsActionTypes";

import { TWsOrder } from '../types/data'

type TWsState = {
  orders: TWsOrder[] | null,
  total: number | null,
  totalToday: number | null,
  //error: null,

  isConnecting: boolean,
}

const initialState: TWsState = {
  orders: null,
  total: null,
  totalToday: null,
  //error: null,

  isConnecting: false,
};

export const wsReducer = (state = initialState, action: TWsUnion): TWsState => {
  switch (action.type) {

    case WS_OPEN: {
      return {
        ...state,
        isConnecting: true,
      };
    }

    case WS_ERROR: {
      return {
        ...state,
        //error: action.payload,

        isConnecting: false,
      };
    }

    case WS_CLOSE: {
      return {
        ...state,
        isConnecting: false,
      };
    }

    case WS_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }

    case WS_CLEAR_STORE: {
      return {
        ...state,

        orders: null,
        total: null,
        totalToday: null,
      };
    }

    default: {
      return state;
    }
  }
};
