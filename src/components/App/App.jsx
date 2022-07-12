import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredient';

function App() {
  const ingredients = useSelector(state => state.ingredient.items);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <div className={AppStyle.App}>
      <AppHeader />
      {(ingredients.length > 0) && <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredients />
        <BurgerConstructor type="bun" />
      </main>}
    </div>
  );
}

export default App;
