// components/ModalManager.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ModalUser from '../ModalUser';
import ModalVet from '../ModalVet';
import ModalRegisterUser from '../ModalRegisterUser';
import ModalRegisterVet from '../ModalRegisterVet';

const ModalManager = ({ initialModal, onClose }) => {
  const [currentModal, setCurrentModal] = useState(initialModal);

  const switchToVet = () => setCurrentModal('vet');
  const switchToUser = () => setCurrentModal('user');
  const switchToRegisterUser = () => setCurrentModal('register-user');
  const switchToRegisterVet = () => setCurrentModal('register-vet');

  const renderModal = () => {
    switch (currentModal) {
      case 'user':
        return (
          <ModalUser 
            onClose={onClose}
            switchToVet={switchToVet}
            openRegister={switchToRegisterUser}
          />
        );
      case 'vet':
        return (
          <ModalVet 
            onClose={onClose}
            switchToUser={switchToUser}
            openRegister={switchToRegisterVet}
          />
        );
      case 'register-user':
        return (
          <ModalRegisterUser 
            onClose={onClose}
            switchToVet={switchToRegisterVet}
            openLogin={switchToUser}
          />
        );
      case 'register-vet':
        return (
          <ModalRegisterVet 
            onClose={onClose}
            switchToUser={switchToRegisterUser}
            openLogin={switchToVet}
          />
        );
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      {renderModal()}
    </div>,
    document.body
  );
};

export default ModalManager;