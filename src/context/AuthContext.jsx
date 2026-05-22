import { createContext, useContext, useState } from 'react';
import { merchantUser, adminUser } from '../data/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAsMerchant = () => {
    setUser(merchantUser);
    setIsLoggedIn(true);
  };

  const loginAsAdmin = () => {
    setUser(adminUser);
    setIsLoggedIn(true);
  };

  const login = (email, password, role) => {
    if (role === 'admin') {
      loginAsAdmin();
    } else {
      loginAsMerchant();
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loginAsMerchant, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
