import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrder, closeModalOrder } from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';
import { GET_BUNS, GET_FILLING, DELETE_FILLING } from '../../services/actions/ingredient';
import { countBuns } from '../../utils/utils';
import BurgerConstructorOrder from './BurgerConstructorOrder/BurgerConstructorOrder';
import { useLocation, Redirect } from 'react-router-dom';

const BurgerConstructor = ({ type }) => {
  const { v4: uuidv4 } = require('uuid');

  const dispatch = useDispatch();
  const location = useLocation();

  const [orderState, setOrderState] = useState(false)

  const buns = useSelector(state => state.ingredient.itemsBun);
  const fillings = useSelector(state => state.ingredient.itemsFilling);

  const [modal, setModal] = useState(false)

  const user = useSelector(
    state => {
      return state.user
    }
  )

  const handleOrderClick = useCallback(
    () => {
      if (!user.user) {
        setOrderState(true)

        return;
      }

      const cartIngredientsId = [...fillings].map((ingredient) => ingredient._id);

      if (buns) {
        cartIngredientsId.push(buns._id)
        cartIngredientsId.push(buns._id)
      }

      setModal(true)

      dispatch(saveOrder(cartIngredientsId))
    },
    [user.user, fillings, buns, dispatch]
  );

  const handleDeleteClick = (id) => {
    dispatch({
      type: DELETE_FILLING,
      id: id,
    })
  }

  const closeModal = useCallback(
    () => {
      dispatch(closeModalOrder());
      setModal(false);
    },
    [dispatch]
  );

  const getFillingList = (fillings) => {
    return (
      <ul className={`${burgerConstructorStyles.list} `}>
        {fillings.map((filling, index) =>
        (
          <BurgerConstructorOrder
            key={filling.id}
            id={filling.id}
            index={index}
            filling={filling}
            handleDeleteClick={handleDeleteClick}
          />
        ))
        }
      </ul>
    )
  }

  const calcSum = (fillings) => {
    let total = fillings.reduce((acc, { price }) => acc + price, ((!buns) ? 0 : buns.price) * countBuns);
    return total;
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'newIngridient',
    collect: monitor => ({
      isHover: monitor.isOver() ? 'indigo' : 'transparent',
    }),
    drop(item) {
      if (item.ingredient.type === type) {
        dispatch({
          type: GET_BUNS,
          itemsBun: item.ingredient,
        });
      } else {
        dispatch({
          type: GET_FILLING,
          itemsFilling: { ...item.ingredient, id: uuidv4() },
        });
      }
    },
  });

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} >
      <div ref={dropTarget} style={{ isHover }}>
        {(!buns) ? (<div className={`${burgerConstructorStyles.boxIngredient} ${burgerConstructorStyles.boxIngredientBuns} ml-8 pb-4 mb-4`}>Перенесите булочку</div>) :
          (<div className={`${burgerConstructorStyles.boxIngredient} ml-8 pb-4`}>
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          </div>)}
        {(fillings.length > 0) ? (<div className={`${burgerConstructorStyles.boxIngredient} `}>
          {getFillingList(fillings)}
        </div>) : (<div className={`${burgerConstructorStyles.boxIngredient} ${burgerConstructorStyles.boxIngredientFilling} ml-8 pb-4 mb-4`}>Добавьте соус или начинку</div>)}
        {(!buns)
          ? (<div className={`${burgerConstructorStyles.boxIngredient} ${burgerConstructorStyles.boxIngredientBuns} ${burgerConstructorStyles.boxIngredientBunsBottom} ml-8 pb-4`}>Перенесите булочку</div>)
          : (<div className={`${burgerConstructorStyles.boxIngredient} ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          </div>)
        }
      </div>
      <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
        <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>
            {calcSum(fillings)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleOrderClick} type="primary" size="large" disabled={(!buns) ? true : false}>
          Оформить заказ
        </Button>
      </div>
      {
        modal &&
        <Modal
          title=""
          onClose={closeModal}
        >
          <OrderDetails onClose={closeModal} />
        </Modal>
      }
      {orderState &&
        < Redirect
          to={location.state?.from || '/login'}
        />
      }
    </section >
  );
};

BurgerConstructor.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerConstructor;