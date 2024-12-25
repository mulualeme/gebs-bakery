import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            {item.notes && (
              <p className="text-sm text-gray-500">Note: {item.notes}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              ${item.price.toFixed(2)}
            </p>
          </div>
          <p className="font-medium text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-md border">
            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  Math.max(1, item.quantity - 1),
                  item.notes,
                )
              }
              className="px-3 py-1 text-gray-600 hover:bg-gray-50 hover:text-primary"
            >
              -
            </button>
            <span className="px-3 py-1 text-gray-600">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1, item.notes)
              }
              className="px-3 py-1 text-gray-600 hover:bg-gray-50 hover:text-primary"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id, item.notes)}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
