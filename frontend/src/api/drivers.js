import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const driversAPI = {
  getDrivers: (params = {}) => {
    return axios.get(`${API_BASE_URL}/drivers/`, { params });
  },
  
  getDriver: (id) => {
    return axios.get(`${API_BASE_URL}/drivers/${id}/`);
  },
  
  createDriver: (data) => {
    return axios.post(`${API_BASE_URL}/drivers/`, data);
  },
  
  updateDriver: (id, data) => {
    return axios.patch(`${API_BASE_URL}/drivers/${id}/`, data);
  },
  
  deleteDriver: (id) => {
    return axios.delete(`${API_BASE_URL}/drivers/${id}/`);
  },
};
