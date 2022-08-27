import React from 'react';
import OrderHistoryId from '../../components/OrderFeedId/OrderHistoryId';
import { useDispatch, useSelector } from 'react-redux';
import { WS_INIT, WS_CLOSE } from '../../services/action-types/wsActionTypes';
import { getCookie } from '../../utils/cookies';

function OrderHistoryIdPage() {
  const { orders } = useSelector(state => state.ws)
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_INIT,
        payload: `?token=${getCookie("token")}`
      })
    }

    return () => {
      dispatch({
        type: WS_CLOSE,
      });
    }
  }, [dispatch, orders])

  return (
    <OrderHistoryId />
  )
}

export default OrderHistoryIdPage;