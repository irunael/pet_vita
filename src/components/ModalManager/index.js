// components/ModalManager.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ModalUser from '../ModalUser';
import ModalVet from '../ModalVet';
import ModalRegisterUser from '../ModalRegisterUser';
import ModalRegisterVet from '../ModalRegisterVet';
import ForgotPasswordModal from '../ForgotPasswordModal';

const ModalManager = ({ initialModal, onClose }) => {
  const [currentModal, setCurrentModal] = useState(initialModal);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Funções inteligentes que mantêm o contexto (login ou cadastro)
  const switchToVet = () => {
    // Se estiver em cadastro de usuário, vai para cadastro de vet
    if (currentModal === 'register-user') {
      setCurrentModal('register-vet');
    } else {
      // Caso contrário, vai para login de vet
      setCurrentModal('vet');
    }
  };

  const switchToUser = () => {
    // Se estiver em cadastro de vet, vai para cadastro de usuário
    if (currentModal === 'register-vet') {
      setCurrentModal('register-user');
    } else {
      // Caso contrário, vai para login de usuário
      setCurrentModal('user');
    }
  };

  const switchToRegisterUser = () => setCurrentModal('register-user');
  const switchToRegisterVet = () => setCurrentModal('register-vet');
  const switchToForgotPassword = () => setCurrentModal('forgot-password');

  const handleLoginSuccess = async (emailOrCrmv, password, loginType = 'USER') => {
    try {
      let userData;
      if (loginType === 'VETERINARY') {
        userData = await login(emailOrCrmv, password, 'VETERINARY');
      } else {
        userData = await login(emailOrCrmv, password, 'USER');
      }

      onClose();

      switch(userData.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'VETERINARY':
          navigate('/vet/dashboard');
          break;
        case 'EMPLOYEE':
          navigate('/employee/dashboard');
          break;
        case 'USER':
          navigate('/');
          break;
        default:
          navigate('/');
      }

    } catch (error) {
      console.error('Erro ao fazer login após cadastro:', error);
      throw error;
    }
  };

  const handleRegisterSuccess = async (email, password, role) => {
    try {
      const userData = await login(email, password);
      
      onClose();
      
      switch(userData.role) {
        case 'VETERINARY':
          navigate('/vet/perfil');
          break;
        case 'USER':
          navigate('/');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const renderModal = () => {
    switch (currentModal) {
      case 'user':
        return (
          <ModalUser 
            onClose={onClose}
            switchToVet={switchToVet}
            switchToRegisterUser={switchToRegisterUser}
            onLoginSuccess={handleLoginSuccess}
            switchToForgotPassword={switchToForgotPassword}
          />
        );
      case 'vet':
        return (
          <ModalVet 
            onClose={onClose}
            switchToUser={switchToUser}
            switchToRegisterVet={switchToRegisterVet}
            onLoginSuccess={handleLoginSuccess}
            switchToForgotPassword={switchToForgotPassword}
          />
        );
      case 'register-user':
        return (
          <ModalRegisterUser 
            onClose={onClose}
            switchToUser={switchToUser}
            switchToVet={switchToVet}
            openLogin={switchToUser}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case 'register-vet':
        return (
          <ModalRegisterVet 
            onClose={onClose}
            switchToUser={switchToUser}
            openLogin={switchToVet}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordModal 
            onClose={onClose}
            switchToLogin={switchToUser}
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
