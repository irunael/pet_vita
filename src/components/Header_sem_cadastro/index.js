import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import ModalVet from '../../components/ModalVet';
import ModalUser from '../../components/ModalUser';
import ModalRegisterUser from '../../components/ModalRegisterUser';
import ModalRegisterVet from '../../components/ModalRegisterVet';
import './css/styles.css';

const Header_sem_cadastro = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openUserModal = () => setActiveModal('user');
  const openVetModal = () => setActiveModal('vet');
  const openRegisterUserModal = () => setActiveModal('register-user');
  const openRegisterVetModal = () => setActiveModal('register-vet');
  const closeModal = () => setActiveModal(null);

  const switchToVet = () => setActiveModal('vet');
  const switchToUser = () => setActiveModal('user');

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Pet Vita Logo" /></Link>
        </div>
        
        <nav className="nav nav-center">
          <Link to="/" className="nav_link">Home</Link>
          <Link to="/app" className="nav_link">App</Link>
          <Link to="/sobre-nos" className="nav_link">Saiba Mais</Link>
        </nav>

        <div className="auth">
          <button className="button" onClick={openUserModal}>Login</button>
          <button className="button" onClick={openRegisterUserModal}>Cadastre-se</button>
        </div>
      </header>

      {/* Renderização dos modais */}
      {activeModal === 'user' && ReactDOM.createPortal(
        <ModalUser 
          onClose={closeModal} 
          switchToVet={switchToVet} 
          openRegister={openRegisterUserModal}
        />, 
        document.body
      )}
      {activeModal === 'register-user' && ReactDOM.createPortal(
        <ModalRegisterUser 
          onClose={closeModal} 
          switchToVet={openRegisterVetModal} 
          openLogin={openUserModal}
        />, 
        document.body
      )}
      {activeModal === 'vet' && ReactDOM.createPortal(
        <ModalVet onClose={closeModal} switchToUser={switchToUser} />, document.body
      )}
      {activeModal === 'register-vet' && ReactDOM.createPortal(
        <ModalRegisterVet onClose={closeModal} switchToUser={openRegisterUserModal} />, document.body
      )}
    </>
  );
};

export default Header_sem_cadastro;