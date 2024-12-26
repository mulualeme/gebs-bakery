import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/authSlice";
import { Save } from "lucide-react";

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dietaryPreferences: [],
    allergyInformation: [],
    marketingPreferences: {
      emailNotifications: false,
      smsNotifications: false,
      specialOffers: false,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        dietaryPreferences: user.dietaryPreferences || [],
        allergyInformation: user.allergyInformation || [],
        marketingPreferences: user.marketingPreferences || {
          emailNotifications: false,
          smsNotifications: false,
          specialOffers: false,
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("marketingPreferences.")) {
      const preference = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        marketingPreferences: {
          ...prev.marketingPreferences,
          [preference]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await dispatch(updateUser(formData)).unwrap();
      setMessage({ type: "success", text: "Settings updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update settings",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-serif text-2xl font-bold text-primary">
                User Preferences
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Update your profile and preferences to personalize your
                experience.
              </p>

              {message.text && (
                <div
                  className={`mt-4 rounded-md p-4 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-4">
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dietary Preferences (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.dietaryPreferences.join(", ")}
                      onChange={(e) =>
                        handleArrayInput(e, "dietaryPreferences")
                      }
                      placeholder="Vegetarian, Vegan, Gluten-free..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Allergy Information (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.allergyInformation.join(", ")}
                      onChange={(e) =>
                        handleArrayInput(e, "allergyInformation")
                      }
                      placeholder="Nuts, Dairy, Eggs..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Communication Preferences
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="marketingPreferences.emailNotifications"
                          checked={
                            formData.marketingPreferences.emailNotifications
                          }
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">
                          Email notifications
                        </span>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="marketingPreferences.smsNotifications"
                          checked={
                            formData.marketingPreferences.smsNotifications
                          }
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">
                          SMS notifications
                        </span>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="marketingPreferences.specialOffers"
                          checked={formData.marketingPreferences.specialOffers}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">
                          Special offers and promotions
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
