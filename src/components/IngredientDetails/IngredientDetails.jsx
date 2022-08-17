import React from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const IngredientDetails = () => {
  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const activeIngredient = ingredients.find((ingredient) => ingredient._id === id)

  React.useEffect(
    () => {
      if (!activeIngredient) {
        history.replace({ pathname: `/ingredients/${id}` })
      };
    },
    [dispatch, activeIngredient, history, id]
  );

  return (
    <>
      {
        <div key={activeIngredient?._id} className={`${IngredientDetailsStyles.container} mb-15`}>
          <img src={activeIngredient?.image} alt={activeIngredient?.name} className={`${IngredientDetailsStyles.image} mb-4`} />
          <h4 className={`text text_type_main-medium mb-8`}>{activeIngredient?.name}</h4>
          <ul className={`${IngredientDetailsStyles.listIngredient}`}>
            <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
              <p className={`text text_type_main-small text_color_inactive mb-2`} >Калории,ккал</p>
              <p className={`text text_type_digits-default text_color_inactive`}>{activeIngredient?.calories}</p>
            </li>
            <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
              <p className={`text text_type_main-small text_color_inactive mb-2`}>Белки, г</p>
              <p className={`text text_type_digits-default text_color_inactive`}>{activeIngredient?.proteins}</p>
            </li>
            <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
              <p className={`text text_type_main-small text_color_inactive mb-2`}>Жиры, г</p>
              <p className={`text text_type_digits-default text_color_inactive`}>{activeIngredient?.fat}</p>
            </li>
            <li className={`${IngredientDetailsStyles.itemIngredient} mr-5`}>
              <p className={`text text_type_main-small text_color_inactive mb-2`}>Углеводы, г</p>
              <p className={`text text_type_digits-default text_color_inactive`}>{activeIngredient?.carbohydrates}</p>
            </li>
          </ul>
        </div>
      }
    </>
  );
};

export default IngredientDetails;