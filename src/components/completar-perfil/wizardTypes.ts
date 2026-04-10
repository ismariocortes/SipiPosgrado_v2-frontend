/** Estado del formulario multi-paso — completar perfil SIPI Posgrados */

export type EnglishExamMode = "presencial" | "linea";

export type DisabilityCode = "visual" | "auditiva" | "motriz";

/** Valores internos alineados con etiquetas de UI */
export type DisabilityPercentage =
  | "lt30"
  | "31-59"
  | "60-89"
  | "90-100";

export type DisabilityEntry = {
  type: DisabilityCode;
  /** Vacío hasta que el usuario elija (validación en paso 6) */
  percentage: DisabilityPercentage | "";
};

export type CompleteProfileFormState = {
  // Paso 1 — Datos personales
  first_name: string;
  last_name: string;
  birth_date: string;
  /** id de entidad federativa (mock) */
  birth_entity: string;
  gender: string;
  /** soltero | casado | union_libre | separado_divorciado */
  marital_status: string;

  // Paso 2 — Dirección
  calle: string;
  numero: string;
  cruzamientos: string;
  colonia: string;
  state: string;
  /** Municipio del domicilio (distinto del municipio de escuela en paso 3) */
  municipio_domicilio: string;
  localidad: string;
  zip: string;

  // Paso 3 — Escuela de procedencia
  estado: string;
  municipio: string;
  escuela: string;
  school_name: string;

  // Paso 4 — Programa
  program_id: string;

  // Paso 5 — Exámenes
  has_exani: boolean | null;
  english_exam_mode: EnglishExamMode | null;

  // Paso 6 — Discapacidad
  disability_none: boolean;
  disabilities: DisabilityEntry[];
  special_requirements: string;

  // Paso 7
  confirmation_accepted: boolean;
};

export const INITIAL_WIZARD_STATE: CompleteProfileFormState = {
  first_name: "",
  last_name: "",
  birth_date: "",
  birth_entity: "",
  gender: "",
  marital_status: "",
  calle: "",
  numero: "",
  cruzamientos: "",
  colonia: "",
  state: "",
  municipio_domicilio: "",
  localidad: "",
  zip: "",
  estado: "",
  municipio: "",
  escuela: "",
  school_name: "",
  program_id: "",
  has_exani: null,
  english_exam_mode: null,
  disability_none: false,
  disabilities: [],
  special_requirements: "",
  confirmation_accepted: false,
};
