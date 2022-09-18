import {
  POST_ITEMS_FAILED,
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  CLOSE_MODAL,
  TConstructorActions
} from '../actions/constructor';

import { TConstructor, TOrder } from '../types/data';

type TConstructorState = {
  items: Array<TConstructor>,

  itemsRequest: boolean,
  itemsFailed: boolean,

  order: TOrder | null,
  //cart: null
}

const initialState: TConstructorState = {
  items: [],

  itemsRequest: false,
  itemsFailed: false,

  order: null,
  //cart: null,
};

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case POST_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case POST_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
        order: action.order,
      };
    }
    case POST_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        order: null,
      }
    }
    default: {
      return state;
    }
  }
};