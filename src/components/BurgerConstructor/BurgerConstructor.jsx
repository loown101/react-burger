import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useState, useReducer, useEffect } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import BurgerIngredientsContext from '../../services/burgerIngredientsContext'
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { checkResponce } from '../../utils/utils';

const BurgerConstructor = ({ type, onClose, isOrderDetailsOpened, setIsOrderDetailsOpened }) => {
  const ingredients = useContext(BurgerIngredientsContext);

  const [bun, setBun] = useState(ingredients.find(ingredient => ingredient.type === type)); //setBun - когда пользователь будет выбирать булочку
  const [cart, setCart] = useState(ingredients.filter((ingredient) => (ingredient.type !== type)));
  const [modalData, setModalData] = useState(null);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "add":
  //       return { ingredient: action.payload };
  //     case "delete":
  //       return { ingredient: action.payload };
  //     case "reset":
  //       return cartInitialState;
  //     default:
  //       throw new Error(`Wrong type of action: ${action.type}`);
  //   }
  // };

  // const cartInitialState = { ingredient: [] };

  // const [cartState, cartDispatcher] = useReducer(reducer, cartInitialState, undefined);


  const handleOrderClick = () => {
    const cartIngredientsId = cart.map((ingredients) => ingredients._id)

    cartIngredientsId.push(bun._id);
    cartIngredientsId.push(bun._id);

    saveOrder(cartIngredientsId)
      .then(data => {
        setModalData(data);
        setIsOrderDetailsOpened(true);
      });
  };

  const saveOrder = (ingredients) => {
    fetch(`https://norma.nomoreparties.space/api/orders`, {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredients })
    })
      .then((res) => checkResponce(res))
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  const getData = (ingredients) => {
    return (
      <ul className={`${burgerConstructorStyles.list} `}>
        {
          ingredients.map((ingredient, index) => (
            <li className={`${burgerConstructorStyles.item} pb-4 pr-2`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))
        }
      </ul>
    )
  }

  const getSum = (ingredients) => {
    const total = ingredients.reduce((acc, { price }) => acc + price, bun.price * 2);
    return total;
  }

  return (
    <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`} >
      <div className={`${burgerConstructorStyles.boxIngredient} ml-8 pb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${burgerConstructorStyles.boxIngredient} `}>
        {getData(cart)}
      </div>
      <div className={`${burgerConstructorStyles.boxIngredient} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${burgerConstructorStyles.totalBox} pt-10`}>
        <div className={`${burgerConstructorStyles.priceBox} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>
            {getSum(cart)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleOrderClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onClose={onClose}
        >
          <OrderDetails onClose={onClose} orderNumber={modalData.order.number} />
        </Modal>}
    </section >
  );
};

export default BurgerConstructor;