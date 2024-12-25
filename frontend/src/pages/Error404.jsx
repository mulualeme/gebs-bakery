import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Error404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="mb-2 text-9xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back
        </Link>
      </motion.div>
    </div>
  );
}
