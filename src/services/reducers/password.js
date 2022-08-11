import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,

  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILED,
} from '../actions/password';

const initialState = {
  password: null,
  passwordRequest: false,
  passwordFailed: false,
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordRequest: true
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordFailed: false,
        password: action.items,

        itemsRequest: false
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordFailed: true,
        passwordRequest: false
      };
    }
    case PASSWORD_FORGOT_REQUEST: {
      return {
        ...state,
        passwordRequest: true
      };
    }
    case PASSWORD_FORGOT_SUCCESS: {
      return {
        ...state,
        //редирект
      };
    }
    case PASSWORD_FORGOT_FAILED: {
      return {
        ...state,
        passwordFailed: true,
        passwordRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

