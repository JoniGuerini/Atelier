import { useState } from "react";
import { PageHead, Section, Button, Code } from "../ds/primitives.tsx";
import {
  Fade,
  Slide,
  Scale,
  Collapse,
  ScrollReveal,
} from "../ds/Motion.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Motion — página /motion (Foundation · 12, fase 4.4)
   ----------------------------------------------------------------
   Doc da camada de motion do Atelier:
     - tabela de tokens --dur-* / --ease*
     - visualizador de cada easing (curva SVG + bola animada)
     - demos dos primitivos (Fade, Slide, Scale, Collapse,
       ScrollReveal)
     - regras editoriais "quando NÃO animar"
   ================================================================ */

const DURATIONS = [
  { token: "--dur-fast", value: "120ms", use: "Hover, focus, micro-feedback" },
  { token: "--dur",      value: "200ms", use: "Default — popovers, dropdowns, switches" },
  { token: "--dur-slow", value: "320ms", use: "Drawers, modals, transições editoriais" },
  { token: "--dur-xl",   value: "480ms", use: "Page transitions, scroll reveal" },
];

const EASINGS = [
  { token: "--ease",          curve: "0.4, 0, 0.2, 1",      label: "default · in-out", note: "Suave em ambas as pontas" },
  { token: "--ease-in",       curve: "0.4, 0, 1, 1",        label: "in",                note: "Acelera saindo" },
  { token: "--ease-out",      curve: "0, 0, 0.2, 1",        label: "out",               note: "Desacelera entrando" },
  { token: "--ease-out-expo", curve: "0.16, 1, 0.3, 1",     label: "out-expo",          note: "Dramatic — toasts, dialogs" },
  { token: "--ease-spring",   curve: "0.34, 1.56, 0.64, 1", label: "spring",            note: "Leve overshoot — playful" },
];

const RULES = [
  { n: "I",   t: "Não anime estado",       b: "Use motion para mostrar mudança CAUSAL — algo apareceu, mudou de lugar, foi descartado. NÃO para celebrar estado parado." },
  { n: "II",  t: "Use ease-out para entrada", b: "Coisas que entram desaceleram. Coisas que saem aceleram (ease-in). O default in-out só serve quando os dois acontecem juntos." },
  { n: "III", t: "Respeite reduced motion", b: "Todo primitivo do Atelier zera transforms quando o usuário pediu. Não duplique a regra — confie no DS." },
  { n: "IV",  t: "Curva é vocabulário",     b: "Não invente cubic-bezier ad-hoc. Use --ease-* nomeados. Nova curva = nova decisão editorial — discuta antes de adicionar." },
];

/* Curva SVG do cubic-bezier (caixa 100x100 invertida no Y) */
function easingPath(curve: string): string {
  const [x1, y1, x2, y2] = curve.split(",").map((s) => parseFloat(s.trim()));
  const sy1 = (1 - y1) * 100;
  const sy2 = (1 - y2) * 100;
  return `M 0,100 C ${x1 * 100},${sy1} ${x2 * 100},${sy2} 100,0`;
}

function EasingViz({ curve, token }: { curve: string; token: string }) {
  const [tick, setTick] = useState(0);
  return (
    <div className="motion-easing-viz">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="motion-easing-curve">
        <path d="M 0,100 L 100,100" stroke="var(--rule-faint)" strokeWidth="0.5" />
        <path d="M 0,0 L 0,100" stroke="var(--rule-faint)" strokeWidth="0.5" />
        <path
          d={easingPath(curve)}
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="motion-easing-track">
        <div
          key={tick}
          className="motion-easing-ball"
          /* O CSS aplica `animation: motion-easing-roll 1400ms forwards` —
             precisamos sobrescrever animation-timing-function (NÃO
             transition-timing-function, que `animation` ignora). */
          style={{
            animationTimingFunction: `var(${token})`,
          }}
        />
      </div>
      <Button onClick={() => setTick((t) => t + 1)} variant="ghost" size="sm">
        play
      </Button>
    </div>
  );
}

export default function Motion() {
  const { t, tr } = useT();
  const [fadeIn, setFadeIn] = useState(true);
  const [slideIn, setSlideIn] = useState(true);
  const [scaleIn, setScaleIn] = useState(true);
  const [collapseOpen, setCollapseOpen] = useState(true);

  return (
    <>
      <PageHead
        lead={t("pages.motion.lead")}
        title={
          <>
            {tr("pages.motion.titleA")}
            <em>{t("pages.motion.titleB")}</em>
          </>
        }
        metaLabel={t("pages.motion.metaLabel")}
        meta={t("pages.motion.meta")}
        intro={tr("pages.motion.intro")}
      />

      {/* i. Durações */}
      <Section
        num="i"
        title={<>{t("pages.motion.durTitle")}</>}
        kicker={t("pages.motion.durKicker")}
      >
        <p className="section-desc">{t("pages.motion.durDesc")}</p>
        <div className="motion-table-wrap">
          <table className="motion-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>token</th>
                <th style={{ width: "15%" }}>value</th>
                <th>uso</th>
              </tr>
            </thead>
            <tbody>
              {DURATIONS.map((d) => (
                <tr key={d.token}>
                  <td><code>{d.token}</code></td>
                  <td><code>{d.value}</code></td>
                  <td>{d.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ii. Easings */}
      <Section
        num="ii"
        title={<>{t("pages.motion.easeTitle")}</>}
        kicker={t("pages.motion.easeKicker")}
      >
        <p className="section-desc">{tr("pages.motion.easeDesc")}</p>
        <div className="motion-easing-grid">
          {EASINGS.map((e) => (
            <article key={e.token} className="motion-easing-card">
              <header className="motion-easing-head">
                <code className="motion-easing-token">{e.token}</code>
                <span className="motion-easing-label">{e.label}</span>
              </header>
              <EasingViz curve={e.curve} token={e.token} />
              <p className="motion-easing-note">{e.note}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* iii. Primitivos — Fade / Slide / Scale */}
      <Section
        num="iii"
        title={<>{t("pages.motion.primTitle")}</>}
        kicker={t("pages.motion.primKicker")}
      >
        <p className="section-desc">{t("pages.motion.primDesc")}</p>

        <div className="motion-prim-grid">
          <div className="motion-prim-card">
            <header className="motion-prim-head">
              <code>&lt;Fade&gt;</code>
              <Button onClick={() => setFadeIn((v) => !v)} variant="ghost" size="sm">
                toggle
              </Button>
            </header>
            <div className="motion-prim-stage">
              <Fade in={fadeIn} duration={320} keepMounted>
                <div className="motion-prim-block">opacity</div>
              </Fade>
            </div>
          </div>

          <div className="motion-prim-card">
            <header className="motion-prim-head">
              <code>&lt;Slide from="bottom"&gt;</code>
              <Button onClick={() => setSlideIn((v) => !v)} variant="ghost" size="sm">
                toggle
              </Button>
            </header>
            <div className="motion-prim-stage">
              <Slide in={slideIn} from="bottom" distance={20} duration={320} keepMounted>
                <div className="motion-prim-block">translate</div>
              </Slide>
            </div>
          </div>

          <div className="motion-prim-card">
            <header className="motion-prim-head">
              <code>&lt;Scale from={0.9}&gt;</code>
              <Button onClick={() => setScaleIn((v) => !v)} variant="ghost" size="sm">
                toggle
              </Button>
            </header>
            <div className="motion-prim-stage">
              <Scale in={scaleIn} from={0.9} duration={320} keepMounted>
                <div className="motion-prim-block">scale</div>
              </Scale>
            </div>
          </div>
        </div>
      </Section>

      {/* iv. Collapse */}
      <Section
        num="iv"
        title={<>{t("pages.motion.collapseTitle")}</>}
        kicker={t("pages.motion.collapseKicker")}
      >
        <p className="section-desc">{t("pages.motion.collapseDesc")}</p>
        <div className="motion-collapse-stage">
          <Button onClick={() => setCollapseOpen((v) => !v)} variant="ghost" size="sm">
            {collapseOpen ? t("pages.motion.collapseClose") : t("pages.motion.collapseOpen")}
          </Button>
          <Collapse open={collapseOpen} duration={280}>
            <div className="motion-collapse-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                placerat lacus eu risus blandit, sit amet vehicula augue
                pellentesque. Aenean rutrum velit nec metus volutpat, ac
                imperdiet ligula vehicula.
              </p>
              <p>
                Donec ac risus a magna luctus posuere. Aliquam erat volutpat.
                Vivamus a libero in dui aliquam consectetur.
              </p>
            </div>
          </Collapse>
        </div>
      </Section>

      {/* v. ScrollReveal */}
      <Section
        num="v"
        title={<>{t("pages.motion.revealTitle")}</>}
        kicker={t("pages.motion.revealKicker")}
      >
        <p className="section-desc">{t("pages.motion.revealDesc")}</p>
        <div className="motion-reveal-strip">
          {(["up", "down", "left", "right"] as const).map((dir) => (
            <ScrollReveal
              key={dir}
              direction={dir}
              delay={0}
              className="motion-reveal-card"
            >
              <div className="motion-reveal-card-inner">
                <code>{dir}</code>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* vi. Page transitions */}
      <Section
        num="vi"
        title={<>{t("pages.motion.pageTitle")}</>}
        kicker={t("pages.motion.pageKicker")}
      >
        <p className="section-desc">{tr("pages.motion.pageDesc")}</p>
        <Code>{`/* Em App.tsx — já wired */
const transition = usePageTransition(current, { variant: "fade" });

<main data-page-transition={transition.variant}>
  <Suspense fallback={<PageFallback />}>
    <div key={transition.key} className="page-transition-frame">
      <Page onNavigate={navigate} />
    </div>
  </Suspense>
</main>

/* Persistência opcional de scroll por slug */
usePageTransition(current, { persistScroll: true });`}</Code>
      </Section>

      {/* vii. Regras */}
      <Section
        num="vii"
        title={<>{t("pages.motion.rulesTitle")}</>}
        kicker={t("pages.motion.rulesKicker")}
      >
        <p className="section-desc">{t("pages.motion.rulesDesc")}</p>
        <div className="motion-rules">
          {RULES.map((r) => (
            <article key={r.n} className="motion-rule">
              <div className="motion-rule-num">{r.n}</div>
              <div className="motion-rule-body">
                <h3 className="motion-rule-title">{r.t}</h3>
                <p className="motion-rule-text">{r.b}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
