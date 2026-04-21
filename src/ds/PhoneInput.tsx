import { useId, useMemo, useState } from "react";

/* ================================================================
   PhoneInput — país + máscara nacional (Fase 15.2)
   ----------------------------------------------------------------
   Três presets editoriais (BR, US, PT). Apenas dígitos no campo
   nacional; exibição com máscara fixa por preset.
   ================================================================ */

export type PhoneCountryId = "br" | "us" | "pt";

export interface PhoneCountry {
  id: PhoneCountryId;
  dial: string;
  /** Número de dígitos esperados no campo nacional. */
  digits: number;
  /** Máscara: # = dígito posição fixa. */
  mask: string;
}

export const DEFAULT_COUNTRIES: PhoneCountry[] = [
  { id: "br", dial: "+55", digits: 11, mask: "(##) #####-####" },
  { id: "us", dial: "+1", digits: 10, mask: "(###) ###-####" },
  { id: "pt", dial: "+351", digits: 9, mask: "### ### ###" },
];

export interface PhoneInputProps {
  country?: PhoneCountryId;
  onCountryChange?: (id: PhoneCountryId) => void;
  nationalDigits?: string;
  onNationalDigitsChange?: (digits: string) => void;
  countries?: PhoneCountry[];
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function PhoneInput({
  country = "br",
  onCountryChange,
  nationalDigits = "",
  onNationalDigitsChange,
  countries = DEFAULT_COUNTRIES,
  disabled = false,
  className = "",
  id,
}: PhoneInputProps) {
  const uid = useId();
  const selectId = id ? `${id}-country` : `${uid}-country`;
  const meta = useMemo(() => countries.find((c) => c.id === country) ?? countries[0], [countries, country]);
  const display = useMemo(() => formatMask(nationalDigits, meta), [nationalDigits, meta]);

  const setDigits = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, meta.digits);
    onNationalDigitsChange?.(d);
  };

  return (
    <div className={`ds-phone-input ${className}`.trim()}>
      <select
        id={selectId}
        className="ds-select ds-phone-country"
        disabled={disabled}
        value={country}
        onChange={(e) => onCountryChange?.(e.target.value as PhoneCountryId)}
      >
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.dial}
          </option>
        ))}
      </select>
      <input
        type="text"
        inputMode="numeric"
        className="ds-input ds-phone-national"
        disabled={disabled}
        value={display}
        aria-label="National number"
        onChange={(e) => setDigits(e.target.value)}
      />
    </div>
  );
}

/** Valor E.164 simplificado para telemetria ou envio. */
export function phoneToE164(country: PhoneCountry, digits: string): string {
  return `${country.dial}${digits}`;
}

function formatMask(digits: string, c: PhoneCountry): string {
  let di = 0;
  let out = "";
  for (let i = 0; i < c.mask.length; i++) {
    const m = c.mask[i];
    if (m === "#") {
      out += di < digits.length ? digits[di++] : " ";
    } else {
      out += m;
    }
  }
  return out;
}
