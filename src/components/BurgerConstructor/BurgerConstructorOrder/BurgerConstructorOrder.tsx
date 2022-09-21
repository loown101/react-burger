import React, { useRef, FC } from 'react';
import burgerConstructorOrderStyles from './BurgerConstructorOrder.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../../services/hooks';
import { REORDER_FILLING } from '../../../services/actions/ingredient';
import { TIngredient } from '../../../services/types/data'

type TBurgerConstructorOrder = {
  filling: TIngredient,
  index: number,
  handleDeleteClick: (id: number) => void,
  id: number,
}

type TItem = {
  index: number,
}

const BurgerConstructorOrder: FC<TBurgerConstructorOrder> = ({ filling, index, handleDeleteClick, id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null)

  const [, drop] = useDrop<TItem>({
    accept: 'sortIngridient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      dispatch({
        type: REORDER_FILLING,
        index: { dragIndex, hoverIndex }
      })

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngridient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.3 : 1

  drag(drop(ref))

  return (
    <li className={`${burgerConstructorOrderStyles.item} pb-4 pr-2`} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={(() => handleDeleteClick(filling.id))}
      />
    </li>
  )
}

export default BurgerConstructorOrder;
