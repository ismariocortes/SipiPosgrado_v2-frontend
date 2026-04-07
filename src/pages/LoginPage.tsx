import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { safeAreaStyle } from "../lib/safeArea";

export function LoginPage() {
  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-x-clip bg-slate-100"
      style={safeAreaStyle}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-[20%] -top-[10%] h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-[#122b40]/[0.07] blur-3xl" />
        <div className="absolute -bottom-[15%] -right-[15%] h-[min(90vw,24rem)] w-[min(90vw,24rem)] rounded-full bg-[#3d657d]/[0.08] blur-3xl" />
        <div className="absolute left-1/2 top-[22%] h-48 w-48 -translate-x-1/2 rounded-full bg-[#bc921c]/[0.08] blur-3xl" />
      </div>

      <InstitutionalHeader />

      <main className="relative z-10 flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center sm:mb-10">
            <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Ciclo 2026
            </p>
            <h1 className="font-display mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Proceso de ingreso a posgrados
            </h1>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#122b40] via-[#3d657d] to-[#bc921c]" />
            <p className="font-display mt-4 text-base font-semibold text-[#bc921c] sm:text-lg">
              Febrero — Junio
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Acceso al sistema de información (SIPI)
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] backdrop-blur-md sm:p-8">
            <LoginForm />
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            ¿Aún no tienes usuario?{" "}
            <Link
              to="/aviso-de-privacidad"
              className="font-semibold text-[#122b40] underline decoration-[#122b40]/35 underline-offset-2 transition hover:decoration-[#122b40]"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
