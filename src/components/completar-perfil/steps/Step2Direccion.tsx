import { inputClass, labelClass, sectionTitleClass } from "../fieldStyles";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

const rowGrid =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-x-6 sm:gap-y-4";

/** Calle, número, cruzamientos, colonia: una fila en lg+; 2×2 en sm; columna en móvil. */
const rowStreetBlock =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(4.5rem,6rem)_minmax(0,1.25fr)_minmax(0,1.25fr)] lg:items-start lg:gap-x-4";

/** Localidad + CP: primera columna más ancha en desktop. */
const rowPairWideNarrow =
  "grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(5.5rem,9rem)] sm:items-start sm:gap-x-6 sm:gap-y-4";

export function Step2Direccion({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Dirección</h2>

      <div className="space-y-4">
        <div className={rowStreetBlock}>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-calle" className={labelClass}>
              Calle
            </label>
            <input
              id="cp-calle"
              name="calle"
              type="text"
              autoComplete="address-line1"
              value={value.calle}
              onChange={(e) => onChange({ calle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-numero" className={labelClass}>
              Número
            </label>
            <input
              id="cp-numero"
              name="numero"
              type="text"
              autoComplete="off"
              value={value.numero}
              onChange={(e) => onChange({ numero: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-cruzamientos" className={labelClass}>
              Cruzamientos
            </label>
            <input
              id="cp-cruzamientos"
              name="cruzamientos"
              type="text"
              value={value.cruzamientos}
              onChange={(e) => onChange({ cruzamientos: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-colonia" className={labelClass}>
              Colonia
            </label>
            <input
              id="cp-colonia"
              name="colonia"
              type="text"
              autoComplete="address-level3"
              value={value.colonia}
              onChange={(e) => onChange({ colonia: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className={rowGrid}>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-state" className={labelClass}>
              Estado
            </label>
            <input
              id="cp-state"
              name="state"
              type="text"
              autoComplete="address-level1"
              value={value.state}
              onChange={(e) => onChange({ state: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-municipio_domicilio" className={labelClass}>
              Municipio
            </label>
            <input
              id="cp-municipio_domicilio"
              name="municipio_domicilio"
              type="text"
              autoComplete="address-level2"
              value={value.municipio_domicilio}
              onChange={(e) =>
                onChange({ municipio_domicilio: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className={rowPairWideNarrow}>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-localidad" className={labelClass}>
              Localidad
            </label>
            <input
              id="cp-localidad"
              name="localidad"
              type="text"
              value={value.localidad}
              onChange={(e) => onChange({ localidad: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-zip" className={labelClass}>
              CP
            </label>
            <input
              id="cp-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={value.zip}
              onChange={(e) => onChange({ zip: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
