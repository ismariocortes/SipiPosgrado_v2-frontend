import { getCurrentYear } from "../lib/currentYear";

type PrivacyNoticeContentProps = {
  darkMode: boolean;
  /** En modales usar `h2` para no duplicar `h1` de la página. */
  titleAs?: "h1" | "h2";
  titleId?: string;
  /** Evita colisión de `id` si hay otro aviso en el DOM (p. ej. modal + página). */
  contactHeadingId?: string;
};

export function PrivacyNoticeContent({
  darkMode,
  titleAs = "h1",
  titleId,
  contactHeadingId = "contacto-aviso",
}: PrivacyNoticeContentProps) {
  const year = getCurrentYear();
  const TitleTag = titleAs;

  return (
    <>
      <p
        className={
          darkMode
            ? "font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-[0.6rem]"
            : "font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-slate-600 sm:text-[0.6rem]"
        }
      >
        Proceso de selección de aspirantes posgrado {year}
      </p>
      <TitleTag
        id={titleId}
        className={
          darkMode
            ? "font-display mt-3 text-balance text-xl font-bold tracking-tight text-slate-100 sm:mt-4 sm:text-2xl"
            : "font-display mt-1.5 text-balance text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        }
      >
        Aviso de privacidad
      </TitleTag>
      <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#122b40] via-[#3d657d] to-[#bc921c]" />

      <div
        className={
          darkMode
            ? "mt-6 space-y-3.5 text-pretty text-sm leading-relaxed text-slate-300 sm:mt-7 sm:space-y-4 sm:text-[0.9375rem] sm:leading-[1.6]"
            : "mt-6 space-y-3.5 text-pretty text-sm leading-relaxed text-slate-800 sm:mt-7 sm:space-y-4 sm:text-[0.9375rem] sm:leading-[1.6]"
        }
      >
        <p>
          La Universidad Autónoma de Yucatán, con domicilio en Mérida, Yucatán,
          es responsable del tratamiento de los datos personales que usted
          proporcione en el marco del proceso de selección de aspirantes a
          posgrado correspondiente al ciclo {year}.
        </p>
        <p>
          Los datos serán utilizados para fines de identificación, verificación
          de requisitos, comunicación institucional y gestión del proceso de
          admisión, de conformidad con la Ley General de Protección de Datos
          Personales en Posesión de Sujetos Obligados y demás normatividad
          aplicable.
        </p>
        <p>
          Para ejercer sus derechos de acceso, rectificación, cancelación u
          oposición, así como para cualquier duda sobre el tratamiento de sus
          datos, podrá contactar a la Coordinación General del Sistema de
          Posgrado, Investigación y Vinculación en los datos de contacto que se
          indican a continuación.
        </p>
      </div>

      <section
        className="mt-4 pt-3 sm:mt-5 sm:pt-4"
        aria-labelledby={contactHeadingId}
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
              id={contactHeadingId}
              className={
                darkMode
                  ? "font-display text-base font-semibold text-slate-100 sm:text-[1.05rem]"
                  : "font-display text-base font-semibold text-[#122b40] sm:text-[1.05rem]"
              }
            >
              Coordinación General de Posgrado, Investigación y Vinculación
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed sm:text-[0.9375rem]">
              Calle 55 Av. Rafael Matos Escobedo S/N x 16 y Cto. Colonias,
              Fracc. del Parque
              <br />
              Mérida, Yucatán, CP. 97160
            </p>
            <p className="mt-3 text-[0.875rem] sm:text-[0.9375rem]">
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
              <span
                className={darkMode ? "text-slate-500" : "text-slate-500"}
              >
                {" "}
                Ext. 74119
              </span>
            </p>
          </div>
        </address>
      </section>
    </>
  );
}
