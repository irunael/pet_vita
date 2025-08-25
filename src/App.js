import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'; // 1. Importar o Provedor

function App() {
  return (
    // 2. Envolver o AppRoutes com o AuthProvider
    <AuthProvider>
      <div className="App">
        <AppRoutes />
        <ToastContainer autoClose={3000} position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;