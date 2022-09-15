import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  //OPEN_MODAL_DETAILS,
  CLOSE_MODAL_DETAILS,
  GET_BUNS,
  GET_FILLING,
  REORDER_FILLING,
  RESET_FILLING,
  DELETE_FILLING,
  TIngridientActions
} from '../actions/ingredient';

import { TIngredient } from '../types/data';

type TIngredientState = {
  readonly items: Array<TIngredient>,
  itemsBun: TIngredient | null,

  itemsRequest: boolean,
  itemsFailed: boolean,

  itemsFilling: Array<TIngredient>,
  id: string;
}

const initialState: TIngredientState = {
  items: [],
  itemsBun: null,

  itemsRequest: false,
  itemsFailed: false,

  //idIngredient: '',

  itemsFilling: [],
  id: '',
};

export const ingredientReducer = (state = initialState, action: TIngridientActions): TIngredientState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      console.log('ssdfsd', action.items)

      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsFilling: [],

        itemsRequest: true
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
          (item: TIngredient) => {
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
    // case OPEN_MODAL_DETAILS: {
    //   return {
    //     ...state,
    //     idIngredient: action.idIngredient,
    //   };
    // }
    case CLOSE_MODAL_DETAILS: {
      return {
        ...state,
        //ingredients: {},
        items: [],
      };
    }
    default: {
      return state;
    }
  }
};