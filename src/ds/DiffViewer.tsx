import { useMemo, type ReactNode } from "react";

/* ================================================================
   DiffViewer — diff linha a linha (Fase 15.3)
   ----------------------------------------------------------------
   LCS sobre arrays de linhas (zero deps). Exporta diffLines para
   testes ou UI custom. DiffViewer renderiza bloco unificado.
   ================================================================ */

export type DiffLineType = "equal" | "add" | "remove";

export interface DiffLine {
  type: DiffLineType;
  text: string;
}

/** Parte `before` e `after` em linhas (\n); retorna sequência unificada. */
export function diffLines(before: string, after: string): DiffLine[] {
  const A = before.length ? before.split("\n") : [];
  const B = after.length ? after.split("\n") : [];
  const n = A.length;
  const m = B.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        A[i - 1] === B[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && A[i - 1] === B[j - 1]) {
      out.push({ type: "equal", text: A[i - 1] });
      i--;
      j--;
    } else if (i > 0 && j > 0 && dp[i - 1][j] >= dp[i][j - 1]) {
      out.push({ type: "remove", text: A[i - 1] });
      i--;
    } else if (j > 0) {
      out.push({ type: "add", text: B[j - 1] });
      j--;
    } else {
      out.push({ type: "remove", text: A[i - 1] });
      i--;
    }
  }
  return out.reverse();
}

export interface DiffViewerProps {
  before: string;
  after: string;
  className?: string;
  caption?: ReactNode;
}

export function DiffViewer({ before, after, className = "", caption }: DiffViewerProps) {
  const lines = useMemo(() => diffLines(before, after), [before, after]);

  return (
    <div className={`ds-diff-viewer ${className}`.trim()}>
      <div className="ds-diff-unified" role="region" aria-label="Diff">
        {caption != null ? <div className="ds-diff-head">{caption}</div> : null}
        <div className="ds-diff-lines">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`ds-diff-line type-${line.type}`}
              role="row"
            >
              <span className="ds-diff-gutter" aria-hidden="true">
                <span className="ds-diff-glyph">
                  {line.type === "add" ? "+" : line.type === "remove" ? "−" : "\u00a0"}
                </span>
              </span>
              <code className="ds-diff-text">{line.text || "\u00a0"}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
