import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import pet1 from '../../../assets/images/Home/Pet1.png'; 
import pet2 from '../../../assets/images/Home/Pet2.png'; 
import celular from '../../../assets/images/Home/Celular.png'; 
import gato_maltratado from '../../../assets/images/Home/Gato_mal_tratado.jpg'; 
import pontos from '../../../assets/images/Home/Pontos.png'; 
import Footer from '../../../components/Footer';
import './css/styles.css';

import HeaderSemCadastro from '../../../components/Header_sem_cadastro';
import HeaderComCadastro from '../../../components/Header_com_cadastro'; 


const Home = () => {
  const navigate = useNavigate();
  const carrosselRef = useRef(null);
  const { user } = useAuth(); // Verifica se há um usuário logado

  const videos = [
    "takn-e-Ug7E",
    "4QxjNX-8k7c",
    "n0wT5cjC4A8"
  ];

  useEffect(() => {
    const carrossel = carrosselRef.current;
    if (!carrossel) return;

    const btnAnterior = document.querySelector('.anterior');
    const btnProximo = document.querySelector('.proximo');
    if (!btnAnterior || !btnProximo) return;

    let indiceAtual = 0;

    const atualizarCarrossel = () => {
      const offset = -indiceAtual * 100;
      carrossel.style.transform = `translateX(${offset}%)`;
    };

    const handleProximo = () => {
      indiceAtual = indiceAtual < carrossel.children.length - 1 ? indiceAtual + 1 : 0;
      atualizarCarrossel();
    };

    const handleAnterior = () => {
      indiceAtual = indiceAtual > 0 ? indiceAtual - 1 : carrossel.children.length - 1;
      atualizarCarrossel();
    };

    btnProximo.addEventListener('click', handleProximo);
    btnAnterior.addEventListener('click', handleAnterior);

    return () => {
      btnProximo.removeEventListener('click', handleProximo);
      btnAnterior.removeEventListener('click', handleAnterior);
    };
  }, []);

  const handleSobreNosClick = () => {
    navigate('/sobre-nos');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {/* Renderização Condicional do Header */}
      { user ? <HeaderComCadastro /> : <HeaderSemCadastro /> }
      
      <div id="divulgacao">
        <div id="cara">
          <h1 id="titulo">Pet Vita <br /> é cuidado</h1>
          <div id="btn_consulta">
            <button id="consulta" onClick={() => navigate('/agendar-consulta')}>
              Marque uma consulta
            </button>
          </div>
        </div>
        
        <div id="info_quadro">
          <div id="info_quadro_texto">
            <div className="info_content_container">
              <h3>Confie-nos o melhor cuidado para o seu animal de estimação</h3>
              <p>Nossa equipe se dedica a garantir a felicidade e a saúde do seu amigo peludo</p>
            </div>
          </div>
          <div id="info_quadro_imagens">
            <img src={pet1} alt="Cachorro 1" className="imagem-cachorro" />
            <img src={pet2} alt="Cachorro 2" className="imagem-cachorro" />
          </div>
          <div id="info_quadro_numeros">
            <div className="numero-item">
              <span className="numero">120+</span>
              <span className="label">Clientes</span>
            </div>
            <div className="numero-item">
              <span className="numero">130+</span>
              <span className="label">Animais em nosso cuidado</span>
            </div>
            <div className="numero-item">
              <span className="numero">145+</span>
              <span className="label">Parceiros</span>
            </div>
          </div>
        </div>
        
        <div id="infos">
          <div id="info_cell">
            <div id="cell">
              <img src={celular} alt="Imagem do aplicativo" />
            </div>
            <div id="info_cell_texto">
              <div className="info_content_container">
                <h4>Aplicativo</h4>
                <br></br>
                <p>Temos também aplicativo mobile para cuidar do seu pet</p>
              </div>
              <button onClick={() => {
                navigate('/app');
                window.scrollTo(0, 0);
              }}>
                Conheça nosso aplicativo de perto
              </button>
            </div>
          </div>
          <div id="info_nos">
            <div id="info_pontinhos">
              <img src={pontos} alt="Imagem sobre nós" />
            </div>
            <div id="info_pontinhos_texto">
              <div className="info_content_container">
                <h4>Sobre nós</h4>
                <br></br>
                <p>Conheça um pouco mais sobre nossa empresa</p>
              </div>
              <button onClick={handleSobreNosClick}>
                Clique aqui
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="quadro_imagens">
        <div id="texto_quadro_imagens">
          <div className="info_content_container">
            <h4>Cuidado</h4>
            <p>Na Pet Vita, acreditamos que os pets são mais do que animais de estimação — são membros da família. Por isso, oferecemos cuidados especializados para garantir que seu amigo peludo tenha uma vida feliz, saudável e cheia de carinho. Com uma equipe de profissionais apaixonados por animais, serviços personalizados e tecnologia de ponta, estamos aqui para cuidar do seu pet em todas as fases da vida. Desde consultas veterinárias até dicas de bem-estar, na Pet Vita, seu pet encontra tudo o que precisa para brilhar. Porque cuidar do seu pet é cuidar da sua alegria.</p>
          </div>
        </div>
        <div id="videos">
          <div className="carrossel-container">
            <div className="carrossel" ref={carrosselRef}>
              {videos.map((videoId, index) => (
                <div className="carrossel-item" key={videoId}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Vídeo ${index + 1}`}
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
            <button className="carrossel-btn anterior">&lt;</button>
            <button className="carrossel-btn proximo">&gt;</button>
          </div>
        </div>
      </div>

      <div id="card_sentimento">
        <div id="card_sentimento_imagem">
          <img src={gato_maltratado} alt="Gato sendo cuidado" />
        </div>
        <div id="card_sentimento_texto">
          <div className="info_content_container">
            <h4>Cada animal merece uma segunda chance.</h4>
            <p>A imagem ao lado mostra um gatinho machucado, com um olhar que expressa dor, mas também esperança. É um lembrete poderoso de que nossos amigos de quatro patas dependem de nós para receberem os cuidados que precisam. Eles não podem falar, mas seus olhos e gestos nos mostram quando algo não está bem. Cuidar de um animal é um ato de amor e responsabilidade. Seja para tratar uma ferida, aliviar uma dor ou simplesmente garantir que eles estejam saudáveis, cada gesto faz a diferença na vida deles. Eles nos dão amor incondicional, e nós devemos retribuir com atenção, carinho e dedicação. <span> Porque um animal saudável é um animal feliz, e um animal feliz enche nossa vida de alegria.</span></p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;