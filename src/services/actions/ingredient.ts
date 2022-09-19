import { checkResponse, url } from '../../utils/utils'
import { TIngredient, TIngredientResponse } from '../types/data';
import { AppDispatch } from '../types/index';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const GET_BUNS: 'GET_BUNS' = 'GET_BUNS';
export const GET_FILLING: 'GET_FILLING' = 'GET_FILLING';
export const REORDER_FILLING: 'REORDER_FILLING' = 'REORDER_FILLING';
export const DELETE_FILLING: 'DELETE_FILLING' = 'DELETE_FILLING';
export const RESET_FILLING: 'RESET_FILLING' = 'RESET_FILLING';

export const CLOSE_MODAL_DETAILS: 'CLOSE_MODAL_DETAILS' = 'CLOSE_MODAL_DETAILS';
export const OPEN_MODAL_DETAILS: 'OPEN_MODAL_DETAILS' = 'OPEN_MODAL_DETAILS';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<TIngredient>;
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetBuns {
  readonly type: typeof GET_BUNS;
  itemsBun: TIngredient;
}

export interface IGetFilling {
  readonly type: typeof GET_FILLING;
  itemsFilling: TIngredient;
}

export interface IReorderFilling {
  readonly type: typeof REORDER_FILLING;
  index: { dragIndex: number, hoverIndex: number }
}

export interface IDeleteFilling {
  readonly type: typeof DELETE_FILLING;
  id: number;
}

export interface IResetFilling {
  readonly type: typeof RESET_FILLING;
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL_DETAILS;
}

export interface IOpenModal {
  readonly type: typeof OPEN_MODAL_DETAILS;
  idIngredient: string;
}

export type TIngridientActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | IGetBuns
  | IGetFilling
  | IReorderFilling
  | IDeleteFilling
  | IResetFilling
  | ICloseModal
  | IOpenModal;


export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${url}ingredients`)
      .then((res) => checkResponse<TIngredientResponse>(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      });
  };
}

export function openModalDetails(ingredient: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: OPEN_MODAL_DETAILS,
      idIngredient: ingredient,
    });
  }
}

export function closeModalDetails() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CLOSE_MODAL_DETAILS,
    });
  }
}