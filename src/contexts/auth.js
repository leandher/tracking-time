import React, { createContext, useState, useEffect, useContext } from 'react';
import FirebaseService from '../services/firebase-service';
import firebase from '../utils/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async ({ email, password }) => {
    try {
      const resp = await FirebaseService.login({ email, password });
      const user = {
        name: resp.displayName,
        email: resp.email,
        id: resp.uid,
      };
      setUser(user);
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {
    try {
      await FirebaseService.logout();
      setUser(null);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          id: user.uid,
        });
      } 
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
