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
  message: null,

  passwordRequest: false,
  passwordFailed: false,

  isForgot: false,
  isReset: false,
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,

        passwordRequest: true,
        isReset: false,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,

        message: action.message,

        passwordFailed: false,
        password: action.items,

        itemsRequest: false,
        isReset: true,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,

        passwordFailed: true,
        passwordRequest: false,
        isReset: false,
      };
    }
    case PASSWORD_FORGOT_REQUEST: {
      return {
        ...state,

        passwordRequest: true,

        isForgot: false,
      };
    }
    case PASSWORD_FORGOT_SUCCESS: {
      return {
        ...state,

        message: action.message,

        passwordRequest: true,

        isForgot: true,
      };
    }
    case PASSWORD_FORGOT_FAILED: {
      return {
        ...state,

        passwordFailed: true,
        passwordRequest: false,

        isForgot: false,
      };
    }
    default: {
      return state;
    }
  }
};

