import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';


const AppHeader = () => {
  return (
    <header className={`${headerStyles.header}`} >
      <div className={`${headerStyles.headerBox}`}>
        <nav>
          <ul className={`${headerStyles.list}`}>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5 mr-2`}><BurgerIcon type="primary" /><span className='text text_type_main-default text_color_inactive pl-2'>Конструктор</span></li>
            <li className={`${headerStyles.item} pl-5 pr-5 pb-5 pt-5`}><ListIcon type="secondary" /><span className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</span></li>
          </ul>
        </nav>

        <a href='/' className={`${headerStyles.logo}`} ><Logo /> </a>
        <a href='/' className={`${headerStyles.profile}`}><ProfileIcon type="secondary" /><span className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</span></a>
      </div>
    </header >
  );
};

export default AppHeader;