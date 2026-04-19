/* ================================================================
   Alert — API composable.
   ----------------------------------------------------------------
     <Alert variant="info">
       <AlertMark>i</AlertMark>
       <AlertContent>
         <AlertTitle>Heads up</AlertTitle>
         <AlertDescription>...</AlertDescription>
       </AlertContent>
     </Alert>

   Forma curta (sem subcomponentes) ainda funciona via props
   `title` e `children`, com Mark inferido pelo `variant`.
   ================================================================ */

const ALERT_MARK = {
  info: "i",
  ok: "✓",
  warn: "!",
  danger: "✕",
  default: "—",
};

export function Alert({
  variant = "default",
  title,
  children,
  className = "",
}: any) {
  // Modo composable: se children já contém AlertMark/AlertContent, renderiza direto.
  // Modo curto: monta automaticamente Mark + Title + Description.
  const composed = hasComposable(children);
  if (composed) {
    return (
      <div className={`ds-alert ${variant} ${className}`.trim()}>
        {children}
      </div>
    );
  }
  return (
    <div className={`ds-alert ${variant} ${className}`.trim()}>
      <AlertMark>{ALERT_MARK[variant] || ALERT_MARK.default}</AlertMark>
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </AlertContent>
    </div>
  );
}

function hasComposable(children) {
  let found = false;
  // Aceita um único filho ou array
  const arr = Array.isArray(children) ? children : [children];
  arr.forEach((c) => {
    if (c && typeof c === "object" && c.type) {
      const name = c.type.displayName || c.type.name;
      if (
        name === "AlertMark" ||
        name === "AlertContent" ||
        name === "AlertTitle" ||
        name === "AlertDescription" ||
        name === "AlertActions"
      ) {
        found = true;
      }
    }
  });
  return found;
}

export function AlertMark({ children }: any) {
  return <div className="alert-mark">{children}</div>;
}
AlertMark.displayName = "AlertMark";

export function AlertContent({ children }: any) {
  return <div className="alert-body">{children}</div>;
}
AlertContent.displayName = "AlertContent";

export function AlertTitle({ children }: any) {
  return <div className="alert-title">{children}</div>;
}
AlertTitle.displayName = "AlertTitle";

export function AlertDescription({ children }: any) {
  return <div className="alert-text">{children}</div>;
}
AlertDescription.displayName = "AlertDescription";

export function AlertActions({ children }: any) {
  return (
    <div
      className="alert-actions"
      style={{
        marginTop: 10,
        display: "flex",
        gap: 8,
      }}
    >
      {children}
    </div>
  );
}
AlertActions.displayName = "AlertActions";
