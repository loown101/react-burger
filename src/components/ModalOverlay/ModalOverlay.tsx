import React, { FC } from 'react';
import ModalOverlayStyles from './ModalOverlay.module.css';

type TModalOverlay = {
  onClick: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  return (
    <div className={`${ModalOverlayStyles.overlay}`} onClick={onClick}></div>
  )
};

export default ModalOverlay;