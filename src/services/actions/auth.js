import { checkResponce, url } from '../../utils/utils'
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOKEN_USER = 'TOKEN_USER';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    fetch(`${url}auth/register`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          email: email,
          password: password,
          name: name,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
          localStorage.setItem('refreshToken', res.refreshToken)

        }

        return res
      })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAILED
        });
      });
  };
}

export function login(email, password) {

  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    fetch(`${url}auth/login`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          "email": email,
          "password": password,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
          localStorage.setItem('refreshToken', res.refreshToken)

        }

        return res
      })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED
        });
      });
  };
}

export function token() {
  return function (dispatch) {
    dispatch({
      type: TOKEN_REQUEST
    });

    fetch(`${url}auth/token`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          token: localStorage.getItem('refreshToken')
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
          localStorage.setItem('refreshToken', res.refreshToken)
        }

        return res
      })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: TOKEN_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TOKEN_FAILED
        });
        //throw new Error(err);
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    fetch(`${url}auth/logout`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          token: localStorage.getItem('refreshToken')
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        localStorage.removeItem('refreshToken');
        deleteCookie('token');

        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            user: null,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED
        });
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });

    const token = getCookie('token');

    if (!token) {
      dispatch({
        type: USER_FAILED
      });

      return;
    }

    fetch(`${url}auth/user`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: USER_FAILED
        });
      });
  };
}

export function editUser(name, email, password) {

  return function (dispatch) {
    dispatch({
      type: EDIT_USER_REQUEST
    });
    fetch(`${url}auth/user`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify(
        {
          "name": name,
          "email": email,
          "password": password,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: EDIT_USER_SUCCESS,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: EDIT_USER_FAILED
        });
      });
  };
}