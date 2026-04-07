import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { getCurrentYear } from "../lib/currentYear";
import { safeAreaStyle } from "../lib/safeArea";

const APPEARANCE_KEY = "sipi-privacy-notice-appearance";

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function PrivacyNoticePage() {
  const navigate = useNavigate();
  const year = getCurrentYear();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(APPEARANCE_KEY);
      if (stored === "dark" || stored === "light") {
        setDarkMode(stored === "dark");
      }
    } catch {
      /* ignore */
    }
  }, []);

  function setAppearance(next: boolean) {
    setDarkMode(next);
    try {
      localStorage.setItem(APPEARANCE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={
        darkMode
          ? "flex min-h-dvh flex-col bg-slate-950 max-md:h-dvh max-md:max-h-dvh max-md:overflow-hidden md:overflow-x-clip"
          : "flex min-h-dvh flex-col bg-[#f3f1eb] max-md:h-dvh max-md:max-h-dvh max-md:overflow-hidden md:overflow-x-clip"
      }
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto [-webkit-overflow-scrolling:touch]">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0.75rem))] pt-5 sm:px-6 sm:pb-8 sm:pt-6 lg:max-w-[52rem] lg:px-8">
          <p
            className={
              darkMode
                ? "font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-[0.65rem]"
                : "font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-600 sm:text-[0.65rem]"
            }
          >
            Proceso de selección de aspirantes posgrado {year}
          </p>
          <h1
            className={
              darkMode
                ? "font-display mt-3 text-balance text-2xl font-bold tracking-tight text-slate-100 sm:mt-4 sm:text-3xl"
                : "font-display mt-1.5 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            }
          >
            Aviso de privacidad
          </h1>
          <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#122b40] via-[#3d657d] to-[#bc921c]" />

          <div
            className={
              darkMode
                ? "mt-6 space-y-4 text-pretty text-base leading-relaxed text-slate-300 sm:mt-7 sm:space-y-[1.125rem] sm:text-[1.0625rem] sm:leading-[1.65]"
                : "mt-6 space-y-4 text-pretty text-base leading-relaxed text-slate-800 sm:mt-7 sm:space-y-[1.125rem] sm:text-[1.0625rem] sm:leading-[1.65]"
            }
          >
            <p>
              La Universidad Autónoma de Yucatán, con domicilio en Mérida,
              Yucatán, es responsable del tratamiento de los datos personales que
              usted proporcione en el marco del proceso de selección de
              aspirantes a posgrado correspondiente al ciclo {year}.
            </p>
            <p>
              Los datos serán utilizados para fines de identificación,
              verificación de requisitos, comunicación institucional y gestión
              del proceso de admisión, de conformidad con la Ley General de
              Protección de Datos Personales en Posesión de Sujetos Obligados y
              demás normatividad aplicable.
            </p>
            <p>
              Para ejercer sus derechos de acceso, rectificación, cancelación u
              oposición, así como para cualquier duda sobre el tratamiento de
              sus datos, podrá contactar a la Coordinación General del Sistema
              de Posgrado, Investigación y Vinculación en los datos de contacto
              que se indican a continuación.
            </p>
          </div>

          <section
            className="mt-4 pt-3 sm:mt-5 sm:pt-4"
            aria-labelledby="contacto-aviso"
          >
            <address className="not-italic">
              <div
                className={
                  darkMode
                    ? "mt-1 rounded-lg border border-slate-600/80 bg-slate-900/70 px-5 py-5 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-6 sm:py-5"
                    : "mt-1 rounded-lg border border-stone-200/90 bg-[#faf9f6] px-5 py-5 text-slate-700 shadow-sm sm:px-6 sm:py-5"
                }
              >
                <p
                  id="contacto-aviso"
                  className={
                    darkMode
                      ? "font-display text-[1.05rem] font-semibold text-slate-100 sm:text-lg"
                      : "font-display text-[1.05rem] font-semibold text-[#122b40] sm:text-lg"
                  }
                >
                  Coordinación General de Posgrado, Investigación y Vinculación
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed sm:text-base">
                  Calle 55 Av. Rafael Matos Escobedo S/N x 16 y Cto. Colonias,
                  Fracc. del Parque
                  <br />
                  Mérida, Yucatán, CP. 97160
                </p>
                <p className="mt-3 text-[0.95rem] sm:text-base">
                  <span className="text-slate-500">Tel </span>
                  <a
                    className={
                      darkMode
                        ? "font-semibold text-sky-400/95 underline-offset-2 hover:text-sky-300 hover:underline"
                        : "font-semibold text-[#3d657d] underline-offset-2 hover:underline"
                    }
                    href="tel:+529999300130"
                  >
                    (52) 999-9300130
                  </a>
                  <span className={darkMode ? "text-slate-500" : "text-slate-500"}>
                    {" "}
                    Ext. 74119
                  </span>
                </p>
              </div>
            </address>
          </section>

          <div
            className={
              darkMode
                ? "mt-8 border-t border-slate-700/80 pt-7 sm:mt-9 sm:pt-8"
                : "mt-8 border-t border-stone-300/80 pt-7 sm:mt-9 sm:pt-8"
            }
          >
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="uady-btn rounded-lg px-6 py-2.5 text-sm sm:min-w-[10rem]"
              >
                Regresar
              </button>
              <Link
                to="/nacionalidad"
                className="uady-btn uady-btn--prominent inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-center text-sm no-underline sm:min-w-[10rem]"
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </main>

      <InstitutionalFooter tone={darkMode ? "dark" : "light"} />

      <button
        type="button"
        onClick={() => setAppearance(!darkMode)}
        aria-label={
          darkMode ? "Cambiar a lectura suave" : "Cambiar a modo oscuro"
        }
        aria-pressed={darkMode}
        title={darkMode ? "Lectura suave" : "Modo oscuro"}
        className={
          darkMode
            ? "fixed right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(3.75rem+max(1rem,env(safe-area-inset-bottom,0px)))] z-[60] flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-slate-500/70 bg-slate-800/95 text-amber-100 shadow-[0_8px_32px_-6px_rgba(0,0,0,0.45)] outline-none backdrop-blur-sm transition [-webkit-tap-highlight-color:transparent] hover:bg-slate-700 active:scale-[0.97] active:bg-slate-700/95 focus-visible:ring-2 focus-visible:ring-[#5c7d92] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            : "fixed right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(3.75rem+max(1rem,env(safe-area-inset-bottom,0px)))] z-[60] flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-stone-300/90 bg-white/95 text-[#122b40] shadow-[0_8px_28px_-8px_rgba(18,43,64,0.25)] outline-none ring-1 ring-black/[0.06] backdrop-blur-sm transition [-webkit-tap-highlight-color:transparent] hover:bg-stone-50 active:scale-[0.97] active:bg-stone-100 focus-visible:ring-2 focus-visible:ring-[#3d657d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f1eb]"
        }
      >
        {darkMode ? (
          <IconSun className="h-[22px] w-[22px]" />
        ) : (
          <IconMoon className="h-[22px] w-[22px]" />
        )}
      </button>
    </div>
  );
}
