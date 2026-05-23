import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const notificationsAPI = {
  getNotifications: (params = {}) => {
    return axios.get(`${API_BASE_URL}/notifications/`, { params });
  },
  
  getNotification: (id) => {
    return axios.get(`${API_BASE_URL}/notifications/${id}/`);
  },
  
  markAsRead: (id) => {
    return axios.patch(`${API_BASE_URL}/notifications/${id}/`, { is_read: true });
  },
};
