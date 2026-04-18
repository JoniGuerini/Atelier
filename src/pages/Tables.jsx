import {
  PageHead,
  Section,
  Example,
  Badge,
  Button,
} from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

const STATE_VARIANT = {
  published: "ok",
  draft: "warn",
  review: "accent",
};

export default function Tables() {
  const { t, tr, raw } = useT();
  const headers = raw("pages.tables.headers") || {};
  const states = raw("pages.tables.states") || {};
  const rows = raw("pages.tables.rows") || [];
  const readCta = t("pages.tables.readCta");

  return (
    <>
      <PageHead
        lead={t("pages.tables.lead")}
        title={
          <>
            {tr("pages.tables.titleA")}
            <em>{t("pages.tables.titleB")}</em>
          </>
        }
        metaLabel={t("pages.tables.metaLabel")}
        meta={t("pages.tables.meta")}
        intro={tr("pages.tables.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.tables.standardTitle")}</>}
        kicker={t("pages.tables.standardKicker")}
      >
        <Example
          caption={t("pages.tables.standardCaption")}
          tech="header mono · body serif"
          stack
          code={`<div className="ds-table-wrap">
  <table className="ds-table">
    <thead>
      <tr>
        <th>${headers.n}</th>
        <th>${headers.title}</th>
        <th>${headers.author}</th>
        <th>${headers.state}</th>
        <th>${headers.date}</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {rows.map((r) => (
        <tr key={r.n}>
          <td className="mono">{r.n}</td>
          <td><em>{r.title}</em></td>
          <td className="mono">{r.author}</td>
          <td><Badge dot variant={stateVariant(r)}>{stateLabel(r)}</Badge></td>
          <td className="mono">{r.date}</td>
          <td style={{ textAlign: "right" }}>
            <Button variant="link">${readCta}</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`}
        >
          <div className="ds-table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>{headers.n}</th>
                  <th>{headers.title}</th>
                  <th style={{ width: 140 }}>{headers.author}</th>
                  <th style={{ width: 140 }}>{headers.state}</th>
                  <th style={{ width: 120 }}>{headers.date}</th>
                  <th style={{ width: 120 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.n}>
                    <td className="mono">{r.n}</td>
                    <td>
                      <em style={{ fontStyle: "italic", fontSize: 15 }}>
                        {r.title}
                      </em>
                    </td>
                    <td className="mono">{r.author}</td>
                    <td>
                      <Badge dot variant={STATE_VARIANT[r.stateKey] || "info"}>
                        {states[r.stateKey]}
                      </Badge>
                    </td>
                    <td className="mono">{r.date}</td>
                    <td style={{ textAlign: "right" }}>
                      <Button variant="link">{readCta}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Example>
      </Section>
    </>
  );
}
