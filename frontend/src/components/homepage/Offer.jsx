import { Link } from "react-router-dom";

const Offer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-primary/10 px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold uppercase text-primary sm:text-4xl">
              Ready to Satisfy Your Cravings?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
              Get up to 20% off on your first order and enjoy free delivery! 🎉
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                onClick={handleClick}
                to="/menu"
                className="transform rounded-lg bg-primary px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-primary/90"
              >
                View Our Menu
              </Link>
              <button
                onClick={handleClick}
                className="transform rounded-lg border-2 border-primary px-8 py-3 font-medium text-primary transition-all hover:scale-105 hover:bg-primary/10"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
