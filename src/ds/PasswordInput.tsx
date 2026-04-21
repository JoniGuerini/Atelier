import { useId, useMemo, useState } from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   PasswordInput — visibilidade + medidor simples (Fase 15.2)
   ----------------------------------------------------------------
   Medidor heurístico (0–4): comprimento, minúscula, maiúscula,
   dígito, símbolo. Não substitui validação no servidor.
   ================================================================ */

export interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  showStrength?: boolean;
  className?: string;
  id?: string;
  placeholder?: string;
  "aria-label"?: string;
}

function scorePassword(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s);
}

const STRENGTH_KEYS = ["strength0", "strength1", "strength2", "strength3", "strength4"] as const;

function EyeShowGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function EyeHideGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
      />
      <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function PasswordInput({
  value = "",
  onChange,
  disabled = false,
  showStrength = true,
  className = "",
  id,
  placeholder,
  "aria-label": ariaLabel,
}: PasswordInputProps) {
  const { t } = useT();
  const uid = useId();
  const inputId = id ?? uid;
  const [visible, setVisible] = useState(false);
  const strength = useMemo(() => scorePassword(value), [value]);
  const strengthLabel = t(`ds.password.${STRENGTH_KEYS[strength]}`);

  return (
    <div className={`ds-password-input ${className}`.trim()}>
      <div className="ds-password-input-wrap">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className="ds-password-input-inner"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <button
          type="button"
          className="ds-password-toggle"
          disabled={disabled}
          aria-label={visible ? t("ds.password.hidePassword") : t("ds.password.showPassword")}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeHideGlyph /> : <EyeShowGlyph />}
        </button>
      </div>
      {showStrength && value.length > 0 && (
        <div
          className="ds-password-strength-block"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className={`ds-password-strength-label ${strength >= 3 ? "is-high" : ""}`}
          >
            {strengthLabel}
          </span>
          <div className="ds-password-strength" aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} className={`ds-password-strength-bar ${i < strength ? "is-on" : ""}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
