export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
  id: number;
}

export type TAuth = {
  readonly createdAt: string;
  readonly email: string;
  readonly name: string;
  readonly updatedAt: string;
}

export type TOrder = {
  createdAt: string;
  ingredients: Array<TIngredient>;
  name: string;
  number: number;
  owner: TAuth;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TUser = {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}

export type TWsOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}