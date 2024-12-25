import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  ShoppingBag,
  Settings,
  Bell,
  Building2,
  BookOpen,
  MessageSquare,
  Code2,
  HeadphonesIcon,
  MessageCircle,
} from "lucide-react";

export default function UserMenu({ isMobile = false, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    if (isMobile && onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-1 border-t px-3 pt-2">
        <div className="mb-4 flex items-center space-x-3 px-3 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <Link
          to="/orders"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <ShoppingBag className="mr-3 h-5 w-5" />
          Orders
        </Link>

        <Link
          to="/settings"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Settings className="mr-3 h-5 w-5" />
          User Preferences
        </Link>

        <div className="border-t border-gray-200" />

        <Link
          to="/notifications"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Bell className="mr-3 h-5 w-5" />
          Notifications
        </Link>

        <Link
          to="/organizations"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Building2 className="mr-3 h-5 w-5" />
          Organizations
        </Link>

        <div className="border-t border-gray-200" />

        <Link
          to="/documentation"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <BookOpen className="mr-3 h-5 w-5" />
          Documentation
        </Link>

        <Link
          to="/forums"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <MessageSquare className="mr-3 h-5 w-5" />
          Forums
        </Link>

        <Link
          to="/developer"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Code2 className="mr-3 h-5 w-5" />
          Developer Center
        </Link>

        <Link
          to="/support"
          className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <HeadphonesIcon className="mr-3 h-5 w-5" />
          Support
        </Link>

        <button
          onClick={() => {}}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="mr-3 h-5 w-5" />
          Give us feedback
        </button>

        <div className="border-t border-gray-200" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 rounded-full bg-primary/10 p-2 text-primary hover:bg-primary/20"
      >
        <User className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="mb-4 flex items-center space-x-3 px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <Link
            to="/orders"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <ShoppingBag className="mr-3 h-5 w-5" />
            Orders
          </Link>

          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="mr-3 h-5 w-5" />
            User Preferences
          </Link>

          <div className="border-t border-gray-200" />

          <Link
            to="/notifications"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Bell className="mr-3 h-5 w-5" />
            Notifications
          </Link>

          <Link
            to="/organizations"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Building2 className="mr-3 h-5 w-5" />
            Organizations
          </Link>

          <div className="border-t border-gray-200" />

          <Link
            to="/documentation"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Documentation
          </Link>

          <Link
            to="/forums"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Forums
          </Link>

          <Link
            to="/developer"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Code2 className="mr-3 h-5 w-5" />
            Developer Center
          </Link>

          <Link
            to="/support"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <HeadphonesIcon className="mr-3 h-5 w-5" />
            Support
          </Link>

          <button
            onClick={() => {}}
            className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            Give us feedback
          </button>

          <div className="border-t border-gray-200" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
