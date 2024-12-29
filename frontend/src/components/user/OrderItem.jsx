import { Truck, Store, Ban, Trash2 } from "lucide-react";
import Loader from "../common/Loader";

const OrderItem = ({
  order,
  onCancel,
  onDelete,
  cancellingOrderId,
  deletingOrderId,
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-600">
            Order ID: {order.orderId}
          </span>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {order.deliveryMethod === "delivery" ? (
            <Truck className="h-4 w-4 text-primary" />
          ) : (
            <Store className="h-4 w-4 text-primary" />
          )}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              order.orderStatus === "Cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {order.orderStatus}
          </span>
          {["Processing", "Confirmed"].includes(order.orderStatus) && (
            <button
              onClick={() => onCancel(order.orderId)}
              disabled={cancellingOrderId === order.orderId}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancellingOrderId === order.orderId ? (
                <Loader size="sm" />
              ) : (
                <Ban className="h-3 w-3" />
              )}
              Cancel
            </button>
          )}
          {order.orderStatus === "Cancelled" && (
            <button
              onClick={() => onDelete(order.orderId)}
              disabled={deletingOrderId === order.orderId}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingOrderId === order.orderId ? (
                <Loader size="sm" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
              Delete
            </button>
          )}
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
          <span className="text-primary">${order.total.toFixed(2)}</span>
        </div>
        {order.deliveryMethod === "delivery" && (
          <div className="mt-2 text-sm text-gray-600">
            <div className="font-medium">Delivery Address:</div>
            <div>{order.contactInfo.address}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
