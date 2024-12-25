import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react";
// eslint-disable-next-line react/prop-types
function ResponsiveMenu({ open }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute left-0 top-20 z-20 h-screen w-full"
        >
          <div className="m-6 rounded-3xl bg-primary py-3 text-xl font-semibold text-white">
            <ul className="flex flex-col items-center gap-10">
              <li>Home</li>
              <li>Menu</li>
              <li>About</li>
              <li>Catering</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResponsiveMenu;
