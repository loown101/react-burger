export const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
}