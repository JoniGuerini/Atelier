import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ----------------------------------------------------------------
   Specimens — agora como tabela editorial.
   Cada linha carrega: nome, token, tamanho, line-height, peso, uso.
   O texto-amostra é renderizado in-place com o style real do token,
   pra que o próprio specimen seja a evidência visual. */
const SPECIMENS: {
  id: string;
  token: string;
  size: string;
  lh: string;
  weight: string;
  preview: { fontFamily: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string; fontStyle?: string };
}[] = [
  { id: "display",  token: "--text-display", size: "clamp(48,7vw,80)",  lh: "0.95", weight: "300",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-display)", lineHeight: "var(--lh-display)", fontWeight: 300, letterSpacing: "var(--tracking-tighter)" } },
  { id: "h3xl",     token: "--text-3xl",     size: "48",                lh: "1.1",  weight: "300",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-3xl)",     lineHeight: "var(--lh-3xl)",     fontWeight: 300, letterSpacing: "var(--tracking-tighter)" } },
  { id: "h2xl",     token: "--text-2xl",     size: "36",                lh: "1.2",  weight: "300",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)",     lineHeight: "var(--lh-2xl)",     fontWeight: 300, letterSpacing: "var(--tracking-tight)" } },
  { id: "hxl",      token: "--text-xl",      size: "28",                lh: "1.3",  weight: "300",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)",      lineHeight: "var(--lh-xl)",      fontWeight: 300, letterSpacing: "var(--tracking-tight)" } },
  { id: "hlg",      token: "--text-lg",      size: "21",                lh: "1.45", weight: "400",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)",      lineHeight: "var(--lh-lg)",      fontWeight: 400 } },
  { id: "body",     token: "--text-md",      size: "16",                lh: "1.65", weight: "400",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-md)",      lineHeight: "var(--lh-md)",      fontWeight: 400 } },
  { id: "ui",       token: "--text-sm",      size: "14",                lh: "1.55", weight: "400",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-sm)",      lineHeight: "var(--lh-sm)",      fontWeight: 400 } },
  { id: "small",    token: "--text-xs",      size: "13",                lh: "1.5",  weight: "400",
    preview: { fontFamily: "var(--font-serif)", fontSize: "var(--text-xs)",      lineHeight: "var(--lh-xs)",      fontWeight: 400 } },
  { id: "micro",    token: "--text-micro",   size: "11",                lh: "1.4",  weight: "500",
    preview: { fontFamily: "var(--font-mono)",  fontSize: "var(--text-micro)",   lineHeight: "var(--lh-micro)",   fontWeight: 500, letterSpacing: "var(--tracking-wide)" } },
  { id: "meta",     token: "--text-meta",    size: "10",                lh: "1.4",  weight: "500",
    preview: { fontFamily: "var(--font-mono)",  fontSize: "var(--text-meta)",    lineHeight: "var(--lh-meta)",    fontWeight: 500, letterSpacing: "var(--tracking-wider)" } },
];

/* Escala visual (mesma sequência, em cards) */
const SCALE_TOKENS = [
  "--text-meta",
  "--text-micro",
  "--text-xs",
  "--text-sm",
  "--text-md",
  "--text-lg",
  "--text-xl",
  "--text-2xl",
  "--text-3xl",
];

const FAMILIES = [
  {
    id: "serif",
    sample: "Aa",
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-3xl)",
    fontWeight: 300,
    italic: true,
  },
  {
    id: "mono",
    sample: "{}/0",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-2xl)",
    fontWeight: 400,
    italic: false,
  },
];

/* Numerais para demo tabular vs proporcional */
const NUM_ROWS = [
  { label: "JAN", value: "1.234,50" },
  { label: "FEV", value: "987,00" },
  { label: "MAR", value: "12.045,80" },
  { label: "ABR", value: "300,15" },
];

export default function Typography() {
  const { t, tr, raw } = useT();
  const sp = (k: string, f: string) => t(`pages.typography.specimens.${k}.${f}`);

  const dosDonts = (raw("pages.typography.dosDonts.items") || []) as any[];
  const stylesText = raw("pages.typography.styles") || ({} as any);

  return (
    <>
      <PageHead
        lead={t("pages.typography.lead")}
        title={
          <>
            {tr("pages.typography.titleA")}
            <em>{t("pages.typography.titleB")}</em>
          </>
        }
        metaLabel={t("pages.typography.metaLabel")}
        meta={t("pages.typography.meta")}
        intro={tr("pages.typography.intro")}
      />

      {/* ============================================================
          i. Famílias
          ============================================================ */}
      <Section
        num="i"
        title={<>{t("pages.typography.families.title")}</>}
        kicker={t("pages.typography.families.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.families.desc")}</p>
        <div className="type-fam-grid">
          {FAMILIES.map((f) => (
            <article key={f.id} className="type-fam-card">
              <div
                className="type-fam-sample"
                style={{
                  fontFamily: f.fontFamily,
                  fontSize: f.fontSize,
                  fontWeight: f.fontWeight,
                  fontStyle: f.italic ? "italic" : "normal",
                }}
              >
                {f.sample}
              </div>
              <div className="type-fam-meta">
                <div className="type-fam-name">
                  {t(`pages.typography.families.${f.id}.name`)}
                </div>
                <div className="type-fam-role">
                  {t(`pages.typography.families.${f.id}.role`)}
                </div>
                <p className="type-fam-rationale">
                  {tr(`pages.typography.families.${f.id}.rationale`)}
                </p>
                <dl className="type-fam-dl">
                  <dt>{t("pages.typography.families.weights")}</dt>
                  <dd>{t(`pages.typography.families.${f.id}.weights`)}</dd>
                  <dt>{t("pages.typography.families.stack")}</dt>
                  <dd className="type-mono-inline">
                    {t(`pages.typography.families.${f.id}.stack`)}
                  </dd>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============================================================
          ii. Specimens (tabela editorial)
          ============================================================ */}
      <Section
        num="ii"
        title={<>{t("pages.typography.specimensTitle")}</>}
        kicker={t("pages.typography.specimensKicker")}
      >
        <p className="section-desc">{tr("pages.typography.specimensDesc")}</p>
        <div className="type-specimens-wrap">
          <table className="type-specimens-table">
            <thead>
              <tr>
                <th>{t("pages.typography.cols.name")}</th>
                <th>{t("pages.typography.cols.token")}</th>
                <th>{t("pages.typography.cols.size")}</th>
                <th>{t("pages.typography.cols.lh")}</th>
                <th>{t("pages.typography.cols.weight")}</th>
                <th>{t("pages.typography.cols.use")}</th>
                <th>{t("pages.typography.cols.preview")}</th>
              </tr>
            </thead>
            <tbody>
              {SPECIMENS.map((s) => (
                <tr key={s.id}>
                  <td className="ts-name">{sp(s.id, "name")}</td>
                  <td className="ts-token">{s.token}</td>
                  <td className="ts-num">{s.size}</td>
                  <td className="ts-num">{s.lh}</td>
                  <td className="ts-num">{s.weight}</td>
                  <td className="ts-use">{sp(s.id, "use")}</td>
                  <td className="ts-preview">
                    <span style={s.preview as any}>{sp(s.id, "preview")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============================================================
          iii. Escala como sistema
          ============================================================ */}
      <Section
        num="iii"
        title={<>{t("pages.typography.scale.title")}</>}
        kicker={t("pages.typography.scale.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.scale.desc")}</p>

        <div className="type-scale-strip">
          {SCALE_TOKENS.map((tok) => (
            <div key={tok} className="type-scale-cell">
              <div
                className="type-scale-aa"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: `var(${tok})`,
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                Aa
              </div>
              <div className="type-scale-token">{tok}</div>
            </div>
          ))}
        </div>

        <h3 className="type-h">{t("pages.typography.scale.usageTitle")}</h3>
        <Code lang="css">{`/* Use sempre via tokens — números soltos quebram a escala */
.heading {
  font-family: var(--font-serif);
  font-size:  var(--text-2xl);
  line-height: var(--lh-2xl);
  letter-spacing: var(--tracking-tight);
}
.body {
  font-size:  var(--text-md);
  line-height: var(--lh-md);
}`}</Code>

        <h3 className="type-h">{t("pages.typography.scale.fluidTitle")}</h3>
        <p className="type-p">{tr("pages.typography.scale.fluidDesc")}</p>
        <Code lang="css">{`/* --text-display escala com a viewport, com piso e teto */
--text-display: clamp(48px, 7vw, 80px);`}</Code>
      </Section>

      {/* ============================================================
          iv. Ritmo & leitura
          ============================================================ */}
      <Section
        num="iv"
        title={<>{t("pages.typography.rhythm.title")}</>}
        kicker={t("pages.typography.rhythm.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.rhythm.desc")}</p>

        <h3 className="type-h">{t("pages.typography.rhythm.measureTitle")}</h3>
        <p className="type-p">{tr("pages.typography.rhythm.measureDesc")}</p>

        <div className="type-measure-grid">
          {(["narrow", "ideal", "wide"] as const).map((k) => (
            <figure key={k} className="type-measure-figure">
              <p
                className="type-measure-sample"
                style={{
                  maxWidth:
                    k === "narrow" ? "30ch" : k === "ideal" ? "var(--measure)" : "100ch",
                }}
              >
                {t(`pages.typography.rhythm.measureSample`)}
              </p>
              <figcaption className="type-measure-cap">
                <b>{t(`pages.typography.rhythm.measure.${k}.label`)}</b>
                <span>{t(`pages.typography.rhythm.measure.${k}.note`)}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="type-h">{t("pages.typography.rhythm.lhTitle")}</h3>
        <p className="type-p">{t("pages.typography.rhythm.lhDesc")}</p>
        <div className="type-lh-table">
          {[
            { range: "display · 3xl", lh: "0.95 – 1.1" },
            { range: "2xl · xl", lh: "1.2 – 1.3" },
            { range: "lg", lh: "1.45" },
            { range: "md (body)", lh: "1.65" },
            { range: "sm · xs", lh: "1.5 – 1.55" },
            { range: "micro · meta (mono caps)", lh: "1.4" },
          ].map((row) => (
            <div key={row.range} className="type-lh-row">
              <span className="type-lh-key">{row.range}</span>
              <span className="type-lh-val">{row.lh}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================
          v. Estilos textuais
          ============================================================ */}
      <Section
        num="v"
        title={<>{t("pages.typography.styles.title")}</>}
        kicker={t("pages.typography.styles.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.styles.desc")}</p>

        <article className="type-prose">
          <p className="ts-kicker">{stylesText.kickerSample}</p>
          <h1 className="ts-h1">{stylesText.h1}</h1>
          <p className="ts-lead">{stylesText.lead}</p>
          <p className="ts-body ts-dropcap">
            <span className="ts-drop">A</span>
            {stylesText.dropcap}
          </p>
          <h2 className="ts-h2">{stylesText.h2}</h2>
          <p className="ts-body">{stylesText.body1}</p>
          <h3 className="ts-h3">{stylesText.h3}</h3>
          <p className="ts-body">{stylesText.body2}</p>
          <blockquote className="ts-quote">
            {stylesText.quote}
            <footer>{stylesText.quoteAttr}</footer>
          </blockquote>
          <h4 className="ts-h4">{stylesText.h4}</h4>
          <ul className="ts-ul">
            {(stylesText.ulItems || []).map((it: string, i: number) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
          <ol className="ts-ol">
            {(stylesText.olItems || []).map((it: string, i: number) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
          <p className="ts-body">
            {stylesText.linksLead}{" "}
            <a className="ts-link" href="#/typography">
              {stylesText.linkText}
            </a>
            {stylesText.linksTrail}
          </p>
          <p className="ts-caption">{stylesText.caption}</p>
        </article>
      </Section>

      {/* ============================================================
          vi. Microtipografia
          ============================================================ */}
      <Section
        num="vi"
        title={<>{t("pages.typography.micro.title")}</>}
        kicker={t("pages.typography.micro.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.micro.desc")}</p>

        {/* Numerais tabular vs proporcional */}
        <h3 className="type-h">{t("pages.typography.micro.numTitle")}</h3>
        <p className="type-p">{tr("pages.typography.micro.numDesc")}</p>
        <div className="type-num-grid">
          <div className="type-num-card">
            <div className="type-num-cap">
              {t("pages.typography.micro.numProportional")}
            </div>
            <table className="type-num-table type-num-prop">
              <tbody>
                {NUM_ROWS.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td className="num">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="type-num-card">
            <div className="type-num-cap">
              {t("pages.typography.micro.numTabular")}
            </div>
            <table className="type-num-table type-num-tab">
              <tbody>
                {NUM_ROWS.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td className="num">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pares editoriais */}
        <h3 className="type-h">{t("pages.typography.micro.pairsTitle")}</h3>
        <div className="type-micro-grid">
          {(raw("pages.typography.micro.pairs") || []).map((p: any, i: number) => (
            <div key={i} className="type-micro-card">
              <div className="type-micro-cap">{p.label}</div>
              <div className="type-micro-pair">
                <div className="type-micro-side bad">
                  <span className="type-micro-tag">{t("pages.typography.micro.avoid")}</span>
                  <span className="type-micro-glyph">{p.bad}</span>
                </div>
                <div className="type-micro-side good">
                  <span className="type-micro-tag">{t("pages.typography.micro.use")}</span>
                  <span className="type-micro-glyph">{p.good}</span>
                </div>
              </div>
              <p className="type-micro-note">{p.note}</p>
            </div>
          ))}
        </div>

        {/* text-wrap */}
        <h3 className="type-h">{t("pages.typography.micro.wrapTitle")}</h3>
        <p className="type-p">{tr("pages.typography.micro.wrapDesc")}</p>
        <div className="type-wrap-grid">
          {(["normal", "balance", "pretty"] as const).map((mode) => (
            <figure key={mode} className="type-wrap-figure">
              <h4
                className="type-wrap-headline"
                style={{ textWrap: mode as any } as any}
              >
                {t("pages.typography.micro.wrapSample")}
              </h4>
              <figcaption className="type-wrap-cap">
                <code>text-wrap: {mode}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ============================================================
          vii. Acessibilidade
          ============================================================ */}
      <Section
        num="vii"
        title={<>{t("pages.typography.a11y.title")}</>}
        kicker={t("pages.typography.a11y.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.a11y.desc")}</p>
        <div className="type-a11y-grid">
          {(raw("pages.typography.a11y.rules") || []).map((r: any, i: number) => (
            <article key={i} className="type-a11y-card">
              <div className="type-a11y-num">{String(i + 1).padStart(2, "0")}</div>
              <h4 className="type-a11y-title">{r.t}</h4>
              <p className="type-a11y-body">{r.b}</p>
            </article>
          ))}
        </div>

        <h3 className="type-h">{t("pages.typography.a11y.darkTitle")}</h3>
        <p className="type-p">{tr("pages.typography.a11y.darkDesc")}</p>
      </Section>

      {/* ============================================================
          viii. Do's & Don'ts
          ============================================================ */}
      <Section
        num="viii"
        title={<>{t("pages.typography.dosDonts.title")}</>}
        kicker={t("pages.typography.dosDonts.kicker")}
      >
        <p className="section-desc">{tr("pages.typography.dosDonts.desc")}</p>
        <div className="type-dont-grid">
          {dosDonts.map((d: any, i: number) => (
            <div key={i} className="type-dont-card">
              <div className="type-dont-pair">
                <div className={`type-dont-side bad align-${d.align || "left"}`}>
                  <span className="type-dont-tag">{t("pages.typography.dosDonts.dont")}</span>
                  <p
                    className="type-dont-sample"
                    style={d.badStyle as any}
                  >
                    {d.sample}
                  </p>
                </div>
                <div className={`type-dont-side good align-${d.align || "left"}`}>
                  <span className="type-dont-tag">{t("pages.typography.dosDonts.do")}</span>
                  <p
                    className="type-dont-sample"
                    style={d.goodStyle as any}
                  >
                    {d.sample}
                  </p>
                </div>
              </div>
              <p className="type-dont-note">{d.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
