
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    const storedUser = localStorage.getItem('user');

    if (storedTokens && storedUser) {
      setTokens(JSON.parse(storedTokens));
      setUser(JSON.parse(storedUser));
    }
  
    setLoading(false);
  }, []);

  const loginUser = async (identifier, password) => {
    try {
      const response = await axiosInstance.post('/api/users/login/', {
        identifier,
        password,
      });

      const data = response.data;
      setTokens(data);
      setUser(data.user);
      localStorage.setItem('authTokens', JSON.stringify(data));
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.full_name}!`);

      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
      console.error('Login error', error);
    }
  };

  const logoutUser = () => {
    toast.success('You have been logged out.'); // Show toast first
    setTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const contextData = {
    user,
    tokens,
    loading, 
    loginUser,
    logoutUser,
    setUser, 
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};