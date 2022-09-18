import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientCategory/IngredientCategory';
import { useSelector } from '../../services/hooks';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');

  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const onTabClick = (tab: string) => {

    setCurrent(tab);

    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  let timerId: any = null;

  const onScrollTab = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (timerId !== null) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      [...target.children].map((element) => {
        // if (target.scrollTop >= element.offsetTop) {
        //   setCurrent(element.id);
        // }
      })
    }, 10)
  }

  return (
    <section className='mr-10'>
      <h1 className={`${burgerIngredientsStyles.heading} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
      <div className={`${burgerIngredientsStyles.tabContainer}`}>
        <Tab value="bun" active={current === 'bun'} onClick={() => { onTabClick('bun') }}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => { onTabClick('sauce') }}>
          Соусы
        </Tab><Tab value="main" active={current === 'main'} onClick={() => { onTabClick('main') }}>
          Начинки
        </Tab>
      </div>
      {(ingredients.length > 0) && <ul className={`${burgerIngredientsStyles.list}`} onScroll={onScrollTab}>
        <IngredientsCategory type="bun" name="Булки" id="bun" />
        <IngredientsCategory type="sauce" name="Соусы" id="sauce" />
        <IngredientsCategory type="main" name="Начинка" id="main" />
      </ul>}
    </section >
  );
};

export default BurgerIngredients;