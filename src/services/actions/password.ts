import { checkResponce, url } from '../../utils/utils'
import { AppDispatch } from '../types/index';

export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST' = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED' = 'PASSWORD_RESET_FAILED';

export const PASSWORD_FORGOT_REQUEST: 'PASSWORD_FORGOT_REQUEST' = 'PASSWORD_FORGOT_REQUEST';
export const PASSWORD_FORGOT_SUCCESS: 'PASSWORD_FORGOT_SUCCESS' = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_FAILED: 'PASSWORD_FORGOT_FAILED' = 'PASSWORD_FORGOT_FAILED';

export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED;
}

export interface IPasswordForgotRequest {
  readonly type: typeof PASSWORD_FORGOT_REQUEST;
}

export interface IPasswordForgotSuccess {
  readonly type: typeof PASSWORD_FORGOT_SUCCESS;
}

export interface IPasswordForgotFailed {
  readonly type: typeof PASSWORD_FORGOT_FAILED;
}

export type TPasswordActions =
  | IPasswordResetRequest
  | IPasswordResetSuccess
  | IPasswordResetFailed
  | IPasswordForgotRequest
  | IPasswordForgotSuccess
  | IPasswordForgotFailed;

export function forgotPassword(email: string) {
  return function (dispatch: AppDispatch) {
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

export function resetPassword(password: string, token: string) {
  return function (dispatch: AppDispatch) {
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