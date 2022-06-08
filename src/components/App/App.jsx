import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';


function App() {
  const [state, setState] = React.useState({
    ingredients: []
  });
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] = React.useState(false);
  const [idIngredients, setIdIngredients] = React.useState();

  React.useEffect(() => {
    const getIngredients = async () => {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();

      setState({ ...state, ingredients: data.data });
    }

    getIngredients();
  }, []);

  const openOrderDetails = () => {
    setIsOrderDetailsOpened(true);
  };

  const openIngredientsDetails = (e) => {
    setIsIngredientsDetailsOpened(true);
    setIdIngredients(e.currentTarget.dataset.ingredient);
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientsDetailsOpened(false);
  };

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
  };

  return (
    <div className={AppStyle.App}>
      <AppHeader />
      {(state.ingredients.length > 0) && <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredients data={state.ingredients} openModal={openIngredientsDetails} />
        <BurgerConstructor data={state.ingredients} type="bun" openModal={openOrderDetails} />
      </main>}
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails onCloseClick={closeAllModals} />
        </Modal>}
      {isIngredientsDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails onCloseClick={closeAllModals} data={state.ingredients} ingredient={idIngredients} />
        </Modal>}
    </div>
  );
}


export default App;
