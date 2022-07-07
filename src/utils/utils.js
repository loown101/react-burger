export const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
}

export const url = 'https://norma.nomoreparties.space/api/';
export const countBuns = 2;