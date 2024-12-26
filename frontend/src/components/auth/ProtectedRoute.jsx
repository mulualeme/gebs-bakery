import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return children;
}
