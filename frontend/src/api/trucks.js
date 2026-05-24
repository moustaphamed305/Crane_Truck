import axios from 'axios';

const API_BASE_URL = 'https://crane-truck-1.onrender.com/api';

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

