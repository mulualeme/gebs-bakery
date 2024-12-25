import { motion } from "framer-motion";
import loaderImage from "../../assets/loader.png";

const DonutLoader = ({ size = "md", message = "Loading..." }) => {
  // Size variants for the donut
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizes[size]}`}>
        <motion.img
          src={loaderImage}
          alt="Loading..."
          className="h-full w-full object-contain"
          transition={{
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Loading text */}
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default DonutLoader;
