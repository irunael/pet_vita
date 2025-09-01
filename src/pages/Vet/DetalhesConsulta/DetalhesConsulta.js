import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import '../css/styles.css';

const DetalhesConsulta = () => {
    const { consultaId } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();

    const [consulta, setConsulta] = useState(null);
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchConsultaDetails = async () => {
            if (!consultaId) return;
            setLoading(true);
            try {
                const response = await api.get(`/consultas/${consultaId}`);
                setConsulta(response.data);
                setReport(response.data.doctorReport || '');
            } catch (err) {
                setError('Não foi possível carregar os detalhes da consulta.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultaDetails();
    }, [consultaId]);

    const handleSaveReport = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/consultas/${consultaId}/report`, report, {
                headers: { 'Content-Type': 'text/plain' }
            });
            alert('Relatório salvo com sucesso!');
            navigate('/vet/consultas?tab=historico');
        } catch (err) {
            alert('Erro ao salvar o relatório.');
            console.error(err);
        }
    };
    
    if (loading) return <div style={{paddingTop: '150px', textAlign: 'center'}}>Carregando...</div>;
    if (error) return <div style={{paddingTop: '150px', textAlign: 'center'}}>{error}</div>;
    if (!consulta) return null;

    return (
        <div className="pets-details-page">
            <HeaderVet />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes da Consulta</h1>
            </div>
            <div className="pet-details-wrapper">
                <div className="pet-details-container">
                    <div className="avatar-display">
                        <div className="card-avatar-placeholder">{consulta.petName?.charAt(0)}</div>
                    </div>
                    <form onSubmit={handleSaveReport} className="details-form">
                        <div className="form-row">
                            <div className="form-group"><label>Paciente</label><div className="detail-value">{consulta.petName}</div></div>
                            <div className="form-group"><label>Tutor</label><div className="detail-value">{consulta.userName || 'N/A'}</div></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group"><label>Serviço</label><div className="detail-value">{consulta.speciality}</div></div>
                            <div className="form-group"><label>Data</label><div className="detail-value">{new Date(consulta.consultationdate + 'T' + consulta.consultationtime).toLocaleString('pt-BR')}</div></div>
                        </div>
                        <div className="form-group full-width">
                            <label>Anotações / Relatório</label>
                            <textarea className="report-textarea" placeholder="Digite as observações..." value={report} onChange={(e) => setReport(e.target.value)}></textarea>
                        </div>
                        <div className="details-actions">
                            <Link to="/vet/consultas" className="back-button">Voltar</Link>
                            <button type="submit" className="save-button">Salvar Relatório</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetalhesConsulta;