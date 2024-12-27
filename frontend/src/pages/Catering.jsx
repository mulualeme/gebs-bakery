import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CateringHero from "../components/catering/CateringHero";
import ServiceOverview from "../components/catering/ServiceOverview";
import MenuHighlights from "../components/catering/MenuHighlights";
import CustomizationSection from "../components/catering/CustomizationSection";
import ContactForm from "../components/catering/ContactForm";

const Catering = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (userInfo?.token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/preferences/profile`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            },
          );

          if (response.ok) {
            const data = await response.json();
            setUserPreferences(data);
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
        }
      }
    };

    fetchUserPreferences();
  }, [userInfo]);

  const handleInquirySubmit = async (formData) => {
    setSubmissionStatus({ loading: true, success: false, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/catering/inquire`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(userInfo?.token && {
              Authorization: `Bearer ${userInfo.token}`,
            }),
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }

      setSubmissionStatus({
        loading: false,
        success: true,
        error: null,
      });

      // Reset form after successful submission
      setTimeout(() => {
        setSubmissionStatus({
          loading: false,
          success: false,
          error: null,
        });
      }, 5000);
    } catch (error) {
      setSubmissionStatus({
        loading: false,
        success: false,
        error: error.message,
      });
    }
  };

  return (
    <main className="pt-16">
      <CateringHero />
      <ServiceOverview />
      <MenuHighlights />
      <CustomizationSection />
      <ContactForm
        onSubmit={handleInquirySubmit}
        submissionStatus={submissionStatus}
        userPreferences={userPreferences}
      />
    </main>
  );
};

export default Catering;
