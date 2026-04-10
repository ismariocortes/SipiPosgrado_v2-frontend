import {
  helperNoteClass,
  sectionTitleClass,
  radioLabelClass,
} from "../fieldStyles";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

const noteBoxClass =
  "border-l-4 border-[#bc921c]/80 bg-amber-50/90 px-3 py-2 text-xs leading-relaxed text-slate-800";

export function Step5Examenes({ value, onChange }: Props) {
  return (
    <div className="space-y-10">
      <h2 className={sectionTitleClass}>Exámenes</h2>

      <section className="space-y-4" aria-labelledby="cp-exani-heading">
        <h3
          id="cp-exani-heading"
          className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#122b40]"
        >
          EXANI III
        </h3>
        <p className="text-sm font-medium text-slate-800">
          ¿Presentarás el examen EXANI III?
        </p>
        <div className="space-y-3">
          <label className={radioLabelClass}>
            <input
              type="radio"
              name="has_exani"
              checked={value.has_exani === true}
              onChange={() => onChange({ has_exani: true })}
              className="mt-1 h-4 w-4 shrink-0 border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
            />
            <span>Sí</span>
          </label>
          <label className={radioLabelClass}>
            <input
              type="radio"
              name="has_exani"
              checked={value.has_exani === false}
              onChange={() => onChange({ has_exani: false })}
              className="mt-1 h-4 w-4 shrink-0 border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
            />
            <span>No (ya cuento con EXANI III vigente)</span>
          </label>
        </div>
        <p className={noteBoxClass}>
          El EXANI III se considera vigente si lo aprobó en los años 2024,
          2025 o 2026.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="cp-ingles-heading">
        <h3
          id="cp-ingles-heading"
          className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#122b40]"
        >
          Examen de inglés
        </h3>
        <p className="text-sm font-medium text-slate-800">
          Modalidad del examen de inglés
        </p>
        <div className="space-y-3">
          <label className={radioLabelClass}>
            <input
              type="radio"
              name="english_exam_mode"
              checked={value.english_exam_mode === "presencial"}
              onChange={() => onChange({ english_exam_mode: "presencial" })}
              className="mt-1 h-4 w-4 shrink-0 border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
            />
            <span>Presencial</span>
          </label>
          <label className={radioLabelClass}>
            <input
              type="radio"
              name="english_exam_mode"
              checked={value.english_exam_mode === "linea"}
              onChange={() => onChange({ english_exam_mode: "linea" })}
              className="mt-1 h-4 w-4 shrink-0 border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
            />
            <span>En línea</span>
          </label>
        </div>
        <p className={helperNoteClass}>
          El examen de inglés es requisito para este programa.
        </p>
      </section>
    </div>
  );
}
