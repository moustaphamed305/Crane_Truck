import axiosInstance from '../services/axiosInstance';
export const tripsAPI = {
  getTrips: (params = {}) => axiosInstance.get('/trips/', { params }),
  getTrip: (id) => axiosInstance.get(`/trips/${id}/`),
  createTrip: (data) => axiosInstance.post('/trips/', data),
  updateTrip: (id, data) => axiosInstance.patch(`/trips/${id}/`, data),
  deleteTrip: (id) => axiosInstance.delete(`/trips/${id}/`),
};
