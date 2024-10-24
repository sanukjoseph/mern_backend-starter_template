// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users/me');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  const register = async (name, email, password) => {
    const response = await axios.post('/auth/register', { name, email, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  const logout = async () => {
    await axios.post('/users/logout');
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
