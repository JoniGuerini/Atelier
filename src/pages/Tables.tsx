import {
  PageHead,
  Section,
  Example,
  Badge,
  Button,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../ds/Table.tsx";
import { useT } from "../lib/i18n.tsx";

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
          code={`<Table>
  <TableHead>
    <TableRow>
      <TableHeader>${headers.n}</TableHeader>
      <TableHeader>${headers.title}</TableHeader>
      <TableHeader>${headers.author}</TableHeader>
      <TableHeader>${headers.state}</TableHeader>
      <TableHeader>${headers.date}</TableHeader>
      <TableHeader />
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((r: any) => (
      <TableRow key={r.n}>
        <TableCell mono>{r.n}</TableCell>
        <TableCell><em>{r.title}</em></TableCell>
        <TableCell mono>{r.author}</TableCell>
        <TableCell><Badge dot variant={stateVariant(r)}>{stateLabel(r)}</Badge></TableCell>
        <TableCell mono>{r.date}</TableCell>
        <TableCell align="right"><Button variant="link">${readCta}</Button></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader width={80}>{headers.n}</TableHeader>
                <TableHeader>{headers.title}</TableHeader>
                <TableHeader width={140}>{headers.author}</TableHeader>
                <TableHeader width={140}>{headers.state}</TableHeader>
                <TableHeader width={120}>{headers.date}</TableHeader>
                <TableHeader width={120} />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r: any) => (
                <TableRow key={r.n}>
                  <TableCell mono>{r.n}</TableCell>
                  <TableCell>
                    <em style={{ fontStyle: "italic", fontSize: 15 }}>
                      {r.title}
                    </em>
                  </TableCell>
                  <TableCell mono>{r.author}</TableCell>
                  <TableCell>
                    <Badge
                      dot
                      variant={(STATE_VARIANT as any)[r.stateKey] || "info"}
                    >
                      {(states as any)[r.stateKey]}
                    </Badge>
                  </TableCell>
                  <TableCell mono>{r.date}</TableCell>
                  <TableCell align="right">
                    <Button variant="link">{readCta}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>
      </Section>

      <CompositionSection
        num="ii"
        i18nPrefix="pages.tables.composition"
        root="Table"
        nodes={[
          {
            name: "TableHead",
            children: [
              { name: "TableRow", children: [{ name: "TableHeader" }] },
            ],
          },
          {
            name: "TableBody",
            children: [
              { name: "TableRow", children: [{ name: "TableCell" }] },
            ],
          },
        ]}
      />
    </>
  );
}
