import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientCategory/IngredientCategory'
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types'


const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('bun');

  return (
    <section className='mr-10'>
      <h1 className={`${burgerIngredientsStyles.heading} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
      <div className={`${burgerIngredientsStyles.tabContainer}`}>
        <Tab value="bun" active={current === 'bun'} onClick={(e) => { document.querySelector('#one').scrollIntoView({ behavior: "smooth" }); setCurrent(e) }}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={(e) => { document.querySelector('#two').scrollIntoView({ behavior: "smooth" }); setCurrent(e) }}>
          Соусы
        </Tab><Tab value="main" active={current === 'main'} onClick={(e) => { document.querySelector('#three').scrollIntoView({ behavior: "smooth" }); setCurrent(e) }}>
          Начинки
        </Tab>
      </div>
      <ul className={`${burgerIngredientsStyles.list}`}>
        <IngredientsCategory data={props.data} type="bun" name="Булки" id="one" openModal={props.openModal} />
        <IngredientsCategory data={props.data} type="sauce" name="Соусы" id="two" openModal={props.openModal} />
        <IngredientsCategory data={props.data} type="main" name="Начинка" id="three" openModal={props.openModal} />
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;