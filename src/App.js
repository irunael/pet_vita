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
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* O HeaderController foi removido daqui */}
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;