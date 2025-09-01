import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import Footer from '../../../components/Footer';
import './css/styles.css';

const ConsulPending = () => {
    const [allConsultas, setAllConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    
    // Simula a troca de abas no front-end
    const [activeTab, setActiveTab] = useState('pendentes');

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        };
        const fetchConsultas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/consultas/my-consultations');
                setAllConsultas(response.data);
            } catch (err) {
                setError('Falha ao buscar suas consultas.');
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, [user]);

    const pendentes = allConsultas.filter(c => c.status === 'PENDENTE' || c.status === 'AGENDADA');
    const concluidas = allConsultas.filter(c => c.status === 'FINALIZADA' || c.status === 'CANCELADA' || c.status === 'RECUSADA');

    const dataToRender = activeTab === 'pendentes' ? pendentes : concluidas;

    return (
        <div className="pet-profile-page">
            <main className="main-content-consultation">
                <div className="consultation-header">
                    <h1>Minhas Consultas</h1>
                    <Link to="/agendar-consulta" className="action-button-primary">
                        Agendar Nova Consulta
                    </Link>
                </div>
                <div className="pet-profile-container">
                    <div className="status-section">
                        <div className="status-buttons">
                            <button className={`status-button ${activeTab === 'pendentes' ? 'active' : ''}`} onClick={() => setActiveTab('pendentes')}>Pendentes</button>
                            <button className={`status-button ${activeTab === 'concluidas' ? 'active' : ''}`} onClick={() => setActiveTab('concluidas')}>Concluídas</button>
                        </div>
                    </div>
                    {loading && <p>Carregando...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && dataToRender.map(c => (
                        <div key={c.id} className="pet-card">
                            <div className="pet-info">
                                <h3 className="pet-name">{c.petName}</h3>
                                <span>{c.speciality} com {c.veterinaryName}</span>
                                <span>{new Date(c.consultationdate + 'T' + c.consultationtime).toLocaleString('pt-BR')}</span>
                            </div>
                            <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConsulPending;