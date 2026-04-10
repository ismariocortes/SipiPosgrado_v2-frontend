import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompletarPerfilPage } from "./pages/CompletarPerfilPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/completar-perfil"
          element={<CompletarPerfilPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
