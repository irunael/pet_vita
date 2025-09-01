import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import './css/styles.css';

const ScheduleAppointment = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [formData, setFormData] = useState({
        petId: '',
        veterinarioId: '',
        specialityEnum: '',
        consultationdate: '',
        consultationtime: '',
        reason: '',
        observations: ''
    });

    useEffect(() => {
        // Busca os pets do usuário logado
        const fetchPets = async () => {
            if (user?.id) {
                const response = await api.get(`/admin/users/${user.id}/details`);
                setPets(response.data.pets || []);
            }
        };
        // Busca todos os veterinários disponíveis
        const fetchVets = async () => {
            const response = await api.get('/admin/veterinarians');
            setVeterinarios(response.data);
        };
        fetchPets();
        fetchVets();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                ...formData,
                usuarioId: user.id,
                status: 'PENDENTE' // Status inicial sempre pendente
            };
            await api.post('/consultas', requestData);
            alert('Consulta agendada com sucesso! Aguardando confirmação do veterinário.');
            navigate('/consultas');
        } catch (error) {
            alert('Erro ao agendar consulta. Verifique os dados.');
            console.error(error);
        }
    };

    return (
        <div className="schedule-page">
            <Header />
            <div className="welcome-section">
                <h1 className="welcome-title">Agende uma consulta para seu pet</h1>
            </div>
            <div className="schedule-wrapper">
                <div className="schedule-container">
                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="petId">Selecione seu Pet</label>
                                <select id="petId" name="petId" value={formData.petId} onChange={handleChange} required>
                                    <option value="">Selecione</option>
                                    {pets.map(pet => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="veterinarioId">Veterinário</label>
                                <select id="veterinarioId" name="veterinarioId" value={formData.veterinarioId} onChange={handleChange} required>
                                    <option value="">Selecione</option>
                                    {veterinarios.map(vet => <option key={vet.id} value={vet.id}>{vet.name} - {vet.specialityenum}</option>)}
                                </select>
                            </div>
                            {/* ... outros campos do formulário (data, hora, motivo) ... */}
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-button">Agendar Consulta</button>
                            <Link to="/consultas" className="cancel-button">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ScheduleAppointment;