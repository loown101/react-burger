import { checkResponse, url } from '../../utils/utils';
import { getCookie } from '../../utils/cookies';
import { RESET_FILLING } from './ingredient';
import { TConstructor, TConstructorResponse, TOrder } from '../types/data';
import { AppDispatch } from '../types/index';

export const POST_ITEMS_REQUEST: 'POST_ITEMS_REQUEST' = 'POST_ITEMS_REQUEST';
export const POST_ITEMS_SUCCESS: 'POST_ITEMS_SUCCESS' = 'POST_ITEMS_SUCCESS';
export const POST_ITEMS_FAILED: 'POST_ITEMS_FAILED' = 'POST_ITEMS_FAILED';

export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IPostItemRequest {
  readonly type: typeof POST_ITEMS_REQUEST;
}

export interface IPostItemSuccess {
  readonly type: typeof POST_ITEMS_SUCCESS;
  items: Array<TConstructor>;
  order: TOrder;
}

export interface IPostItemFailed {
  readonly type: typeof POST_ITEMS_FAILED;
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}


export type TConstructorActions =
  | IPostItemRequest
  | IPostItemSuccess
  | IPostItemFailed
  | ICloseModal;

export function saveOrder(data: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ITEMS_REQUEST
    });
    fetch(`${url}orders`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify({ ingredients: data })
    })
      .then((res) => checkResponse<TConstructorResponse>(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ITEMS_SUCCESS,
            items: res.items,
            order: res.order
          });
        }
      })
      .then((res) => {
        dispatch({
          type: RESET_FILLING,
        })
      })
      .catch(() => {
        dispatch({
          type: POST_ITEMS_FAILED
        });
      });
  };
}

export function closeModalOrder() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CLOSE_MODAL
    });
  }
}