/** Año calendario actual en el cliente (se actualiza en cada render). */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
