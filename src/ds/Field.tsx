import type { ReactNode } from "react";
import type { FieldProps } from "./types.ts";

interface SlotProps {
  children?: ReactNode;
}

/* ================================================================
   Field — API composable para inputs.
   ----------------------------------------------------------------
   Modo composable:
     <Field>
       <FieldLabel>E-mail</FieldLabel>
       <Input type="email" ... />
       <FieldHint>Usaremos só para enviar a edição.</FieldHint>
       <FieldError>E-mail inválido</FieldError>
     </Field>

   Modo curto (atalho retrocompatível):
     <Field label="E-mail" hint="..." error="...">
       <Input type="email" ... />
     </Field>
   ================================================================ */

export function Field({ label, hint, error, children, className = "" }: FieldProps) {
  const composed = hasComposable(children);
  if (composed) {
    return (
      <label className={`ds-field ${className}`.trim()}>{children}</label>
    );
  }
  return (
    <label className={`ds-field ${className}`.trim()}>
      {label && <FieldLabel>{label}</FieldLabel>}
      {children}
      {error ? <FieldError>{error}</FieldError> : hint ? <FieldHint>{hint}</FieldHint> : null}
    </label>
  );
}

function hasComposable(children: ReactNode): boolean {
  let found = false;
  const arr = Array.isArray(children) ? children : [children];
  arr.forEach((c: any) => {
    if (c && typeof c === "object" && c.type) {
      const name = c.type.displayName || c.type.name;
      if (name === "FieldLabel" || name === "FieldHint" || name === "FieldError") {
        found = true;
      }
    }
  });
  return found;
}

export function FieldLabel({ children }: SlotProps) {
  return <span className="ds-label">{children}</span>;
}
FieldLabel.displayName = "FieldLabel";

export function FieldHint({ children }: SlotProps) {
  return <span className="ds-hint">{children}</span>;
}
FieldHint.displayName = "FieldHint";

export function FieldError({ children }: SlotProps) {
  return <span className="ds-hint error">{children}</span>;
}
FieldError.displayName = "FieldError";

/* ---------- Controles ----------
   Reaproveitamos os atômicos já presentes em primitives.jsx.
   São re-exportados para conveniência (um único import). */
export { Input, Textarea, Select } from "./primitives.tsx";
