import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/'; // Adjust based on your backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request. use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: async (username: string, email: string, password: string) => {
    const response = await api.post('/user/signup', { username, email, password });
    return response.data;
  },
  login: async (email:  string, password: string) => {
    const response = await api. post('/user/login', { email, password });
    return response. data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const scanAPI = {
  startScan: async (url: string, tools: string[]) => {
    const response = await api.post('/scan', { url, tools });
    return response.data;
  },
};

export default api;