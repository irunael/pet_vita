import React from 'react';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import { FaChartBar, FaUserPlus, FaFileMedicalAlt } from 'react-icons/fa';
import '../css/styles.css';

const VetRelatorios = () => {

  const handleGenerateReport = () => {
    alert('Gerando relatório completo... Em um sistema real, isso iniciaria o download de um arquivo PDF.');
  };

  return (
    <div className="vet-page">
      <HeaderVet />
      <main className="vet-content">
        <div className="vet-page-header">
          <h1>Relatórios</h1>
          <p>Acompanhe sua performance e o crescimento da sua base de pacientes.</p>
        </div>

        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon consultations">
              <FaFileMedicalAlt />
            </div>
            <div className="stat-info">
              <span className="stat-number">42</span>
              <span className="stat-label">Consultas no Mês</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new-patients">
              <FaUserPlus />
            </div>
            <div className="stat-info">
              <span className="stat-number">9</span>
              <span className="stat-label">Novos Pacientes</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon performance">
              <FaChartBar />
            </div>
            <div className="stat-info">
              <span className="stat-number">85%</span>
              <span className="stat-label">Taxa de Conclusão</span>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h3>Consultas por Período</h3>
          <p>Em uma implementação real, aqui seria exibido um gráfico interativo com o número de consultas ao longo do tempo. Para isso, seria necessário instalar uma biblioteca como <strong>Chart.js</strong> e <strong>react-chartjs-2</strong>.</p>
          <div className="mock-chart">
            <div className="bar" style={{ height: '60%' }}><span className="bar-label">Semana 1</span></div>
            <div className="bar" style={{ height: '80%' }}><span className="bar-label">Semana 2</span></div>
            <div className="bar" style={{ height: '50%' }}><span className="bar-label">Semana 3</span></div>
            <div className="bar" style={{ height: '90%' }}><span className="bar-label">Semana 4</span></div>
          </div>
        </div>

        {/* ===== BOTÃO MOVIDO PARA CÁ (ABAIXO DO CARD DE GRÁFICO) ===== */}
        <div className="report-actions">
          <button className="generate-report-button" onClick={handleGenerateReport}>
            Gerar Relatório
          </button>
        </div>
        {/* ========================================================== */}

      </main>
      <Footer />
    </div>
  );
};

export default VetRelatorios;