import { checkResponce, url } from '../../utils/utils'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_BUNS = 'GET_BUNS';
export const GET_FILLING = 'GET_FILLING';
export const REORDER_FILLING = 'REORDER_FILLING';
export const DELETE_FILLING = 'DELETE_FILLING';
export const RESET_FILLING = 'RESET_FILLING';

export const CLOSE_MODAL_DETAILS = 'CLOSE_MODAL_DETAILS';
export const OPEN_MODAL_DETAILS = 'OPEN_MODAL_DETAILS';


export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${url}ingredients`)
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  };
}

export function openModalDetails(ingredient) {
  return function (dispatch) {
    dispatch({
      type: OPEN_MODAL_DETAILS,
      idIngredient: ingredient,
    });
  }
}

export function closeModalDetails() {
  return function (dispatch) {
    dispatch({
      type: CLOSE_MODAL_DETAILS,
      ingredients: {},
    });
  }
}