import React from 'react';
import IngredientCategoryStyles from './IngredientCategory.module.css';
import { useSelector } from '../../services/hooks';
import IngredientCategoryItem from './IngredientCategoryItem/IngredientCategoryItem'

type TIngredientsCategory = {
  name: string;
  type: "bun" | "main" | "sauce";
  id: string;
}

const IngredientsCategory = (props: TIngredientsCategory) => {
  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const getIngredients = (type: string) => {
    return (
      <ul className={`${IngredientCategoryStyles.listBox}`}>
        {
          (ingredients.length > 0) && ingredients.filter((ingredient) => (ingredient.type === type)).map((ingredient) => (
            <IngredientCategoryItem ingredient={ingredient} key={ingredient._id} />
          ))
        }
      </ul >
    )
  }

  return (
    <>
      <li id={props.id}>
        <h2 className={`text text_type_main-medium pb-6 pt-10`}>{props.name}</h2>
        {getIngredients(props.type)}
      </li>
    </>

  )
}

export default IngredientsCategory;