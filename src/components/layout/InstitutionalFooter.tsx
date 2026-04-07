export function InstitutionalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto shrink-0 border-t border-slate-200 bg-white py-4 text-center text-[0.65rem] leading-relaxed text-slate-500 sm:text-xs">
      <p>© {year} Universidad Autónoma de Yucatán</p>
      <p className="mt-0.5 text-slate-400">
        Uso exclusivo de la comunidad universitaria.
      </p>
    </footer>
  );
}
