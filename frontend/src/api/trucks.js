import axiosInstance from '../services/axiosInstance';
export const trucksAPI = {
  getTrucks: (params = {}) => axiosInstance.get('/trucks/', { params }),
  getTruck: (id) => axiosInstance.get(`/trucks/${id}/`),
  createTruck: (data) => axiosInstance.post('/trucks/', data),
  updateTruck: (id, data) => axiosInstance.patch(`/trucks/${id}/`, data),
  deleteTruck: (id) => axiosInstance.delete(`/trucks/${id}/`),
};
