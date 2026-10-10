import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('eventsphere_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('eventsphere_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const res = await axiosClient.get('/api/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('eventsphere_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.error('Failed to fetch user context:', err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await axiosClient.post('/api/auth/login', { email, password });
    if (res.data.success) {
      const { token: jwt, user: userData } = res.data.data;
      setToken(jwt);
      setUser(userData);
      localStorage.setItem('eventsphere_token', jwt);
      localStorage.setItem('eventsphere_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const register = async (fullName, email, phone, password) => {
    const res = await axiosClient.post('/api/auth/register', { fullName, email, phone, password });
    if (res.data.success) {
      const { token: jwt, user: userData } = res.data.data;
      setToken(jwt);
      setUser(userData);
      localStorage.setItem('eventsphere_token', jwt);
      localStorage.setItem('eventsphere_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.data.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('eventsphere_token');
    localStorage.removeItem('eventsphere_user');
  };

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
