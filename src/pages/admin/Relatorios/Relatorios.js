import React from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import { FaChartBar, FaUserPlus, FaFileMedicalAlt } from 'react-icons/fa';
import '../Relatorios/Relatorios.css';

const AdminRelatorios = () => {
    const handleGenerateReport = () => {
        alert('Gerando relatório completo da plataforma...');
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header"><h1>Relatórios da Plataforma</h1></div>
                <div className="admin-filters">
                    <select><option value="">Todos os Médicos</option></select>
                    <select><option value="">Todas as Especialidades</option></select>
                </div>
                
                <div className="stats-cards-grid">
                    <div className="stat-card">
                        <div className="stat-icon consultations"><FaFileMedicalAlt /></div>
                        <div className="stat-info"><span className="stat-number">157</span><span className="stat-label">Consultas Totais</span></div>
                    </div>
                     <div className="stat-card">
                        <div className="stat-icon new-patients"><FaUserPlus /></div>
                        <div className="stat-info"><span className="stat-number">32</span><span className="stat-label">Novos Usuários</span></div>
                    </div>
                     <div className="stat-card">
                        <div className="stat-icon performance"><FaChartBar /></div>
                        <div className="stat-info"><span className="stat-number">92%</span><span className="stat-label">Consultas Concluídas</span></div>
                    </div>
                </div>

                <div className="report-section">
                    <h3>Atividade por Período</h3>
                    <div className="mock-chart">
                        <div className="bar" style={{ height: '60%' }}><span className="bar-label">Semana 1</span></div>
                        <div className="bar" style={{ height: '80%' }}><span className="bar-label">Semana 2</span></div>
                        <div className="bar" style={{ height: '50%' }}><span className="bar-label">Semana 3</span></div>
                        <div className="bar" style={{ height: '90%' }}><span className="bar-label">Semana 4</span></div>
                    </div>
                </div>
                
                <div className="report-actions">
                    <button className="generate-report-button" onClick={handleGenerateReport}>
                        Gerar Relatório
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminRelatorios;