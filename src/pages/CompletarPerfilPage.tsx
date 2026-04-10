import { CompleteProfileWizard } from "../components/completar-perfil/CompleteProfileWizard";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { safeAreaStyle } from "../lib/safeArea";

/**
 * Completar perfil (wizard en 7 pasos). Requiere sesión.
 * Cabecera y pie institucionales sin modificar.
 */
export function CompletarPerfilPage() {
  useRequireAuth();

  return (
    <div
      className="flex min-h-dvh flex-col overflow-x-clip bg-[#f3f1eb] text-slate-800"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
          <div>
            <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Registro de aspirante
            </p>
            <h1 className="font-display mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Completa tu información
            </h1>
          </div>

          <div className="mt-10">
            <CompleteProfileWizard />
          </div>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
