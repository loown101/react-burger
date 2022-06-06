import React from 'react';
import AppStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//import { data } from '../../utils/data'

function App() {
  const [state, setState] = React.useState({
    ingredients: ['']
  });

  React.useEffect(() => {
    const getIngredients = async () => {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();

      setState({ ...state, ingredients: data.data });
    }

    getIngredients();
  }, []);

  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <main className={`${AppStyle.Main} pl-5`}>
        <BurgerIngredients data={state.ingredients} />
        <BurgerConstructor data={state.ingredients} type="bun" />
      </main>
    </div>
  );
}

export default App;
