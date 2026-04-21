import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Colophon — /colophon (About · 74, fase 12)
   ----------------------------------------------------------------
   Como foi feito. Stack, fontes, paleta editorial, métricas
   verificáveis (componentes, hooks, tokens, bundle).
   ================================================================ */

interface Metric {
  value: string;
  label: string;
}

export default function Colophon() {
  const { t, tr, raw } = useT();
  const stack = (raw("pages.colophon.stack.items") as { label: string; body: string }[]) || [];
  const metrics = (raw("pages.colophon.metrics.items") as Metric[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.colophon.lead")}
        title={
          <>
            {tr("pages.colophon.titleA")}
            <em>{t("pages.colophon.titleB")}</em>
          </>
        }
        metaLabel={t("pages.colophon.metaLabel")}
        meta={t("pages.colophon.meta")}
        intro={tr("pages.colophon.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.colophon.stack.title")}</>}
        kicker={t("pages.colophon.stack.kicker")}
      >
        <p className="section-desc">{tr("pages.colophon.stack.desc")}</p>
        <ul className="about-list">
          {stack.map((s, i) => (
            <li key={i}>
              <span className="about-list-label">{s.label}</span>
              <div className="about-list-body">{emify(s.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.colophon.type.title")}</>}
        kicker={t("pages.colophon.type.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.colophon.type.p1")}</p>
          <p>{tr("pages.colophon.type.p2")}</p>
        </div>
        <ul className="about-list">
          <li>
            <span className="about-list-label" style={{ fontFamily: "var(--font-serif)", fontSize: "21px", fontStyle: "italic", color: "var(--ink)", textTransform: "none", letterSpacing: 0 }}>
              Fraunces
            </span>
            <div className="about-list-body">{tr("pages.colophon.type.fraunces")}</div>
          </li>
          <li>
            <span className="about-list-label" style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--ink)", textTransform: "none", letterSpacing: 0 }}>
              JetBrains Mono
            </span>
            <div className="about-list-body">{tr("pages.colophon.type.mono")}</div>
          </li>
        </ul>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.colophon.palette.title")}</>}
        kicker={t("pages.colophon.palette.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.colophon.palette.p1")}</p>
          <p>{tr("pages.colophon.palette.p2")}</p>
        </div>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.colophon.metrics.title")}</>}
        kicker={t("pages.colophon.metrics.kicker")}
      >
        <p className="section-desc">{t("pages.colophon.metrics.desc")}</p>
        <div className="about-metrics">
          {metrics.map((m, i) => (
            <div key={i} className="about-metric">
              <span className="about-metric-num">{emify(m.value)}</span>
              <span className="about-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
