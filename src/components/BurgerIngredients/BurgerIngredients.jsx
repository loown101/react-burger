import { useState } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data'

const getIngredients = (data, type) => {
  return (
    <ul>
      {
        data.filter((ingredient) => (ingredient.type === type)).map((ingredient) => (
          <li>
            <img src={ingredient.image} alt="" />
            <div>
              <p>{ingredient.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p>{ingredient.name}</p>
          </li>
        ))
      }
    </ul>
  )
}


const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');

  return (
    <>
      <section>
        <h1 className="text text_type_main-large p-4">Соберите бургер</h1>
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
        <ul>
          <li>
            <h2>Булки</h2>
            {getIngredients(data, 'bun')}
          </li>
          <li>
            <h2>Соусы</h2>
            {getIngredients(data, 'sauce')}
          </li>
          <li>
            <h2>Начинки</h2>
            {getIngredients(data, 'main')}
          </li>
        </ul>
      </section>
    </>

  );
};

export default BurgerIngredients;