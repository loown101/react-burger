import { checkResponce, url } from '../../utils/utils';
import { getCookie } from '../../utils/cookies';
import { RESET_FILLING } from '../actions/ingredient'

export const POST_ITEMS_REQUEST = 'POST_ITEMS_REQUEST';
export const POST_ITEMS_SUCCESS = 'POST_ITEMS_SUCCESS';
export const POST_ITEMS_FAILED = 'POST_ITEMS_FAILED';

export const CLOSE_MODAL = 'CLOSE_MODAL';

export function saveOrder(data) {
  return function (dispatch) {
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
      .then((res) => checkResponce(res))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ITEMS_SUCCESS,
            items: res
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
  return function (dispatch) {
    dispatch({
      type: CLOSE_MODAL
    });
  }
}