// src/pages/Vet/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api'; 

// Imagens para os cards
import consultasImage from '../../../assets/images/Vet/Consultas.jpeg';
import relatorioImage from '../../../assets/images/Vet/Relatorio.jpeg';

import '../css/styles.css';

const Dashboard = () => {
    const [vetName, setVetName] = useState("Veterinário(a)");
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
             try {
                const userResponse = await api.get('/users/me');
                setVetName(userResponse.data.username);

                // --- CORREÇÃO AQUI ---
                // A rota /consultas/my-consultations foi trocada para /consultas/vet/my-consultations
                const consultasResponse = await api.get('/consultas/vet/my-consultations');
                const pendingConsultas = consultasResponse.data.filter(c => c.status === 'PENDENTE');
                setPendingCount(pendingConsultas.length);

             } catch (error) {
                // O log de erro 403 que você enviou apareceu aqui
                console.error("Erro ao buscar dados do dashboard:", error);
            } finally {
                setLoading(false);
             }
        };

        fetchData();
    }, []);

    return (
        <div className="vet-dashboard-page">
            <HeaderVet />
            <main className="dashboard-content">
                <section className="welcome-section-dashboard">
                     <h1>Seja bem vindo(a) Dr(a). {vetName}!</h1>
                 </section>

                <section className="cards-container-two">
                    <Link to="/vet/consultas" className="dashboard-card">
                        <img src={consultasImage} alt="Consultas" className="card-image" />
                        <div className="card-footer">
                            <span>CONSULTAS</span>
                            {!loading && pendingCount > 0 && (
                                 <span className="notification-badge-card">{pendingCount}</span>
                            )}
                        </div>
                     </Link>

                    <Link to="/vet/relatorios" className="dashboard-card">
                        <img src={relatorioImage} alt="Relatórios" className="card-image"/>
                        <div className="card-footer">
                            <span>RELATÓRIOS</span>
                        </div>
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;