import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const MenuPopup = ({ item, onClose }) => {
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 sm:items-center"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="flex h-full w-full flex-col bg-white sm:h-auto sm:max-h-[90vh] sm:max-w-sm sm:rounded-3xl sm:shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b bg-white p-4 sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Detail Menu</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          <div className="p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4">
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${item.categoryColor}`}
              >
                {item.category}
              </span>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {item.description ||
                  `Premium ${item.name.toLowerCase()} made with the finest ingredients.`}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Ingredients</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {item.ingredients?.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-primary"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <label
                htmlFor="notes"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Add notes to your order
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special instructions..."
                rows={2}
                className="h-16 min-h-[2.5rem] w-full resize-none rounded-lg border border-gray-200 p-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-gray-900">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 border-t bg-white p-4 sm:rounded-b-3xl">
          <button
            onClick={handleAddToCart}
            className="w-full rounded-2xl bg-primary py-3 text-center font-medium text-white transition-colors hover:bg-primary/90"
          >
            Add to Cart (${(item.price * quantity).toFixed(2)})
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuPopup;
