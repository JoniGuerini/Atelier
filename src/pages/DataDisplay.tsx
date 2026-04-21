import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
} from "../ds/primitives.tsx";
import {
  Stat,
  StatKicker,
  StatLabel,
  StatValue,
  StatDelta,
  StatSpark,
} from "../ds/Stat.tsx";
import {
  PricingTable,
  PricingTableHead,
  PricingTableBody,
  PricingTableRow,
  PricingTableTh,
  PricingTableTd,
} from "../ds/PricingTable.tsx";
import { DiffViewer } from "../ds/DiffViewer.tsx";
import { Lightbox } from "../ds/Lightbox.tsx";
import { CircularProgress } from "../ds/CircularProgress.tsx";
import { RangeSlider } from "../ds/RangeSlider.tsx";
import { Field, FieldLabel } from "../ds/Field.tsx";
import { useT } from "../lib/i18n.tsx";
import { useTheme } from "../lib/theme.tsx";

const DEMO_SPARK = [12, 14, 13, 16, 18, 17, 21, 24, 22, 26];

export default function DataDisplayPage() {
  const { t, tr } = useT();
  const { theme } = useTheme();
  const [lbOpen, setLbOpen] = useState(false);
  const lightboxOgSrc = theme === "dark" ? "/og-image-dark.svg" : "/og-image.svg";
  const [ring, setRing] = useState(68);

  const diffBefore = t("pages.dataDisplay.diff.before");
  const diffAfter = t("pages.dataDisplay.diff.after");

  return (
    <>
      <PageHead
        lead={t("pages.dataDisplay.lead")}
        title={
          <>
            {tr("pages.dataDisplay.titleA")}
            <em>{t("pages.dataDisplay.titleB")}</em>
          </>
        }
        metaLabel={t("pages.dataDisplay.metaLabel")}
        meta={t("pages.dataDisplay.meta")}
        intro={tr("pages.dataDisplay.intro")}
      />

      <Section num="i" title={<>{t("pages.dataDisplay.stat.title")}</>} kicker={t("pages.dataDisplay.stat.kicker")}>
        <p className="section-desc">{t("pages.dataDisplay.stat.desc")}</p>
        <Example
          caption={t("pages.dataDisplay.stat.caption")}
          tech="<Stat> · <Sparkline>"
          stack
          code={`<Stat>
  <StatKicker>…</StatKicker>
  <StatLabel>…</StatLabel>
  <StatValue>…</StatValue>
  <StatDelta trend="up">…</StatDelta>
  <StatSpark data={[…]} />
</Stat>`}
        >
          <Stat>
            <StatKicker>{t("pages.dataDisplay.stat.kickerLabel")}</StatKicker>
            <StatLabel>{t("pages.dataDisplay.stat.metric")}</StatLabel>
            <StatValue>24.6k</StatValue>
            <StatDelta trend="up">{t("pages.dataDisplay.stat.delta")}</StatDelta>
            <StatSpark data={DEMO_SPARK} />
          </Stat>
        </Example>
      </Section>

      <Section num="ii" title={<>{t("pages.dataDisplay.pricing.title")}</>} kicker={t("pages.dataDisplay.pricing.kicker")}>
        <p className="section-desc">{t("pages.dataDisplay.pricing.desc")}</p>
        <Example
          caption={t("pages.dataDisplay.pricing.caption")}
          tech="<PricingTable>"
          stack
          code={`<PricingTable>…</PricingTable>`}
        >
          <PricingTable>
            <PricingTableHead>
              <PricingTableRow>
                <PricingTableTh scope="col">{t("pages.dataDisplay.pricing.colFeature")}</PricingTableTh>
                <PricingTableTh scope="col">{t("pages.dataDisplay.pricing.colStarter")}</PricingTableTh>
                <PricingTableTh scope="col" accent>
                  {t("pages.dataDisplay.pricing.colPro")}
                </PricingTableTh>
                <PricingTableTh scope="col">{t("pages.dataDisplay.pricing.colTeam")}</PricingTableTh>
              </PricingTableRow>
            </PricingTableHead>
            <PricingTableBody>
              <PricingTableRow>
                <PricingTableTd>{t("pages.dataDisplay.pricing.rowUsers")}</PricingTableTd>
                <PricingTableTd>1</PricingTableTd>
                <PricingTableTd accent>5</PricingTableTd>
                <PricingTableTd>∞</PricingTableTd>
              </PricingTableRow>
              <PricingTableRow>
                <PricingTableTd>{t("pages.dataDisplay.pricing.rowApi")}</PricingTableTd>
                <PricingTableTd check>—</PricingTableTd>
                <PricingTableTd check accent>
                  ✓
                </PricingTableTd>
                <PricingTableTd check>✓</PricingTableTd>
              </PricingTableRow>
              <PricingTableRow>
                <PricingTableTd>{t("pages.dataDisplay.pricing.rowSupport")}</PricingTableTd>
                <PricingTableTd>{t("pages.dataDisplay.pricing.supportCommunity")}</PricingTableTd>
                <PricingTableTd accent>{t("pages.dataDisplay.pricing.supportEmail")}</PricingTableTd>
                <PricingTableTd>{t("pages.dataDisplay.pricing.supportSlack")}</PricingTableTd>
              </PricingTableRow>
            </PricingTableBody>
          </PricingTable>
        </Example>
      </Section>

      <Section num="iii" title={<>{t("pages.dataDisplay.diff.title")}</>} kicker={t("pages.dataDisplay.diff.kicker")}>
        <p className="section-desc">{t("pages.dataDisplay.diff.desc")}</p>
        <Example
          caption={t("pages.dataDisplay.diff.caption")}
          tech="<DiffViewer> · diffLines"
          stack
          code={`<DiffViewer before={…} after={…} />`}
        >
          <DiffViewer before={diffBefore} after={diffAfter} caption={t("pages.dataDisplay.diff.captionBox")} />
        </Example>
      </Section>

      <Section num="iv" title={<>{t("pages.dataDisplay.lightbox.title")}</>} kicker={t("pages.dataDisplay.lightbox.kicker")}>
        <p className="section-desc">{t("pages.dataDisplay.lightbox.desc")}</p>
        <Example
          caption={t("pages.dataDisplay.lightbox.caption")}
          tech="<Lightbox>"
          stack
          code={`<Lightbox open={…} onClose={…} src="…" alt="…" />`}
        >
          <Button type="button" variant="ghost" size="sm" onClick={() => setLbOpen(true)}>
            {t("pages.dataDisplay.lightbox.open")}
          </Button>
          <Lightbox
            key={theme}
            open={lbOpen}
            onClose={() => setLbOpen(false)}
            src={lightboxOgSrc}
            alt={t("pages.dataDisplay.lightbox.imgAlt")}
            caption={t("pages.dataDisplay.lightbox.imgCaption")}
            dialogAriaLabel={t("pages.dataDisplay.lightbox.dialogLabel")}
            closeLabel={t("ds.lightbox.close")}
          />
        </Example>
      </Section>

      <Section num="v" title={<>{t("pages.dataDisplay.circular.title")}</>} kicker={t("pages.dataDisplay.circular.kicker")}>
        <p className="section-desc">{t("pages.dataDisplay.circular.desc")}</p>
        <Example
          caption={t("pages.dataDisplay.circular.caption")}
          tech="<CircularProgress>"
          stack
          code={`<CircularProgress value={68} size={72} />`}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
            <CircularProgress value={ring} size={72} strokeWidth={5} aria-label={t("pages.dataDisplay.circular.aria")} />
            <div style={{ minWidth: "14rem", flex: "1 1 12rem" }}>
              <Field>
                <FieldLabel>{t("pages.dataDisplay.circular.slider")}</FieldLabel>
                <RangeSlider min={0} max={100} value={ring} onChange={setRing} showValue="always" />
              </Field>
            </div>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.dataDisplay.composition"
        root="Stat"
        nodes={[
          { name: "StatKicker" },
          { name: "StatLabel" },
          { name: "StatValue" },
          { name: "StatDelta" },
          { name: "StatSpark" },
          { name: "PricingTable" },
          { name: "PricingTableHead" },
          { name: "PricingTableBody" },
          { name: "PricingTableRow" },
          { name: "PricingTableTh" },
          { name: "PricingTableTd" },
          { name: "DiffViewer" },
          { name: "Lightbox" },
          { name: "CircularProgress" },
        ]}
      />
    </>
  );
}
