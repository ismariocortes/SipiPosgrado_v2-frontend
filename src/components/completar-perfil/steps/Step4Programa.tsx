import { MOCK_PROGRAMAS } from "../mockData";
import { helperNoteClass, inputClass, labelClass, sectionTitleClass } from "../fieldStyles";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

export function Step4Programa({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Programa</h2>

      <div className="space-y-2">
        <label htmlFor="cp-program_id" className={labelClass}>
          Programa al que aspiras
        </label>
        <select
          id="cp-program_id"
          name="program_id"
          value={value.program_id}
          onChange={(e) => onChange({ program_id: e.target.value })}
          className={inputClass}
        >
          <option value="">Selecciona…</option>
          {MOCK_PROGRAMAS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <p className={helperNoteClass}>
        La oferta final está sujeta a convocatoria y disponibilidad de la
        coordinación.
      </p>
    </div>
  );
}
