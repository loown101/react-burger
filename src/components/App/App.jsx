import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { getIngredients } from '../../services/actions/ingredient';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientsPage,
  LoginPage,
  OrderFeedPage,
  OrderHistoryPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404
} from '../../pages';

function App() {
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <Router>
      <div className={AppStyle.app}>
        <AppHeader />
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/forgot-password' exact>
            <ForgotPasswordPage />
          </Route>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientsPage />
          </Route>
          <Route path='/login' exact>
            <LoginPage />
          </Route>
          <Route path='/profile/order-feed' exact={true}> {/* исправить маршрут */}
            <OrderFeedPage />
          </Route>
          <Route path='/profile/order-history' exact={true}> {/* исправить маршрут */}
            <OrderHistoryPage />
          </Route>
          <Route path='/register' exact>
            <RegisterPage />
          </Route>
          <Route path='/profile' exact={true}>
            <ProfilePage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path='*' >
            <NotFound404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
