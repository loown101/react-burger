import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredients />
        <BurgerConstructor type="bun" />
      </main>
    </div>
  );
}

export default App;
