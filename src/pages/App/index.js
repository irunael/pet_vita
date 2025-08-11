import React from 'react';
import Header from '../../components/Header_com_cadastro';
import Footer from '../../components/Footer';
import IphoneApp1 from '../../assets/images/App/Iphone_app_1.png';
import IphoneApp2 from '../../assets/images/App/Iphone_app_2.png';
import PessoasIcon from '../../assets/images/App/Pessoas.png';
import CasaIcon from '../../assets/images/App/Casa.png';
import MaletaSaudeIcon from '../../assets/images/App/Mala_saude.png';
import './css/styles.css';

const App = () => {
  const statsData = [
    {
      icon: PessoasIcon,
      title: "+1200",
      subtitle: "Doctors",
      description: "Veterinários qualificados em todo o Brasil"
    },
    {
      icon: CasaIcon,
      title: "+1200", 
      subtitle: "Clinics",
      description: "Locais prontos para receber seu pet"
    },
    {
      icon: MaletaSaudeIcon,
      title: "+100",
      subtitle: "Specialist",
      description: "Especialistas em diversas áreas de saúde animal"
    }
  ];

  const previewsData = [
    {
      image: IphoneApp1,
      text: "Bem-vindo a apresentação do nosso app!",
      reverse: false
    },
    {
      image: IphoneApp2,
      text: "Cuidado e carinho para seu pet, onde estiver.",
      reverse: true
    }
  ];

  return (
    <div className="app-page">
      <Header />
      
      <div className="section">
        <h1 className="app-title">Aplicativo</h1>
        
        {previewsData.map((preview, index) => (
          <div 
            key={index} 
            className={`app-preview ${preview.reverse ? 'second-screen' : ''}`}
          >
            <img 
              src={preview.image} 
              alt={`App Preview ${index + 1}`} 
              className="app-phone" 
            />
            <div className="text-box">
              <h3>{preview.text}</h3>
            </div>
          </div>
        ))}

        <div className="arrow bounce">↓</div>

        <button className="cta-button animated-fade-in">
          CLIQUE AQUI PARA BAIXAR O APP
        </button>

        <div className="stats">
          {statsData.map((stat, index) => (
            <div key={index} className="stat animated-fade-in">
              <img src={stat.icon} alt={`${stat.subtitle} icon`} className="icon" />
              <h2>{stat.title}<br />{stat.subtitle}</h2>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="dot"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;