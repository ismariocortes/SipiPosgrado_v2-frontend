import { WIZARD_STEP_COUNT, WIZARD_STEP_LABELS } from "./validateWizardStep";

type StepperProps = {
  currentStep: number;
};

export function Stepper({ currentStep }: StepperProps) {
  return (
    <nav
      className="border-b border-stone-300/90 pb-4"
      aria-label="Progreso del formulario"
    >
      <p className="font-display text-sm font-semibold text-[#122b40]">
        Paso {currentStep + 1} de {WIZARD_STEP_COUNT}
      </p>
      <ol className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
        {WIZARD_STEP_LABELS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <li key={label} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span className="text-stone-300" aria-hidden>
                  ·
                </span>
              ) : null}
              <span
                className={
                  active
                    ? "text-[#122b40]"
                    : done
                      ? "text-[#3d657d]"
                      : "text-slate-400"
                }
              >
                <span className="sr-only">
                  {active ? "Paso actual: " : done ? "Completado: " : "Pendiente: "}
                </span>
                {i + 1}. {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
