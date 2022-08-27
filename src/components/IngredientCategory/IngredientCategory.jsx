import React from 'react';
import IngredientCategoryStyles from './IngredientCategory.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IngredientCategoryItem from './IngredientCategoryItem/IngredientCategoryItem'


const IngredientsCategory = (props) => {

  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const getIngredients = (type) => {
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

IngredientsCategory.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientsCategory;