import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Menu,
  ShoppingCart,
  X,
  User,
  LogOut,
  Settings,
  Bell,
  Building2,
  HeadphonesIcon,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Logo from "./Logo";
import NavItems from "./NavItems";
import MobileMenu from "./MobileMenu";
import { CartSlider } from "../cart/CartSlider";
import { LoginPopup } from "../auth/LoginPopup";
import { AnimatePresence } from "framer-motion";
import { OrderHistory } from "../user/OrderHistory";
import { useScrollDirection } from "../../hooks/useScrollDirection";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Catering", path: "/catering" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { items } = useCart();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const isScrollingDown = useScrollDirection();

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
        }
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

  useEffect(() => {
    // Check if we need to show login popup from route state
    if (location.state?.showLogin) {
      setIsLoginOpen(true);
      // Clear the state after showing login
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    // Navigate to home page after logout
    window.location.href = "/";
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-md transition-transform duration-300 ${
          isScrollingDown ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden md:block">
            <NavItems items={navItems} currentPath={location.pathname} />
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary md:block"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="hidden rounded-full p-2 text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary md:block"
                >
                  <User className="h-5 w-5" />
                </button>

                {showProfileMenu && (
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
                      to="#"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsOrderHistoryOpen(true);
                        setShowProfileMenu(false);
                      }}
                    >
                      <ShoppingCart className="mr-3 h-5 w-5" />
                      Orders
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      User Preferences
                    </Link>

                    <div className="border-t border-gray-200" />

                    <Link
                      to="/notifications"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
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
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Building2 className="mr-3 h-5 w-5" />
                      Organizations
                    </Link>

                    <div className="border-t border-gray-200" />

                    <Link
                      to="/support"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <HeadphonesIcon className="mr-3 h-5 w-5" />
                      Support
                    </Link>

                    <Link
                      to="/feedback"
                      className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <MessageCircle className="mr-3 h-5 w-5" />
                      Give us feedback
                    </Link>

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
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary/90 md:block"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            items={navItems}
            currentPath={location.pathname}
            setIsLoginOpen={setIsLoginOpen}
            setIsOpen={setIsMenuOpen}
            onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
          />
        </div>
      </header>

      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AnimatePresence>
        {isLoginOpen && (
          <LoginPopup
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderHistoryOpen && (
          <OrderHistory
            isOpen={isOrderHistoryOpen}
            onClose={() => setIsOrderHistoryOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
