import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NationalityPage } from "./pages/NationalityPage";
import { PrivacyNoticePage } from "./pages/PrivacyNoticePage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/aviso-de-privacidad" element={<PrivacyNoticePage />} />
        <Route path="/nacionalidad" element={<NationalityPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
