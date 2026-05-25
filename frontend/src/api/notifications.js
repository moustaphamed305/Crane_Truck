import axiosInstance from '../services/axiosInstance';

export const notificationsAPI = {
  getNotifications: () => axiosInstance.get('/notifications/'),
  markAsRead: (id) => axiosInstance.patch(`/notifications/${id}/`, { is_read: true }),
};
