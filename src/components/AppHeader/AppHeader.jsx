import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import { NavLink, Link } from 'react-router-dom';


const AppHeader = () => {
  return (
    <header className={`${headerStyles.header}`} >
      <div className={`${headerStyles.headerBox}`}>
        <nav>
          <ul className={`${headerStyles.list}`}>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5 mr-2`}><BurgerIcon type="primary" /><NavLink to='/' className={`${headerStyles.navlink} text text_type_main-default text_color_inactive pl-2`}>Конструктор</NavLink></li>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5`}><ListIcon type="secondary" /><NavLink to='/order-feed' className={`${headerStyles.navlink} text text_type_main-default text_color_inactive pl-2`}>Лента заказов</NavLink></li>
          </ul>
        </nav>

        <Link to='/' className={`${headerStyles.logo}`} ><Logo /> </Link>
        <Link to='/profile' className={`${headerStyles.profile}`}><ProfileIcon type="secondary" /><span className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</span></Link>
      </div>
    </header >
  );
};

export default AppHeader;