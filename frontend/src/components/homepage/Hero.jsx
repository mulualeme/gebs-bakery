import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SocialMediaButton from "./SocialMediaButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] items-center bg-gray-50 md:min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className="font-serif text-lg font-semibold text-gray-900 sm:text-xl">
              Fresh and Tasty
            </h2>
            <h1 className="mt-2 font-serif text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              The Art of Baking <span className="text-primary">Perfected</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-gray-600 sm:text-lg lg:mx-0">
              Indulge in the finest pastries, bread, and cakes made with love
              and the freshest ingredients.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                to="/menu"
                className="inline-block rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-transform hover:scale-105 sm:px-8 sm:py-3"
                onClick={handleClick}
              >
                Order Now
              </Link>
            </div>
            <div className="mt-6 flex justify-center gap-4 sm:mt-8 lg:justify-start">
              <SocialMediaButton icon={FaInstagram} label="Instagram" />
              <SocialMediaButton icon={FaXTwitter} label="Twitter" />
              <SocialMediaButton icon={FaFacebook} label="Facebook" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-lg">
            <img
              src={`${apiUrl}/assets/hero-image.png`}
              alt="Fresh baked goods"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
