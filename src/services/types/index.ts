import { ThunkAction, } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { store } from '../../index';

import { TConstructorActions } from '../actions/constructor';
import { TAuthActions } from '../actions/auth';
import { TIngridientActions } from '../actions/ingredient';
import { TPasswordActions } from '../actions/password';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TConstructorActions | TAuthActions | TIngridientActions | TPasswordActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;