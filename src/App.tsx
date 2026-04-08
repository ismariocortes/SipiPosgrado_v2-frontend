import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompleteProfilePage } from "./pages/CompleteProfilePage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/completar-perfil"
          element={<CompleteProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
