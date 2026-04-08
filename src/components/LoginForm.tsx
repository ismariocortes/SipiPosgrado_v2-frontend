import { type FormEvent, useState } from "react";
import { getLoginErrorMessage } from "../lib/apiErrors";
import { login } from "../services/authService";
import { IconEye, IconEyeOff, IconLock, IconMail } from "./icons";

type LoginFormProps = {
  onSuccess?: () => void;
  /** Sin tarjeta: título compacto e inputs estilo plano sobre fondo blanco */
  variant?: "default" | "embedded";
};

export function LoginForm({ onSuccess, variant = "default" }: LoginFormProps) {
  const embedded = variant === "embedded";
  const [email, setEmail] = useState("");
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
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", res.token);
      setSuccessMessage(
        res.message?.trim()
          ? res.message
          : "Sesión iniciada correctamente.",
      );
      onSuccess?.();
    } catch (err) {
      setError(getLoginErrorMessage(err));
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
              Ingresa tu correo y contraseña.
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
              Ingresa tu correo y contraseña.
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
          htmlFor="login-email"
          className={`block text-sm font-semibold ${embedded ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]" : "text-xs uppercase tracking-wider text-slate-500"}`}
        >
          Correo electrónico
        </label>
        <div
          className={`login-input-shell ${embedded ? "login-input-shell--flat" : ""}`}
        >
          <span className="login-input-icon">
            <IconMail className="h-5 w-5" />
          </span>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFeedback();
            }}
            placeholder="nombre@correo.com"
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
                ? "inline-flex items-center justify-end gap-1.5 text-sm font-semibold text-white underline decoration-white/45 underline-offset-4 transition hover:text-white/90 hover:decoration-white/70"
                : "inline-flex items-center justify-end gap-1.5 text-sm font-semibold text-[#122b40] underline-offset-4 decoration-[#122b40]/40 transition hover:text-[#0d1f2e] hover:underline hover:decoration-[#0d1f2e]/50"
            }
          >
            <IconLock className="h-4 w-4 shrink-0 opacity-90" />
            Olvidé mi contraseña.
          </a>
        </p>
      </div>
    </form>
  );
}
