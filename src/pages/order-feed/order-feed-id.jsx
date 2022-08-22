import React from 'react';
import OrderFeedId from '../../components/OrderFeedId/OrderFeedId';
import { useDispatch, useSelector } from 'react-redux';
import { WS_INIT, WS_CLOSE } from '../../services/action-types/wsActionTypes';

function OrderFeedIdPage() {
  const { orders } = useSelector(state => state.ws)
  const dispatch = useDispatch();

  React.useEffect(() => {
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

  return (
    <>
      <OrderFeedId />
    </>
  )
}

export default OrderFeedIdPage;