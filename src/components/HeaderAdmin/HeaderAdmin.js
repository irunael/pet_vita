import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import '../css/Header.css';
import { BsBellFill, BsChatDots } from 'react-icons/bs'; 

const mockAdminNotifications = [
    { id: 1, text: "Dr. Carlos Silva atualizou uma consulta.", time: "10 min atrás" },
    { id: 2, text: "Novo paciente 'Ana Silva' cadastrado na plataforma.", time: "1 hora atrás" },
    { id: 3, text: "Relatório mensal de Outubro está pronto.", time: "Ontem" },
];

const HeaderAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Estado para as notificações

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pet Vita Logo" />
      </div>
      
      <nav className="nav nav-center">
        <NavLink to="/admin/dashboard" className="nav_link">Home</NavLink>
        <NavLink to="/admin/pacientes" className="nav_link">Pacientes</NavLink>
        <NavLink to="/admin/veterinarios" className="nav_link">Veterinários</NavLink>
        <NavLink to="/admin/consultas" className="nav_link">Consultas</NavLink>
        <NavLink to="/admin/relatorios" className="nav_link">Relatórios</NavLink>
      </nav>

      <div className="icons-container">
        <NavLink to="/admin/chat" className="header-icon">
            <BsChatDots size={26} />
        </NavLink>
        <div className="notification-icon-wrapper">
            <div 
                className="header-icon notification-icon" 
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <BsBellFill size={26} />
                <span className="notification-badge">{mockAdminNotifications.length}</span>
            </div>
            
            {showNotifications && (
                <div className="notification-dropdown">
                    <div className="dropdown-header">
                        <span>Notificações</span>
                    </div>
                    <ul className="notification-list">
                        {mockAdminNotifications.map(notif => (
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
              <NavLink to="/admin/perfil" className="dropdown-item">Meu Perfil</NavLink>
              <NavLink to="/" className="dropdown-item">Sair</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;