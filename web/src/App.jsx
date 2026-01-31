import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) return <>loading</>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/signin" element={<Authentication />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
