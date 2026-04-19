/* ================================================================
   EmptyState — API composable.
   ----------------------------------------------------------------
     <EmptyState>
       <EmptyGlyph>¶</EmptyGlyph>
       <EmptyTitle>Sua biblioteca está vazia</EmptyTitle>
       <EmptyDescription>...</EmptyDescription>
       <EmptyActions>
         <Button variant="primary">Adicionar a primeira</Button>
       </EmptyActions>
     </EmptyState>
   ================================================================ */

export function EmptyState({ children }: { children?: import("react").ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--rule-soft)",
        background: "var(--bg-panel)",
        padding: "var(--space-8) var(--space-6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
      }}
    >
      {children}
    </div>
  );
}

export function EmptyGlyph({ children }: { children?: import("react").ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: 96,
        color: "var(--accent)",
        lineHeight: 0.9,
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

export function EmptyTitle({ children }: { children?: import("react").ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 26,
        fontWeight: 300,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </div>
  );
}

export function EmptyDescription({ children }: { children?: import("react").ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 15,
        lineHeight: 1.6,
        color: "var(--ink-soft)",
        maxWidth: 420,
      }}
    >
      {children}
    </div>
  );
}

export function EmptyActions({ children }: { children?: import("react").ReactNode }) {
  return <div style={{ marginTop: 10 }}>{children}</div>;
}
