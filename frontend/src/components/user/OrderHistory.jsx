import { motion } from "framer-motion";
import { Clock, X, Truck, Store, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  loadOrders,
  clearOrders,
} from "../../redux/slices/userSlice";

export function OrderHistory({ isOpen, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = user; // Get current user from auth state
    console.log("Current user in OrderHistory:", currentUser); // Debug log

    if (currentUser) {
      // Load orders from localStorage when component mounts
      const savedOrders = localStorage.getItem("orderHistory");
      if (savedOrders) {
        // Filter orders for current user and sort by date
        const allOrders = JSON.parse(savedOrders);
        const userOrders = allOrders
          .filter((order) => order.userId === currentUser.email)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        dispatch(loadOrders(userOrders));
      }
    }
  }, [user, dispatch]);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your order history?")) {
      dispatch(clearOrders());
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl bg-white p-6 text-center"
        >
          <h2 className="mb-2 text-xl font-bold">Login Required</h2>
          <p className="text-gray-600">
            Please log in to view your order history.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Order History</h2>
            </div>
            <div className="flex items-center gap-2">
              {orders.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {orders.length === 0 ? (
            <div className="text-center text-gray-500">
              No orders yet. Start shopping!
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Order ID: {order.id}
                      </span>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.deliveryMethod === "delivery" ? (
                        <Truck className="h-4 w-4 text-primary" />
                      ) : (
                        <Store className="h-4 w-4 text-primary" />
                      )}
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex-1">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2 border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>${order.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    {order.deliveryMethod === "delivery" && (
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="font-medium">Delivery Address:</div>
                        <div>{order.address}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
