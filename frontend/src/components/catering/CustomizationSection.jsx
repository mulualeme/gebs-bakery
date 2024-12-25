import { ChefHat } from "lucide-react";

const CustomizationSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
            <ChefHat className="h-8 w-8" />
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Customization Options
          </h2>
          <p className="text-lg text-gray-600">
            We understand that every event is unique. Our expert bakers can
            create custom desserts tailored to your specific needs, including
            dietary requirements and theme-based designs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
