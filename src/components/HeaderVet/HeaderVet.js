import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import { BsChatDots, BsBellFill } from 'react-icons/bs';
import './css/Header.css';

const mockNotifications = [
    { id: 1, text: "Novo pedido de agendamento para o pet 'Rex'.", time: "5 min atrás" },
    { id: 2, text: "A cliente 'Ana Silva' enviou uma nova mensagem.", time: "2 horas atrás" },
    { id: 3, text: "Lembrete: Consulta com 'Luna' amanhã às 10:00.", time: "1 dia atrás" },
];

const HeaderVet = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pet Vita Logo" />
      </div>
      
      <nav className="nav nav-center">
        <NavLink to="/vet/dashboard" className="nav_link">Home</NavLink>
        <NavLink to="/vet/consultas" className="nav_link">Consultas</NavLink>
        <NavLink to="/vet/relatorios" className="nav_link">Relatórios</NavLink>
      </nav>

      <div className="icons-container">
        <NavLink to="/vet/chat" className="header-icon">
            <BsChatDots size={26} />
        </NavLink>
        <div className="notification-icon-wrapper">
            <div 
                className="header-icon notification-icon" 
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <BsBellFill size={26} />
                <span className="notification-badge">{mockNotifications.length}</span>
            </div>
            {showNotifications && (
                <div className="notification-dropdown">
                    <div className="dropdown-header">
                        <span>Notificações</span>
                    </div>
                    <ul className="notification-list">
                        {mockNotifications.map(notif => (
                            <li key={notif.id} className="notification-item">
                                <span className="notification-text">{notif.text}</span>
                                <span className="notification-time">{notif.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        <div className="profile-icon-container">
          <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={profileIcon} alt="Perfil" />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/vet/perfil" className="dropdown-item">Meu Perfil</NavLink>
              <NavLink to="/" className="dropdown-item">Sair</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderVet;