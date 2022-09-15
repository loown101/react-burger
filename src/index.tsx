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
import { wsActions } from "./services/action-types/wsActionTypes";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const wss = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const container = document.getElementById('root');
const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wss, wsActions)));

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  constructor: constructorReducer,
  password: passwordReducer,
  user: userReducer,
  ws: wsReducer,
})

export const store = createStore(rootReducer, enhancer);

export const root = createRoot(container as HTMLElement);

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