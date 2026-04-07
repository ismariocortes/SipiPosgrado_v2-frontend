import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import escudoHeader from "../assets/images/esc3.png";
import loginBackground from "../assets/images/b1.jpg";
import { getCurrentYear } from "../lib/currentYear";
import { safeAreaStyle } from "../lib/safeArea";

export function LoginPage() {
  const year = getCurrentYear();

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-x-clip bg-[#e8edf2] md:h-dvh md:flex-row md:overflow-hidden"
      style={safeAreaStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-dvh w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBackground})` }}
        aria-hidden
      />

      {/* Izquierda (~40%): marca + ciclo + universidad; más pl en md desplaza el bloque a la derecha */}
      <section className="relative z-[1] flex min-h-[min(42dvh,28rem)] w-full flex-col overflow-hidden px-6 py-8 text-white md:min-h-0 md:w-2/5 md:shrink-0 md:py-10 md:pl-10 md:pr-6 lg:pl-12 lg:pr-7">
        <div className="relative z-[2] flex w-full shrink-0 items-center gap-3 self-start">
          <img
            src={escudoHeader}
            alt="Escudo de la Universidad Autónoma de Yucatán"
            className="h-11 w-auto shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:h-14"
            decoding="async"
          />
          <div className="min-w-0 leading-tight">
            <p className="font-display text-[0.95rem] font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:text-[1.08rem]">
              SIPI
            </p>
            <p className="mt-0.5 text-[0.72rem] font-semibold text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)] md:text-[0.8rem]">
              Posgrados
            </p>
          </div>
        </div>

        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-1 py-3 text-center md:min-h-0 md:py-4">
          <div className="-mt-12 flex max-w-xl flex-col items-center gap-2.5 sm:-mt-14 md:-mt-[18.25rem]">
            <img
              src={escudoHeader}
              alt=""
              className="mb-3 h-28 w-auto max-w-[min(85%,12rem)] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:mb-4 sm:h-32 md:h-36"
              decoding="async"
              aria-hidden
            />
            <h2 className="font-display mt-1 max-w-[22ch] text-balance text-2xl font-bold tracking-tight text-white [text-shadow:2px_3px_12px_rgba(0,0,0,0.65)] sm:text-3xl">
              Proceso de ingreso a posgrados
            </h2>
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/85 [text-shadow:1px_2px_8px_rgba(0,0,0,0.5)] sm:text-[0.8rem]">
              Ciclo {year}
            </p>
            <div className="mx-auto mt-2 h-[5px] w-16 rounded-full bg-gradient-to-r from-[#3d657d] via-[#5c7d92] to-[#bc921c] sm:w-20" />
            <p className="font-display mt-3 text-lg font-semibold text-[#bc921c] [text-shadow:2px_3px_10px_rgba(0,0,0,0.55)] sm:text-xl">
              Febrero — Junio
            </p>
            <p className="mt-1 text-base font-medium text-white/95 [text-shadow:1px_2px_10px_rgba(0,0,0,0.55)] sm:text-[1.05rem]">
              Sistema de información del proceso de ingreso (SIPI)
            </p>
          </div>
        </div>

        <div className="relative z-[2] w-full shrink-0 text-center subpixel-antialiased md:pb-2">
          <p className="font-serif text-lg font-normal leading-snug tracking-normal text-white [text-shadow:2px_3px_12px_rgba(0,0,0,0.65)] sm:text-xl md:text-[1.35rem]">
            Universidad Autónoma de Yucatán
          </p>
          <p className="mt-3 font-coordination text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.08em] text-[#bc921c] [text-shadow:2px_3px_10px_rgba(0,0,0,0.55)] sm:text-[0.8125rem] sm:tracking-[0.1em]">
            Coordinación General del Sistema de Posgrado e Investigación
          </p>
        </div>
      </section>

      {/* Derecha: columna sin vidrio; solo el bloque del formulario usa glass */}
      <section className="relative z-[1] flex min-h-0 w-full flex-1 flex-col justify-center px-4 py-10 sm:px-6 md:min-h-0 md:h-full md:w-3/5 md:py-12">
        <div className="login-glass-panel mx-auto w-full max-w-md px-6 py-8 sm:px-8 sm:py-10">
          <header className="text-center sm:text-left">
            <h1 className="font-display text-balance text-3xl font-bold tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] sm:text-4xl">
              Regístrate aquí
            </h1>
            <p className="mt-2.5 text-pretty text-sm font-medium leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] sm:text-base">
              Si aún no te has registrado, crea tu cuenta aquí.
            </p>
            <Link
              to="/aviso-de-privacidad"
              className="mt-7 flex w-full items-center justify-center rounded-xl border border-[#9a7a1a] bg-[#bc921c] py-3.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(18,43,64,0.08)] transition hover:border-[#8a6e18] hover:bg-[#a67c18] hover:text-white"
            >
              Registro
            </Link>
          </header>

          <div
            className="my-9 flex items-center gap-3"
            role="separator"
            aria-label="Separador"
          >
            <div className="h-px flex-1 bg-white/35" aria-hidden />
            <span className="shrink-0 text-xs font-semibold lowercase tracking-wide text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
              o
            </span>
            <div className="h-px flex-1 bg-white/35" aria-hidden />
          </div>

          <LoginForm variant="embedded" />
        </div>
      </section>
    </div>
  );
}
