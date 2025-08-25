import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import './css/styles.css';

const mockData = {
  pedidos: [
    { id: 101, petName: 'Rex', ownerName: 'Carlos Souza', service: 'Consulta de Rotina', requestedDate: '25/08/2025 às 10:00', petAvatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 102, petName: 'Bolinha', ownerName: 'Julia Mendes', service: 'Exame de Sangue', requestedDate: '25/08/2025 às 15:30', petAvatar: 'https://i.pravatar.cc/150?img=5' },
  ],
  agendadas: [
    { id: 201, petName: 'Luna', ownerName: 'Ana Silva', service: 'Aplicação de Vacina', scheduledDate: 'Hoje às 11:30', petAvatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 202, petName: 'Thor', ownerName: 'Mariana Lima', service: 'Pós-operatório', scheduledDate: 'Amanhã às 14:00', petAvatar: 'https://i.pravatar.cc/150?img=3' },
  ],
  historico: [
    { id: 301, petName: 'Max', ownerName: 'Pedro Costa', service: 'Check-up Anual', completedDate: '15/07/2025', petAvatar: 'https://i.pravatar.cc/150?img=7' }
  ]
};

const Consultas = () => {
  const [activeTab, setActiveTab] = useState('pedidos');

  const handleAccept = (id) => alert(`Consulta ${id} ACEITA!`);
  const handleDecline = (id) => {
    if (window.confirm('Tem certeza que deseja recusar esta consulta?')) {
      alert(`Consulta ${id} RECUSADA!`);
    }
  };

  const renderContent = () => {
    if (activeTab === 'pedidos') {
      return (
        <div className="consultas-grid">
          {mockData.pedidos.map(req => (
            <div key={req.id} className="request-card">
              <div className="request-card-header">
                <img src={req.petAvatar} alt={req.petName} className="pet-avatar-small" />
                <div>
                  <strong className="pet-name">{req.petName}</strong>
                  <span className="owner-name">Tutor(a): {req.ownerName}</span>
                </div>
              </div>
              <div className="request-card-body">
                <p><strong>Serviço:</strong> {req.service}</p>
                <p><strong>Horário Solicitado:</strong> {req.requestedDate}</p>
              </div>
              <div className="request-card-actions">
                <button className="decline-button" onClick={() => handleDecline(req.id)}>Recusar</button>
                <button className="accept-button" onClick={() => handleAccept(req.id)}>Aceitar</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'agendadas') {
      return (
        <div className="consultas-grid">
          {mockData.agendadas.map(ag => (
            <div key={ag.id} className="request-card">
              <div className="request-card-header">
                <img src={ag.petAvatar} alt={ag.petName} className="pet-avatar-small" />
                <div>
                  <strong className="pet-name">{ag.petName}</strong>
                  <span className="owner-name">Tutor(a): {ag.ownerName}</span>
                </div>
              </div>
              <div className="request-card-body">
                <p><strong>Serviço:</strong> {ag.service}</p>
                <p><strong>Horário Agendado:</strong> {ag.scheduledDate}</p>
              </div>
              <div className="request-card-actions single">
                <Link to={`/vet/consultas/${ag.id}`} state={{ consulta: ag }} className="details-button-vet">Ver Detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'historico') {
      return (
        <div className="consultas-grid">
          {mockData.historico.map(hist => (
            <div key={hist.id} className="request-card">
              <div className="request-card-header">
                <img src={hist.petAvatar} alt={hist.petName} className="pet-avatar-small" />
                <div>
                  <strong className="pet-name">{hist.petName}</strong>
                  <span className="owner-name">Tutor(a): {hist.ownerName}</span>
                </div>
              </div>
              <div className="request-card-body">
                <p><strong>Serviço:</strong> {hist.service}</p>
                <p><strong>Data de Conclusão:</strong> {hist.completedDate}</p>
              </div>
              <div className="request-card-actions single">
                <Link to={`/vet/consultas/${hist.id}`} state={{ consulta: hist }} className="details-button-vet report">
                  Ver Relatório
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pet-profile-page">
      <HeaderVet />
      <main className="vet-content-full">
        <div className="pet-profile-container">
          <div className="status-section">
            <div className="status-buttons">
              <button className={`status-button ${activeTab === 'pedidos' ? 'active' : ''}`} onClick={() => setActiveTab('pedidos')}>
                Novos Pedidos
              </button>
              <button className={`status-button ${activeTab === 'agendadas' ? 'active' : ''}`} onClick={() => setActiveTab('agendadas')}>
                Agendadas
              </button>
              <button className={`status-button ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setActiveTab('historico')}>
                Histórico
              </button>
              <Link to="/vet/calendario" className="status-button">Calendário</Link>
            </div>
          </div>
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultas;