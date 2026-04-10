import type { ReactNode } from "react";
import { sectionTitleClass } from "../fieldStyles";
import {
  formatDisabilities,
  formatEnglish,
  formatExani,
  labelBirthEntity,
  labelGender,
  labelMaritalStatus,
  labelProgram,
  schoolDisplay,
} from "../summaryLabels";
import type { CompleteProfileFormState } from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-stone-200/90 py-3 last:border-b-0">
      <dt className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-900">{children}</dd>
    </div>
  );
}

export function Step7Confirmacion({ value, onChange }: Props) {
  return (
    <div className="space-y-8">
      <h2 className={sectionTitleClass}>Confirmación</h2>

      <p className="text-sm leading-relaxed text-slate-600">
        Revisa que los datos sean correctos antes de enviar tu solicitud.
      </p>

      <dl className="border-t border-stone-300/90">
        <Row label="Nombre(s)">{value.first_name || "—"}</Row>
        <Row label="Apellidos">{value.last_name || "—"}</Row>
        <Row label="Fecha de nacimiento">{value.birth_date || "—"}</Row>
        <Row label="Entidad de nacimiento">
          {value.birth_entity ? labelBirthEntity(value.birth_entity) : "—"}
        </Row>
        <Row label="Género">{labelGender(value.gender) || "—"}</Row>
        <Row label="Estado civil">
          {value.marital_status ? labelMaritalStatus(value.marital_status) : "—"}
        </Row>
        <Row label="Calle">{value.calle || "—"}</Row>
        <Row label="Número">{value.numero || "—"}</Row>
        <Row label="Cruzamientos">{value.cruzamientos || "—"}</Row>
        <Row label="Colonia">{value.colonia || "—"}</Row>
        <Row label="Estado (domicilio)">{value.state || "—"}</Row>
        <Row label="Municipio (domicilio)">{value.municipio_domicilio || "—"}</Row>
        <Row label="Localidad">{value.localidad || "—"}</Row>
        <Row label="CP">{value.zip || "—"}</Row>
        <Row label="Escuela de procedencia">{schoolDisplay(value)}</Row>
        <Row label="Programa">{labelProgram(value.program_id)}</Row>
        <Row label="EXANI III">{formatExani(value.has_exani)}</Row>
        <Row label="Examen de inglés">{formatEnglish(value.english_exam_mode)}</Row>
        <Row label="Discapacidad">{formatDisabilities(value)}</Row>
        <Row label="Requerimientos especiales">
          {value.special_requirements.trim() || "—"}
        </Row>
      </dl>

      <div className="border-t border-stone-300/90 pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={value.confirmation_accepted}
            onChange={(e) =>
              onChange({ confirmation_accepted: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 rounded border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
          />
          <span>
            Confirmo que la información es correcta y que los documentos
            presentados son verídicos.
          </span>
        </label>
      </div>
    </div>
  );
}
