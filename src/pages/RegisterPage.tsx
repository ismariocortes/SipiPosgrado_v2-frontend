import { Link } from "react-router-dom";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { safeAreaStyle } from "../lib/safeArea";

export function RegisterPage() {
  return (
    <div
      className="flex min-h-dvh flex-col overflow-x-clip bg-slate-50"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Registro de aspirante
          </p>
          <h1 className="font-display mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Formulario de registro
          </h1>
          <p className="mt-4 text-pretty text-slate-600">
            El formulario de registro se integrará en esta sección.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex text-sm font-semibold text-[#003366] underline underline-offset-2 hover:text-[#0055a5]"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
