import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   License — /license (About · 76, fase 12)
   ----------------------------------------------------------------
   MIT com anotações editoriais. Curta — uma página é suficiente.
   ================================================================ */

const MIT_LICENSE = `MIT License

Copyright (c) 2026 Atelier Design System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function License() {
  const { t, tr, raw } = useT();
  const allowed = (raw("pages.license.allowed.items") as string[]) || [];
  const restricted = (raw("pages.license.restricted.items") as string[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.license.lead")}
        title={
          <>
            {tr("pages.license.titleA")}
            <em>{t("pages.license.titleB")}</em>
          </>
        }
        metaLabel={t("pages.license.metaLabel")}
        meta={t("pages.license.meta")}
        intro={tr("pages.license.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.license.summary.title")}</>}
        kicker={t("pages.license.summary.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.license.summary.body")}</p>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.license.use.title")}</>}
        kicker={t("pages.license.use.kicker")}
      >
        <div className="pattern-do-dont">
          <div className="pattern-do">
            <span className="pattern-do-label">{t("pages.license.use.allowedLabel")}</span>
            <ul>
              {allowed.map((it, i) => (
                <li key={i}>{emify(it)}</li>
              ))}
            </ul>
          </div>
          <div className="pattern-dont">
            <span className="pattern-dont-label">{t("pages.license.use.restrictedLabel")}</span>
            <ul>
              {restricted.map((it, i) => (
                <li key={i}>{emify(it)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.license.attribution.title")}</>}
        kicker={t("pages.license.attribution.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.license.attribution.body")}</p>
        </div>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.license.formal.title")}</>}
        kicker={t("pages.license.formal.kicker")}
      >
        <div className="about-license">
          <h3>{t("pages.license.formal.heading")}</h3>
          <p>{tr("pages.license.formal.body")}</p>
          <pre className="about-license-formal">{MIT_LICENSE}</pre>
        </div>
      </Section>
    </>
  );
}
