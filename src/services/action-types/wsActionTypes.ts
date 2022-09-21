import { TWsOrder } from "../types/data";

export const WS_INIT: "WS_INIT" = "WS_INIT";
export const WS_OPEN: "WS_OPEN" = "WS_OPEN";
export const WS_CLOSE: "WS_CLOSE" = "WS_CLOSE";
export const WS_MESSAGE: "WS_MESSAGE" = "WS_MESSAGE";
export const WS_ERROR: "WS_ERROR" = "WS_ERROR";
export const WS_CLEAR_STORE: "WS_CLEAR_STORE" = "WS_CLEAR_STORE";

export interface IWsInit {
  readonly type: typeof WS_INIT;
}

export interface IWsOpen {
  readonly type: typeof WS_OPEN;
}

export interface IWsClose {
  readonly type: typeof WS_CLOSE;
}

export interface IWsMessage {
  readonly type: typeof WS_MESSAGE;
  payload: { orders: TWsOrder[], total: number, totalToday: number };
}

export interface IWsError {
  readonly type: typeof WS_ERROR;
}

export interface IWsStore {
  readonly type: typeof WS_CLEAR_STORE;
}

export type TWsUnion =
  | IWsInit
  | IWsOpen
  | IWsClose
  | IWsMessage
  | IWsError
  | IWsStore;

export type TWsActions = {
  readonly wsInit: typeof WS_INIT,
  readonly onOpen: typeof WS_OPEN,
  readonly onClose: typeof WS_CLOSE,
  readonly onError: typeof WS_ERROR,
  readonly onMessage: typeof WS_MESSAGE,
}

export const wsActions: TWsActions = {
  wsInit: WS_INIT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE,
};