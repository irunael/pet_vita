import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import ModalVet from '../../components/ModalVet';
import ModalUser from '../../components/ModalUser';
import ModalRegisterUser from '../../components/ModalRegisterUser';
import ModalRegisterVet from '../../components/ModalRegisterVet';
import './css/styles.css';

const Header = () => {
  const [activeModal, setActiveModal] = useState(null); // null, 'user', 'vet'
  const [activeRegisterModal, setActiveRegisterModal] = useState(null); // null, 'user', 'vet'

  // Fecha todos os modais
  const closeAllModals = () => {
    setActiveModal(null);
    setActiveRegisterModal(null);
  };

  // Login - Usuário
  const openUserModal = () => {
    setActiveModal('user');
    setActiveRegisterModal(null);
  };

  // Login - Veterinário
  const openVetModal = () => {
    setActiveModal('vet');
    setActiveRegisterModal(null);
  };

  // Cadastro - Usuário
  const openRegisterUserModal = () => {
    setActiveRegisterModal('user');
    setActiveModal(null);
  };

  // Cadastro - Veterinário
  const openRegisterVetModal = () => {
    setActiveRegisterModal('vet');
    setActiveModal(null);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pet Vita Logo" />
      </div>
      
      <nav className="nav">
        <Link to="/" className="nav_link active">Home</Link>
        <Link to="/consultas" className="nav_link">Consultas</Link>
        <Link to="/pets" className="nav_link">Pets</Link>
        <Link to="/app" className="nav_link">App</Link>
        <Link to="/solucoes" className="nav_link">Saiba Mais</Link>
      </nav>

      <div className="auth">
        <button className="button" onClick={openUserModal}>Login</button>
        <button className="button" onClick={openRegisterUserModal}>Cadastre-se</button>
      </div>

      {/* Modal Login - Usuário */}
      {activeModal === 'user' && (
        <ModalUser 
          onClose={closeAllModals}
          switchToVet={openVetModal}
        />
      )}

      {/* Modal Login - Veterinário */}
      {activeModal === 'vet' && (
        <ModalVet 
          onClose={closeAllModals}
          switchToUser={openUserModal}
        />
      )}

      {/* Modal Cadastro - Usuário */}
      {activeRegisterModal === 'user' && (
        <ModalRegisterUser 
          onClose={closeAllModals}
          switchToVet={openRegisterVetModal}
        />
      )}

      {/* Modal Cadastro - Veterinário */}
      {activeRegisterModal === 'vet' && (
        <ModalRegisterVet 
          onClose={closeAllModals}
          switchToUser={openRegisterUserModal}
        />
      )}
    </header>
  );
};

export default Header;