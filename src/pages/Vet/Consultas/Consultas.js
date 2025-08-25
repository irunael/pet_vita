import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import VetConsultasNav from '../components/VetConsultasNav';
import '../css/styles.css';

// DADOS MOCKADOS COMPLETOS
const mockData = {
  pedidos: [
    { id: 101, petName: 'Rex', ownerName: 'Carlos Souza', service: 'Consulta de Rotina', requestedDate: '28/08/2025 às 10:00', petAvatar: 'https://i.pravatar.cc/150?img=12', especie: 'Cachorro', raca: 'Golden Retriever', idade: '5 anos', genero: 'Macho' },
    { id: 102, petName: 'Bolinha', ownerName: 'Julia Mendes', service: 'Exame de Sangue', requestedDate: '28/08/2025 às 15:30', petAvatar: 'https://i.pravatar.cc/150?img=5', especie: 'Gato', raca: 'Siamês', idade: '2 anos', genero: 'Fêmea' },
  ],
  agendadas: [
    { id: 201, petName: 'Luna', ownerName: 'Ana Silva', service: 'Aplicação de Vacina', scheduledDate: 'Hoje às 11:30', petAvatar: 'https://i.pravatar.cc/150?img=1', especie: 'Cachorro', raca: 'Poodle', idade: '1 ano', genero: 'Fêmea' },
    { id: 202, petName: 'Thor', ownerName: 'Mariana Lima', service: 'Pós-operatório', scheduledDate: 'Amanhã às 14:00', petAvatar: 'https://i.pravatar.cc/150?img=3', especie: 'Cachorro', raca: 'Bulldog', idade: '3 anos', genero: 'Macho' },
  ],
  historico: [
    { id: 301, petName: 'Max', ownerName: 'Pedro Costa', service: 'Check-up Anual', completedDate: '15/07/2025', petAvatar: 'https://i.pravatar.cc/150?img=7', especie: 'Gato', raca: 'Persa', idade: '7 anos', genero: 'Macho' }
  ],
  calendario: {
    consultas: [
        { dia: 1, pet: 'Rex', service: 'Consulta de Rotina' },
        { dia: 8, pet: 'Luna', service: 'Aplicação de Vacina' },
        { dia: 17, pet: 'Thor', service: 'Pós-operatório' },
        { dia: 25, pet: 'Bolinha', service: 'Exame de Sangue' },
    ],
    pacientes: [ 'Rex', 'Luna', 'Thor', 'Bolinha', 'Miau' ],
    servicos: [ 'Consulta de Rotina', 'Aplicação de Vacina', 'Pós-operatório', 'Exame de Sangue' ]
  }
};

const Consultas = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'pedidos';
  const [activeTab, setActiveTab] = React.useState(initialTab);
  
  const [dataAtual] = React.useState(new Date());
  const [pacienteFiltro, setPacienteFiltro] = React.useState('');
  const [servicoFiltro, setServicoFiltro] = React.useState('');
  
  const navigate = useNavigate();

  React.useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'pedidos');
  }, [searchParams]);

  const handleCardClick = (consulta) => {
    navigate(`/vet/consultas/${consulta.id}`, { state: { consulta } });
  };

  const handleAccept = (e, id) => {
    e.stopPropagation();
    alert(`Consulta ${id} ACEITA!`);
  };

  const handleDecline = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja recusar esta consulta?')) {
      alert(`Consulta ${id} RECUSADA!`);
    }
  };
  
  const handleCancel = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja CANCELAR esta consulta agendada?')) {
      alert(`Consulta ${id} cancelada.`);
    }
  };

  const renderContent = () => {
    if (['pedidos', 'agendadas', 'historico'].includes(activeTab)) {
        const dataToRender = mockData[activeTab] || [];
        const cardType = activeTab;

        if (dataToRender.length === 0) {
            return <div className="no-consultas-info">Nenhuma consulta encontrada nesta aba.</div>;
        }

        return (
            <div className="consultas-grid">
                {dataToRender.map(item => (
                <div key={item.id} className="request-card clickable" onClick={() => handleCardClick(item)}>
                    <div className="request-card-header">
                        <img src={item.petAvatar} alt={item.petName} className="pet-avatar-small" />
                        <div>
                            <strong className="pet-name">{item.petName}</strong>
                            <span className="owner-name">Tutor(a): {item.ownerName}</span>
                        </div>
                    </div>
                    <div className="request-card-body">
                        <p><strong>Serviço:</strong> {item.service}</p>
                        {cardType === 'pedidos' && <p><strong>Horário Solicitado:</strong> {item.requestedDate}</p>}
                        {cardType === 'agendadas' && <p><strong>Horário Agendado:</strong> {item.scheduledDate}</p>}
                        {cardType === 'historico' && <p><strong>Data de Conclusão:</strong> {item.completedDate}</p>}
                    </div>
                    <div className="request-card-actions">
                        {cardType === 'pedidos' && ( <>
                            <button className="decline-button" onClick={(e) => handleDecline(e, item.id)}>Recusar</button>
                            <button className="accept-button" onClick={(e) => handleAccept(e, item.id)}>Aceitar</button>
                        </> )}
                        {cardType === 'agendadas' && ( <>
                            <button className="decline-button" onClick={(e) => handleCancel(e, item.id)}>Cancelar</button>
                            <span className="details-button-vet">Ver Detalhes</span>
                        </>)}
                        {cardType === 'historico' && (
                            <div className="request-card-actions single"><span className="details-button-vet report">Ver Relatório</span></div>
                        )}
                    </div>
                </div>
                ))}
            </div>
        );
    }
    
    if (activeTab === 'calendario') {
      const renderizarDias = () => {
          const dias = [];
          const ano = dataAtual.getFullYear();
          const mes = dataAtual.getMonth();
          const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
          const diasNoMes = new Date(ano, mes + 1, 0).getDate();
          const offsetPrimeiroDia = (primeiroDiaDoMes === 0) ? 6 : primeiroDiaDoMes - 1;

          for (let i = 0; i < offsetPrimeiroDia; i++) {
              dias.push(<div key={`vazio-${i}`} className="dia-celula vazio"></div>);
          }
          
          let consultasFiltradas = mockData.calendario.consultas;
          if (pacienteFiltro) { consultasFiltradas = consultasFiltradas.filter(c => c.pet === pacienteFiltro); }
          if (servicoFiltro) { consultasFiltradas = consultasFiltradas.filter(c => c.service === servicoFiltro); }

          for (let dia = 1; dia <= diasNoMes; dia++) {
              const consultasDoDia = consultasFiltradas.filter(c => c.dia === dia);
              dias.push(
                  <div key={dia} className="dia-celula">
                  <span className="numero-dia">{dia}</span>
                  {consultasDoDia.length > 0 && (
                      <div className="marcadores-container">
                      {consultasDoDia.map((consulta, index) => (
                          <div key={index} className="marcador-consulta" title={`${consulta.pet} - ${consulta.service}`}></div>
                      ))}
                      </div>
                  )}
                  </div>
              );
          }
          return dias;
      };

      return (
        <div className="calendario-container">
            <div className="vet-page-header" style={{border: 'none', marginBottom: '20px', textAlign: 'center'}}>
                <h1>Calendário de Agendamentos</h1>
            </div>
            <div className="filtros-container" style={{justifyContent: 'center'}}>
                <div className="filtro-item">
                    <select value={pacienteFiltro} onChange={(e) => setPacienteFiltro(e.target.value)}>
                        <option value="">* Todos os Pacientes</option>
                        {mockData.calendario.pacientes.map(pet => <option key={pet} value={pet}>{pet}</option>)}
                    </select>
                </div>
                <div className="filtro-item">
                    <select value={servicoFiltro} onChange={(e) => setServicoFiltro(e.target.value)}>
                        <option value="">* Todos os Serviços</option>
                        {mockData.calendario.servicos.map(serv => <option key={serv} value={serv}>{serv}</option>)}
                    </select>
                </div>
            </div>
            <div className="calendario-grid">
                <div className="dia-semana">Seg</div>
                <div className="dia-semana">Ter</div>
                <div className="dia-semana">Qua</div>
                <div className="dia-semana">Qui</div>
                <div className="dia-semana">Sex</div>
                <div className="dia-semana">Sáb</div>
                <div className="dia-semana">Dom</div>
                {renderizarDias()}
            </div>
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
          <VetConsultasNav activeTab={activeTab} />
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultas;
