import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import VetConsultasNav from '../components/VetConsultasNav';
import api from '../../../services/api';
import '../css/styles.css';

const Consultas = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'pedidos';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [allConsultas, setAllConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Este endpoint busca todas as consultas associadas ao token do vet logado
      const response = await api.get('/consultas/my-consultations');
      setAllConsultas(response.data);
    } catch (err) {
      setError('Falha ao buscar consultas. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'pedidos');
  }, [searchParams]);

  // Funções de Ação que chamam a API
  const handleAccept = async (e, id) => {
    e.stopPropagation();
    try {
      await api.post(`/consultas/${id}/accept`);
      alert('Consulta aceita com sucesso!');
      fetchConsultas(); // Atualiza a lista
    } catch (err) {
      alert('Erro ao aceitar consulta.');
    }
  };

  const handleDecline = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja recusar esta consulta?')) {
      try {
        await api.post(`/consultas/${id}/reject`);
        alert('Consulta recusada com sucesso!');
        fetchConsultas();
      } catch (err) {
        alert('Erro ao recusar consulta.');
      }
    }
  };

  const handleCancel = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja CANCELAR esta consulta agendada?')) {
      try {
        await api.post(`/consultas/${id}/cancel`);
        alert('Consulta cancelada com sucesso!');
        fetchConsultas();
      } catch (err) {
        alert('Erro ao cancelar consulta.');
      }
    }
  };
  
  const handleCardClick = (consulta) => {
    navigate(`/vet/consultas/${consulta.id}`, { state: { consulta } });
  };
  
  const renderContent = () => {
    if (loading) return <p>Carregando consultas...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const dataMap = {
      pedidos: allConsultas.filter(c => c.status === 'PENDENTE'),
      agendadas: allConsultas.filter(c => c.status === 'AGENDADA'),
      historico: allConsultas.filter(c => ['FINALIZADA', 'CANCELADA', 'RECUSADA'].includes(c.status)),
    };
    
    const dataToRender = dataMap[activeTab] || [];

    if (dataToRender.length === 0) {
      return <div className="no-consultas-info">Nenhuma consulta encontrada nesta aba.</div>;
    }

    return (
      <div className="consultas-grid">
        {dataToRender.map(item => (
          <div key={item.id} className="request-card clickable" onClick={() => handleCardClick(item)}>
            <div className="request-card-header">
              {/* O ideal é ter a imagem do pet aqui, vinda da API */}
              <div className="card-avatar-placeholder">{item.petName?.charAt(0) || '?'}</div>
              <div>
                <strong className="pet-name">{item.petName}</strong>
                {/* O ideal é ter o nome do tutor aqui */}
                <span className="owner-name">Tutor(a): (Nome do Tutor)</span> 
              </div>
            </div>
            <div className="request-card-body">
              <p><strong>Serviço:</strong> {item.speciality}</p>
              <p><strong>Data:</strong> {new Date(item.consultationdate + 'T' + item.consultationtime).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</p>
            </div>
            <div className="request-card-actions">
              {activeTab === 'pedidos' && (
                <>
                  <button className="decline-button" onClick={(e) => handleDecline(e, item.id)}>Recusar</button>
                  <button className="accept-button" onClick={(e) => handleAccept(e, item.id)}>Aceitar</button>
                </>
              )}
              {activeTab === 'agendadas' && (
                <>
                  <button className="decline-button" onClick={(e) => handleCancel(e, item.id)}>Cancelar</button>
                  <span className="details-button-vet">Ver Detalhes</span>
                </>
              )}
              {activeTab === 'historico' && (
                <div className="request-card-actions single">
                  <span className="details-button-vet report">Ver Relatório</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="pet-profile-page">
      <HeaderVet />
      <main className="vet-content-full">
        <div className="pet-profile-container">
          <VetConsultasNav activeTab={activeTab} />
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultas;