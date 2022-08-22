import React from 'react';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ingredientReducer } from './services/reducers/ingredient';
import { constructorReducer } from './services/reducers/constructor';
import { userReducer } from './services/reducers/auth';
import { passwordReducer } from './services/reducers/password';
import { wsReducer } from './services/reducers/wsReducer'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import {
  WS_INIT,
  WS_OPEN,
  WS_CLOSE,
  WS_MESSAGE,
  WS_ERROR,
} from "./services/action-types/wsActionTypes"

//import { connect, wsClose, wsError, wsMessage, wsOpen, wsConnecting } from "./services/actions/wsActions";

const wss = 'wss://norma.nomoreparties.space/orders'

const wsActions = {
  wsInit: WS_INIT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const container = document.getElementById('root');
const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wss, wsActions)));
//const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  constructor: constructorReducer,
  password: passwordReducer,
  user: userReducer,
  ws: wsReducer,
})

const store = createStore(rootReducer, enhancer);

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <App />
      </Router >
    </DndProvider>
  </Provider>
);

reportWebVitals();