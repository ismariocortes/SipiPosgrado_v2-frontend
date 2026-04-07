import axios from "axios";
import { type FormEvent, useState } from "react";
import { login } from "../services/authService";

function IconUser({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconEyeOff({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function formatLoginError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { detail?: unknown } | undefined;
    const detail = data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail[0] && typeof detail[0] === "object") {
      const first = detail[0] as { msg?: string };
      if (first.msg) return first.msg;
    }
    if (err.response?.status === 401) {
      return "Folio o contraseña incorrectos.";
    }
    if (!err.response) {
      return "No se pudo conectar con el servidor. Verifica tu conexión.";
    }
    return "No se pudo iniciar sesión. Intenta de nuevo.";
  }
  return "Ocurrió un error inesperado.";
}

type LoginFormProps = {
  onSuccess?: () => void;
  /** Sin tarjeta: título compacto e inputs estilo plano sobre fondo blanco */
  variant?: "default" | "embedded";
};

export function LoginForm({ onSuccess, variant = "default" }: LoginFormProps) {
  const embedded = variant === "embedded";
  const [folio, setFolio] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    clearFeedback();
    setIsSubmitting(true);
    try {
      const res = await login({
        folio: folio.trim(),
        password,
      });
      localStorage.setItem("token", res.token);
      setSuccessMessage(
        "Sesión iniciada correctamente. El token ya está guardado en este navegador.",
      );
      onSuccess?.();
    } catch (err) {
      setError(formatLoginError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={
        embedded
          ? "font-display space-y-6"
          : "space-y-5"
      }
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={embedded ? "login-embedded-title" : "login-form-title"}
    >
      <div>
        {embedded ? (
          <>
            <h2
              id="login-embedded-title"
              className="font-display text-lg font-bold tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] sm:text-xl"
            >
              Iniciar sesión
            </h2>
            <p className="mt-1.5 text-pretty text-sm font-medium text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">
              Ingresa tu folio y contraseña.
            </p>
          </>
        ) : (
          <>
            <h2
              id="login-form-title"
              className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
            >
              Iniciar sesión
            </h2>
            <p className="mt-1.5 text-pretty text-sm text-slate-600">
              Ingresa tu folio y contraseña.
            </p>
          </>
        )}
      </div>

      {(error || successMessage) && (
        <div className="space-y-3" aria-live="polite">
          {error ? (
            <div role="alert" className="uady-alert uady-alert--error">
              <strong className="font-semibold">No se pudo iniciar sesión. </strong>
              {error}
            </div>
          ) : null}
          {successMessage ? (
            <div role="status" className="uady-alert uady-alert--success">
              <strong className="font-semibold">Listo. </strong>
              {successMessage}
            </div>
          ) : null}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="folio"
          className={`block text-sm font-semibold ${embedded ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]" : "text-xs uppercase tracking-wider text-slate-500"}`}
        >
          Folio
        </label>
        <div
          className={`login-input-shell ${embedded ? "login-input-shell--flat" : ""}`}
        >
          <span className="login-input-icon">
            <IconUser className="h-5 w-5" />
          </span>
          <input
            id="folio"
            name="folio"
            type="text"
            autoComplete="username"
            inputMode="text"
            value={folio}
            onChange={(e) => {
              setFolio(e.target.value);
              clearFeedback();
            }}
            placeholder="Ej. ABC123456"
            required
            disabled={isSubmitting}
            aria-invalid={error ? true : undefined}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className={`block text-sm font-semibold ${embedded ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]" : "text-xs uppercase tracking-wider text-slate-500"}`}
        >
          Contraseña
        </label>
        <div
          className={`login-input-shell login-input-shell--with-toggle ${embedded ? "login-input-shell--flat" : ""}`}
        >
          <span className="login-input-icon">
            <IconLock className="h-5 w-5" />
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearFeedback();
            }}
            placeholder="••••••••"
            required
            disabled={isSubmitting}
            aria-invalid={error ? true : undefined}
          />
          <button
            type="button"
            className="login-input-toggle"
            disabled={isSubmitting}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <IconEyeOff className="h-5 w-5" />
            ) : (
              <IconEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`uady-btn uady-btn--prominent w-full ${embedded ? "!rounded-lg" : ""}`}
        >
          {isSubmitting ? "Ingresando…" : "Entrar"}
        </button>
        <p className="text-right">
          <a
            href="/recuperar-contrasena"
            className={
              embedded
                ? "text-sm font-semibold text-white underline-offset-4 decoration-white/45 underline transition hover:text-white/90 hover:decoration-white/70"
                : "text-sm font-semibold text-[#122b40] underline-offset-4 decoration-[#122b40]/40 transition hover:text-[#0d1f2e] hover:underline hover:decoration-[#0d1f2e]/50"
            }
          >
            Olvidé mi contraseña.
          </a>
        </p>
      </div>
    </form>
  );
}
