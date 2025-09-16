import React, { useState } from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import './css/Header.css';
import { BsBellFill, BsChatDots } from 'react-icons/bs'; 

const HeaderAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/admin/dashboard"><img src={logo} alt="Pet Vita Logo" /></NavLink>
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
                <span className="notification-badge">1</span>
            </div>
            {/* O dropdown de notificações continuaria aqui */}
        </div>
        <div className="profile-icon-container">
          <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={profileIcon} alt="Perfil" />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/admin/perfil" className="dropdown-item">Meu Perfil</NavLink>
              <button onClick={handleLogout} className="dropdown-item" style={{border: 'none', width: '100%', textAlign: 'left', background: 'none', cursor: 'pointer'}}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;