import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { data } from '../../utils/data'

function App() {
  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} type="bun" />
      </main>
    </div>
  );
}

export default App;
