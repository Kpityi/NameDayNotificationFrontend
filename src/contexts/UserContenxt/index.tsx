import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userData: object | null;
  setUser: (user: object) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<object | null>(null);

  const setUser = (user: object) => {
    setUserData(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const clearUser = () => {
    setUserData(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return <UserContext.Provider value={{ userData, setUser, clearUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
