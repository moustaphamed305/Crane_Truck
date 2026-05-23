import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const trucksAPI = {
  getTrucks: (params = {}) => {
    return axios.get(`${API_BASE_URL}/trucks/`, { params });
  },
  
  getTruck: (id) => {
    return axios.get(`${API_BASE_URL}/trucks/${id}/`);
  },
  
  createTruck: (data) => {
    return axios.post(`${API_BASE_URL}/trucks/`, data);
  },
  
  updateTruck: (id, data) => {
    return axios.patch(`${API_BASE_URL}/trucks/${id}/`, data);
  },
  
  deleteTruck: (id) => {
    return axios.delete(`${API_BASE_URL}/trucks/${id}/`);
  },
};
