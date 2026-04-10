import { useMemo } from "react";
import { MOCK_ESTADOS_PROCEDENCIA } from "../mockData";
import { inputClass, labelClass, sectionTitleClass } from "../fieldStyles";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

const rowEstadoMunicipio =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start sm:gap-x-6 sm:gap-y-4";

export function Step3Escuela({ value, onChange }: Props) {
  const municipios = useMemo(() => {
    const edo = MOCK_ESTADOS_PROCEDENCIA.find((e) => e.id === value.estado);
    return edo?.municipios ?? [];
  }, [value.estado]);

  const escuelas = useMemo(() => {
    const mun = municipios.find((m) => m.id === value.municipio);
    return mun?.escuelas ?? [];
  }, [municipios, value.municipio]);

  function setEstado(id: string) {
    onChange({
      estado: id,
      municipio: "",
      escuela: "",
      school_name: "",
    });
  }

  function setMunicipio(id: string) {
    onChange({
      municipio: id,
      escuela: "",
      school_name: "",
    });
  }

  function setEscuela(id: string) {
    const mun = municipios.find((m) => m.id === value.municipio);
    const esc = mun?.escuelas.find((e) => e.id === id);
    onChange({
      escuela: id,
      school_name: esc?.nombre ?? "",
    });
  }

  return (
    <div className="space-y-6">
      <h2 className={sectionTitleClass}>Escuela de procedencia</h2>

      <div className="space-y-4">
        <div className={rowEstadoMunicipio}>
          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-estado-proc" className={labelClass}>
              Estado
            </label>
            <select
              id="cp-estado-proc"
              value={value.estado}
              onChange={(e) => setEstado(e.target.value)}
              className={inputClass}
            >
              <option value="">Selecciona…</option>
              {MOCK_ESTADOS_PROCEDENCIA.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 min-w-0">
            <label htmlFor="cp-municipio-proc" className={labelClass}>
              Municipio
            </label>
            <select
              id="cp-municipio-proc"
              value={value.municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              disabled={!value.estado}
              className={inputClass}
            >
              <option value="">Selecciona…</option>
              {municipios.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <label htmlFor="cp-escuela-proc" className={labelClass}>
            Escuela
          </label>
          <select
            id="cp-escuela-proc"
            value={value.escuela}
            onChange={(e) => setEscuela(e.target.value)}
            disabled={!value.municipio}
            className={inputClass}
          >
            <option value="">Selecciona…</option>
            {escuelas.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
