import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

export function CartSlider({ isOpen, onClose }) {
  const { items, clearCart } = useCart();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    console.log("Navigating to checkout...");
    onClose();

    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login");
      navigate("/", { state: { showLogin: true, redirectToCheckout: true } });
      return;
    }

    console.log("User logged in, proceeding to checkout");
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Slider */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              {items.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="divide-y divide-gray-200">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.notes || "no-notes"}`}
                          className="py-4 first:pt-0 last:pb-0"
                        >
                          <CartItem item={item} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-base font-medium">Subtotal</span>
                      <span className="text-lg font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="mb-2 w-full rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add items to your cart to see them here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
