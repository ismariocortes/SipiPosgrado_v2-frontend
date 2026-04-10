import { MOCK_ENTIDADES_NACIMIENTO, MOCK_PROGRAMAS } from "./mockData";
import type { CompleteProfileFormState } from "./wizardTypes";
import { resolveEscuelaNombre } from "./validateWizardStep";

const GENDER: Record<string, string> = {
  femenino: "Femenino",
  masculino: "Masculino",
  otro: "Otro / Prefiero no decir",
};

const PCT: Record<string, string> = {
  lt30: "Menor a 30",
  "31-59": "31–59",
  "60-89": "60–89",
  "90-100": "90–100",
};

const DIS: Record<string, string> = {
  visual: "Visual",
  auditiva: "Auditiva",
  motriz: "Motriz",
};

export function labelGender(v: string): string {
  return GENDER[v] ?? v;
}

const MARITAL: Record<string, string> = {
  soltero: "Soltero(a)",
  casado: "Casado(a)",
  union_libre: "Unión libre",
  separado_divorciado: "Separado(a) o divorciado(a)",
};

export function labelMaritalStatus(v: string): string {
  return MARITAL[v] ?? v;
}

export function labelBirthEntity(id: string): string {
  return MOCK_ENTIDADES_NACIMIENTO.find((e) => e.id === id)?.nombre ?? id;
}

export function labelProgram(id: string): string {
  return MOCK_PROGRAMAS.find((p) => p.id === id)?.nombre ?? id;
}

export function formatExani(v: boolean | null): string {
  if (v === true) return "Sí, presentaré el EXANI III";
  if (v === false) return "No (cuento con EXANI III vigente)";
  return "—";
}

export function formatEnglish(
  m: CompleteProfileFormState["english_exam_mode"],
): string {
  if (m === "presencial") return "Presencial";
  if (m === "linea") return "En línea";
  return "—";
}

export function formatDisabilities(s: CompleteProfileFormState): string {
  if (s.disability_none) return "Ninguna";
  if (s.disabilities.length === 0) return "—";
  return s.disabilities
    .map((d) => `${DIS[d.type] ?? d.type}: ${PCT[d.percentage] ?? d.percentage}`)
    .join("; ");
}

export function schoolDisplay(s: CompleteProfileFormState): string {
  const fromSelect = resolveEscuelaNombre(s.estado, s.municipio, s.escuela);
  if (fromSelect) return fromSelect;
  return s.school_name || "—";
}
