import { events } from "./CateringData";

const ServiceOverview = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 font-serif text-3xl font-bold text-primary">
            We Cater to Every Occasion
          </h2>
          <p className="text-lg text-gray-600">
            From intimate gatherings to grand celebrations, we provide
            exceptional catering services with the same attention to detail and
            quality that has made our bakery a local favorite. Each item is
            freshly baked and can be customized to your preferences.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {events.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg bg-gray-50 p-6 text-center transition-transform hover:scale-105"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
