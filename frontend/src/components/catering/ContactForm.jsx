import { useState, useEffect } from "react";

const ContactForm = ({ onSubmit, submissionStatus, userPreferences }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    location: "",
    message: "",
    budget: "",
    preferences: {
      dietary: [],
      allergies: [],
    },
  });

  // Populate form with user preferences when available
  useEffect(() => {
    if (userPreferences) {
      setFormData((prev) => ({
        ...prev,
        name: userPreferences.name || "",
        email: userPreferences.email || "",
        phone: userPreferences.phone || "",
        location: userPreferences.address || "",
        preferences: {
          dietary: userPreferences.dietaryPreferences || [],
          allergies: userPreferences.allergyInformation || [],
        },
      }));
    }
  }, [userPreferences]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("preferences.")) {
      const [, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert guestCount to number before submission
    const submissionData = {
      ...formData,
      guestCount: parseInt(formData.guestCount, 10),
    };
    onSubmit(submissionData);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Request a <span className="text-primary">Quote</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form below and we&apos;ll get back to you within 24
            hours
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select budget range</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Requests or Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {submissionStatus.error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {submissionStatus.error}
              </div>
            )}

            {submissionStatus.success && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                Your inquiry has been submitted successfully! We&apos;ll get
                back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={submissionStatus.loading}
              className="w-full rounded-md bg-primary py-3 text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {submissionStatus.loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
