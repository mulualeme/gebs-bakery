import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Truck, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function OrderConfirmation() {
  const location = useLocation();
  const { deliveryMethod, address } = location.state || {
    deliveryMethod: "delivery",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-lg bg-white p-8 shadow-lg"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Thank you for your order. We&apos;ll start preparing your delicious
            items right away!
          </p>

          <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <div className="mb-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                {deliveryMethod === "delivery" ? (
                  <Truck className="h-5 w-5 text-primary" />
                ) : (
                  <Store className="h-5 w-5 text-primary" />
                )}
                <h2 className="font-medium text-gray-700">
                  {deliveryMethod === "delivery"
                    ? "Delivery Time"
                    : "Pickup Time"}
                </h2>
              </div>
              <p className="text-2xl font-bold text-primary">
                {deliveryMethod === "delivery"
                  ? "30-45 minutes"
                  : "15-20 minutes"}
              </p>
            </div>

            <div className="text-left">
              {deliveryMethod === "delivery" ? (
                <>
                  <h2 className="mb-2 font-medium text-gray-700">
                    Delivery Address
                  </h2>
                  <p className="text-gray-600">{address}</p>
                </>
              ) : (
                <>
                  <h2 className="mb-2 font-medium text-gray-700">
                    Pickup Location
                  </h2>
                  <p className="text-gray-600">
                    123 Baker Street, New York, NY 10001
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Open: 7 AM - 9 PM
                  </p>
                </>
              )}
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
