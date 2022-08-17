import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { NavLink, Link, useLocation } from 'react-router-dom';


const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={`${headerStyles.header}`} >
      <div className={`${headerStyles.headerBox}`}>
        <nav>
          <ul className={`${headerStyles.list}`}>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5 mr-2`}>
              <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
              <NavLink type={location.pathname === '/' ? 'primary' : 'secondary'} to='/' className={`${headerStyles.navlink}`}>
                <span className={
                  location.pathname === "/"
                    ? "pl-2 text text_type_main-default"
                    : "pl-2 text text_type_main-default text_color_inactive"}>Конструктор
                </span>
              </NavLink>
            </li>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5`}>
              <ListIcon type={location.pathname === '/order-feed' ? 'primary' : 'secondary'} />
              <NavLink type={location.pathname === '/order-feed' ? 'primary' : 'secondary'} to='/order-feed' className={`${headerStyles.navlink}`}><span className={
                location.pathname === "/order-feed"
                  ? "pl-2 text text_type_main-default"
                  : "pl-2 text text_type_main-default text_color_inactive"}>Лента заказов
              </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to='/' className={`${headerStyles.logo}`} ><Logo /> </Link>
        <Link type={location.pathname === '/profile' ? 'primary' : 'secondary'} to='/profile' className={`${headerStyles.profile} `}><ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} /><span className={
          location.pathname === "/profile"
            ? "pl-2 text text_type_main-default"
            : "pl-2 text text_type_main-default text_color_inactive"
        }>Личный кабинет</span></Link>
      </div>
    </header >
  );
};

export default AppHeader;