import React, { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedStyles from './order-feed.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { WS_INIT, WS_CLOSE, WS_CLEAR_STORE } from '../../services/action-types/wsActionTypes';
import { totalPrice } from '../../utils/utils';
import dayjs from 'dayjs';

function OrderFeedPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector(state => state.ws)

  const ingredients = useSelector(
    state => state.ingredient.items
  );

  useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_INIT,
        payload: '/all',
      })
    }

    return () => {
      dispatch({
        type: WS_CLOSE,
      });
    }
  }, [dispatch, orders])

  useEffect(() => {
    dispatch({
      type: WS_CLEAR_STORE,
    })
  }, [dispatch])

  return (
    <section className={`${feedStyles.feed}`}>
      <h2 className={`${feedStyles.heading} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
      <div className={`${feedStyles.orderfeedContainer} ${feedStyles.feedContainer} mb-6`}>
        <ul className={`${feedStyles.list}`}>
          {
            (orders) && orders.map((order) => (
              <Link to={{ pathname: `/feed/${order._id}`, state: { background: location } }} className={`${feedStyles.feedLink}`} key={order._id}>
                <li className={`${feedStyles.feedItem} mb-4 mr-2 pr-6 pl-6 pt-6 pb-6 `}>
                  <div className={`${feedStyles.feedNumber} mb-6`}>
                    <p className="text text_type_digits-default">
                      {order.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {dayjs(order.updatedAt).toString()}
                    </p>
                  </div>
                  <h3 className={`${feedStyles.feedNamePrimary} text text_type_main-medium mb-6`}>
                    {order.name}
                  </h3>
                  <div className={`${feedStyles.feedTotal}`}>
                    <div className={`${feedStyles.feedImageContainer}`}>
                      {order.ingredients.slice(0, 5).map(id => (
                        (ingredients) && ingredients?.filter((ingredient) => (ingredient._id === id)).map((ingredient, index) => (
                          <div className={`${feedStyles.feedImageBackground}`} key={index}>
                            <div className={`${feedStyles.feedImageBorder}`}>
                              <img src={ingredient.image_mobile} alt={ingredient.name} className={`${feedStyles.feedImage}`} />
                            </div>
                          </div>
                        ))
                      ))
                      }
                    </div>
                    <div className={`${feedStyles.feedTotal}`}>
                      <p className="text text_type_digits-default mr-2">
                        {(totalPrice(order.ingredients, ingredients))}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className={`${feedStyles.orderfeedContainer} ${feedStyles.orderContainer} ml-15`}>
        <div className={`${feedStyles.orderStatusContainer} mb-15`}>
          <div className={`mr-9`}>
            <p className={`${feedStyles.order} text text_type_main-medium mb-6`}>Готовы:</p>
            <ul className={`${feedStyles.orderStatusList}`}>
              {
                (orders) && orders?.filter((order) => (order.status === 'done')).slice(0, 30).map((order, index) => (
                  <li className={`${feedStyles.orderListItem} mb-2 text text_type_digits-default`} key={index}>{order.number}</li>
                ))
              }
            </ul>
          </div>
          <div className={`mr-9`}>
            <p className={`text text_type_main-medium mb-6`}>В работе:</p>
            <ul className={`${feedStyles.orderStatusList}`}>
              {
                (orders) && orders?.filter((order) => (order.status === 'pending')).slice(0, 30).map((order, index) => (
                  <li className={`mb-2 text text_type_digits-default`} key={index}>{order.number}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <h3 className={`text text_type_main-medium`}>Выполнено за все время:</h3>
        <p className={`${feedStyles.orderCount} text text_type_digits-large mb-15`}>{total}</p>
        <h3 className={`text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <p className={`${feedStyles.orderCount} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section >
  )
}

export default OrderFeedPage;