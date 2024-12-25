import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, selectUser } from "../redux/slices/userSlice";

const AuthContext = createContext();

// Mock user credentials
const MOCK_USER = {
  email: "test@example.com",
  password: "password123",
};

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const login = (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = { email, name: "John Doe" };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
  };

  // Check for saved user data on mount
  if (!user) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
