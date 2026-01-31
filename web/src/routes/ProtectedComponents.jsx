import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedComponents = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/signin" />;

  return children;
};

export default ProtectedComponents;
