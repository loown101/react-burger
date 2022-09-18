import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';

const modalsContainer = document.querySelector('#modals') as HTMLElement;

type TModal = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<TModal> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyles.container}`}>
        <h3 className='mt-10 ml-10 mr-10 text text_type_main-large'>{title}</h3>
        <button className={`${ModalStyles.btnclose} pt-15 pr-10`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;