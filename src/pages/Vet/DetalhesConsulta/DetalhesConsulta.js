import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import './css/styles.css';

const DetalhesConsulta = () => {
    const location = useLocation();
    const { consulta } = location.state || { consulta: {} };

    return (
        <div className="pets-details-page">
            <HeaderVet />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes da Consulta</h1>
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
                                <label>Pet</label>
                                <div className="detail-value">{consulta.petName || 'N/A'}</div>
                            </div>
                            <div className="form-group">
                                <label>Tutor</label>
                                <div className="detail-value">{consulta.ownerName || 'N/A'}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Serviço</label>
                                <div className="detail-value">{consulta.service || 'N/A'}</div>
                            </div>
                            <div className="form-group">
                                <label>Data</label>
                                <div className="detail-value">{consulta.scheduledDate || consulta.completedDate || consulta.requestedDate || 'N/A'}</div>
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <label>Adicionar Anotações / Relatório</label>
                            <textarea className="report-textarea" placeholder="Digite as observações, diagnóstico e prescrições aqui..."></textarea>
                        </div>
                        <div className="details-actions">
                            <Link to="/vet/consultas" className="back-button">Voltar</Link>
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