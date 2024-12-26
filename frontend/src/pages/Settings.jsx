import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Save } from "lucide-react";
import axios from "axios";

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
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
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/preferences`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        setFormData({
          phone: response.data.phone || "",
          address: response.data.address || "",
          dietaryPreferences: response.data.dietaryPreferences || [],
          allergyInformation: response.data.allergyInformation || [],
          marketingPreferences: response.data.marketingPreferences || {
            emailNotifications: false,
            smsNotifications: false,
            specialOffers: false,
          },
        });
      } catch (error) {
        console.error("Error fetching preferences:", error);
        setMessage({
          type: "error",
          text: "Failed to load preferences",
        });
      }
    };

    if (user) {
      fetchPreferences();
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/preferences`,
        {
          phone: formData.phone,
          address: formData.address,
          dietaryPreferences: formData.dietaryPreferences,
          allergyInformation: formData.allergyInformation,
          marketingPreferences: formData.marketingPreferences,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setMessage({
        type: "success",
        text: "Preferences updated successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update preferences",
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
                Update your preferences to personalize your experience.
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
                      value={user.name}
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
                      value={user.email}
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
