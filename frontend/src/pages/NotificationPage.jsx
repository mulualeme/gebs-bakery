import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Loader } from "../components/common/Loader";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
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

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
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

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
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

      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId,
        ),
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete all notifications");
      }

      setNotifications([]);
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Notifications
          </h1>
          <div className="flex gap-4">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Mark all as read
                </button>
                <button
                  onClick={deleteAllNotifications}
                  className="rounded-md bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow">
            <p className="text-lg text-gray-600">No notifications yet</p>
            <p className="mt-2 text-sm text-gray-500">
              When you receive notifications, they will appear here
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`rounded-lg bg-white p-4 shadow transition-colors ${
                  !notification.isRead ? "border-l-4 border-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{notification.message}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {format(
                        new Date(notification.createdAt),
                        "MMM d, yyyy h:mm a",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="rounded bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
