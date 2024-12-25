import { Link } from "react-router-dom";

const NavLink = ({ name, path, isActive, onClick }) => {
  return (
    <Link
      to={path}
      className={`cursor-pointer transition-colors hover:text-primary ${
        isActive
          ? "text-primary underline decoration-primary decoration-[2px] underline-offset-8"
          : "text-gray-600"
      }`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default NavLink;
