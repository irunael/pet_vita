import React from 'react';
import { Link } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet'; // Caminho corrigido
import Footer from '../../../components/Footer'; // Caminho corrigido

// Importando as imagens com o caminho corrigido
import mainImage from '../../../assets/images/Vet/image 56.png';
import cardImage1 from '../../../assets/images/Vet/Group 105.png';
import cardImage2 from '../../../assets/images/Vet/Group 106.png';

import '../css/styles.css';

const VetDashboard = () => {
    const vetName = "Joana";

    return (
        <div className="vet-dashboard-page">
            <HeaderVet />
            <main className="dashboard-content">
                <section className="welcome-section">
                    <div className="welcome-text">
                        <h1>Seja bem vindo Dr(a). {vetName}!</h1>
                        <Link to="/vet/consultas" className="visualizar-button">
                            VISUALIZAR CONSULTAS
                        </Link>
                    </div>
                    {/* Ícone da pata foi removido daqui */}
                </section>

                <section className="cards-container">
                    <Link to="/vet/agendamentos" className="main-card">
                        <img src={mainImage} alt="Novos pedidos de agendamento" className="card-image" />
                        <div className="card-footer">
                            <span>NOVOS PEDIDOS DE AGENDAMENTO</span>
                            <span className="notification-badge-card">9</span>
                        </div>
                    </Link>

                    <div className="bottom-cards">
                        <Link to="/vet/horarios" className="small-card">
                            <img src={cardImage1} alt="Horários de consultas" className="card-image"/>
                            <div className="card-footer">
                                <span>HORÁRIOS DE CONSULTAS</span>
                            </div>
                        </Link>
                        <Link to="/vet/compromissos" className="small-card">
                            <img src={cardImage2} alt="Compromissos agendados" className="card-image"/>
                            <div className="card-footer">
                                <span>COMPROMISSOS AGENDADOS</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default VetDashboard;