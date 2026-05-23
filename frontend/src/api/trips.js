import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const tripsAPI = {
  getTrips: (params = {}) => {
    return axios.get(`${API_BASE_URL}/trips/`, { params });
  },
  
  getTrip: (id) => {
    return axios.get(`${API_BASE_URL}/trips/${id}/`);
  },
  
  createTrip: (data) => {
    return axios.post(`${API_BASE_URL}/trips/`, data);
  },
  
  updateTrip: (id, data) => {
    return axios.patch(`${API_BASE_URL}/trips/${id}/`, data);
  },
  
  deleteTrip: (id) => {
    return axios.delete(`${API_BASE_URL}/trips/${id}/`);
  },
};
