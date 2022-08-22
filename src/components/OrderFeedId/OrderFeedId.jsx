import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedStyles from './OrderFeedId.module.css';
import { totalPrice } from '../../utils/utils'

function OrderFeedId() {
  const ingredients = useSelector(
    state => state.ingredient.items
  );

  const { orders } = useSelector(state => state.ws)

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const activeOrder = orders?.find((order) => order._id === id)

  React.useEffect(
    () => {
      if (!activeOrder) {
        history.replace({ pathname: `/feed/${id}` })
      };
    },
    [dispatch, activeOrder, history, id]
  );

  return (
    (activeOrder) && <section className={`${feedStyles.feed}`}>
      <p className={`${feedStyles.feedOrder} text text_type_digits-default mt-15 mb-10`}>{activeOrder.number}</p>
      <h3 className="text text_type_main-medium mb-3">{activeOrder.name}</h3>
      <p className={`${feedStyles.feedStatus} text text_type_main-small mb-15`}>{activeOrder.status}</p>
      <div className={`${feedStyles.feedListContainer}`}>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={`${feedStyles.feedList} mb-10`}>
          {Array.from(new Set(activeOrder.ingredients))?.map(id => (
            (ingredients) && ingredients?.filter((ingredient) => (ingredient._id === id)).map(ingredient => (
              <li className={`${feedStyles.feedItem}`} key={ingredient._id}>
                <div className={`${feedStyles.feedName}`}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                  <p className="text text_type_main-default ml-4">{ingredient.name}</p>
                </div>
                <div className={`${feedStyles.feedPrice} ml-4 mr-6`}>
                  <p className="text text_type_digits-default mr-2">
                    <span>
                      {activeOrder && activeOrder.ingredients?.filter((activeOrderId) => activeOrderId === ingredient?._id).length}
                    </span>&nbsp;x&nbsp;{ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))
          ))}

        </ul>
      </div>
      <div className={`${feedStyles.feedTotalContainer} mb-15`}>
        <p className="text text_type_main-default text_color_inactive">{activeOrder.updatedAt}</p>
        <div className={`${feedStyles.feedTotal}`} >
          <p className="text text_type_digits-default mr-2">
            {(totalPrice(activeOrder.ingredients, ingredients))}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section >


  )
}

export default OrderFeedId;