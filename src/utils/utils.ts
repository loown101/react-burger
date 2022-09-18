export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const url = 'https://norma.nomoreparties.space/api/';

export const countBuns = 2;

export const totalPrice = (orderIng: Array<any>, ingredients: Array<any>, sum = 0) => {
  const idOrder = orderIng?.map((order) => {
    const ingredient = ingredients?.find((ingredient) => ingredient._id === order)

    return ingredient;
  });


  for (let { price } of idOrder) sum += price;
  return sum;
}

