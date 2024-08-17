// src/utils/api.js

const API_URL = 'https://eventmanagement-i5yz.onrender.com';

// Helper function to handle API requests
const request = async (url, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

// Authentication API calls
export const registerUser = (userData) => request('/api/auth/register', 'POST', userData);
export const loginUser = (userData) => request('/api/auth/login', 'POST', userData);

// Task API calls
export const fetchTasks = (token) => request('/api/tasks', 'GET', null, token);
export const createTask = (taskData, token) => request('/api/tasks', 'POST', taskData, token);
export const updateTask = (id, taskData, token) => request(`/api/tasks/${id}`, 'PUT', taskData, token);
export const deleteTask = (id, token) => request(`/api/tasks/${id}`, 'DELETE', null, token);
