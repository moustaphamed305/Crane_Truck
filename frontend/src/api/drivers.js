import axios from 'axios';

const API_BASE_URL = 'https://crane-truck-1.onrender.com/api';

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

