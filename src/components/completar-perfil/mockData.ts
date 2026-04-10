/** Datos de ejemplo para selects (México / Yucatán) — sustituir por API */

export type MockEscuela = { id: string; nombre: string };

export type MockMunicipio = { id: string; nombre: string; escuelas: MockEscuela[] };

export type MockEstado = { id: string; nombre: string; municipios: MockMunicipio[] };

export const MOCK_ESTADOS_PROCEDENCIA: MockEstado[] = [
  {
    id: "yuc",
    nombre: "Yucatán",
    municipios: [
      {
        id: "mer",
        nombre: "Mérida",
        escuelas: [
          { id: "uady-fc", nombre: "UADY — Facultad de Ciencias" },
          { id: "uady-ing", nombre: "UADY — Facultad de Ingeniería" },
          { id: "otra-mer", nombre: "Otra institución (Mérida)" },
        ],
      },
      {
        id: "kau",
        nombre: "Kanasín",
        escuelas: [
          { id: "tec-kau", nombre: "Instituto Tecnológico de Kanasín" },
        ],
      },
    ],
  },
  {
    id: "cdmx",
    nombre: "Ciudad de México",
    municipios: [
      {
        id: "coyo",
        nombre: "Coyoacán",
        escuelas: [
          { id: "unam-ciencias", nombre: "UNAM — Ciencias" },
        ],
      },
    ],
  },
];

/** Entidades federativas (entidad de nacimiento) — muestra; sustituir por catálogo oficial. */
export const MOCK_ENTIDADES_NACIMIENTO: { id: string; nombre: string }[] = [
  { id: "yuc", nombre: "Yucatán" },
  { id: "camp", nombre: "Campeche" },
  { id: "qroo", nombre: "Quintana Roo" },
  { id: "cdmx", nombre: "Ciudad de México" },
  { id: "jal", nombre: "Jalisco" },
  { id: "nl", nombre: "Nuevo León" },
  { id: "chih", nombre: "Chihuahua" },
  { id: "son", nombre: "Sonora" },
  { id: "ver", nombre: "Veracruz" },
  { id: "pue", nombre: "Puebla" },
  { id: "gto", nombre: "Guanajuato" },
  { id: "oax", nombre: "Oaxaca" },
  { id: "chis", nombre: "Chiapas" },
  { id: "extranjero", nombre: "Extranjero" },
];

export const MOCK_PROGRAMAS = [
  { id: "pos-mat", nombre: "Maestría en Matemáticas Aplicadas" },
  { id: "pos-comp", nombre: "Maestría en Ciencias de la Computación" },
  { id: "doc-fis", nombre: "Doctorado en Física" },
];
