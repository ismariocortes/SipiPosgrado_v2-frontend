import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Redirige a `/` si no hay token de sesión (p. ej. rutas solo para usuarios autenticados).
 */
export function useRequireAuth(): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
}
