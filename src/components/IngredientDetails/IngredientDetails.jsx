import React from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types'

const IngredientDetails = (props) => {
  return (
    <>
      {
        props.data.filter((ingredient) => (ingredient._id === props.ingredient)).map((ingredient, index) => (
          <div key={index} className={`${IngredientDetailsStyles.container} mb-15`}>
            <img src={ingredient.image} alt={ingredient.name} className={`${IngredientDetailsStyles.image} mb-4`} />
            <h4 className={`text text_type_main-medium mb-8`}>{ingredient.name}</h4>
            <ul className={`${IngredientDetailsStyles.listIngredient}`}>
              <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
                <p className={`text text_type_main-small text_color_inactive mb-2`} >Калории,ккал</p>
                <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
              </li>
              <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
                <p className={`text text_type_main-small text_color_inactive mb-2`}>Белки, г</p>
                <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
              </li>
              <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
                <p className={`text text_type_main-small text_color_inactive mb-2`}>Жиры, г</p>
                <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
              </li>
              <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
                <p className={`text text_type_main-small text_color_inactive mb-2`}>Углеводы, г</p>
                <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
              </li>
            </ul>
          </div>
        ))
      }
    </>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientDetails;