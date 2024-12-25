import { useState } from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "./LoginPopup";
import UserMenu from "./UserMenu";

export default function AuthButton() {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <UserMenu />;
  }

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className="rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary/90"
      >
        Sign In
      </button>

      <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
