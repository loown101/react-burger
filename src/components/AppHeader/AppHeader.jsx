import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><BurgerIcon type="primary" />Конструктор</li>
          <li><ListIcon type="secondary" />Лента заказов</li>
        </ul>
      </nav>

      <Logo />
      <p><ProfileIcon type="secondary" /> Личный кабинет</p>
    </header>
  );
};

export default AppHeader;