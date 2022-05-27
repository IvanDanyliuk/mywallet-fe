import React, { useState, useContext, useEffect } from 'react';

interface IAuthProvider {
  children: React.ReactNode
}

const AuthContext = React.createContext({firstName: 'a'});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || '{}'));

  useEffect(() => {
    
  }, [user]);

  console.log(user)

  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  );
};