import axios from 'axios';
const API_BASE_URL = 'https://crane-truck-1.onrender.com/api';
export const authAPI = {
  login: (username, password) => {
    return axios.post(`${API_BASE_URL}/auth/login/`, { username, password });
  },
  register: (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register/`, userData);
  },
  refreshToken: (refreshToken) => {
    return axios.post(`${API_BASE_URL}/auth/refresh/`, { refresh: refreshToken });
  },
  getCurrentUser: () => {
    return axios.get(`${API_BASE_URL}/auth/me/`);
  },
};

