import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const RouterGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, user, loading]);

  if (!user) return null;

  return <>{children}</>;
};
