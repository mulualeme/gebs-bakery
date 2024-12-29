import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  User,
  LogOut,
  Settings,
  Bell,
  Building2,
  HeadphonesIcon,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";

const MobileMenu = ({
  isOpen,
  items,
  currentPath,
  setIsLoginOpen,
  setIsOpen,
  onOpenOrderHistory,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
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
    }
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute left-0 right-0 top-16 z-20 bg-white px-4 py-2 shadow-lg md:hidden"
      ref={menuRef}
    >
      <div className="space-y-1">
        {user && (
          <div className="mb-4 flex items-center space-x-3 px-3 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        )}

        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => {
              setIsOpen(false);
              handleClick();
            }}
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              currentPath === item.path
                ? "bg-primary/10 text-primary"
                : "text-gray-700 hover:bg-gray-50 hover:text-primary"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {user ? (
          <>
            <div className="border-t border-gray-200 pt-2" />

            <button
              className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
                onOpenOrderHistory();
              }}
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Orders
            </button>

            <Link
              to="/settings"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              <Settings className="mr-3 h-5 w-5" />
              User Preferences
            </Link>

            <div className="border-t border-gray-200" />

            <Link
              to="/notifications"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              <div className="relative">
                <Bell className="mr-3 h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              Notifications
            </Link>

            <Link
              to="/organizations"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              <Building2 className="mr-3 h-5 w-5" />
              Organizations
            </Link>

            <div className="border-t border-gray-200" />

            <Link
              to="/support"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              <HeadphonesIcon className="mr-3 h-5 w-5" />
              Support
            </Link>

            <Link
              to="/feedback"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Give us feedback
            </Link>

            <div className="border-t border-gray-200" />

            <button
              onClick={() => {
                handleLogout();
                handleClick();
              }}
              className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setIsLoginOpen(true);
              setIsOpen(false);
              handleClick();
            }}
            className="mt-2 w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary/90"
          >
            Login
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
