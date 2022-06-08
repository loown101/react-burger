import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types';

const BurgerConstructor = (props) => {

  const ingredientType = props.data.find(ingredient => ingredient.type === "bun");

  const getData = (props) => {
    return (
      <ul className={`${burgerConstructorStyles.list} `}>
        {
          props.data.filter((ingredient) => (ingredient.type !== 'bun')).map((ingredient, index) => (
            <li className={`${burgerConstructorStyles.item} pb-4 pr-2`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${burgerConstructorStyles.boxIngredient} ml-8 pb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={ingredientType.name}
          price={200}
          thumbnail={ingredientType.image}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${burgerConstructorStyles.boxIngredient} `}>
        {getData(props)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${burgerConstructorStyles.boxIngredient} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={ingredientType.name}
          price={200}
          thumbnail={ingredientType.image}
        />
      </div>
      <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
        <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={props.openModal} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section >
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;