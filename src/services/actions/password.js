import { checkResponce, url } from '../../utils/utils'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const PASSWORD_REQUEST = 'POST_ITEMS_REQUEST';
export const PASSWORD_SUCCESS = 'POST_ITEMS_SUCCESS';
export const PASSWORD_FAILED = 'POST_ITEMS_FAILED';

export function sendPassword() {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_REQUEST
    });
    fetch(`${url}api/password-reset`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          email: ""
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_SUCCESS,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_FAILED
        });
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_REQUEST
    });
    fetch(`${url}api/password-reset/reset`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(
        {
          password: "",
          token: ""
        }
      )
    })
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_SUCCESS,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_FAILED
        });
      });
  };
}