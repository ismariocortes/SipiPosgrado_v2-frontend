import { MOCK_ESTADOS_PROCEDENCIA } from "./mockData";
import type { CompleteProfileFormState } from "./wizardTypes";

export const WIZARD_STEP_LABELS = [
  "Datos personales",
  "Dirección",
  "Escuela de procedencia",
  "Programa",
  "Exámenes",
  "Información adicional (discapacidad)",
  "Confirmación",
] as const;

export const WIZARD_STEP_COUNT = 7;

function trim(s: string): string {
  return s.trim();
}

/** Valida el paso 0..6; devuelve mensaje de error o null si es válido. */
export function validateWizardStep(
  stepIndex: number,
  s: CompleteProfileFormState,
): string | null {
  switch (stepIndex) {
    case 0: {
      if (!trim(s.first_name)) return "Indica tu nombre.";
      if (!trim(s.last_name)) return "Indica tus apellidos.";
      if (!s.birth_date) return "Indica tu fecha de nacimiento.";
      if (!trim(s.birth_entity)) return "Selecciona la entidad de nacimiento.";
      if (!trim(s.gender)) return "Selecciona el género.";
      if (!trim(s.marital_status)) return "Selecciona el estado civil.";
      return null;
    }
    case 1: {
      if (!trim(s.calle)) return "Indica la calle.";
      if (!trim(s.numero)) return "Indica el número.";
      if (!trim(s.cruzamientos)) return "Indica los cruzamientos.";
      if (!trim(s.colonia)) return "Indica la colonia.";
      if (!trim(s.state)) return "Indica el estado.";
      if (!trim(s.municipio_domicilio)) return "Indica el municipio.";
      if (!trim(s.localidad)) return "Indica la localidad.";
      if (!trim(s.zip)) return "Indica el código postal (CP).";
      return null;
    }
    case 2: {
      if (!trim(s.estado)) return "Selecciona el estado de procedencia.";
      if (!trim(s.municipio)) return "Selecciona el municipio.";
      if (!trim(s.escuela)) return "Selecciona la escuela.";
      return null;
    }
    case 3: {
      if (!trim(s.program_id)) return "Selecciona un programa.";
      return null;
    }
    case 4: {
      if (s.has_exani === null) return "Indica si presentarás el EXANI III.";
      if (s.english_exam_mode === null) {
        return "Selecciona la modalidad del examen de inglés.";
      }
      return null;
    }
    case 5: {
      if (s.disability_none) return null;
      if (s.disabilities.length === 0) {
        return "Selecciona «Ninguna» o al menos un tipo de discapacidad.";
      }
      for (const d of s.disabilities) {
        if (!d.percentage) {
          return "Indica el porcentaje para cada discapacidad seleccionada.";
        }
      }
      return null;
    }
    case 6: {
      if (!s.confirmation_accepted) {
        return "Debes confirmar que la información es correcta.";
      }
      return null;
    }
    default:
      return null;
  }
}

/** Resuelve el nombre de escuela desde mocks (para confirmación). */
export function resolveEscuelaNombre(
  estadoId: string,
  municipioId: string,
  escuelaId: string,
): string {
  const edo = MOCK_ESTADOS_PROCEDENCIA.find((e) => e.id === estadoId);
  const mun = edo?.municipios.find((m) => m.id === municipioId);
  const esc = mun?.escuelas.find((e) => e.id === escuelaId);
  return esc?.nombre ?? "";
}
