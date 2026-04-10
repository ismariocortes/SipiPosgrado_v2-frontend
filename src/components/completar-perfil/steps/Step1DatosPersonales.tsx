import { MOCK_ENTIDADES_NACIMIENTO } from "../mockData";
import {
  helperNoteClass,
  inputClass,
  labelClass,
  sectionTitleClass,
} from "../fieldStyles";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

/** Una fila en desktop (sm+): dos columnas; en móvil una columna. */
const rowGrid =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-x-6 sm:gap-y-4";

export function Step1DatosPersonales({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Datos personales</h2>

      <div className={rowGrid}>
        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-first_name" className={labelClass}>
            Nombre(s)
          </label>
          <input
            id="cp-first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={value.first_name}
            onChange={(e) => onChange({ first_name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-last_name" className={labelClass}>
            Apellidos
          </label>
          <input
            id="cp-last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            value={value.last_name}
            onChange={(e) => onChange({ last_name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-birth_date" className={labelClass}>
            Fecha de nacimiento
          </label>
          <input
            id="cp-birth_date"
            name="birth_date"
            type="date"
            value={value.birth_date}
            onChange={(e) => onChange({ birth_date: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-birth_entity" className={labelClass}>
            Entidad de nacimiento
          </label>
          <select
            id="cp-birth_entity"
            name="birth_entity"
            value={value.birth_entity}
            onChange={(e) => onChange({ birth_entity: e.target.value })}
            className={inputClass}
          >
            <option value="">Selecciona…</option>
            {MOCK_ENTIDADES_NACIMIENTO.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-gender" className={labelClass}>
            Género
          </label>
          <select
            id="cp-gender"
            name="gender"
            value={value.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
            className={inputClass}
          >
            <option value="">Selecciona…</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
            <option value="otro">Otro / Prefiero no decir</option>
          </select>
        </div>
        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-marital_status" className={labelClass}>
            Estado civil
          </label>
          <select
            id="cp-marital_status"
            name="marital_status"
            value={value.marital_status}
            onChange={(e) => onChange({ marital_status: e.target.value })}
            className={inputClass}
          >
            <option value="">Selecciona…</option>
            <option value="soltero">Soltero(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="union_libre">Unión libre</option>
            <option value="separado_divorciado">
              Separado(a) o divorciado(a)
            </option>
          </select>
        </div>
      </div>

      <p className={helperNoteClass}>
        Los datos deben coincidir con tu identificación oficial.
      </p>
    </div>
  );
}
