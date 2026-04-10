import {
  inputClass,
  labelClass,
  sectionTitleClass,
} from "../fieldStyles";
import type {
  CompleteProfileFormState,
  DisabilityCode,
  DisabilityEntry,
  DisabilityPercentage,
} from "../wizardTypes";

type Props = {
  value: CompleteProfileFormState;
  onChange: (patch: Partial<CompleteProfileFormState>) => void;
};

const TYPES: { code: DisabilityCode; label: string }[] = [
  { code: "visual", label: "Visual" },
  { code: "auditiva", label: "Auditiva" },
  { code: "motriz", label: "Motriz" },
];

const PCT_OPTIONS: { value: DisabilityPercentage; label: string }[] = [
  { value: "lt30", label: "Menor a 30" },
  { value: "31-59", label: "31–59" },
  { value: "60-89", label: "60–89" },
  { value: "90-100", label: "90–100" },
];

function entryFor(
  list: DisabilityEntry[],
  code: DisabilityCode,
): DisabilityEntry | undefined {
  return list.find((d) => d.type === code);
}

export function Step6Discapacidad({ value, onChange }: Props) {
  const none = value.disability_none;
  const list = value.disabilities;

  function setNinguna(checked: boolean) {
    if (checked) {
      onChange({ disability_none: true, disabilities: [] });
    } else {
      onChange({ disability_none: false });
    }
  }

  function toggleType(code: DisabilityCode) {
    if (none) return;
    const existing = entryFor(list, code);
    if (existing) {
      onChange({
        disabilities: list.filter((d) => d.type !== code),
      });
    } else {
      onChange({
        disability_none: false,
        disabilities: [...list, { type: code, percentage: "" }],
      });
    }
  }

  function setPercentage(code: DisabilityCode, pct: DisabilityPercentage) {
    onChange({
      disabilities: list.map((d) =>
        d.type === code ? { ...d, percentage: pct } : d,
      ),
    });
  }

  return (
    <div className="space-y-8">
      <h2 className={sectionTitleClass}>
        Información adicional (discapacidad)
      </h2>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-800">
          ¿Tienes alguna discapacidad?
        </p>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={none}
            onChange={(e) => setNinguna(e.target.checked)}
            className="h-4 w-4 rounded border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
          />
          <span>Ninguna</span>
        </label>

        <div className="space-y-2 pl-0.5">
          {TYPES.map(({ code, label }) => {
            const active = Boolean(entryFor(list, code));
            return (
              <div key={code} className="space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-2.5 text-sm ${
                    none ? "cursor-not-allowed text-slate-400" : "text-slate-800"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    disabled={none}
                    onChange={() => toggleType(code)}
                    className="h-4 w-4 rounded border-stone-400 text-[#122b40] focus:ring-[#3d657d] disabled:opacity-50"
                  />
                  <span>{label}</span>
                </label>

                {active && !none ? (
                  <fieldset className="ml-7 space-y-2 border-0 p-0">
                    <legend className="sr-only">Porcentaje — {label}</legend>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Grado de {label.toLowerCase()}
                    </p>
                    <div className="flex flex-col gap-2">
                      {PCT_OPTIONS.map(({ value: v, label: lbl }) => (
                        <label
                          key={v}
                          className="flex cursor-pointer items-center gap-2 text-sm text-slate-800"
                        >
                          <input
                            type="radio"
                            name={`pct-${code}`}
                            checked={entryFor(list, code)?.percentage === v}
                            onChange={() => setPercentage(code, v)}
                            className="h-4 w-4 border-stone-400 text-[#122b40] focus:ring-[#3d657d]"
                          />
                          <span>{lbl}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cp-special_requirements" className={labelClass}>
          Si tienes algún requerimiento especial, descríbelo
        </label>
        <textarea
          id="cp-special_requirements"
          name="special_requirements"
          rows={4}
          value={value.special_requirements}
          onChange={(e) =>
            onChange({ special_requirements: e.target.value })
          }
          className={inputClass}
        />
      </div>
    </div>
  );
}
