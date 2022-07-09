import React, { useRef } from 'react';
import burgerConstructorOrderStyles from './BurgerConstructorOrder.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { REORDER_FILLING } from '../../../services/actions/ingredient';

const BurgerConstructorOrder = ({ filling, index, handleDeleteClick, id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'sortIngridient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      dispatch({
        type: REORDER_FILLING,
        index: { dragIndex, hoverIndex }
      })
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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

BurgerConstructorOrder.propTypes = {
  filling: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default BurgerConstructorOrder;
