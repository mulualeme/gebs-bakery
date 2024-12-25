import { popularItems } from "./CateringData";

const MenuHighlights = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold text-primary">
          Popular Catering Items
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularItems.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                  {item.name}
                </h3>
                <p className="mb-4 text-gray-600">{item.description}</p>
                <p className="font-medium text-primary">{item.pricing}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
