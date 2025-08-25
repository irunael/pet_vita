import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import './css/styles.css'; // Usando o CSS unificado da área do VET

const mockConsultasDoMes = [
  { dia: 1, pet: 'Rex' },
  { dia: 8, pet: 'Luna' },
  { dia: 17, pet: 'Thor' },
  { dia: 25, pet: 'Bolinha' },
];

const mockPacientes = [ 'Rex', 'Luna', 'Thor', 'Bolinha', 'Miau' ];

const Calendario = () => {
  const [dataAtual] = useState(new Date());
  const [pacienteFiltro, setPacienteFiltro] = useState('');

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const offsetPrimeiroDia = (primeiroDiaDoMes === 0) ? 6 : primeiroDiaDoMes - 1;

  const renderizarDias = () => {
    const dias = [];
    for (let i = 0; i < offsetPrimeiroDia; i++) {
      dias.push(<div key={`vazio-${i}`} className="dia-celula vazio"></div>);
    }
    
    const consultasFiltradas = pacienteFiltro
      ? mockConsultasDoMes.filter(c => c.pet === pacienteFiltro)
      : mockConsultasDoMes;

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const consultasDoDia = consultasFiltradas.filter(c => c.dia === dia);
      dias.push(
        <div key={dia} className="dia-celula">
          <span className="numero-dia">{dia}</span>
          {consultasDoDia.length > 0 && (
            <div className="marcadores-container">
              {consultasDoDia.map((consulta, index) => (
                <div key={index} className="marcador-consulta" title={consulta.pet}></div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return dias;
  };

  return (
    <div className="pet-profile-page">
      <HeaderVet />
      <main className="vet-content-full">
        <div className="pet-profile-container">
          <div className="status-section">
            <div className="status-buttons">
              <Link to="/vet/consultas" className="status-button">Novos Pedidos</Link>
              <Link to="/vet/consultas" className="status-button" onClick={() => alert('Navegando para Agendadas...')}>Agendadas</Link>
              <button className="status-button active">Calendário</button>
            </div>
          </div>

          <div className="calendario-container">
            <div className="filtros-container">
              <div className="filtro-item">
                <select value={pacienteFiltro} onChange={(e) => setPacienteFiltro(e.target.value)}>
                  <option value="">* Todos os Pacientes</option>
                  {mockPacientes.map(pet => <option key={pet} value={pet}>{pet}</option>)}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calendario;