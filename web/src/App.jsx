import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { RouterGuard } from "./lib/RouterGuard";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Authentication />} />
      <Route
        path="/"
        element={
          <RouterGuard>
            <Home />
          </RouterGuard>
        }
      />
    </Routes>
  );
}

export default App;
