import React from 'react';
import ModalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick, onEscKeydown }) => {
  return (
    <div className={`${ModalOverlayStyles.overlay}`} onClick={onClick} onKeyDown={onEscKeydown}></div>
  )
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
};

export default ModalOverlay;