import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import Footer from '../../../components/Footer';
import './css/styles.css';

const speciesOptions = [ "CACHORRO", "GATO", "PASSARO", "PEIXE", "ROEDOR", "REPTIL", "COELHO", "OUTROS" ];
const porteOptions = ["PEQUENO", "MEDIO", "GRANDE"];
const genderOptions = ["Macho", "Femea"];

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    imageurl: 'https://i.imgur.com/2qgrCI2.png', // URL padrão
    personalizatedSpecies: '',
    personalizedBreed: '',
    speciespet: '',
    porte: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setError("Você precisa estar logado para cadastrar um pet.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const petData = { ...formData, age: parseInt(formData.age), usuarioId: user.id };
      await api.post('/pets', petData);
      alert('Pet cadastrado com sucesso!');
      navigate('/pets');
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      setError(error.response?.data?.message || "Falha ao cadastrar o pet. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pet-page">
      <div className="welcome-section">
        <h1 className="welcome-title">Cadastre seu novo amigo</h1>
      </div>
      <div className="add-pet-wrapper">
        <div className="add-pet-container">
          <form onSubmit={handleSubmit} className="pet-form">
            {error && <p className="error-message">{error}</p>}
            <div className="form-row">
              <div className="form-group"><label htmlFor="name">Nome</label><input type="text" id="name" name="name" required onChange={handleChange} /></div>
              <div className="form-group"><label htmlFor="age">Idade (anos)</label><input type="number" id="age" name="age" required onChange={handleChange} /></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="speciespet">Espécie</label>
                <select id="speciespet" name="speciespet" required onChange={handleChange} value={formData.speciespet}>
                  <option value="">Selecione a espécie</option>
                  {speciesOptions.map(specie => (<option key={specie} value={specie}>{specie.charAt(0) + specie.slice(1).toLowerCase()}</option>))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="personalizedBreed">Raça</label>
                <input type="text" id="personalizedBreed" name="personalizedBreed" required onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="porte">Porte</label>
                <select id="porte" name="porte" required onChange={handleChange} value={formData.porte}>
                    <option value="">Selecione o porte</option>
                    {porteOptions.map(p => (<option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gênero</label>
                <select id="gender" name="gender" required onChange={handleChange} value={formData.gender}>
                    <option value="">Selecione o gênero</option>
                    {genderOptions.map(g => (<option key={g} value={g}>{g}</option>))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar Pet'}</button>
              <Link to="/pets" className="cancel-button">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPet;