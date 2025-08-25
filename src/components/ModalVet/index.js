import React from 'react';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const ModalVet = ({ onClose, switchToUser }) => {
  const { login } = useAuth(); // 2. Pegar a função de login do contexto
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login('vet'); // 3. Chama a função de login com o tipo 'vet'
    onClose(); // Fecha o modal
    navigate('/vet/dashboard'); // 4. Redireciona para o painel do veterinário
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* ... o resto do seu modal ... */}
        
        {/* O formulário agora chama handleLogin */}
        <form className="form" onSubmit={handleLogin}>
          {/* ... inputs de CRMV, email, senha ... */}
          
          <button type="submit" className="login-button">Entrar</button>
        </form>
        
        {/* ... o resto do seu modal ... */}
      </div>
    </div>
  );
};

export default ModalVet;