import { Link } from "react-router-dom";
import { Croissant } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Croissant className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold uppercase tracking-wider">
        Gebs
        <span className="text-primary"> Bakery</span>
      </span>
    </Link>
  );
}
export default Logo;
