import { useCallback, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  Button,
  CompositionSection,
} from "../ds/primitives.jsx";
import {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneHint,
  DropzoneFile,
  DropzoneFilename,
  DropzoneMeta,
  DropzoneActions,
} from "../ds/Dropzone.jsx";
import { useT } from "../lib/i18n.jsx";

export default function DropzonePage() {
  const { t, tr, locale } = useT();
  const [file, setFile] = useState(null);

  const onFile = useCallback((f) => setFile(f), []);
  const reset = useCallback(() => setFile(null), []);

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
          tech="Dropzone"
          stack
          code={`<Dropzone accept=".csv,.tsv,.txt" onSelect={setFile}>
  <DropzoneIcon>csv<span className="dot">.</span></DropzoneIcon>
  <DropzoneTitle>${t("pages.dropzone.empty.dragA")}<em>${t("pages.dropzone.empty.dragB")}</em>${t("pages.dropzone.empty.dragC")}</DropzoneTitle>
  <DropzoneHint>${t("pages.dropzone.empty.orPick")}</DropzoneHint>
</Dropzone>`}
        >
          <Dropzone accept=".csv,.tsv,.txt" onSelect={onFile}>
            <DropzoneIcon>
              csv<span className="dot">.</span>
            </DropzoneIcon>
            <DropzoneTitle>
              {t("pages.dropzone.empty.dragA")}
              <em>{t("pages.dropzone.empty.dragB")}</em>
              {t("pages.dropzone.empty.dragC")}
            </DropzoneTitle>
            <DropzoneHint>{t("pages.dropzone.empty.orPick")}</DropzoneHint>
          </Dropzone>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.dropzone.filled.title")}</>}
        kicker={t("pages.dropzone.filled.kicker")}
      >
        <Example
          caption={t("pages.dropzone.filled.caption")}
          tech="DropzoneFile"
          stack
          code={`<DropzoneFile>
  <DropzoneFilename>{file.name}</DropzoneFilename>
  <DropzoneMeta items={[
    { label: "${t("pages.dropzone.filled.size")}", value: \`\${(file.size / 1024).toFixed(1)} kB\` },
    { label: "${t("pages.dropzone.filled.type")}", value: file.type || "${t("pages.dropzone.filled.defaultType")}" },
    { label: "${t("pages.dropzone.filled.modified")}", value: new Date(file.lastModified).toLocaleDateString() },
  ]} />
  <DropzoneActions>
    <Button variant="link" onClick={reset}>${t("pages.dropzone.filled.reset")}</Button>
  </DropzoneActions>
</DropzoneFile>`}
        >
          {file ? (
            <DropzoneFile>
              <DropzoneFilename>{file.name}</DropzoneFilename>
              <DropzoneMeta
                items={[
                  {
                    label: t("pages.dropzone.filled.size"),
                    value: `${(file.size / 1024).toFixed(1)} kB`,
                  },
                  {
                    label: t("pages.dropzone.filled.type"),
                    value: file.type || t("pages.dropzone.filled.defaultType"),
                  },
                  {
                    label: t("pages.dropzone.filled.modified"),
                    value: new Date(file.lastModified).toLocaleDateString(
                      dateLocale
                    ),
                  },
                ]}
              />
              <DropzoneActions>
                <Button variant="link" onClick={reset}>
                  {t("pages.dropzone.filled.reset")}
                </Button>
              </DropzoneActions>
            </DropzoneFile>
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

      <CompositionSection
        num="iii"
        i18nPrefix="pages.dropzone.composition"
        root="Dropzone"
        nodes={[
          { name: "DropzoneIcon" },
          { name: "DropzoneTitle" },
          { name: "DropzoneHint" },
          {
            name: "DropzoneFile",
            children: [
              { name: "DropzoneFilename" },
              { name: "DropzoneMeta" },
              { name: "DropzoneActions" },
            ],
          },
        ]}
      />
    </>
  );
}
