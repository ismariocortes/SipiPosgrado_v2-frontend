import axios from "axios";
import { type FormEvent, useId, useState } from "react";
import {
  getRegisterSubmitErrorMessage,
  parseRegisterFieldErrors422,
  type Laravel422Data,
} from "../lib/apiErrors";
import {
  buildRegisterPayload,
  validateRegisterForm,
  type RegisterFieldErrors,
} from "../lib/validation/register";
import { register } from "../services/authService";
import { IconShieldPrivacy } from "./icons";
import { PrivacyNoticeModal } from "./PrivacyNoticeModal";

const labelClass =
  "block text-sm font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]";

const fieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3d657d] focus:ring-2 focus:ring-[#3d657d]/25";

type EmbeddedRegisterFormProps = {
  /** `id` del título visible (p. ej. h1) que describe el formulario. */
  formAriaLabelledBy: string;
  /** Tras registro exitoso: mensaje para mostrar al volver al login. */
  onRegistered?: (successMessage: string) => void;
};

export function EmbeddedRegisterForm({
  formAriaLabelledBy,
  onRegistered,
}: EmbeddedRegisterFormProps) {
  const formId = useId();
  const [identityType, setIdentityType] = useState<
    "curp" | "passport"
  >("curp");
  const [identityValue, setIdentityValue] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<RegisterFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  function validate(): boolean {
    const next = validateRegisterForm({
      identityType,
      identityValue,
      email,
      phone,
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});
    setIsSubmitting(true);
    try {
      const payload = buildRegisterPayload({
        identityType,
        identityValue,
        email,
        phone,
      });
      await register(payload);
      onRegistered?.(
        `Registro exitoso. Te enviaremos un correo de confirmación a ${email.trim()} cuando el envío automático esté disponible.`,
      );
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const fields = parseRegisterFieldErrors422(err);
        if (Object.keys(fields).length > 0) {
          setErrors(fields);
        } else {
          const data = err.response.data as Laravel422Data;
          setErrors({
            submit: data.message ?? getRegisterSubmitErrorMessage(err),
          });
        }
      } else {
        setErrors({ submit: getRegisterSubmitErrorMessage(err) });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="font-display space-y-5"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={formAriaLabelledBy}
    >
      {errors.submit ? (
        <div role="alert" className="uady-alert uady-alert--error text-left">
          <strong className="font-semibold">Error. </strong>
          {errors.submit}
        </div>
      ) : null}

      <section className="space-y-4" aria-labelledby={`${formId}-identidad`}>
        <div>
          <p
            id={`${formId}-identidad`}
            className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/70"
          >
            Identidad
          </p>
        </div>
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-identity-type`}
            className={labelClass}
          >
            Tipo de identificación
          </label>
          <select
            id={`${formId}-identity-type`}
            name="identity_type"
            value={identityType}
            onChange={(e) => {
              setIdentityType(e.target.value as "curp" | "passport");
              setErrors((p) => ({
                ...p,
                identity_type: undefined,
                identity_value: undefined,
              }));
            }}
            className={fieldClass}
            aria-invalid={errors.identity_type ? true : undefined}
            aria-describedby={
              errors.identity_type ? `${formId}-identity-type-err` : undefined
            }
          >
            <option value="curp">CURP</option>
            <option value="passport">Pasaporte</option>
          </select>
          {errors.identity_type ? (
            <p
              id={`${formId}-identity-type-err`}
              className="text-sm text-red-300"
            >
              {errors.identity_type}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label
            htmlFor={`${formId}-identity-value`}
            className={labelClass}
          >
            {identityType === "curp" ? "CURP" : "Número de pasaporte"}
          </label>
          <input
            id={`${formId}-identity-value`}
            name="identity_value"
            type="text"
            value={identityValue}
            onChange={(e) => {
              setIdentityValue(e.target.value);
              if (errors.identity_value) {
                setErrors((p) => ({ ...p, identity_value: undefined }));
              }
            }}
            placeholder={
              identityType === "curp"
                ? "ABCD123456HDFXXX00"
                : "Según tu documento"
            }
            className={fieldClass}
            aria-invalid={errors.identity_value ? true : undefined}
            aria-describedby={
              errors.identity_value
                ? `${formId}-identity-value-err`
                : undefined
            }
          />
          {errors.identity_value ? (
            <p
              id={`${formId}-identity-value-err`}
              className="text-sm text-red-300"
            >
              {errors.identity_value}
            </p>
          ) : null}
        </div>
      </section>

      <div className="border-t border-white/20" aria-hidden />

      <section className="space-y-4" aria-labelledby={`${formId}-contacto`}>
        <div>
          <p
            id={`${formId}-contacto`}
            className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/70"
          >
            Contacto
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Correo electrónico
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((p) => ({ ...p, email: undefined }));
              }
            }}
            placeholder="nombre@correo.com"
            className={fieldClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? `${formId}-email-err` : undefined
            }
          />
          {errors.email ? (
            <p id={`${formId}-email-err`} className="text-sm text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor={`${formId}-phone`} className={labelClass}>
            Teléfono
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="text"
            autoComplete="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) {
                setErrors((p) => ({ ...p, phone: undefined }));
              }
            }}
            placeholder="9991234567"
            className={fieldClass}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={
              errors.phone ? `${formId}-phone-err` : undefined
            }
          />
          {errors.phone ? (
            <p id={`${formId}-phone-err`} className="text-sm text-red-300">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl border border-[#9a7a1a] bg-[#bc921c] py-3.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(18,43,64,0.12)] transition hover:border-[#8a6e18] hover:bg-[#a67c18] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando…" : "Crear cuenta"}
      </button>

      <p className="flex justify-end">
        <button
          type="button"
          onClick={() => setPrivacyModalOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/45 underline-offset-4 transition hover:text-white/90 hover:decoration-white/70"
        >
          <IconShieldPrivacy className="h-4 w-4 shrink-0 opacity-90" />
          Aviso de privacidad
        </button>
      </p>

      <PrivacyNoticeModal
        open={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </form>
  );
}
