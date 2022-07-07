import React from 'react';
import IngredientCategoryStyles from './IngredientCategory.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { countBuns } from '../../utils/utils';

const Ingredient = ({ ingredient, open }) => {
  const dispatch = useDispatch();
  const buns = useSelector(state => state.ingredient.itemsBun);
  const fillings = useSelector(state => state.ingredient.itemsFilling);

  const count = (fillings, buns) => {

  }

  count(fillings, buns)

  const [{ opacity }, ref] = useDrag({
    type: 'ingridients',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li className={`${IngredientCategoryStyles.item} pb-8`} ref={ref} style={{ opacity }} onClick={() => {
      open(ingredient._id)
    }
    }>
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${IngredientCategoryStyles.itemBox} text text_type_digits-default`}>
        <p className={`${IngredientCategoryStyles.itemPrice} pt-1 pb-1 pr-2`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default`}>{ingredient.name}</p>
      <div className={`${IngredientCategoryStyles.count}`}>
        <Counter count={1} size="default" />
      </div>
    </li>
  )
}

export default Ingredient;