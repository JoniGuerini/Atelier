import { Field, Divider } from "./primitives.jsx";

/* ================================================================
   Form — API composable.
   ----------------------------------------------------------------
     <Form onSubmit={...}>
       <FormStep>Passo 1</FormStep>
       <FormRow cols={2}>
         <FormField label="Nome"><Input /></FormField>
         <FormField label="Sobrenome"><Input /></FormField>
       </FormRow>
       <FormDivider>Preferências</FormDivider>
       <FormActions>
         <Button variant="ghost">Cancelar</Button>
         <Button variant="primary">Enviar</Button>
       </FormActions>
     </Form>
   ================================================================ */

export function Form({ onSubmit, children, maxWidth = 560, style, ...rest }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        maxWidth,
        display: "grid",
        gap: "var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </form>
  );
}

export function FormStep({ children }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--ink-faint)",
      }}
    >
      {children}
    </div>
  );
}

export function FormRow({ cols = 2, gap = "var(--space-4)", children }) {
  const tpl = typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols;
  return (
    <div style={{ display: "grid", gridTemplateColumns: tpl, gap }}>
      {children}
    </div>
  );
}

export function FormField({ label, hint, error, children }) {
  return (
    <Field label={label} hint={hint} error={error}>
      {children}
    </Field>
  );
}

export function FormDivider({ children }) {
  return <Divider>{children}</Divider>;
}

export function FormActions({ children, align = "end" }) {
  const justify = align === "start" ? "flex-start" : align === "between" ? "space-between" : "flex-end";
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        justifyContent: justify,
        paddingTop: "var(--space-3)",
        borderTop: "1px solid var(--rule-soft)",
      }}
    >
      {children}
    </div>
  );
}
