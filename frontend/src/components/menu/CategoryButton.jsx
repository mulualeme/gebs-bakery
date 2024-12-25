const CategoryButton = ({ icon, label, count, isActive, onClick }) => {
  return (
    <button
      className={`flex flex-col items-center gap-2 rounded-lg px-4 py-2 text-left transition-colors sm:flex-row ${
        isActive
          ? "text-primary-900 bg-primary/10"
          : "text-gray-700 hover:bg-gray-100"
      } min-w-[100px] whitespace-nowrap sm:min-w-0`}
      onClick={onClick}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex flex-col items-center gap-1 sm:flex-1 sm:flex-row sm:justify-between sm:gap-2">
        <span className="text-center text-sm font-medium sm:text-left sm:text-base">
          {label}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs sm:text-sm">
          {count} Items
        </span>
      </div>
    </button>
  );
};

export default CategoryButton;
