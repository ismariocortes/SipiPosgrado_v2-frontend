import escudoHeader from "../../assets/images/esc3.png";

export function InstitutionalHeader() {
  return (
    <header className="relative z-20 shrink-0 border-b border-[#0d1f2e] bg-[#122b40] text-white shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#bc921c]/65 to-transparent"
        aria-hidden
      />

      <div className="relative flex w-full items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4">
        <div className="flex shrink-0 items-center border-r border-white/20 pr-3 sm:pr-5">
          <img
            src={escudoHeader}
            alt="Universidad Autónoma de Yucatán"
            className="h-[3.25rem] w-auto object-contain object-left sm:h-[4.5rem] md:h-[5.25rem]"
            decoding="async"
          />
        </div>

        <div className="min-w-0 subpixel-antialiased">
          <p className="font-serif text-[1.0625rem] font-normal leading-snug tracking-normal text-white [text-shadow:2px_3px_rgba(0,0,0,0.42)] sm:text-xl sm:leading-tight md:text-[1.55rem]">
            Universidad Autónoma de Yucatán
          </p>
          <p className="mt-2 font-coordination text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.08em] text-[#bc921c] [text-shadow:2px_3px_rgba(0,0,0,0.42)] sm:text-[0.8125rem] sm:tracking-[0.1em]">
            Coordinación General del Sistema de Posgrado e Investigación
          </p>
        </div>

        <div className="hidden shrink-0 flex-col justify-center border-l border-white/20 pl-3 sm:ml-auto sm:flex sm:pl-4">
          <div className="subpixel-antialiased rounded-md bg-white/[0.07] px-3 py-2 text-center font-sans ring-1 ring-white/10">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
              SIPI
            </p>
            <p className="mt-0.5 text-[0.6rem] font-semibold text-white/70">
              Posgrados
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
