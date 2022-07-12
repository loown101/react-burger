import React from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import okImage from '../../images/graphics.png';

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={`${OrderDetailsStyles.container} mt-30 mb-30`}>
      <h4 className={`${OrderDetailsStyles.heading} text text_type_digits-large mb-8`}>{orderNumber}</h4>
      <p className={`${OrderDetailsStyles.textCard} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={okImage} alt="Заказ подтвержден" className={`${OrderDetailsStyles.okImage} mb-15`} />
      <p className={`${OrderDetailsStyles.textCard} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${OrderDetailsStyles.textCard} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div >
  )
};

export default OrderDetails;