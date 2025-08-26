import React, { useState } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import profileIcon from '../../../assets/images/Perfil/perfilIcon.png';
import editIcon from '../../../assets/images/Perfil/switchImage.png';
import '../Perfil/Perfil.css';

const AdminPerfil = () => {
  const [userData, setUserData] = useState({
    name: 'Admin Pet Vita',
    email: 'admin@petvita.com',
    phone: '(11) 5555-5555',
    role: 'Administrador da Plataforma',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setUserData(prev => ({ ...prev, profileImage: event.target.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="profile-page-admin">
      <HeaderAdmin />
      <div className="profile-container">
        <div className="profile-header">
          <h1>Perfil do Administrador</h1>
        </div>
        
        <form className="profile-content" onSubmit={handleSaveChanges}>
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img src={userData.profileImage || profileIcon} alt="Foto de perfil" className="profile-picture" />
              {isEditing && (
                <div className="profile-picture-edit">
                  <label htmlFor="profile-image-input"><img src={editIcon} alt="Editar" className="edit-icon" /></label>
                  <input id="profile-image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
              )}
            </div>
          </div>
          
          <div className="profile-info-section">
            <div className="profile-row">
              <div className="profile-field">
                <label>Nome</label>
                {isEditing ? (
                  <input type="text" name="name" value={userData.name} onChange={handleInputChange} className="info-field editable" />
                ) : (
                  <div className="info-field">{userData.name}</div>
                )}
              </div>
              <div className="profile-field">
                <label>Cargo</label>
                <div className="info-field">{userData.role}</div>
              </div>
            </div>
            
            <div className="profile-row">
              <div className="profile-field">
                <label>Email</label>
                {isEditing ? (
                  <input type="email" name="email" value={userData.email} onChange={handleInputChange} className="info-field editable" />
                ) : (
                  <div className="info-field">{userData.email}</div>
                )}
              </div>
              <div className="profile-field">
                <label>Telefone</label>
                {isEditing ? (
                  <input type="tel" name="phone" value={userData.phone} onChange={handleInputChange} className="info-field editable" />
                ) : (
                  <div className="info-field">{userData.phone}</div>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button type="submit" className="save-button">Salvar</button>
                  <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                </>
              ) : (
                <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Editar Perfil</button>
              )}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPerfil;