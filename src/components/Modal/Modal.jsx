import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';

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
      <div className={ModalStyles.container}>
        <h3>{title}</h3>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} onEscKeydown={onEscKeydown} />
    </>,
    modalsContainer
  );
};

export default Modal;