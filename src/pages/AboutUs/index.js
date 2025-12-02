// src/pages/AboutUs/index.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import HeaderSemCadastro from '../../components/HeaderSemCadastro';
import HeaderComCadastro from '../../components/HeaderComCadastro';
import Footer from '../../components/Footer';
import LogoEquipe from '../../assets/images/AboutUs/Logo_equipe.png';
import LogoDevRuan from '../../assets/images/AboutUs/Dev_Ruan.jpeg';
import LogoDevPedro from '../../assets/images/AboutUs/Dev_Pedro.jpeg';
import LogoDevIasmin from '../../assets/images/AboutUs/Dev_Iasmin.jpeg';
import LogoDevEmanuel from '../../assets/images/AboutUs/Dev_Emanuel.jpeg';
import LogoDevBernardo from '../../assets/images/AboutUs/Dev_Bernardo.jpeg';
import LogoDevFelipe from '../../assets/images/AboutUs/Dev_Felipe.jpeg';
import './css/styles.css';

// O nome do componente foi atualizado para bater com o seu router
const AboutUs = () => { 
  const { user } = useAuth();
  
  // Nomes dos membros da equipe com suas respectivas imagens
  const teamMembers = [
    { name: "João Emanuel", image: LogoDevEmanuel },
    { name: "Felipe Araujo", image: LogoDevFelipe },
    { name: "Iasmin Aicha", image: LogoDevIasmin },
    { name: "Pedro Henrique", image: LogoDevPedro },
    { name: "Bernardo de Oliveira", image: LogoDevBernardo },
    { name: "Rhuan Rodrigues", image: LogoDevRuan }
  ];

  return (
    <div className="app-page">
      {/* Renderização Condicional do Header */}
      {user ? <HeaderComCadastro /> : <HeaderSemCadastro />}
      
      <div className="section">
        <h1 className="main-title">Sobre nós</h1>
        
        {/* Primeira seção do app - texto à esquerda, imagem à direita */}
        <div className="app-preview first-section">
          <div className="text-box left-text">
            <h3>Somos um grupo formado por alunos do SENAI, unidos pelo propósito de desenvolver soluções tecnológicas que facilitem 
                 o cuidado com os pets. Com dedicação e trabalho em equipe, criamos o Pet Vita para melhorar a comunicação e agilizar 
                o atendimento entre tutores e clínicas veterinárias.</h3>
          </div>
          <div className="image-container">
             <h3 className="image-title">2 bits</h3>
            <img src={LogoEquipe} alt="App Preview 1" className="app-image" />
          </div>
        </div>
        
        {/* Título "Nossa equipe" entre as seções */}
        <h1 className="main-title">Nossa equipe</h1>
        
        {/* Segunda seção do app - texto acima, imagens abaixo */}
        <div className="app-preview second-section">
          <div className="text-box centered-text">
            <h3>Oferecemos agendamento de consultas, acompanhamento dos cuidados do seu pet, histórico médico digital e comunicação 
                 direta com os profissionais da clínica — tudo para facilitar o cuidado e garantir a saúde do seu melhor amigo.</h3>
          </div>
          
          <div className="team-grid-container">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                  <div className="team-member">
                    <img src={member.image} alt={`Membro da equipe ${index + 1}`} />
                  </div>
                  {/* O nome agora vem do array atualizado */}
                  <p className="member-name">{member.name}</p>
                </div>
              ))}
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs; // Exportando com o nome correto