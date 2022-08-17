import React from 'react';
import { useSelector } from 'react-redux';
import HomeStyle from './home.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';


function HomePage() {
  const ingredients = useSelector(state => state.ingredient.items);

  return (
    <>
      {(ingredients.length > 0) && <main className={`${HomeStyle.main} pl-5`}>
        <BurgerIngredients />
        <BurgerConstructor type="bun" />
      </main>}
    </>
  )
}

export default HomePage;