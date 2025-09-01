import React from 'react';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalVet = ({ onClose, switchToUser }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // No futuro, a lógica de login real com o back-end iria aqui
    alert("Funcionalidade de login do veterinário a ser implementada.");
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="button-group">
          <button className="button" onClick={switchToUser}>Cliente</button>
          <button className="button active">Veterinário</button>
        </div>
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="CRMV">CRMV</label>
            <input type="text" id="CRMV" placeholder="Digite o seu CRMV" required />
          </div>
          <div className="input-group">
            <label htmlFor="email-vet">Email</label>
            <input type="email" id="email-vet" placeholder="Digite o seu email" required />
          </div>
          <div className="input-group">
            <label htmlFor="senha-vet">Senha</label>
            <input type="password" id="senha-vet" placeholder="Digite a sua senha" required />
          </div>
          <div className="options">
            <div className="remember-me">
              <input type="checkbox" id="remember-vet" />
              <label htmlFor="remember-vet">Lembrar minha senha</label>
            </div>
            <div className="forgot-password">
              <a href="#">Esqueci a Senha</a>
            </div>
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <div className="links">
          <button type="button" className="link-button" onClick={onClose}>Voltar</button>
          <button type="button" className="link-button">Cadastrar-se</button>
        </div>
      </div>
    </div>
  );
};

export default ModalVet;