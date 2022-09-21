export type TAuthResponse = {
  success: boolean;

  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export type TIngredientResponse = {
  success: boolean;

  data: Array<TIngredient>;
};

export type TConstructorResponse = {
  success: boolean;

  items: Array<TConstructor>;
  order: TOrder;
};

export type TPasswordResponse = {
  success: boolean;

  message: string;
};

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

export type TConstructor = {
  name: string;
  order: TOrder;

  success: boolean;
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

export type TLocation = {
  from?: string;
  state?: object;
  background?: TBackground;
}

export type TBackground = {
  pathname: string;
  search: string;
  hash: string;
  state: null;
  key: string;
}

