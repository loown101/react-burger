import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyles.container}`}>
        <h3 className='mt-10 ml-10 mr-10 text text_type_main-large'>{title}</h3>
        <button className={`${ModalStyles.btnclose} pt-15 pr-10`} onClick={onOverlayClick}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} onEscKeydown={onEscKeydown} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;