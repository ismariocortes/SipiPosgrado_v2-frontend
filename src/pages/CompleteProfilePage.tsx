import { useNavigate } from "react-router-dom";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { safeAreaStyle } from "../lib/safeArea";

/**
 * Pantalla posterior al login: el aspirante completa aquí su perfil / registro.
 * Requiere sesión (token en localStorage).
 */
export function CompleteProfilePage() {
  const navigate = useNavigate();
  useRequireAuth();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <div
      className="flex min-h-dvh flex-col overflow-x-clip bg-[#f3f1eb] text-slate-800"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Registro de aspirante
              </p>
              <h1 className="font-display mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Completa tu información
              </h1>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-lg border border-stone-300/90 bg-white px-4 py-2 text-sm font-semibold text-[#122b40] shadow-sm transition hover:bg-stone-50"
            >
              Cerrar sesión
            </button>
          </div>

          <p className="mt-6 text-pretty leading-relaxed text-slate-600">
            Aquí integrarás el formulario para completar tu registro como
            aspirante. Los campos y validaciones se conectarán al backend cuando
            estén definidos.
          </p>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
