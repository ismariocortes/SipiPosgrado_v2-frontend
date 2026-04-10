import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { Stepper } from "./Stepper";
import { Step1DatosPersonales } from "./steps/Step1DatosPersonales";
import { Step2Direccion } from "./steps/Step2Direccion";
import { Step3Escuela } from "./steps/Step3Escuela";
import { Step4Programa } from "./steps/Step4Programa";
import { Step5Examenes } from "./steps/Step5Examenes";
import { Step6Discapacidad } from "./steps/Step6Discapacidad";
import { Step7Confirmacion } from "./steps/Step7Confirmacion";
import { validateWizardStep, WIZARD_STEP_COUNT } from "./validateWizardStep";
import {
  INITIAL_WIZARD_STATE,
  type CompleteProfileFormState,
} from "./wizardTypes";

export function CompleteProfileWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CompleteProfileFormState>(INITIAL_WIZARD_STATE);
  const [blockMessage, setBlockMessage] = useState<string | null>(null);

  const applyPatch = useCallback((patch: Partial<CompleteProfileFormState>) => {
    setBlockMessage(null);
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const stepValid = validateWizardStep(step, form) === null;
  const submitValid =
    validateWizardStep(WIZARD_STEP_COUNT - 1, form) === null;

  function goNext() {
    const err = validateWizardStep(step, form);
    if (err !== null) {
      setBlockMessage(err);
      return;
    }
    setBlockMessage(null);
    if (step < WIZARD_STEP_COUNT - 1) {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setBlockMessage(null);
      setStep((s) => s - 1);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validateWizardStep(WIZARD_STEP_COUNT - 1, form);
    if (err !== null) {
      setBlockMessage(err);
      return;
    }
    const payload = {
      ...form,
      disabilities: form.disability_none ? [] : form.disabilities,
    };
    console.debug("completar-perfil", payload);
    alert("Solicitud enviada (simulado)");
  }

  const stepProps = { value: form, onChange: applyPatch };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <Stepper currentStep={step} />

      <div className="min-h-[12rem]">
        {step === 0 ? <Step1DatosPersonales {...stepProps} /> : null}
        {step === 1 ? <Step2Direccion {...stepProps} /> : null}
        {step === 2 ? <Step3Escuela {...stepProps} /> : null}
        {step === 3 ? <Step4Programa {...stepProps} /> : null}
        {step === 4 ? <Step5Examenes {...stepProps} /> : null}
        {step === 5 ? <Step6Discapacidad {...stepProps} /> : null}
        {step === 6 ? <Step7Confirmacion {...stepProps} /> : null}
      </div>

      {blockMessage ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {blockMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-stone-300/90 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#122b40] transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>

        {step < WIZARD_STEP_COUNT - 1 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!stepValid}
            title={
              !stepValid
                ? "Completa los campos requeridos de este paso"
                : undefined
            }
            className="rounded-lg border border-[#122b40] bg-[#122b40] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d1f2e] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            disabled={!submitValid}
            title={
              !submitValid
                ? "Confirma que la información es correcta"
                : undefined
            }
            className="rounded-lg border border-[#bc921c] bg-[#bc921c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a67c18] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Enviar solicitud
          </button>
        )}
      </div>
    </form>
  );
}
