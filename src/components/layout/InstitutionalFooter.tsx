type InstitutionalFooterProps = {
  /** Variante visual del pie (p. ej. fondo oscuro en ciertas pantallas). */
  tone?: "light" | "dark";
};

export function InstitutionalFooter({ tone = "light" }: InstitutionalFooterProps) {
  const year = new Date().getFullYear();
  const isDark = tone === "dark";

  return (
    <footer
      className={
        isDark
          ? "relative z-10 mt-auto shrink-0 border-t border-slate-700/80 bg-slate-950 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] text-center text-[0.65rem] leading-relaxed text-slate-400 sm:text-xs"
          : "relative z-10 mt-auto shrink-0 border-t border-slate-200 bg-white py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] text-center text-[0.65rem] leading-relaxed text-slate-500 sm:text-xs"
      }
    >
      <p>© {year} Universidad Autónoma de Yucatán</p>
      <p className={isDark ? "mt-0.5 text-slate-500" : "mt-0.5 text-slate-400"}>
        Uso exclusivo de la comunidad universitaria.
      </p>
    </footer>
  );
}
