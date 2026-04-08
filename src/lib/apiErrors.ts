import axios from "axios";
import type { RegisterPayload } from "../services/authService";

export type Laravel422Data = {
  message?: string;
  errors?: Record<string, string[]>;
};

export const MSG_NETWORK =
  "No se pudo conectar con el servidor. Verifica tu conexión.";

function parseFastApiStyleDetail(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const d = data as { detail?: unknown };
  const detail = d.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0] && typeof detail[0] === "object") {
    const first = detail[0] as { msg?: string };
    if (first.msg) return first.msg;
  }
  return undefined;
}

/** Mensaje para errores de login (401, red, detalle FastAPI, etc.). */
export function getLoginErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err)) {
    return "Ocurrió un error inesperado.";
  }
  const fast = parseFastApiStyleDetail(err.response?.data);
  if (fast) return fast;
  if (err.response?.status === 401) {
    const data = err.response.data as { message?: string } | undefined;
    if (typeof data?.message === "string") return data.message;
    return "Credenciales incorrectas.";
  }
  if (!err.response) return MSG_NETWORK;
  return "No se pudo iniciar sesión. Intenta de nuevo.";
}

const REGISTER_FIELD_KEYS: (keyof RegisterPayload)[] = [
  "identity_type",
  "identity_value",
  "email",
  "phone",
];

/** Primer mensaje por campo en respuesta 422 tipo Laravel. */
export function parseRegisterFieldErrors422(
  err: unknown,
): Partial<Record<keyof RegisterPayload, string>> {
  const out: Partial<Record<keyof RegisterPayload, string>> = {};
  if (!axios.isAxiosError(err) || err.response?.status !== 422) return out;
  const data = err.response.data as Laravel422Data | undefined;
  if (!data?.errors) return out;
  for (const key of REGISTER_FIELD_KEYS) {
    const msgs = data.errors[key];
    if (msgs?.[0]) out[key] = msgs[0];
  }
  return out;
}

/** Mensaje general cuando el registro falla (sin mapeo por campo o como respaldo). */
export function getRegisterSubmitErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err)) {
    return "No se pudo registrar.";
  }
  const raw = err.response?.data;
  if (err.response?.status === 422 && raw && typeof raw === "object") {
    const msg = (raw as Laravel422Data).message;
    if (typeof msg === "string") return msg;
  }
  const fast = parseFastApiStyleDetail(raw);
  if (fast) return fast;
  if (!err.response) return MSG_NETWORK;
  return "No se pudo registrar.";
}
