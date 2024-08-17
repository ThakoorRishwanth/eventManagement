import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        try {
          const response = await axios.get('https://eventmanagement-i5yz.onrender.com/api/auth/verify', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          setUser(response.data.user);
          navigate(user.role === 'admin' ? '/admin-dashboard' : '/tasks');
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const login = async (email, password, role = 'user') => {
    try {
      const response = await axios.post('https://eventmanagement-i5yz.onrender.com/api/auth/login', { email, password });
      const { user, token } = response.data;

      if (role === 'admin' && user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      navigate(user.role === 'admin' ? '/admin-dashboard' : '/tasks');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const register = async (name, email, password, role = 'user') => {
    try {
      await axios.post('https://eventmanagement-i5yz.onrender.com/api/auth/register', { name, email, password, role });
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};