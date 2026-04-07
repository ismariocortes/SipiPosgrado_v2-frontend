import { Link, useNavigate } from "react-router-dom";
import { InstitutionalFooter } from "../components/layout/InstitutionalFooter";
import { InstitutionalHeader } from "../components/layout/InstitutionalHeader";
import { safeAreaStyle } from "../lib/safeArea";

export function PrivacyNoticePage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-dvh flex-col overflow-x-clip bg-slate-50"
      style={safeAreaStyle}
    >
      <InstitutionalHeader />

      <main className="relative z-10 flex-1">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-[52rem] lg:px-8 lg:py-12">
          <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
            Proceso de selección de aspirantes posgrado 2026
          </p>
          <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Aviso de privacidad
          </h1>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#003366] via-[#0055a5] to-[#f2a900]" />

          <div className="mt-10 space-y-5 text-pretty text-base leading-[1.7] text-slate-800 sm:text-[1.05rem]">
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
            className="mt-12 border-t border-slate-200 pt-10"
            aria-labelledby="contacto-aviso"
          >
            <h2
              id="contacto-aviso"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
            >
              Datos de contacto
            </h2>
            <address className="not-italic">
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-6 text-slate-700 shadow-sm sm:px-8">
                <p className="font-display text-lg font-semibold text-[#003366]">
                  Coordinación General de Posgrado, Investigación y Vinculación
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Universidad Autónoma de Yucatán
                  <br />
                  Mérida, Yucatán, México
                </p>
                <p className="mt-4 text-base">
                  <span className="text-slate-500">Teléfono: </span>
                  <a
                    className="font-semibold text-[#0055a5] underline-offset-2 hover:underline"
                    href="tel:+529999000000"
                  >
                    (999) 000-0000
                  </a>
                  <span className="text-slate-500"> ext. 0000</span>
                </p>
              </div>
            </address>
          </section>

          <div className="mt-12 flex flex-col-reverse gap-3 border-t border-slate-200 pt-10 sm:flex-row sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="uady-btn rounded-xl px-8 sm:min-w-[11rem]"
            >
              Salir
            </button>
            <Link
              to="/registro"
              className="uady-btn uady-btn--prominent inline-flex items-center justify-center rounded-xl px-8 text-center no-underline sm:min-w-[11rem]"
            >
              Continuar
            </Link>
          </div>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
