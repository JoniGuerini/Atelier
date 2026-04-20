import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ----------------------------------------------------------------
   Voice & tone — página espelho de Typography.
   Aqui não tratamos da forma das letras, mas do que elas dizem:
   princípios, tom por contexto, vocabulário, microcopy.
   ---------------------------------------------------------------- */

/* Princípios de voz — quatro pilares + um adjetivo curto */
const PRINCIPLES = [
  { id: "quiet",    glyph: "·" },
  { id: "precise",  glyph: "÷" },
  { id: "honest",   glyph: "—" },
  { id: "human",    glyph: "@" },
];

/* Contextos de tom — matriz contexto × adjetivos × exemplo bom × exemplo ruim */
const TONE_ROWS = [
  { id: "error" },
  { id: "success" },
  { id: "empty" },
  { id: "destructive" },
  { id: "marketing" },
  { id: "technical" },
  { id: "loading" },
];

/* Vocabulário — pares preferimos/evitamos, com porquê */
const VOCAB_PT = [
  "save", "cancel", "delete", "config", "loading",
  "submit", "register", "you", "click", "exit",
];
const VOCAB_EN = [
  "save", "cancel", "delete", "config", "loading",
  "submit", "register", "click", "exit", "select",
];

/* Capitalização — exemplos */
const CAP_EXAMPLES = [
  { id: "page",    style: "sentence" },
  { id: "section", style: "sentence" },
  { id: "button",  style: "sentence" },
  { id: "label",   style: "sentence" },
  { id: "menu",    style: "sentence" },
  { id: "brand",   style: "title"    },
  { id: "doc",     style: "title"    },
];

/* Pontuação editorial — itens que viram chips com o glyph + uso */
const PUNCTS = [
  { id: "quotes",     glyph: "“ ”" },
  { id: "apostrophe", glyph: "'"  },
  { id: "emdash",     glyph: "—"   },
  { id: "endash",     glyph: "–"   },
  { id: "ellipsis",   glyph: "…"   },
  { id: "ampersand",  glyph: "&"   },
  { id: "nbsp",       glyph: "·"   },
  { id: "prime",      glyph: "′ ″" },
];

/* Pessoa & número — três posturas */
const PERSONS = [
  { id: "you",      tone: "warm"   },
  { id: "we",       tone: "shared" },
  { id: "neutral",  tone: "formal" },
];

/* Microcopy patterns — pares para cada padrão (button, placeholder, confirm, label) */
const PATTERNS = [
  { id: "button",      verb: true  },
  { id: "placeholder", verb: false },
  { id: "confirm",     verb: false },
  { id: "label",       verb: false },
  { id: "hint",        verb: false },
  { id: "error",       verb: false },
];

/* Mensagens de UI — exemplos bem/mal escritos lado a lado */
const UI_MESSAGES = [
  { id: "empty"     },
  { id: "notFound"  },
  { id: "loading"   },
  { id: "success"   },
  { id: "offline"   },
];

export default function Voice() {
  const { t, tr, raw } = useT();
  const dosDonts = (raw("pages.voice.dosDonts.items") || []) as any[];

  return (
    <>
      <PageHead
        lead={t("pages.voice.lead")}
        title={
          <>
            {tr("pages.voice.titleA")}
            <em>{t("pages.voice.titleB")}</em>
          </>
        }
        metaLabel={t("pages.voice.metaLabel")}
        meta={t("pages.voice.meta")}
        intro={tr("pages.voice.intro")}
      />

      {/* ============================================================
          i. Princípios de voz
          ============================================================ */}
      <Section
        num="i"
        title={<>{t("pages.voice.principles.title")}</>}
        kicker={t("pages.voice.principles.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.principles.desc")}</p>
        <div className="voice-prin-grid">
          {PRINCIPLES.map((p) => (
            <article key={p.id} className="voice-prin-card">
              <div className="voice-prin-glyph" aria-hidden="true">{p.glyph}</div>
              <div className="voice-prin-name">
                {t(`pages.voice.principles.${p.id}.name`)}
              </div>
              <p className="voice-prin-desc">
                {tr(`pages.voice.principles.${p.id}.desc`)}
              </p>
              <div className="voice-prin-tag">
                {t(`pages.voice.principles.${p.id}.tag`)}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============================================================
          ii. Tom por contexto
          ============================================================ */}
      <Section
        num="ii"
        title={<>{t("pages.voice.tone.title")}</>}
        kicker={t("pages.voice.tone.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.tone.desc")}</p>
        <div className="voice-tone-wrap">
          <table className="voice-tone-table">
            <thead>
              <tr>
                <th>{t("pages.voice.tone.cols.context")}</th>
                <th>{t("pages.voice.tone.cols.attrs")}</th>
                <th>{t("pages.voice.tone.cols.do")}</th>
                <th>{t("pages.voice.tone.cols.dont")}</th>
              </tr>
            </thead>
            <tbody>
              {TONE_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="vt-ctx">
                    <strong>{t(`pages.voice.tone.rows.${row.id}.label`)}</strong>
                    <span className="vt-when">
                      {t(`pages.voice.tone.rows.${row.id}.when`)}
                    </span>
                  </td>
                  <td className="vt-attrs">
                    {t(`pages.voice.tone.rows.${row.id}.attrs`)}
                  </td>
                  <td className="vt-good">
                    {t(`pages.voice.tone.rows.${row.id}.good`)}
                  </td>
                  <td className="vt-bad">
                    {t(`pages.voice.tone.rows.${row.id}.bad`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============================================================
          iii. Vocabulário
          ============================================================ */}
      <Section
        num="iii"
        title={<>{t("pages.voice.vocab.title")}</>}
        kicker={t("pages.voice.vocab.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.vocab.desc")}</p>

        <h3 className="voice-h">{t("pages.voice.vocab.ptTitle")}</h3>
        <div className="voice-vocab-table">
          <div className="voice-vocab-head">
            <span>{t("pages.voice.vocab.cols.prefer")}</span>
            <span>{t("pages.voice.vocab.cols.avoid")}</span>
            <span>{t("pages.voice.vocab.cols.why")}</span>
          </div>
          {VOCAB_PT.map((id) => (
            <div key={`pt-${id}`} className="voice-vocab-row">
              <span className="vv-prefer">
                {t(`pages.voice.vocab.pt.${id}.prefer`)}
              </span>
              <span className="vv-avoid">
                {t(`pages.voice.vocab.pt.${id}.avoid`)}
              </span>
              <span className="vv-why">
                {t(`pages.voice.vocab.pt.${id}.why`)}
              </span>
            </div>
          ))}
        </div>

        <h3 className="voice-h">{t("pages.voice.vocab.enTitle")}</h3>
        <div className="voice-vocab-table">
          <div className="voice-vocab-head">
            <span>{t("pages.voice.vocab.cols.prefer")}</span>
            <span>{t("pages.voice.vocab.cols.avoid")}</span>
            <span>{t("pages.voice.vocab.cols.why")}</span>
          </div>
          {VOCAB_EN.map((id) => (
            <div key={`en-${id}`} className="voice-vocab-row">
              <span className="vv-prefer">
                {t(`pages.voice.vocab.en.${id}.prefer`)}
              </span>
              <span className="vv-avoid">
                {t(`pages.voice.vocab.en.${id}.avoid`)}
              </span>
              <span className="vv-why">
                {t(`pages.voice.vocab.en.${id}.why`)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================
          iv. Capitalização
          ============================================================ */}
      <Section
        num="iv"
        title={<>{t("pages.voice.cap.title")}</>}
        kicker={t("pages.voice.cap.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.cap.desc")}</p>

        <div className="voice-cap-rules">
          <article className="voice-cap-card">
            <div className="voice-cap-style">{t("pages.voice.cap.sentenceLabel")}</div>
            <h3 className="voice-h">{t("pages.voice.cap.sentenceTitle")}</h3>
            <p className="voice-p">{tr("pages.voice.cap.sentenceDesc")}</p>
            <div className="voice-cap-sample sentence">
              {t("pages.voice.cap.sentenceSample")}
            </div>
          </article>
          <article className="voice-cap-card">
            <div className="voice-cap-style">{t("pages.voice.cap.titleLabel")}</div>
            <h3 className="voice-h">{t("pages.voice.cap.titleTitle")}</h3>
            <p className="voice-p">{tr("pages.voice.cap.titleDesc")}</p>
            <div className="voice-cap-sample title">
              {t("pages.voice.cap.titleSample")}
            </div>
          </article>
        </div>

        <h3 className="voice-h voice-h-spaced">{t("pages.voice.cap.examplesTitle")}</h3>
        <div className="voice-cap-grid">
          {CAP_EXAMPLES.map((c) => (
            <div key={c.id} className="voice-cap-row">
              <span className="vc-where">
                {t(`pages.voice.cap.examples.${c.id}.where`)}
              </span>
              <span className={`vc-text ${c.style}`}>
                {t(`pages.voice.cap.examples.${c.id}.text`)}
              </span>
              <span className="vc-style">{c.style}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================
          v. Pontuação editorial
          ============================================================ */}
      <Section
        num="v"
        title={<>{t("pages.voice.punct.title")}</>}
        kicker={t("pages.voice.punct.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.punct.desc")}</p>
        <div className="voice-punct-grid">
          {PUNCTS.map((p) => (
            <article key={p.id} className="voice-punct-card">
              <div className="voice-punct-glyph">{p.glyph}</div>
              <div className="voice-punct-name">
                {t(`pages.voice.punct.items.${p.id}.name`)}
              </div>
              <p className="voice-punct-use">
                {tr(`pages.voice.punct.items.${p.id}.use`)}
              </p>
              <div className="voice-punct-ex">
                {t(`pages.voice.punct.items.${p.id}.ex`)}
              </div>
            </article>
          ))}
        </div>
        <p className="voice-aside">
          {tr("pages.voice.punct.cross")}
        </p>
      </Section>

      {/* ============================================================
          vi. Pessoa & número
          ============================================================ */}
      <Section
        num="vi"
        title={<>{t("pages.voice.person.title")}</>}
        kicker={t("pages.voice.person.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.person.desc")}</p>
        <div className="voice-person-grid">
          {PERSONS.map((p) => (
            <article key={p.id} className={`voice-person-card tone-${p.tone}`}>
              <div className="voice-person-tag">
                {t(`pages.voice.person.${p.id}.tag`)}
              </div>
              <h3 className="voice-h">
                {t(`pages.voice.person.${p.id}.name`)}
              </h3>
              <p className="voice-p">
                {tr(`pages.voice.person.${p.id}.desc`)}
              </p>
              <div className="voice-person-when">
                <strong>{t("pages.voice.person.whenLabel")}</strong>{" "}
                {t(`pages.voice.person.${p.id}.when`)}
              </div>
              <div className="voice-person-ex">
                <em>{t(`pages.voice.person.${p.id}.ex`)}</em>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============================================================
          vii. Microcopy patterns
          ============================================================ */}
      <Section
        num="vii"
        title={<>{t("pages.voice.patterns.title")}</>}
        kicker={t("pages.voice.patterns.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.patterns.desc")}</p>
        <div className="voice-patterns-list">
          {PATTERNS.map((p) => (
            <article key={p.id} className="voice-pattern-card">
              <header className="voice-pattern-head">
                <h3 className="voice-h">
                  {t(`pages.voice.patterns.items.${p.id}.name`)}
                </h3>
                <span className="voice-pattern-rule">
                  {t(`pages.voice.patterns.items.${p.id}.rule`)}
                </span>
              </header>
              <p className="voice-p">
                {tr(`pages.voice.patterns.items.${p.id}.desc`)}
              </p>
              <div className="voice-pattern-pair">
                <div className="voice-pattern-good">
                  <div className="voice-pattern-tag good">
                    {t("pages.voice.patterns.goodLabel")}
                  </div>
                  <ul>
                    {((raw(`pages.voice.patterns.items.${p.id}.good`) || []) as string[]).map(
                      (s, i) => (
                        <li key={i}>{s}</li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="voice-pattern-bad">
                  <div className="voice-pattern-tag bad">
                    {t("pages.voice.patterns.badLabel")}
                  </div>
                  <ul>
                    {((raw(`pages.voice.patterns.items.${p.id}.bad`) || []) as string[]).map(
                      (s, i) => (
                        <li key={i}>{s}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============================================================
          viii. Mensagens de UI
          ============================================================ */}
      <Section
        num="viii"
        title={<>{t("pages.voice.ui.title")}</>}
        kicker={t("pages.voice.ui.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.ui.desc")}</p>
        <div className="voice-ui-list">
          {UI_MESSAGES.map((m) => (
            <article key={m.id} className="voice-ui-card">
              <header className="voice-ui-head">
                <h3 className="voice-h">{t(`pages.voice.ui.items.${m.id}.name`)}</h3>
                <p className="voice-ui-when">
                  {tr(`pages.voice.ui.items.${m.id}.when`)}
                </p>
              </header>
              <div className="voice-ui-pair">
                <div className="voice-ui-good">
                  <div className="voice-ui-tag good">
                    {t("pages.voice.ui.goodLabel")}
                  </div>
                  <div className="voice-ui-msg">
                    <strong>
                      {t(`pages.voice.ui.items.${m.id}.good.title`)}
                    </strong>
                    <p>{tr(`pages.voice.ui.items.${m.id}.good.body`)}</p>
                    <span className="voice-ui-cta">
                      {t(`pages.voice.ui.items.${m.id}.good.cta`)}
                    </span>
                  </div>
                </div>
                <div className="voice-ui-bad">
                  <div className="voice-ui-tag bad">
                    {t("pages.voice.ui.badLabel")}
                  </div>
                  <div className="voice-ui-msg">
                    <strong>
                      {t(`pages.voice.ui.items.${m.id}.bad.title`)}
                    </strong>
                    <p>{tr(`pages.voice.ui.items.${m.id}.bad.body`)}</p>
                    <span className="voice-ui-cta">
                      {t(`pages.voice.ui.items.${m.id}.bad.cta`)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============================================================
          ix. Bilíngue + marca como narrativa
          ============================================================ */}
      <Section
        num="ix"
        title={<>{t("pages.voice.brand.title")}</>}
        kicker={t("pages.voice.brand.kicker")}
      >
        <p className="section-desc">{tr("pages.voice.brand.desc")}</p>

        <div className="voice-brand-grid">
          <article className="voice-brand-card">
            <div className="voice-brand-flag">PT</div>
            <h3 className="voice-h">{t("pages.voice.brand.pt.name")}</h3>
            <p className="voice-p">{tr("pages.voice.brand.pt.desc")}</p>
            <ul className="voice-brand-list">
              {((raw("pages.voice.brand.pt.notes") || []) as string[]).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </article>
          <article className="voice-brand-card">
            <div className="voice-brand-flag">EN</div>
            <h3 className="voice-h">{t("pages.voice.brand.en.name")}</h3>
            <p className="voice-p">{tr("pages.voice.brand.en.desc")}</p>
            <ul className="voice-brand-list">
              {((raw("pages.voice.brand.en.notes") || []) as string[]).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </article>
        </div>

        <h3 className="voice-h voice-h-spaced">{t("pages.voice.brand.metaphorTitle")}</h3>
        <blockquote className="voice-metaphor">
          {tr("pages.voice.brand.metaphor")}
        </blockquote>

        <h3 className="voice-h voice-h-spaced">{t("pages.voice.brand.codeTitle")}</h3>
        <p className="voice-p">{tr("pages.voice.brand.codeDesc")}</p>
        <Code lang="tsx">{`/* O lead define o tom — silencioso, contido. */
<PageHead
  lead="Manual silencioso"
  title={<>O <em>tom</em></>}
  intro="Como o Atelier escreve quando ninguém está olhando."
/>

/* Microcopy de botão — verbo, sem terminar em ponto */
<Button>Salvar alterações</Button>

/* Erro — diga o que aconteceu, ofereça saída */
<Alert variant="error" title="Não foi possível salvar">
  Verifique sua conexão e tente novamente.
</Alert>`}</Code>

        {/* Faça · não faça (de fechamento) */}
        {dosDonts.length > 0 && (
          <>
            <h3 className="voice-h voice-h-spaced">{t("pages.voice.dosDonts.title")}</h3>
            <div className="voice-dont-grid">
              {dosDonts.map((row: any, i: number) => (
                <div key={i} className="voice-dont-card">
                  <div className="voice-dont-do">
                    <span className="vd-tag good">
                      {t("pages.voice.dosDonts.do")}
                    </span>
                    <p>{row.do}</p>
                  </div>
                  <div className="voice-dont-x">
                    <span className="vd-tag bad">
                      {t("pages.voice.dosDonts.dont")}
                    </span>
                    <p>{row.dont}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
