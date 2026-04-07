import { UadySeal } from "../UadySeal";

export function InstitutionalHeader() {
  return (
    <header className="relative z-20 shrink-0 border-b border-white/10 bg-[#003366] text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <UadySeal className="h-9 w-auto max-h-10 max-w-[2.75rem] shrink-0 opacity-95 sm:h-10 sm:max-w-[3rem]" />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[0.8rem] font-semibold leading-snug sm:text-base">
            Universidad Autónoma de Yucatán
          </p>
          <p className="mt-0.5 text-[0.55rem] font-medium uppercase leading-tight tracking-[0.14em] text-amber-200/90 sm:text-[0.62rem] sm:tracking-[0.18em]">
            Coordinación General del Sistema de Posgrado e Investigación
          </p>
        </div>
        <div className="hidden shrink-0 rounded-lg bg-white/10 px-2.5 py-1.5 text-center sm:block">
          <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/80">
            SIPI
          </p>
          <p className="text-[0.55rem] text-white/60">Posgrados</p>
        </div>
      </div>
    </header>
  );
}
