export const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
}

export const url = 'https://norma.nomoreparties.space/api/';

export const countBuns = 2;

export const totalPrice = (orderIng, ingredients, sum = 0) => {
  const idOrder = orderIng?.map((order) => {
    const ingredient = ingredients?.find((ingredient) => ingredient._id === order)

    return ingredient;
  });


  for (let { price } of idOrder) sum += price;
  return sum;
}

