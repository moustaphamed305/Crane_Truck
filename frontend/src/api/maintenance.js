import axios from 'axios';

const API_BASE_URL = 'https://crane-truck-1.onrender.com/api';

export const maintenanceAPI = {
  getRecords: (params = {}) => {
    return axios.get(`${API_BASE_URL}/maintenance/`, { params });
  },
  
  getRecord: (id) => {
    return axios.get(`${API_BASE_URL}/maintenance/${id}/`);
  },
  
  createRecord: (data) => {
    return axios.post(`${API_BASE_URL}/maintenance/`, data);
  },
  
  updateRecord: (id, data) => {
    return axios.patch(`${API_BASE_URL}/maintenance/${id}/`, data);
  },
  
  deleteRecord: (id) => {
    return axios.delete(`${API_BASE_URL}/maintenance/${id}/`);
  },
};

