import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import '../css/styles.css';

const DetalhesConsulta = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { consulta } = location.state || { consulta: {} };

    const handleCancel = () => {
        if(window.confirm('Tem certeza que deseja cancelar esta consulta?')){
            alert('Consulta cancelada.');
            navigate('/vet/consultas?tab=agendadas');
        }
    };

    return (
        <div className="pets-details-page">
            <HeaderVet />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes do Agendamento</h1>
            </div>
            <div className="pet-details-wrapper">
                <div className="pet-details-container">
                    <div className="avatar-display">
                        <img 
                            src={consulta.petAvatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} 
                            alt={consulta.petName} 
                            className="pet-avatar"
                        />
                    </div>
                    <div className="details-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nome do Paciente</label>
                                <div className="detail-value">{consulta.petName || 'N/A'}</div>
                            </div>
                            <div className="form-group">
                                <label>Idade</label>
                                <div className="detail-value">{consulta.idade || 'N/A'}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Espécie</label>
                                <div className="detail-value">{consulta.especie || 'N/A'}</div>
                            </div>
                            <div className="form-group">
                                <label>Raça</label>
                                <div className="detail-value">{consulta.raca || 'N/A'}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Serviço Solicitado</label>
                                <div className="detail-value">{consulta.service || 'N/A'}</div>
                            </div>
                            <div className="form-group">
                                <label>Data</label>
                                <div className="detail-value">{consulta.requestedDate || consulta.scheduledDate || consulta.completedDate ||'N/A'}</div>
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <label>Anotações / Relatório</label>
                            <textarea className="report-textarea" placeholder="Digite as observações, diagnóstico e prescrições aqui..."></textarea>
                        </div>
                        <div className="details-actions">
                            <Link to="/vet/consultas" className="back-button">Voltar</Link>
                            <button className="decline-button" onClick={handleCancel}>Cancelar Consulta</button>
                            <button className="save-button">Salvar Relatório</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetalhesConsulta;