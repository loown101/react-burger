import React from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order-history.module.css';
import { getCookie } from '../../utils/cookies';
import { WS_INIT, WS_CLOSE, WS_CLEAR_STORE } from '../../services/action-types/wsActionTypes';
import { totalPrice } from '../../utils/utils';
import { TLocation } from '../../services/types/data'
import dayjs from 'dayjs';

function OrderHistoryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();

  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const logoutProfile = (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(logout())

    history.replace({
      pathname: "/",
      state: {
        from: {
          pathname: "/",
        },
      },
    });
  }

  const orders = useSelector(state => state.ws.orders)

  React.useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_INIT,
        payload: `?token=${getCookie("token")}`,
      })
    }

    return () => {
      dispatch({
        type: WS_CLOSE,
      });
    }
  }, [dispatch, orders])

  React.useEffect(() => {
    dispatch({
      type: WS_CLEAR_STORE,
    })
  }, [dispatch])

  return (
    <section className={`${orderStyles.container} mt-20`}>
      <div className={`mt-20 pr-15`}>
        <ul className={`${orderStyles.list}`}>
          <li className={`mb-8`}><Link to='/profile' className={`${orderStyles.link} ${orderStyles.link} text text_type_main-medium`}>Профиль</Link></li>
          <li className={`mb-8`}><Link to='/profile/orders' className={`${orderStyles.linkActive} text text_type_main-medium`}>История заказов</Link></li>
          <li className={`mb-20`}><Link to='/' className={`${orderStyles.link} text text_type_main-medium`} onClick={logoutProfile}>Выход</Link></li>
        </ul>
        <p className={`${orderStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={`${orderStyles.orderfeedContainer} ${orderStyles.feedContainer} mt-6`}>
        <ul className={`${orderStyles.feedList}`}>
          {
            (orders) && orders.map((order) => (
              <Link to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }} className={`${orderStyles.feedLink}`} key={order._id}>
                <li className={`${orderStyles.feedItem} mb-6 mr-2 pr-6 pl-6 pt-6 pb-6`}>
                  <div className={`${orderStyles.feedNumber} mb-6`}>
                    <p className="text text_type_digits-default">
                      {order.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {dayjs(order.updatedAt).toString()}
                    </p>
                  </div>
                  <h3 className={`${orderStyles.feedNamePrimary} text text_type_main-medium mb-2`}>
                    {order.name}
                  </h3>
                  <p className={
                    order.status === "done"
                      ? `${orderStyles.done} text text_type_main-small mb-6`
                      : `${orderStyles.canceled} text text_type_main-small mb-6`}>{order.status}</p>
                  <div className={`${orderStyles.feedTotal}`}>
                    <div className={`${orderStyles.feedImageContainer}`}>
                      {order.ingredients.slice(0, 5).map(id => (
                        (ingredients) && ingredients?.filter((ingredient) => (ingredient._id === id)).map((ingredient, index) => (
                          <div className={`${orderStyles.feedImageBackground}`} key={index}>
                            <div className={`${orderStyles.feedImageBorder}`}>
                              <img src={ingredient.image_mobile} alt={ingredient.name} className={`${orderStyles.feedImage}`} />
                            </div>
                          </div>
                        ))
                      ))
                      }
                    </div>
                    <div className={`${orderStyles.feedTotal}`}>
                      <p className="text text_type_digits-default mr-2">
                        {(totalPrice(order.ingredients, ingredients))}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              </Link>
            )).reverse()}
        </ul>
      </div>
    </section>
  )
}

export default OrderHistoryPage;