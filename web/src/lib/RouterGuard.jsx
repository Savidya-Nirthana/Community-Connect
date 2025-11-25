import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const RouterGuard = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, user]);

  if (!user) return null;

  return <>{children}</>;
};
