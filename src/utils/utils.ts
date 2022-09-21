import { TIngredient } from "../services/types/data";

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const url = 'https://norma.nomoreparties.space/api/';

export const countBuns = 2;

export const totalPrice = (orderIng: Array<string>, ingredients: Array<TIngredient>, sum: number = 0) => {
  const idOrder = orderIng?.map((order) => {
    const ingredient = ingredients?.find((ingredient) => ingredient._id === order)

    return ingredient;
  })

  for (let order of idOrder) {
    if (order) {
      sum += order.price
    }
  };
  return sum;
}

