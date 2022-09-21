import React, { FC } from 'react';
import IngredientCategoryItemStyles from './IngredientCategoryItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TLocation } from '../../../services/types/data'

type TIngredientCategoryItem = {
  ingredient: TIngredient
}

const IngredientCategoryItem: FC<TIngredientCategoryItem> = ({ ingredient }) => {
  const buns = useSelector(state => state.ingredient.itemsBun);
  const fillings = useSelector(state => state.ingredient.itemsFilling);

  const location = useLocation<TLocation>();

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
    <Link className={`${IngredientCategoryItemStyles.link}`} to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}>
      <li className={`${IngredientCategoryItemStyles.item} pb-8`} style={{ opacity }}>
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
    </Link>
  )
}

export default IngredientCategoryItem;