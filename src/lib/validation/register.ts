import type { RegisterPayload } from "../../services/authService";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_DIGITS_RE = /^\d{10}$/;
export const CURP_LENIENT_RE = /^[A-ZÑ0-9]{18}$/i;
export const PASSPORT_RE = /^[A-Z0-9]+$/;

export type RegisterFormState = {
  identityType: RegisterPayload["identity_type"];
  identityValue: string;
  email: string;
  phone: string;
};

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterPayload | "submit", string>
>;

/** Validación en cliente antes de enviar al API. */
export function validateRegisterForm(state: RegisterFormState): RegisterFieldErrors {
  const next: RegisterFieldErrors = {};
  const { identityType, identityValue, email, phone } = state;

  if (!identityValue.trim()) {
    next.identity_value = "Este campo es obligatorio.";
  } else if (identityType === "curp") {
    const v = identityValue.trim().toUpperCase();
    if (v.length !== 18 || !CURP_LENIENT_RE.test(v)) {
      next.identity_value =
        "Ingresa un CURP válido (18 caracteres alfanuméricos).";
    }
  } else {
    const v = identityValue.replace(/\s/g, "").toUpperCase();
    if (!v) {
      next.identity_value = "Este campo es obligatorio.";
    } else if (v.length > 50) {
      next.identity_value = "Máximo 50 caracteres (solo letras y números).";
    } else if (!PASSPORT_RE.test(v)) {
      next.identity_value = "Usa solo letras (A-Z) y números, sin espacios.";
    }
  }

  if (!email.trim()) {
    next.email = "El correo es obligatorio.";
  } else if (!EMAIL_RE.test(email.trim())) {
    next.email = "Ingresa un correo electrónico válido.";
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (!phoneDigits) {
    next.phone = "El teléfono es obligatorio.";
  } else if (!PHONE_DIGITS_RE.test(phoneDigits)) {
    next.phone = "Ingresa 10 dígitos (ej. 9991234567).";
  }

  return next;
}

export function buildRegisterPayload(state: RegisterFormState): RegisterPayload {
  return {
    identity_type: state.identityType,
    identity_value:
      state.identityType === "curp"
        ? state.identityValue.trim().toUpperCase()
        : state.identityValue.replace(/\s/g, "").toUpperCase(),
    email: state.email.trim(),
    phone: state.phone.replace(/\D/g, ""),
  };
}
