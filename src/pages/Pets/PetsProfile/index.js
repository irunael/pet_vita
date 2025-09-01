import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro'; // Assumindo que o Header do cliente é este
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import './css/styles.css';

const PetsProfile = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    
    const fetchUserPets = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/admin/users/${user.id}/details`);
        setPets(response.data.pets || []);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
        setError('Não foi possível carregar seus pets.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, [user]);

  return (
    <div className="pet-profile-page">
      {/* O Header é global, não precisa mais ser chamado aqui */}
      <div className="welcome-section">
        <h1 className="welcome-title">Bem vindo ao espaço para os seus Pets</h1>
      </div>
      <div className="pet-profile-container">
        {loading && <p>Carregando...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <>
            {pets.length > 0 ? (
              pets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-photo-container">
                    <img src={pet.imageurl} alt={`Foto de ${pet.name}`} className="pet-photo" />
                  </div>
                  <div className="pet-info">
                    <h3 className="pet-name">{pet.name}</h3>
                    <span className="pet-gender">{pet.gender}</span>
                  </div>
                  <Link to={`/pets-details/${pet.id}`} className="details-button">
                    Detalhes <span className="arrow">›</span>
                  </Link>
                </div>
              ))
            ) : (
              <p style={{textAlign: 'center'}}>Você ainda não cadastrou nenhum pet.</p>
            )}
            <Link to="/add-pet" className="action-button-primary">
              + Adicionar um Pet
            </Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PetsProfile;