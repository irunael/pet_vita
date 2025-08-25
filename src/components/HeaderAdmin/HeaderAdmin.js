import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import { BsBellFill } from 'react-icons/bs';
import '../css/Header.css';

const HeaderAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="header-icon notification-icon">
            <BsBellFill size={26} />
            <span className="notification-badge">1</span>
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