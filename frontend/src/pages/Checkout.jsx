import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Truck, Store, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/userSlice";
import { LoginPopup } from "../components/auth/LoginPopup";
import Loader from "../components/common/Loader";
import {
  formatPhoneNumber,
  validateForm as validateFormHelper,
} from "../utils/helper";

export default function Checkout() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showLogin, setShowLogin] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Fetch user preferences and populate form
    const fetchUserPreferences = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/preferences`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error fetching user preferences:", error);
        // Fallback to user data only if preferences fetch fails
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: "",
          address: "",
        });
      }
    };

    fetchUserPreferences();
    console.log("User and items verified, rendering checkout");
  }, [user, items, navigate, apiUrl]);

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
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    if (!user) {
      setShowLogin(true);
      console.log("User not logged in, showing login popup");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order object
      const orderData = {
        items: items.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          notes: item.notes,
        })),
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: deliveryMethod === "delivery" ? formData.address : "",
        },
        deliveryMethod,
        paymentMethod,
        subtotal,
        deliveryFee,
        total,
      };

      // Send order to backend
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log("Order created:", data);

      // Add order to Redux store
      dispatch(
        addOrder({
          id: data.order.orderId,
          date: new Date().toLocaleDateString(),
          status: data.order.orderStatus,
          items: items,
          subtotal,
          deliveryFee,
          total,
          deliveryMethod,
          address: formData.address,
          userId: user.email,
        }),
      );

      // Clear cart and navigate to confirmation
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId: data.order.orderId,
          deliveryMethod,
          address: formData.address,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      // Here you might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
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
                    <p className="text-sm text-gray-600">Adwa Rd, Bahir Dar</p>
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
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500"
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
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
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
                  <Wallet className="h-5 w-5 text-primary" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                      paymentMethod === "cash"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Cash</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("telebirr")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                      paymentMethod === "telebirr"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`${apiUrl}/assets/telebirr.png`}
                      alt="Telebirr"
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                    <p className="text-sm font-medium">Telebirr</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cbebirr")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                      paymentMethod === "cbebirr"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`${apiUrl}/assets/cbe.png`}
                      alt="CBE Birr"
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                    <p className="text-sm font-medium">CBE Birr</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("chapa")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                      paymentMethod === "chapa"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`${apiUrl}/assets/chapa.png`}
                      alt="Chapa"
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                    <p className="text-sm font-medium">Chapa</p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-3 text-center font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size="sm" />
                    Processing Order...
                  </span>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </button>
            </motion.form>
          </div>
        </div>
      )}
    </div>
  );
}
