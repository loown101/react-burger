import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import BurgerIngredientsContext from '../../services/burgerIngredientsContext';


function App() {
  const [state, setState] = React.useState({
    ingredients: []
  });
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] = React.useState(false);
  const [idIngredients, setIdIngredients] = React.useState();

  const checkResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  }

  const getIngredients = () => {
    return fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then((res) => checkResponce(res))
      .then((data) => setState({ ...state, ingredients: data.data }))
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  React.useEffect(() => {
    getIngredients()
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


  return (
    <div className={AppStyle.App}>
      <AppHeader />
      {(state.ingredients.length > 0) && <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredientsContext.Provider value={state.ingredients}>
          <BurgerIngredients openModal={openIngredientsDetails} />
          <BurgerConstructor type="bun" onClose={closeAllModals} isOrderDetailsOpened={isOrderDetailsOpened} setIsOrderDetailsOpened={setIsOrderDetailsOpened} />
        </BurgerIngredientsContext.Provider>
      </main>}
      {isIngredientsDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onClose={closeAllModals}
        >
          <IngredientDetails onClose={closeAllModals} data={state.ingredients} ingredient={idIngredients} />
        </Modal>}
    </div>
  );
}


export default App;
