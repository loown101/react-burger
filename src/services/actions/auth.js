import { checkResponce, url } from '../../utils/utils'

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOKEN_USER = 'TOKEN_USER';

export const USER_REQUEST = 'POST_ITEMS_REQUEST';
export const USER_SUCCESS = 'POST_ITEMS_SUCCESS';
export const USER_FAILED = 'POST_ITEMS_FAILED';

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/register`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          "email": email,
          "password": password,
          "name": name,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            user: res,
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

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/login`, {
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
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            user: res,
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

export function token(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/token`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          "token": "{{refreshToken}}" // не забыть проверить, какой токен придет (либо локалстор, либо куки, либо как-то еще)
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
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

export function logout(token) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/logout`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          "token": "{{refreshToken}}" //подправить
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            // перенаправить на главную страницу + очистить место, где хранится токен
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

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/user`, {
      method: "GET",
      headers: { 'Content-type': 'application/json' },
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

export function editUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetch(`${url}api/auth/user`, {
      method: "PATCH",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          "email": email,
          "password": password,
          "name": name,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
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