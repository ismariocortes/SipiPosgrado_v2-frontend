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
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [folio, setFolio] = useState("");
  const [password, setPassword] = useState("");
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
      className="space-y-5"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="login-form-title"
    >
      <div>
        <h2
          id="login-form-title"
          className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          Iniciar sesión
        </h2>
        <p className="mt-1.5 text-pretty text-sm text-slate-600">
          Ingresa tu folio y contraseña institucional.
        </p>
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Folio
        </label>
        <div className="login-input-shell">
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
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Contraseña
        </label>
        <div className="login-input-shell">
          <span className="login-input-icon">
            <IconLock className="h-5 w-5" />
          </span>
          <input
            id="password"
            name="password"
            type="password"
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
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="uady-btn uady-btn--prominent w-full"
        >
          {isSubmitting ? "Ingresando…" : "Entrar"}
        </button>
        <a
          href="/recuperar-contrasena"
          className="inline-flex items-center justify-center gap-1.5 self-center text-sm font-medium text-slate-500 underline-offset-4 transition hover:text-[#003366] hover:underline sm:self-end"
        >
          <svg
            className="h-4 w-4 shrink-0 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          </svg>
          Nueva contraseña
        </a>
      </div>
    </form>
  );
}
