import React from 'react';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ingredientReducer } from './services/reducers/ingredient';
import { constructorReducer } from './services/reducers/constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const container = document.getElementById('root');
const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  constructor: constructorReducer,
})

const store = createStore(rootReducer, enhancer);

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);

reportWebVitals();