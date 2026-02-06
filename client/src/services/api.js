import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('user-updated'));
  window.location.href = '/login';
};

const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const updatePassword = async (passwordData) => {
  const response = await api.put('/auth/password', passwordData);
  return response.data;
};

// Analysis Services
const analyzeCode = async (data) => {
  console.log(data);
  const response = await api.post('/analysis', data);
  return response.data;
};

const analyzeRepo = async (repoUrl) => {
  const response = await api.post('/analysis/repo', { repoUrl });
  return response.data;
};

const getHistory = async () => {
  const response = await api.get('/analysis');
  return response.data;
};

const getAnalysisById = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

const deleteAnalysis = async (id) => {
  const response = await api.delete(`/analysis/${id}`);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updateProfile,
  updatePassword,
};

const analysisService = {
  analyzeCode,
  analyzeRepo,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
};

export { authService, analysisService };
export default api;
