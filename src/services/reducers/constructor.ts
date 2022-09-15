import {
  POST_ITEMS_FAILED,
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  CLOSE_MODAL,
  TConstructorActions
} from '../actions/constructor';

import { TOrder } from '../types/data';

type TConstructorState = {
  items: Array<TOrder>,

  itemsRequest: boolean,
  itemsFailed: boolean,

  //modalData: null,

  //cart: null
}

const initialState: TConstructorState = {
  items: [],

  itemsRequest: false,
  itemsFailed: false,
  //modalData: null,

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
        //modalData: action.items,
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
        //modalData: null,
      }
    }
    default: {
      return state;
    }
  }
};