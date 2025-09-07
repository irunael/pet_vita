import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          // A mesma lógica de limpeza da role é aplicada aqui
          const userRole = decodedToken.role.replace('ROLE_', '');
          setUser({ email: decodedToken.sub, role: userRole, id: decodedToken.userId });
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      const decodedToken = jwtDecode(token);

      // Log para nos ajudar a ver o que o back-end está enviando
      console.log("TOKEN DECODIFICADO:", decodedToken);

      // ===== CORREÇÃO IMPORTANTE =====
      // Remove o prefixo "ROLE_" que o Spring Security adiciona (ex: "ROLE_ADMIN" vira "ADMIN")
      const userRole = decodedToken.role.replace('ROLE_', '');
      
      const userData = {
        email: decodedToken.sub,
        role: userRole, // Usamos a role já corrigida
        id: decodedToken.userId
      };

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
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};