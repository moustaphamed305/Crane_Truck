import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { notificationsAPI } from '../api/notifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getNotifications();
      setNotifications(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications(
        notifications.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.is_read
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Notifications;
