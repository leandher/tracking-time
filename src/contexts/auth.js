import React, { createContext, useState, useEffect, useContext } from 'react';
import FirebaseService from '../services/firebase-service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const resp = await FirebaseService.login({ email, password });
      const user = {
        name: resp.displayName,
        email: resp.email,
        id: resp.uid,
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {
    try {
      await FirebaseService.logout();
      localStorage.setItem('user', null);
      setUser(null);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem('user'));
    if (storagedUser) {
      setUser({
        name: storagedUser.displayName,
        email: storagedUser.email,
        id: storagedUser.uid,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
