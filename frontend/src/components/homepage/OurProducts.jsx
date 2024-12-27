import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuPopup from "../menu/MenuPopup";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

function OurProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/menu`,
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  if (error) {
    return (
      <section className="relative overflow-hidden bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full px-4 sm:max-w-7xl sm:px-6 lg:px-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-center text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gray-50 py-12 sm:py-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 opacity-20 blur-3xl filter">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/60 to-primary/30" />
      </div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 opacity-20 blur-3xl filter">
        <div className="h-full w-full rounded-full bg-gradient-to-tl from-primary/60 to-primary/30" />
      </div>

      <div className="mx-auto w-full px-4 sm:max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our <span className="text-primary">Signature</span> Products
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Discover our handcrafted selection of freshly baked goods, made with
            love and the finest ingredients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <div
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category Tag */}
                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary sm:text-xl">
                  {product.name}
                </h3>
                <div className="mt-3">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center sm:mt-16">
          <Link
            onClick={handleClick}
            to="/menu"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md sm:px-8 sm:py-4 sm:text-base"
          >
            Explore Full Menu
            <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Menu Popup */}
      <AnimatePresence>
        {selectedProduct && (
          <MenuPopup item={selectedProduct} onClose={handleClosePopup} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default OurProducts;
