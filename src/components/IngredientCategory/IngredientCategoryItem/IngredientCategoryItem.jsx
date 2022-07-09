import React from 'react';
import IngredientCategoryItemStyles from './IngredientCategoryItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const IngredientCategoryItem = ({ ingredient, open }) => {
  const buns = useSelector(state => state.ingredient.itemsBun);
  const fillings = useSelector(state => state.ingredient.itemsFilling);

  let counter = [...fillings];

  if (buns) {
    counter.push(buns)
    counter.push(buns)
  }

  const countIngridient = counter.filter((item) => {
    return item._id === ingredient._id
  })

  const [{ opacity }, ref] = useDrag({
    type: 'newIngridient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li className={`${IngredientCategoryItemStyles.item} pb-8`} style={{ opacity }} onClick={() => {
      open(ingredient._id)
    }
    }>
      <div ref={ref}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${IngredientCategoryItemStyles.itemBox} text text_type_digits-default`}>
          <p className={`${IngredientCategoryItemStyles.itemPrice} pt-1 pb-1 pr-2`}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <p className={`text text_type_main-default`}>{ingredient.name}</p>
      <div className={`${IngredientCategoryItemStyles.count}`}>
        {(countIngridient.length > 0) && <Counter count={countIngridient.length} size="default" />}
      </div>
    </li>
  )
}

IngredientCategoryItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
};

export default IngredientCategoryItem;