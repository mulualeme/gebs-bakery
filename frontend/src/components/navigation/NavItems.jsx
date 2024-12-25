import { Link } from "react-router-dom";

const NavItems = ({ items, currentPath }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.path}
            className={`text-sm font-medium transition-colors ${
              currentPath === item.path
                ? "text-primary underline decoration-primary decoration-[2px] underline-offset-8"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={handleClick}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
