import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientCategory/IngredientCategory'
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types'


const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('bun');

  return (
    <>
      <section className='mr-10'>
        <h1 className={`${burgerIngredientsStyles.heading} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <ul className={`${burgerIngredientsStyles.list}`}>
          <IngredientsCategory data={props.data} type="bun" name="Булки" id="1" />
          <IngredientsCategory data={props.data} type="sauce" name="Соусы" id="2" />
          <IngredientsCategory data={props.data} type="main" name="Начинка" id="3" />
        </ul>
      </section>
    </>

  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;