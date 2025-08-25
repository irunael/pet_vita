import React, { useState } from 'react'; // Adicionar useState
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalUser = ({ onClose, switchToVet }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // Estado para guardar o email

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === 'admin@petvita.com') {
      login('admin');
      onClose();
      navigate('/admin/dashboard');
    } else {
      // Lógica de login normal do cliente (simulada)
      login('client');
      onClose();
      // Em um sistema real, aqui iria para a página do cliente
    }
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="button-group">
          <button className="button active">Cliente</button>
          <button className="button" onClick={switchToVet}>Veterinário</button>
        </div>
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email-user">Email</label>
            {/* Input agora controlado pelo estado */}
            <input type="email" id="email-user" placeholder="Digite 'admin' para entrar como admin" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="senha-user">Senha</label>
            <input type="password" id="senha-user" placeholder="Qualquer senha" required />
          </div>
          {/* ... o resto do form ... */}
          <button type="submit" className="login-button">Entrar</button>
        </form>
        {/* ... o resto do modal ... */}
      </div>
    </div>
  );
};

export default ModalUser;