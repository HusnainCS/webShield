import axios from 'axios';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CRITICAL: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Force withCredentials on every request
    config.withCredentials = true;
    
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors. response.use(
  (response) => {
    console.log(`[API] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API] Error ${error.response. status} from ${error.config?. url}:`, error.response.data);
    } else {
      console.error('[API] Network error:', error.message);
    }
    
    // Don't auto-redirect, let components handle errors
    return Promise.reject(error);
  }
);

// Authentication API methods
export const authAPI = {
  // Sign up new user
  signup: async (data: { username: string; email: string; password: string }) => {
    const response = await api.post('/user/signup', data);
    return response.data;
  },

  // Login existing user
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/user/login', data);
    return response.data;
  },

  // Logout current user
  logout: async () => {
    const response = await api.post('/user/logout');
    return response. data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
};

// Scan API methods
export const scanAPI = {
  // Start new scan
  startScan: async (data: { targetUrl: string; scanType: string }) => {
    console.log('[API] Starting scan with data:', data);
    const response = await api.post('/scan/start', data);
    console.log('[API] Scan started, response:', response.data);
    return response.data;
  },

  // Get scan by ID
  getScan: async (scanId: string) => {
    const response = await api.get(`/scan/${scanId}`);
    return response.data;
  },

  // Get scan history
  getHistory: async () => {
    const response = await api.get('/scan/history');
    return response.data;
  },

  // Cancel running scan
  cancelScan: async (scanId: string) => {
    const response = await api. post(`/scan/${scanId}/cancel`);
    return response.data;
  },

  // Generate AI report
  generateReport: async (scanId: string) => {
    const response = await api.post(`/scan/${scanId}/report/generate`);
    return response.data;
  },

  // Download report
  downloadReport: (scanId: string) => {
    window.open(`${API_URL}/scan/${scanId}/report/download`, '_blank');
  },
};

export default api;