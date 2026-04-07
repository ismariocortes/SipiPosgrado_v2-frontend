import { Link, useNavigate } from "react-router-dom";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { safeAreaStyle } from "../lib/safeArea";

export function PrivacyNoticePage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-dvh flex-col bg-slate-50 max-md:h-dvh max-md:max-h-dvh max-md:overflow-hidden md:overflow-x-clip"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto [-webkit-overflow-scrolling:touch]">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0.75rem))] pt-5 sm:px-6 sm:pb-8 sm:pt-6 lg:max-w-[52rem] lg:px-8">
          <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[0.65rem]">
            Proceso de selección de aspirantes posgrado 2026
          </p>
          <h1 className="font-display mt-1.5 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Aviso de privacidad
          </h1>
          <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#122b40] via-[#3d657d] to-[#bc921c]" />

          <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-slate-800 sm:mt-7 sm:space-y-[1.125rem] sm:text-[1.0625rem] sm:leading-[1.65]">
            <p>
              La Universidad Autónoma de Yucatán, con domicilio en Mérida,
              Yucatán, es responsable del tratamiento de los datos personales que
              usted proporcione en el marco del proceso de selección de
              aspirantes a posgrado correspondiente al ciclo 2026.
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
            className="mt-8 border-t border-slate-200 pt-7 sm:mt-9 sm:pt-8"
            aria-labelledby="contacto-aviso"
          >
            <h2
              id="contacto-aviso"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-xs"
            >
              Datos de contacto
            </h2>
            <address className="not-italic">
              <div className="mt-3 rounded-lg border border-slate-200 bg-white px-5 py-5 text-slate-700 shadow-sm sm:px-6 sm:py-5">
                <p className="font-display text-[1.05rem] font-semibold text-[#122b40] sm:text-lg">
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
                    className="font-semibold text-[#3d657d] underline-offset-2 hover:underline"
                    href="tel:+529999300130"
                  >
                    (52) 999-9300130
                  </a>
                  <span className="text-slate-500"> Ext. 74119</span>
                </p>
              </div>
            </address>
          </section>

          <div className="mt-8 border-t border-slate-200 pt-7 sm:mt-9 sm:pt-8">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="uady-btn rounded-lg px-6 py-2.5 text-sm sm:min-w-[10rem]"
              >
                Salir
              </button>
              <Link
                to="/registro"
                className="uady-btn uady-btn--prominent inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-center text-sm no-underline sm:min-w-[10rem]"
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
