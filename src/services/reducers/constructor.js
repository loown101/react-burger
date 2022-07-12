import {
  POST_ITEMS_FAILED,
  POST_ITEMS_REQUEST,
  POST_ITEMS_SUCCESS,
  CLOSE_MODAL,
} from '../actions/constructor';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  isOrderOpened: false,
  modalData: {},

  cart: [],
};

export const constructorReducer = (state = initialState, action) => {
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
        isOrderOpened: true,
        modalData: action.items,
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
        isOrderOpened: false,
        modalData: {},
      }
    }
    default: {
      return state;
    }
  }
};