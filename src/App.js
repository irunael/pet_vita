import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/index.js';
import Footer from './components/Footer';

// Importa TODOS os headers aqui
import HeaderSemCadastro from './components/Header_sem_cadastro/index.js';
import HeaderComCadastro from './components/Header_com_cadastro/index.js';
import HeaderVet from './components/HeaderVet/HeaderVet.js';
import HeaderAdmin from './components/HeaderAdmin/HeaderAdmin.js';

// Componente interno para controlar o Header
const AppContent = () => {
  const { user } = useAuth(); // Pega o usuário do contexto
  const location = useLocation();

  const renderHeader = () => {
    if (user) {
      switch (user.role) {
        case 'ADMIN':
          return <HeaderAdmin />;
        case 'VETERINARY':
          return <HeaderVet />;
        case 'USER':
          return <HeaderComCadastro />;
        default:
          return <HeaderSemCadastro />;
      }
    }
    return <HeaderSemCadastro />;
  };

  return (
    <div className="App">
      {renderHeader()}
      <AppRoutes />
      {/* O Footer pode ser global aqui, ou mantido em cada página se preferir */}
      {/* <Footer /> */}
    </div>
  );
};

// O App agora apenas provê o contexto e o router
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;