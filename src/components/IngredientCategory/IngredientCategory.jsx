import IngredientCategoryStyles from './IngredientCategory.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types'


const IngredientsCategory = (props) => {

  const getIngredients = (data, type, openModal) => {
    return (
      <ul className={`${IngredientCategoryStyles.listBox}`}>
        {
          data.filter((ingredient) => (ingredient.type === type)).map((ingredient) => (
            <li className={`${IngredientCategoryStyles.item} pb-8`} key={ingredient._id} onClick={openModal} data-ingredient={ingredient._id}>
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
          ))
        }
      </ul>
    )
  }

  return (
    <li id={props.id}>
      <h2 className={`text text_type_main-medium pb-6 pt-10`}>{props.name}</h2>
      {getIngredients(props.data, props.type, props.openModal)}
    </li>
  )
}

IngredientsCategory.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientsCategory;