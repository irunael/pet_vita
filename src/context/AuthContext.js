// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = async () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get(`/users/me?_t=${new Date().getTime()}`);
          setUser(response.data);
        } else {
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Erro ao carregar usuário a partir do token:", error);
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const login = async (emailOrCrmv, password, loginType = 'USER', rememberMe = false) => {
    try {
      let response;
      
      if (loginType === 'VETERINARY') {
        // Login de veterinário usando CRMV
        response = await api.post('/auth/vet-login', { crmv: emailOrCrmv, password });
      } else {
        // Login normal usando email
        response = await api.post('/auth/login', { email: emailOrCrmv, password });
      }
      
      const token = response.data.token;

      // Decide onde armazenar o token e limpa o outro storage
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        sessionStorage.removeItem('authToken');
      } else {
        sessionStorage.setItem('authToken', token);
        localStorage.removeItem('authToken');
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userProfileResponse = await api.get(`/users/me?_t=${new Date().getTime()}`);
      const userData = userProfileResponse.data;

      setUser(userData);

      return userData;

    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/'; 
  };

  /**
   * NOVO: Atualiza o estado do usuário e o token (se um novo for fornecido).
   * Isso é usado nas telas de perfil para evitar logout ao mudar e-mail/nome.
   */
  const updateTokenAndUser = (authResponse) => {
    // authResponse é o UserAuthResponseDTO vindo do backend
    
    // 1. Atualiza o estado do usuário no React
    if (authResponse.user) {
        setUser(authResponse.user);
    }

    // 2. Se um novo token foi enviado (porque o e-mail mudou)
    if (authResponse.token) {
        const newToken = authResponse.token;
        
        // Atualiza o token no Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        // Atualiza o token no storage correto (localStorage OU sessionStorage)
        if (localStorage.getItem('authToken')) {
            localStorage.setItem('authToken', newToken);
        } else {
            sessionStorage.setItem('authToken', newToken);
        }
        console.log("Token de autenticação atualizado.");
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, loading, loadUserFromToken, updateTokenAndUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
