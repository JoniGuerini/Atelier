import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import {
  Chart,
  ChartHeader,
  ChartKicker,
  ChartTitle,
  ChartLegend,
  ChartLegendItem,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  Sparkline,
} from "../ds/Chart.jsx";
import { useT } from "../lib/i18n.jsx";

/* Dados de exemplo — variados o suficiente para mostrar o
   comportamento de cada tipo. Compartilhados entre exemplos. */
const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const SAMPLE_BARS = [42, 58, 35, 72, 89, 65, 94, 78];
const SAMPLE_LINE = [38, 44, 41, 52, 60, 58, 71, 76];
const SAMPLE_PIE_PT = [
  { label: "Fundamentos", value: 38 },
  { label: "Componentes", value: 27 },
  { label: "Padrões", value: 19 },
  { label: "Outros", value: 16 },
];
const SAMPLE_PIE_EN = [
  { label: "Foundations", value: 38 },
  { label: "Components", value: 27 },
  { label: "Patterns", value: 19 },
  { label: "Other", value: 16 },
];

export default function Charts() {
  const { t, tr, locale } = useT();
  const months = locale === "en" ? MONTHS_EN : MONTHS_PT;
  const pieData = locale === "en" ? SAMPLE_PIE_EN : SAMPLE_PIE_PT;

  return (
    <>
      <PageHead
        lead={t("pages.charts.lead")}
        title={
          <>
            {tr("pages.charts.titleA")}
            <em>{t("pages.charts.titleB")}</em>
          </>
        }
        metaLabel={t("pages.charts.metaLabel")}
        meta={t("pages.charts.meta")}
        intro={tr("pages.charts.intro")}
      />

      {/* i · Bar */}
      <Section
        num="i"
        title={<>{t("pages.charts.bar.title")}</>}
        kicker={t("pages.charts.bar.kicker")}
      >
        <Example
          caption={t("pages.charts.bar.caption")}
          tech="<BarChart />"
          stack
          code={`<Chart>
  <ChartHeader>
    <ChartKicker>${t("pages.charts.bar.exampleKicker")}</ChartKicker>
    <ChartTitle>${t("pages.charts.bar.exampleTitle")}</ChartTitle>
  </ChartHeader>
  <BarChart
    data={[42, 58, 35, 72, 89, 65, 94, 78]}
    labels={["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago"]}
    accentIndex={6}
  />
  <ChartLegend>
    <ChartLegendItem color="var(--accent)" label="${t("pages.charts.bar.legend1")}" />
    <ChartLegendItem color="var(--ink-faint)" label="${t("pages.charts.bar.legend2")}" />
  </ChartLegend>
</Chart>`}
        >
          <Chart>
            <ChartHeader>
              <ChartKicker>{t("pages.charts.bar.exampleKicker")}</ChartKicker>
              <ChartTitle>{t("pages.charts.bar.exampleTitle")}</ChartTitle>
            </ChartHeader>
            <BarChart data={SAMPLE_BARS} labels={months} accentIndex={6} />
            <ChartLegend>
              <ChartLegendItem
                color="var(--accent)"
                label={t("pages.charts.bar.legend1")}
              />
              <ChartLegendItem
                color="var(--ink-faint)"
                label={t("pages.charts.bar.legend2")}
              />
            </ChartLegend>
          </Chart>
        </Example>
      </Section>

      {/* ii · Line */}
      <Section
        num="ii"
        title={<>{t("pages.charts.line.title")}</>}
        kicker={t("pages.charts.line.kicker")}
      >
        <Example
          caption={t("pages.charts.line.caption")}
          tech="<LineChart />"
          stack
          code={`<Chart>
  <ChartHeader>
    <ChartKicker>${t("pages.charts.line.exampleKicker")}</ChartKicker>
    <ChartTitle>${t("pages.charts.line.exampleTitle")}</ChartTitle>
  </ChartHeader>
  <LineChart
    data={[38, 44, 41, 52, 60, 58, 71, 76]}
    labels={["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago"]}
  />
</Chart>`}
        >
          <Chart>
            <ChartHeader>
              <ChartKicker>{t("pages.charts.line.exampleKicker")}</ChartKicker>
              <ChartTitle>{t("pages.charts.line.exampleTitle")}</ChartTitle>
            </ChartHeader>
            <LineChart data={SAMPLE_LINE} labels={months} />
          </Chart>
        </Example>
      </Section>

      {/* iii · Area */}
      <Section
        num="iii"
        title={<>{t("pages.charts.area.title")}</>}
        kicker={t("pages.charts.area.kicker")}
      >
        <Example
          caption={t("pages.charts.area.caption")}
          tech="<AreaChart />"
          stack
          code={`<Chart>
  <ChartHeader>
    <ChartKicker>${t("pages.charts.area.exampleKicker")}</ChartKicker>
    <ChartTitle>${t("pages.charts.area.exampleTitle")}</ChartTitle>
  </ChartHeader>
  <AreaChart
    data={[38, 44, 41, 52, 60, 58, 71, 76]}
    labels={["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago"]}
  />
</Chart>`}
        >
          <Chart>
            <ChartHeader>
              <ChartKicker>{t("pages.charts.area.exampleKicker")}</ChartKicker>
              <ChartTitle>{t("pages.charts.area.exampleTitle")}</ChartTitle>
            </ChartHeader>
            <AreaChart data={SAMPLE_LINE} labels={months} />
          </Chart>
        </Example>
      </Section>

      {/* iv · Pie */}
      <Section
        num="iv"
        title={<>{t("pages.charts.pie.title")}</>}
        kicker={t("pages.charts.pie.kicker")}
      >
        <Example
          caption={t("pages.charts.pie.caption")}
          tech="<PieChart />"
          stack
          code={`<Chart>
  <ChartHeader>
    <ChartKicker>${t("pages.charts.pie.exampleKicker")}</ChartKicker>
    <ChartTitle>${t("pages.charts.pie.exampleTitle")}</ChartTitle>
  </ChartHeader>
  <PieChart data={[
    { label: "${pieData[0].label}", value: ${pieData[0].value} },
    { label: "${pieData[1].label}", value: ${pieData[1].value} },
    { label: "${pieData[2].label}", value: ${pieData[2].value} },
    { label: "${pieData[3].label}", value: ${pieData[3].value} },
  ]} />
</Chart>`}
        >
          <Chart>
            <ChartHeader>
              <ChartKicker>{t("pages.charts.pie.exampleKicker")}</ChartKicker>
              <ChartTitle>{t("pages.charts.pie.exampleTitle")}</ChartTitle>
            </ChartHeader>
            <div className="ds-chart-pie-row">
              <PieChart data={pieData} height={200} />
              <ChartLegend>
                {pieData.map((d, i) => (
                  <ChartLegendItem
                    key={d.label}
                    color={[
                      "var(--accent)",
                      "var(--ink)",
                      "var(--ink-soft)",
                      "var(--ink-faint)",
                    ][i]}
                    label={`${d.label} · ${d.value}`}
                  />
                ))}
              </ChartLegend>
            </div>
          </Chart>
        </Example>
      </Section>

      {/* v · Donut */}
      <Section
        num="v"
        title={<>{t("pages.charts.donut.title")}</>}
        kicker={t("pages.charts.donut.kicker")}
      >
        <Example
          caption={t("pages.charts.donut.caption")}
          tech="<DonutChart />"
          stack
          code={`<DonutChart data={[
  { label: "${pieData[0].label}", value: ${pieData[0].value} },
  { label: "${pieData[1].label}", value: ${pieData[1].value} },
  { label: "${pieData[2].label}", value: ${pieData[2].value} },
  { label: "${pieData[3].label}", value: ${pieData[3].value} },
]} />`}
        >
          <Chart>
            <ChartHeader>
              <ChartKicker>{t("pages.charts.donut.exampleKicker")}</ChartKicker>
              <ChartTitle>{t("pages.charts.donut.exampleTitle")}</ChartTitle>
            </ChartHeader>
            <div className="ds-chart-pie-row">
              <DonutChart data={pieData} height={200} />
              <ChartLegend>
                {pieData.map((d, i) => (
                  <ChartLegendItem
                    key={d.label}
                    color={[
                      "var(--accent)",
                      "var(--ink)",
                      "var(--ink-soft)",
                      "var(--ink-faint)",
                    ][i]}
                    label={`${d.label} · ${d.value}`}
                  />
                ))}
              </ChartLegend>
            </div>
          </Chart>
        </Example>
      </Section>

      {/* vi · Sparkline */}
      <Section
        num="vi"
        title={<>{t("pages.charts.spark.title")}</>}
        kicker={t("pages.charts.spark.kicker")}
      >
        <Example
          caption={t("pages.charts.spark.caption")}
          tech="<Sparkline />"
          stack
          code={`<div style={{ display: "flex", gap: 32, alignItems: "baseline" }}>
  <div>
    <span className="kicker">${t("pages.charts.spark.metric1Label")}</span>
    <span className="value">1.247</span>
    <Sparkline data={[12, 15, 14, 18, 22, 26, 30, 38]} />
  </div>
  …
</div>`}
        >
          <div className="ds-chart-spark-row">
            <SparkMetric
              label={t("pages.charts.spark.metric1Label")}
              value="1.247"
              data={[12, 15, 14, 18, 22, 26, 30, 38]}
              filled
            />
            <SparkMetric
              label={t("pages.charts.spark.metric2Label")}
              value="892"
              data={[40, 38, 42, 41, 39, 36, 38, 41]}
            />
            <SparkMetric
              label={t("pages.charts.spark.metric3Label")}
              value="48"
              data={[20, 25, 22, 30, 35, 32, 40, 48]}
              filled
            />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.charts.composition"
        root="Chart"
        nodes={[
          {
            name: "ChartHeader",
            children: [{ name: "ChartKicker" }, { name: "ChartTitle" }],
          },
          { name: "BarChart · LineChart · AreaChart · PieChart · DonutChart" },
          {
            name: "ChartLegend",
            children: [{ name: "ChartLegendItem" }],
          },
        ]}
      />
    </>
  );
}

function SparkMetric({ label, value, data, filled = false }) {
  return (
    <div className="ds-chart-spark-metric">
      <span className="ds-chart-spark-label">{label}</span>
      <span className="ds-chart-spark-value">{value}</span>
      <Sparkline data={data} filled={filled} width={120} height={36} />
    </div>
  );
}
