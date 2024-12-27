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
    <section className="relative flex min-h-screen items-center bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-center">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Fresh and Tasty
            </h2>
            <h1 className="mt-2 font-serif text-5xl font-bold text-gray-900 lg:text-6xl">
              The Art of Baking <span className="text-primary">Perfected</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Indulge in the finest pastries, bread, and cakes made with love
              and the freshest ingredients.
            </p>
            <div className="mt-8">
              <Link
                to="/menu"
                className="rounded-lg bg-primary px-8 py-3 font-medium text-white transition-transform hover:scale-105"
                onClick={handleClick}
              >
                Order Now
              </Link>
            </div>
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              <SocialMediaButton icon={FaInstagram} label="Instagram" />
              <SocialMediaButton icon={FaXTwitter} label="Twitter" />
              <SocialMediaButton icon={FaFacebook} label="Facebook" />
            </div>
          </div>
          <div className="relative w-full max-w-lg lg:w-1/2">
            <img
              src={`${apiUrl}/assets/hero-image.png`}
              alt="Fresh baked goods"
              className="mx-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
