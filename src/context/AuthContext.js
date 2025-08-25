import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = deslogado, {type: 'client'} ou {type: 'vet'}

  // Função para simular login
  const login = (userType) => {
    console.log(`Simulando login como: ${userType}`);
    setUser({ type: userType });
  };

  // Função para simular logout
  const logout = () => {
    console.log('Simulando logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Cria um Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};