import CateringHero from "../components/catering/CateringHero";
import ServiceOverview from "../components/catering/ServiceOverview";
import MenuHighlights from "../components/catering/MenuHighlights";
import CustomizationSection from "../components/catering/CustomizationSection";
import ContactForm from "../components/catering/ContactForm";

const Catering = () => {
  return (
    <main className="pt-16">
      <CateringHero />
      <ServiceOverview />
      <MenuHighlights />
      <CustomizationSection />
      <ContactForm />
    </main>
  );
};

export default Catering;
