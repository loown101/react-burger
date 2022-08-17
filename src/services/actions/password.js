import { checkResponce, url } from '../../utils/utils'

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';

export const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST';
export const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_FAILED';

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_FORGOT_REQUEST
    });
    fetch(`${url}password-reset`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          email: email,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_FORGOT_SUCCESS,
            message: res.message, // создать окно для оповещения пользователя
          });
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_FORGOT_FAILED
        });
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });
    fetch(`${url}password-reset/reset`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          password: password,
          token: token,
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
            message: res.message // создать окно для оповещения пользователя
          });
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_RESET_FAILED
        });
      });
  };
}