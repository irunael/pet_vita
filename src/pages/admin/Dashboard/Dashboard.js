import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';

// Imagens para os cards
import mainImage from '../../../assets/images/Vet/image 56.png';
import cardImage1 from '../../../assets/images/Vet/Group 105.png';
import cardImage2 from '../../../assets/images/Vet/Group 106.png';

import './Dashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-page">
            {/* O Header é renderizado globalmente pelo App.js, então não é mais necessário aqui */}
            <main className="dashboard-content">
                <section className="welcome-section">
                    <div className="welcome-text">
                        <h1>Seja bem vindo, Administrador!</h1>
                        <p>Gerencie a plataforma e todos os usuários a partir deste painel.</p>
                    </div>
                </section>

                <section className="cards-container">
                    <Link to="/admin/veterinarios" className="main-card">
                        <img src={mainImage} alt="Gerenciar Veterinários" className="card-image" />
                        <div className="card-footer">
                            <span>GERENCIAR VETERINÁRIOS</span>
                        </div>
                    </Link>

                    <div className="bottom-cards">
                        <Link to="/admin/pacientes" className="small-card">
                            <img src={cardImage1} alt="Gerenciar Pacientes" className="card-image"/>
                            <div className="card-footer">
                                <span>GERENCIAR PACIENTES</span>
                            </div>
                        </Link>
                        <Link to="/admin/relatorios" className="small-card">
                            <img src={cardImage2} alt="Visualizar Relatórios" className="card-image"/>
                            <div className="card-footer">
                                <span>VISUALIZAR RELATÓRIOS</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;