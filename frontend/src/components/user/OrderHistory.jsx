import { motion } from "framer-motion";
import { Clock, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  loadOrders,
  clearOrders,
  updateOrder,
  deleteOrder,
} from "../../redux/slices/userSlice";
import Loader from "../common/Loader";
import OrderItem from "./OrderItem";

export function OrderHistory({ isOpen, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      dispatch(loadOrders(data.orders));
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, dispatch]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancellingOrderId(orderId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to cancel order");
      }

      // Update the order status locally
      dispatch(
        updateOrder({
          orderId,
          updates: { orderStatus: "Cancelled" },
        }),
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error.message || "Failed to cancel order. Please try again later.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeletingOrderId(orderId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete order");
      }

      // Remove the order from Redux store
      dispatch(deleteOrder(orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert(error.message || "Failed to delete order. Please try again later.");
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your order history?")) {
      dispatch(clearOrders());
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 sm:items-center"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full max-w-md rounded-2xl bg-white p-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-2 text-xl font-bold">Login Required</h2>
          <p className="text-gray-600">
            Please log in to view your order history.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 sm:items-center"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="flex h-full w-full flex-col overflow-hidden bg-white sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-3xl sm:shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b bg-white p-4 sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Order History</h2>
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
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader size="lg" message="Loading your orders..." />
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-500">
              No orders yet. Start shopping!
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderItem
                  key={order.orderId}
                  order={order}
                  onCancel={handleCancelOrder}
                  onDelete={handleDeleteOrder}
                  cancellingOrderId={cancellingOrderId}
                  deletingOrderId={deletingOrderId}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
