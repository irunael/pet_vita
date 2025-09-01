import React, { useState, useEffect } from 'react';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaChartBar, FaUserPlus, FaFileMedicalAlt } from 'react-icons/fa';
import '../css/styles.css';

const VetRelatorios = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await api.get('/veterinary/me/monthly-report');
                setReportData(response.data);
            } catch (error) {
                console.error("Erro ao buscar relatório", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    if (loading) {
        return <div>Carregando relatório...</div>;
    }
    
    return (
        <div className="vet-page">
            <HeaderVet />
            <main className="vet-content">
                <div className="vet-page-header">
                    <h1>Relatórios</h1>
                    <p>Sua performance neste mês ({reportData?.month}/{reportData?.year})</p>
                </div>

                <div className="stats-cards-grid">
                    <div className="stat-card">
                        <div className="stat-icon consultations"><FaFileMedicalAlt /></div>
                        <div className="stat-info">
                            <span className="stat-number">{reportData?.totalConsultations || 0}</span>
                            <span className="stat-label">Consultas no Mês</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon new-patients"><FaUserPlus /></div>
                        <div className="stat-info">
                            <span className="stat-number">{reportData?.patientsAttended?.length || 0}</span>
                            <span className="stat-label">Pacientes Atendidos</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon performance"><FaChartBar /></div>
                        <div className="stat-info">
                            <span className="stat-number">{reportData?.finalizedConsultations || 0}</span>
                            <span className="stat-label">Consultas Finalizadas</span>
                        </div>
                    </div>
                </div>
                {/* ... (resto da página de relatórios) ... */}
            </main>
            <Footer />
        </div>
    );
};

export default VetRelatorios;