// components/ModalRegisterVet.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalRegisterVet = ({ onClose, switchToUser, openLogin }) => {
  const { login } = useAuth();

  // Estados para o formulário do veterinário
  const [formData, setFormData] = useState({
    username: '',
    crmv: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    rg: '',
    imageurl: 'https://i.pravatar.cc/150'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Prepara os dados para o backend
      const vetData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        rg: formData.rg,
        crmv: formData.crmv,
        imageurl: formData.imageurl,
        role: 'VETERINARY'
      };

      // 1. Registra o veterinário
      await api.post('/users/register', vetData);

      // 2. Faz login automaticamente
      await login(formData.email, formData.password);

      onClose();
      window.location.href = '/vet/dashboard';

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao cadastrar veterinário. Verifique os dados.';
      setError(errorMessage);
      console.error('Erro no cadastro veterinário:', err);
    } finally {
      setLoading(false);
    }
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
        
        <form className="form" onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="username">Nome Completo</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Digite o seu nome completo" 
              required 
              value={formData.username}
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="crmv">CRMV</label>
            <input 
              type="text" 
              id="crmv" 
              placeholder="Digite o seu CRMV" 
              required 
              value={formData.crmv}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="seu.email@exemplo.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Mínimo 6 caracteres" 
              required 
              minLength="6"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Digite a senha novamente" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="phone">Telefone</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="11987654321 (apenas números)" 
              pattern="[0-9]{11}"
              title="Digite 11 números (DDD + número)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="address">Endereço da Clínica</label>
            <input 
              type="text" 
              id="address" 
              placeholder="Endereço da clínica ou consultório" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="rg">RG (somente números)</label>
            <input 
              type="text" 
              id="rg" 
              placeholder="123456789" 
              pattern="[0-9]{7,12}"
              title="Digite apenas números do RG"
              value={formData.rg}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Cadastrando...
              </>
            ) : (
              'Cadastrar como Veterinário'
            )}
          </button>
        </form>
        
        <div className="links">
          <button type="button" className="link-button" onClick={onClose}>
            Voltar
          </button>
          <button type="button" className="link-button" onClick={openLogin}>
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterVet;