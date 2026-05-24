import axiosInstance from '../services/axiosInstance';
export const maintenanceAPI = {
  getRecords: (params = {}) => axiosInstance.get('/maintenance/', { params }),
  getRecord: (id) => axiosInstance.get(`/maintenance/${id}/`),
  createRecord: (data) => axiosInstance.post('/maintenance/', data),
  updateRecord: (id, data) => axiosInstance.patch(`/maintenance/${id}/`, data),
  deleteRecord: (id) => axiosInstance.delete(`/maintenance/${id}/`),
};
