import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Bell,
  ShoppingBag,
  Tag,
  Info,
  Check,
  Trash2,
  CheckCheck,
} from "lucide-react";
import Loader from "../components/common/Loader";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/mark-all-read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true })),
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId),
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case "menu":
        return <Tag className="h-5 w-5 text-green-500" />;
      case "promo":
        return <Tag className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-16">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold">Login Required</h2>
          <p className="text-gray-600">
            Please log in to view your notifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader size="lg" message="Loading notifications..." />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-1 text-gray-500">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm transition-colors ${
                  !notification.isRead ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="Delete notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
