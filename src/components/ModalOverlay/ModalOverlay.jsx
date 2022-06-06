import React from 'react';
import ModalOverlayStyles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClick, onEscKeydown }) => {
  return (
    <div className={`${ModalOverlayStyles.overlay}`} onClick={onClick} onKeyDown={onEscKeydown}></div>
  )
};

export default ModalOverlay;