import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated function
  const checkNUpdateAuth = useCallback(() => {
    if (isAuthenticated) return;
    let localStObj = localStorage.getItem("user");
    if (!localStObj && pathname !== "/auth") {
      setIsAuthenticated(false);
      navigate("/auth");
    } else if(localStObj) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, navigate, pathname]);

  // Check if user is authenticated on every route change and redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated) return;
    checkNUpdateAuth();
  }, [checkNUpdateAuth, isAuthenticated, pathname]);

  // Sign out function
  const handleSignOut = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/auth");
    setIsAuthenticated(false);
  }, [navigate]);

  // Sign in function
  const handleSignIn = useCallback(
    (user) => {
      localStorage.setItem("user", JSON.stringify({ user }));
      setIsAuthenticated(true);
      navigate("/");
    },
    [navigate]
  );

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      handleSignIn,
      handleSignOut,
    }),
    [isAuthenticated, handleSignIn, handleSignOut]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AuthContextProvider;
