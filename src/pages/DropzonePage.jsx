import { useCallback, useRef, useState } from "react";
import { PageHead, Section, Example, Button } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function DropzonePage() {
  const { t, tr, locale } = useT();
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const onFile = useCallback((f) => setFile(f), []);
  const reset = useCallback(() => setFile(null), []);

  const handleInput = (e) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  const dateLocale = locale === "en" ? "en-US" : "pt-BR";

  return (
    <>
      <PageHead
        lead={t("pages.dropzone.lead")}
        title={
          <>
            {tr("pages.dropzone.titleA")}
            <em>{t("pages.dropzone.titleB")}</em>
          </>
        }
        metaLabel={t("pages.dropzone.metaLabel")}
        meta={t("pages.dropzone.meta")}
        intro={tr("pages.dropzone.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.dropzone.empty.title")}</>}
        kicker={t("pages.dropzone.empty.kicker")}
      >
        <Example
          caption={t("pages.dropzone.empty.caption")}
          tech=".dropzone"
          stack
          code={`const inputRef = useRef(null);
const [drag, setDrag] = useState(false);

<div
  className={\`dropzone \${drag ? "drag" : ""}\`}
  onClick={() => inputRef.current?.click()}
  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
  onDragLeave={() => setDrag(false)}
  onDrop={handleDrop}
>
  <div className="icon">csv<span className="dot">.</span></div>
  <div className="title">${t("pages.dropzone.empty.dragA")}<em>${t("pages.dropzone.empty.dragB")}</em>${t("pages.dropzone.empty.dragC")}</div>
  <div className="sub">${t("pages.dropzone.empty.orPick")}</div>
  <input ref={inputRef} type="file" accept=".csv,.tsv,.txt" onChange={handleInput} />
</div>`}
        >
          <div
            className={`dropzone ${drag ? "drag" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
          >
            <div className="icon">
              csv<span className="dot">.</span>
            </div>
            <div className="title">
              {t("pages.dropzone.empty.dragA")}
              <em>{t("pages.dropzone.empty.dragB")}</em>
              {t("pages.dropzone.empty.dragC")}
            </div>
            <div className="sub">{t("pages.dropzone.empty.orPick")}</div>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={handleInput}
            />
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.dropzone.filled.title")}</>}
        kicker={t("pages.dropzone.filled.kicker")}
      >
        <Example
          caption={t("pages.dropzone.filled.caption")}
          tech=".dropzone.has-file"
          stack
          code={`<div className="dropzone has-file">
  <div className="fname">{file.name}</div>
  <dl>
    <dt>${t("pages.dropzone.filled.size")}</dt>
    <dd>{(file.size / 1024).toFixed(1)} kB</dd>
    <dt>${t("pages.dropzone.filled.type")}</dt>
    <dd>{file.type || "${t("pages.dropzone.filled.defaultType")}"}</dd>
    <dt>${t("pages.dropzone.filled.modified")}</dt>
    <dd>{new Date(file.lastModified).toLocaleDateString()}</dd>
  </dl>
  <Button variant="link" onClick={reset}>
    ${t("pages.dropzone.filled.reset")}
  </Button>
</div>`}
        >
          {file ? (
            <div
              className="dropzone has-file"
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                textAlign: "left",
                padding: 24,
                minHeight: 200,
              }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontStyle: "italic",
                    marginBottom: 16,
                  }}
                >
                  {file.name}
                </div>
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: "6px 16px",
                    padding: "14px 0",
                    borderTop: "1px solid var(--rule-soft)",
                    borderBottom: "1px solid var(--rule-soft)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                >
                  <dt style={{ color: "var(--ink-faint)", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em" }}>
                    {t("pages.dropzone.filled.size")}
                  </dt>
                  <dd>{(file.size / 1024).toFixed(1)} kB</dd>
                  <dt style={{ color: "var(--ink-faint)", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em" }}>
                    {t("pages.dropzone.filled.type")}
                  </dt>
                  <dd>{file.type || t("pages.dropzone.filled.defaultType")}</dd>
                  <dt style={{ color: "var(--ink-faint)", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em" }}>
                    {t("pages.dropzone.filled.modified")}
                  </dt>
                  <dd>
                    {new Date(file.lastModified).toLocaleDateString(dateLocale)}
                  </dd>
                </dl>
                <div style={{ marginTop: 16 }}>
                  <Button variant="link" onClick={reset}>
                    {t("pages.dropzone.filled.reset")}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 15,
                color: "var(--ink-faint)",
                padding: "40px 24px",
                border: "1.5px dashed var(--rule-soft)",
                textAlign: "center",
              }}
            >
              {t("pages.dropzone.filled.hint")}
            </div>
          )}
        </Example>
      </Section>
    </>
  );
}
