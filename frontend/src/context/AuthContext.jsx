import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('apg_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check requested admin credentials
    if (cleanEmail === 'apg123@gmail.com' && cleanPass === 'APG@123') {
      const adminData = {
        id: 'admin-1',
        fullName: 'APG Admin',
        email: 'apg123@gmail.com',
        role: 'ROLE_ADMIN'
      };
      setUser(adminData);
      localStorage.setItem('apg_admin_user', JSON.stringify(adminData));
      return adminData;
    }

    throw new Error('Invalid email or password! Please check your credentials.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apg_admin_user');
  };

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
