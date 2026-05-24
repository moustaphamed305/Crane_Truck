import axiosInstance from '../services/axiosInstance';
export const driversAPI = {
  getDrivers: (params = {}) => axiosInstance.get('/drivers/', { params }),
  getDriver: (id) => axiosInstance.get(`/drivers/${id}/`),
  createDriver: (data) => axiosInstance.post('/drivers/', data),
  updateDriver: (id, data) => axiosInstance.patch(`/drivers/${id}/`, data),
  deleteDriver: (id) => axiosInstance.delete(`/drivers/${id}/`),
};
