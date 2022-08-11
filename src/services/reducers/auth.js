import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,

  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,

  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,

} from '../actions/auth';


const initialState = {
  user: null,
  token: null,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        userRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,

        userFailed: false,
        userRequest: false
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,

        userRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,

        user: action.user,

        userFailed: false,
        userRequest: false
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,

        userRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,

        userFailed: false,
        userRequest: false
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    case TOKEN_REQUEST: {
      return {
        ...state,

        userRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,

        userFailed: false,
        userRequest: false
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    case USER_REQUEST: {
      return {
        ...state,

        userRequest: true
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,

        user: action.user,

        userFailed: false,
        userRequest: false
      };
    }
    case USER_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    case EDIT_USER_REQUEST: {
      return {
        ...state,

        userRequest: true
      };
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,

        userFailed: false,
        userRequest: false
      };
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,

        userFailed: true,
        userRequest: false
      };
    }
    default: {
      return state;
    }
  }
};