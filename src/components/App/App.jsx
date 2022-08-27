import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderFeedId from '../OrderFeedId/OrderFeedId';
import OrderHistoryId from '../OrderFeedId/OrderHistoryId';
import { getIngredients } from '../../services/actions/ingredient';
import { ProtectedRoute } from '../ProtectedRoute';
import { closeModalDetails } from '../../services/actions/ingredient';
import { getUser, token } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientsPage,
  LoginPage,
  OrderFeedPage,
  OrderFeedIdPage,
  OrderHistoryPage,
  OrderHistoryIdPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404
} from '../../pages';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const user = useSelector(
    state => {
      return state.user
    }
  )

  const background = location.state?.background;

  const onClose = () => {
    dispatch(closeModalDetails());

    history.goBack();
  }

  const accessToken = getCookie('token');
  const refreshToken = localStorage.getItem('refreshToken');

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  React.useEffect(
    () => {
      if (!user.user && refreshToken && accessToken) {
        dispatch(getUser())
      }

      if (!accessToken && refreshToken) {
        dispatch(token());
      }

      if (user.isToken && refreshToken && accessToken && !user.user) {
        dispatch(getUser())
      }

    }, [accessToken, refreshToken, dispatch, user.user, user.isToken]

  );

  return (
    <div className={AppStyle.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPasswordPage />
        </Route>
        <Route path='/ingredients/:id' exact>
          <IngredientsPage />
        </Route>
        <Route path='/login' exact>
          <LoginPage />
        </Route>
        <Route path='/feed' exact>
          <OrderFeedPage />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderFeedIdPage />
        </Route>
        <ProtectedRoute path='/profile/orders' exact>
          <OrderHistoryPage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:id' exact>
          <OrderHistoryIdPage />
        </ProtectedRoute>
        <Route path='/register' exact>
          <RegisterPage />
        </Route>
        <ProtectedRoute path='/profile' exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/reset-password' exact>
          <ResetPasswordPage />
        </Route>
        <Route path='*' >
          <NotFound404 />
        </Route>
      </Switch>
      {
        background && (
          <>
            <Route path='/ingredients/:id' exact>
              {<Modal
                title="Детали ингредиента"
                onClose={onClose} >
                <IngredientDetails />
              </Modal>}
            </Route>
            <Route path='/feed/:id' exact>
              {<Modal
                title=""
                onClose={onClose} >
                <OrderFeedId />
              </Modal>}
            </Route>
            <ProtectedRoute path='/profile/orders/:id' exact>
              {<Modal
                title=""
                onClose={onClose} >
                <OrderHistoryId />
              </Modal>}
            </ProtectedRoute>
          </>
        )
      }
    </div>
  );
}

export default App;
