const MenuCard = ({ name, price, category, image, categoryColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-row gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-md transition-all hover:border-2 hover:border-primary hover:shadow-lg sm:flex-col sm:gap-0"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:aspect-square sm:h-auto sm:w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center sm:mt-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <span
          className={`inline-block w-fit rounded-full px-2 py-1 text-xs ${categoryColor}`}
        >
          {category}
        </span>
        <div className="mt-2">
          <span className="text-lg font-semibold text-primary">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
