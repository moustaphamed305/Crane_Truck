import axiosInstance from './axiosInstance';

export const notificationsAPI = {
  getNotifications: () => axiosInstance.get('/notifications/'),
  markAsRead: (id) => axiosInstance.patch(`/notifications/${id}/`, { is_read: true }),
};
