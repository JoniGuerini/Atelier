import { useEffect, useState } from "react";
import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Breakpoints — página /breakpoints (Foundation · 10)
   ----------------------------------------------------------------
   Doc da escala --bp-* (Foundations II · fase 9.1).
   Inclui visualizador ao vivo: redimensione a janela e veja
   qual breakpoint está ativo. Pavimenta o caminho para
   useMediaQuery (Fase 10).
   ================================================================ */

const SCALE = [
  { token: "--bp-sm",  px: 480,  intent: "phone" },
  { token: "--bp-md",  px: 720,  intent: "tablet · phone landscape" },
  { token: "--bp-lg",  px: 960,  intent: "laptop pequeno" },
  { token: "--bp-xl",  px: 1280, intent: "desktop" },
  { token: "--bp-2xl", px: 1600, intent: "wide / 2K+" },
];

function getActiveBp(width: number): string {
  if (width >= 1600) return "--bp-2xl";
  if (width >= 1280) return "--bp-xl";
  if (width >= 960) return "--bp-lg";
  if (width >= 720) return "--bp-md";
  if (width >= 480) return "--bp-sm";
  return "(< sm)";
}

export default function Breakpoints() {
  const { t, tr } = useT();
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const active = getActiveBp(width);

  return (
    <>
      <PageHead
        lead={t("pages.breakpoints.lead")}
        title={
          <>
            {tr("pages.breakpoints.titleA")}
            <em>{t("pages.breakpoints.titleB")}</em>
          </>
        }
        metaLabel={t("pages.breakpoints.metaLabel")}
        meta={t("pages.breakpoints.meta")}
        intro={tr("pages.breakpoints.intro")}
      />

      {/* i. Escala */}
      <Section
        num="i"
        title={<>{t("pages.breakpoints.scaleTitle")}</>}
        kicker={t("pages.breakpoints.scaleKicker")}
      >
        <p className="section-desc">{t("pages.breakpoints.scaleDesc")}</p>
        <div className="foundations-table-wrap">
          <table className="foundations-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>token</th>
                <th style={{ width: "20%" }}>min-width</th>
                <th>intent</th>
              </tr>
            </thead>
            <tbody>
              {SCALE.map((s) => (
                <tr
                  key={s.token}
                  className={s.token === active ? "is-active" : ""}
                >
                  <td>
                    <code>{s.token}</code>
                  </td>
                  <td>
                    <code>{s.px}px</code>
                  </td>
                  <td>{s.intent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ii. Visualizador */}
      <Section
        num="ii"
        title={<>{t("pages.breakpoints.visualizerTitle")}</>}
        kicker={t("pages.breakpoints.visualizerKicker")}
      >
        <p className="section-desc">
          {t("pages.breakpoints.visualizerDesc")}
        </p>
        <div className="foundations-bp-stage">
          <div className="foundations-bp-readout">
            <div className="foundations-bp-readout-num">{width}px</div>
            <div className="foundations-bp-readout-label">
              {active === "(< sm)" ? active : (
                <>
                  active: <code>{active}</code>
                </>
              )}
            </div>
          </div>
          <div className="foundations-bp-bar">
            {SCALE.map((s) => {
              const isActive = s.token === active;
              const isPassed = width >= s.px;
              return (
                <div
                  key={s.token}
                  className={`foundations-bp-step ${
                    isActive ? "is-active" : isPassed ? "is-passed" : ""
                  }`}
                >
                  <div className="foundations-bp-step-tick" />
                  <div className="foundations-bp-step-label">
                    {s.token.replace("--bp-", "")}
                  </div>
                  <div className="foundations-bp-step-value">{s.px}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* iii. Em JS */}
      <Section
        num="iii"
        title={<>{t("pages.breakpoints.jsTitle")}</>}
        kicker={t("pages.breakpoints.jsKicker")}
      >
        <p className="section-desc">{tr("pages.breakpoints.jsDesc")}</p>
        <Code>{`/* JS — via matchMedia (hook chega na Fase 10) */
const mq = window.matchMedia(\`(min-width: \${getComputedStyle(
  document.documentElement
).getPropertyValue("--bp-md").trim()})\`);

mq.matches; // true se viewport >= 720px

/* CSS — número literal pareado com comentário do token */
@media (min-width: 720px) /* --bp-md */ {
  .layout { grid-template-columns: 1fr 2fr; }
}`}</Code>
      </Section>
    </>
  );
}
