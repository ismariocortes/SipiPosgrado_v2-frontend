import { useNavigate } from "react-router-dom";
import imgExtranjero from "../assets/images/extranjero.png";
import imgMexicano from "../assets/images/mexicano.png";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { safeAreaStyle } from "../lib/safeArea";

export type NationalityChoice = "mexicano" | "extranjero";

export function NationalityPage() {
  const navigate = useNavigate();

  function goRegister(choice: NationalityChoice) {
    navigate("/registro", { state: { nacionalidad: choice } });
  }

  return (
    <div
      className="flex min-h-dvh flex-col overflow-x-clip bg-[#f3f1eb] text-slate-800"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center lg:max-w-[52rem]">
          <h1 className="font-display text-balance text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Selecciona tu nacionalidad
          </h1>
          <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#122b40] via-[#3d657d] to-[#bc921c]" />

          <div className="mt-12 flex w-full max-w-lg flex-col items-stretch gap-8 sm:mt-14 sm:flex-row sm:justify-center sm:gap-10 md:max-w-2xl md:gap-14">
            <button
              type="button"
              onClick={() => goRegister("mexicano")}
              className="group flex flex-col items-center gap-4 rounded-lg border border-stone-200/90 bg-[#faf9f6] px-5 py-7 shadow-sm transition hover:border-stone-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d657d] sm:py-8"
            >
              <span className="relative block h-40 w-40 shrink-0 overflow-hidden rounded-full shadow-[0_8px_28px_-10px_rgba(18,43,64,0.35)] ring-[5px] ring-white/95">
                <img
                  src={imgMexicano}
                  alt=""
                  className="h-full w-full object-cover transition group-active:scale-[0.98]"
                  decoding="async"
                />
                <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_4px_16px_rgba(255,255,255,0.35)]" />
              </span>
              <span className="max-w-[14rem] text-center text-sm font-semibold leading-snug text-slate-800 sm:text-base">
                Mexicano/Naturalizado
              </span>
            </button>

            <button
              type="button"
              onClick={() => goRegister("extranjero")}
              className="group flex flex-col items-center gap-4 rounded-lg border border-stone-200/90 bg-[#faf9f6] px-5 py-7 shadow-sm transition hover:border-stone-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d657d] sm:py-8"
            >
              <span className="relative block h-40 w-40 shrink-0 overflow-hidden rounded-full shadow-[0_8px_28px_-10px_rgba(18,43,64,0.35)] ring-[5px] ring-white/95">
                <img
                  src={imgExtranjero}
                  alt=""
                  className="h-full w-full object-cover transition group-active:scale-[0.98]"
                  decoding="async"
                />
                <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_4px_16px_rgba(255,255,255,0.35)]" />
              </span>
              <span className="max-w-[14rem] text-center text-sm font-semibold leading-snug text-slate-800 sm:text-base">
                Extranjero/Foreigner
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/aviso-de-privacidad")}
            className="mt-12 text-sm font-semibold text-[#3d657d] underline-offset-2 transition hover:text-[#122b40] hover:underline"
          >
            Volver al aviso de privacidad
          </button>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
