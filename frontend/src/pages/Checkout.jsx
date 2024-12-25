import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, MapPin, Truck, Store } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/userSlice";
import { LoginPopup } from "../components/auth/LoginPopup";
import {
  formatCardNumber,
  formatExpiryDate,
  formatPhoneNumber,
  validateForm as validateFormHelper,
} from "../utils/helper";

export default function Checkout() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showLogin, setShowLogin] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    console.log("Current user state:", user);
    // Check for authentication and cart items
    if (!user) {
      console.log("No user found, showing login popup");
      setShowLogin(true);
      return;
    }

    if (items.length === 0) {
      console.log("No items in cart, redirecting to menu");
      navigate("/menu");
      return;
    }

    console.log("User and items verified, rendering checkout");
  }, [user, items, navigate]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = deliveryMethod === "delivery" ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on field type
    switch (name) {
      case "cardNumber":
        formattedValue = formatCardNumber(value);
        break;
      case "expiryDate":
        formattedValue = formatExpiryDate(value);
        break;
      case "phone":
        formattedValue = formatPhoneNumber(value);
        break;
      default:
        formattedValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const { isValid, errors } = validateFormHelper(formData);
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user) {
      setShowLogin(true);
      return;
    }

    // Create new order object
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      status: "Processing",
      items: items,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      deliveryMethod: deliveryMethod,
      address: formData.address,
      userId: user.email,
    };

    // Dispatch order to Redux store
    dispatch(addOrder(newOrder));

    // Clear cart and navigate to confirmation
    clearCart();
    navigate("/order-confirmation", {
      state: {
        deliveryMethod,
        address: formData.address,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {showLogin ? (
        <LoginPopup
          isOpen={showLogin}
          onClose={() => navigate("/")}
          redirectToCheckout={true}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
                <div className="divide-y">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        {item.notes && (
                          <p className="text-sm text-gray-500">
                            Note: {item.notes}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 font-medium">Delivery Method</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                      deliveryMethod === "delivery"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Truck className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-gray-500">30-45 minutes</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                      deliveryMethod === "pickup"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Store className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Pickup</p>
                      <p className="text-sm text-gray-500">15-20 minutes</p>
                    </div>
                  </button>
                </div>
                {deliveryMethod === "pickup" && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-700">
                      Pickup Location
                    </p>
                    <p className="text-sm text-gray-600">
                      123 Baker Street, New York, NY 10001
                    </p>
                    <p className="text-sm text-gray-600">Open: 7 AM - 9 PM</p>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-lg bg-white p-6 shadow-md"
            >
              <h2 className="text-xl font-bold">Payment Details</h2>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium text-gray-700">
                  <MapPin className="h-5 w-5 text-primary" />
                  Contact Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                      minLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                        formErrors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  {deliveryMethod === "delivery" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        required={deliveryMethod === "delivery"}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium text-gray-700">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                        formErrors.cardNumber
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
                      required
                      maxLength={19}
                    />
                    {formErrors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                          formErrors.expiryDate
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-primary focus:ring-primary"
                        }`}
                        required
                        maxLength={5}
                      />
                      {formErrors.expiryDate && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                          formErrors.cvv
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-primary focus:ring-primary"
                        }`}
                        required
                        maxLength={4}
                      />
                      {formErrors.cvv && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClick}
                type="submit"
                className="w-full rounded-lg bg-primary py-3 text-center font-medium text-white transition-colors hover:bg-primary/90"
              >
                Pay ${total.toFixed(2)}
              </button>
            </motion.form>
          </div>
        </div>
      )}
    </div>
  );
}
