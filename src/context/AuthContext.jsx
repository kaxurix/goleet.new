import { createContext, useContext, useState } from 'react';
import { merchantUser, adminUser } from '../data/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasClaimedBusiness, setHasClaimedBusiness] = useState(false);

  const loginAsMerchant = () => {
    setUser(merchantUser);
    setIsLoggedIn(true);
    setHasClaimedBusiness(false);
  };

  const loginAsAdmin = () => {
    setUser(adminUser);
    setIsLoggedIn(true);
    setHasClaimedBusiness(false);
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
    setHasClaimedBusiness(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        hasClaimedBusiness,
        login,
        logout,
        loginAsMerchant,
        loginAsAdmin,
        setHasClaimedBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
