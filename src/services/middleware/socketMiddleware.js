export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);

        console.log('socket', socket)
      }

      if (type === onClose) {
        socket.close();
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};