import React, { createContext, useState } from 'react';
import { getUserData, getUserRole, clearAuthData } from '../../Utils/Auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Start with what's in localStorage
  const [user, setUser] = useState(getUserData());
  const [role, setRole] = useState(getUserRole());

  // When login: update state
  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
  };

  // When logout: clear state and localStorage
  const logout = () => {
    clearAuthData();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
