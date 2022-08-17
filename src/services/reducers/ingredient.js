import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  OPEN_MODAL_DETAILS,
  CLOSE_MODAL_DETAILS,
  GET_BUNS,
  GET_FILLING,
  REORDER_FILLING,
  RESET_FILLING,
  DELETE_FILLING
} from '../actions/ingredient';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  idIngredient: '',

  itemsFilling: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsFilling: [],

        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false
      };
    }
    case GET_BUNS: {
      return {
        ...state,
        itemsBun: action.itemsBun,
      };
    }
    case GET_FILLING: {
      return {
        ...state,
        itemsFilling: [...state.itemsFilling, action.itemsFilling],
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        itemsFilling: [...state.itemsFilling].filter(
          (item) => {
            return item.id !== action.id;
          }
        ),
      };
    }
    case REORDER_FILLING: {
      const fillings = [...state.itemsFilling]
      fillings.splice(action.index.dragIndex, 0, fillings.splice(action.index.hoverIndex, 1)[0])

      return {
        ...state,
        itemsFilling: fillings,
      };
    }
    case RESET_FILLING: {
      return {
        ...state,
        itemsBun: null,
        itemsFilling: [],
      };
    }
    case OPEN_MODAL_DETAILS: {
      return {
        ...state,
        idIngredient: action.idIngredient,
      };
    }
    case CLOSE_MODAL_DETAILS: {
      return {
        ...state,
        ingredients: {},
      };
    }
    default: {
      return state;
    }
  }
};