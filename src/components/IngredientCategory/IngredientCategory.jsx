import React, { useCallback } from 'react';
import IngredientCategoryStyles from './IngredientCategory.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalDetails, openModalDetails } from '../../services/actions/ingredient';
import Ingredient from './Ingredient'

const IngredientsCategory = (props) => {
  const dispatch = useDispatch();


  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const { isIngredientsDetails, idIngredient } = useSelector(
    state => state.ingredient
  );

  const closeModal = useCallback(
    () => {
      dispatch(closeModalDetails());
    },
    [dispatch]
  );

  const openModal = (ingredients) => {
    dispatch(openModalDetails(ingredients));
  }


  const getIngredients = (type, open) => {
    return (
      <ul className={`${IngredientCategoryStyles.listBox}`}>
        {
          (ingredients.length > 0) && ingredients.filter((ingredient) => (ingredient.type === type)).map((ingredient) => (
            <Ingredient ingredient={ingredient} open={open} key={ingredient._id}></Ingredient>
          ))
        }
      </ul>
    )
  }

  return (
    <>
      <li id={props.id}>
        <h2 className={`text text_type_main-medium pb-6 pt-10`}>{props.name}</h2>
        {getIngredients(props.type, openModal)}
      </li>
      {isIngredientsDetails &&
        <Modal
          title="Детали ингредиента"
          onClose={closeModal}
        >
          <IngredientDetails onClose={closeModal} data={ingredients} ingredient={idIngredient} />
        </Modal>
      }
    </>

  )
}

IngredientsCategory.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientsCategory;