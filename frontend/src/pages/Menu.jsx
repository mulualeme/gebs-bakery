import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CategoryButton from "../components/menu/CategoryButton";
import MenuCard from "../components/menu/MenuCard";
import MenuPopup from "../components/menu/MenuPopup";
import SearchBar from "../components/menu/SearchBar";
import LoadingScreen from "../components/common/LoadingScreen";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/menu`;
        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error:", errorText);
          throw new Error(`Failed to fetch menu items: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error("Error details:", err);
        setError(
          err.message || "Failed to load menu items. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = [
    {
      id: "all",
      icon: "🍽️",
      label: "All Menu",
      count: menuItems.length,
    },
    {
      id: "breads",
      icon: "🍞",
      label: "Breads",
      count: menuItems.filter((item) => item.category.toLowerCase() === "bread")
        .length,
    },
    {
      id: "cakes",
      icon: "🎂",
      label: "Cakes",
      count: menuItems.filter((item) => item.category.toLowerCase() === "cake")
        .length,
    },
    {
      id: "donuts",
      icon: "🍩",
      label: "Donuts",
      count: menuItems.filter((item) => item.category.toLowerCase() === "donut")
        .length,
    },
    {
      id: "pastries",
      icon: "🥐",
      label: "Pastries",
      count: menuItems.filter(
        (item) => item.category.toLowerCase() === "pastry",
      ).length,
    },
    {
      id: "sandwich",
      icon: "🥪",
      label: "Sandwich",
      count: menuItems.filter(
        (item) => item.category.toLowerCase() === "sandwich",
      ).length,
    },
    {
      id: "tarts",
      icon: "🥧",
      label: "Tarts",
      count: menuItems.filter((item) => item.category.toLowerCase() === "tart")
        .length,
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      item.category.toLowerCase() ===
        (activeCategory === "pastries"
          ? "pastry"
          : activeCategory === "sandwich"
            ? "sandwich"
            : activeCategory.slice(0, -1)
        ).toLowerCase();
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <LoadingScreen message="Preparing fresh menu items..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          {/* Sidebar - now with horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-4 lg:space-y-4 lg:pb-0">
            <h2 className="mb-4 text-xl font-bold text-gray-900 lg:mb-0">
              Categories
            </h2>
            <div className="overflow-x-auto pb-4 lg:pb-0">
              <div className="flex min-w-max gap-3 lg:min-w-0 lg:flex-col">
                {categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    icon={category.icon}
                    label={category.label}
                    count={category.count}
                    isActive={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item._id}
                  {...item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MenuPopup
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
