import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "../ds/Tabs.jsx";
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
  RadarChart,
  RadialChart,
  Sparkline,
} from "../ds/Chart.jsx";
import { useT } from "../lib/i18n.jsx";

/* ================================================================
   Datasets compartilhados — variados o suficiente pra mostrar o
   comportamento de cada tipo em vários cenários.
   ================================================================ */
const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const QTR_PT = ["Q1", "Q2", "Q3", "Q4"];
const SHORT_PT = ["S", "T", "Q", "Q", "S", "S", "D"];

const D_BAR_GROW = [42, 58, 35, 72, 89, 65, 94, 78];
const D_BAR_FLAT = [62, 58, 65, 60, 68, 64, 70, 66];
const D_BAR_QTR = [124, 168, 192, 230];
const D_BAR_DAILY = [38, 52, 41, 64, 49, 35, 28];

const D_LINE_GROW = [38, 44, 41, 52, 60, 58, 71, 76];
const D_LINE_DROP = [82, 78, 64, 58, 52, 48, 44, 40];
const D_LINE_WAVE = [40, 60, 35, 70, 45, 80, 50, 85];

const D_AREA_GROW = [38, 44, 41, 52, 60, 58, 71, 76];
const D_AREA_FLAT = [50, 52, 49, 51, 53, 50, 52, 51];

const PIE_PT = [
  { label: "Fundamentos", value: 38 },
  { label: "Componentes", value: 27 },
  { label: "Padrões", value: 19 },
  { label: "Outros", value: 16 },
];
const PIE_EN = [
  { label: "Foundations", value: 38 },
  { label: "Components", value: 27 },
  { label: "Patterns", value: 19 },
  { label: "Other", value: 16 },
];
const PIE_TWO = [
  { label: "Cobertura", value: 73 },
  { label: "Restante", value: 27 },
];

const RADAR_AXES_PT = ["Cor", "Tipo", "Espaço", "Forma", "Voz", "Ritmo"];
const RADAR_AXES_EN = ["Colour", "Type", "Space", "Form", "Voice", "Rhythm"];
const RADAR_SERIES = [
  { name: "Atelier", values: [9, 8, 7, 6, 8, 7] },
  { name: "Reference", values: [6, 5, 6, 7, 5, 6] },
];

const RADIAL_DATA_PT = [
  { label: "Edição", value: 78, max: 100 },
  { label: "Assinantes", value: 64, max: 100 },
  { label: "Conversão", value: 41, max: 100 },
];
const RADIAL_DATA_EN = [
  { label: "Edition", value: 78, max: 100 },
  { label: "Subscribers", value: 64, max: 100 },
  { label: "Conversion", value: 41, max: 100 },
];

export default function Charts() {
  const { t, tr, locale } = useT();
  const months = locale === "en" ? MONTHS_EN : MONTHS_PT;
  const pieData = locale === "en" ? PIE_EN : PIE_PT;
  const radarAxes = locale === "en" ? RADAR_AXES_EN : RADAR_AXES_PT;
  const radialData = locale === "en" ? RADIAL_DATA_EN : RADIAL_DATA_PT;

  const [tab, setTab] = useState("bar");

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

      <Section
        num="i"
        title={<>{t("pages.charts.gallery.title")}</>}
        kicker={t("pages.charts.gallery.kicker")}
      >
        <div className="ds-chart-tabs">
          <Tabs value={tab} onChange={setTab}>
            <TabList>
              <Tab value="bar">{t("pages.charts.tabs.bar")}</Tab>
              <Tab value="line">{t("pages.charts.tabs.line")}</Tab>
              <Tab value="area">{t("pages.charts.tabs.area")}</Tab>
              <Tab value="pie">{t("pages.charts.tabs.pie")}</Tab>
              <Tab value="radar">{t("pages.charts.tabs.radar")}</Tab>
              <Tab value="radial">{t("pages.charts.tabs.radial")}</Tab>
              <Tab value="tooltips">{t("pages.charts.tabs.tooltips")}</Tab>
            </TabList>

            <TabPanels>
              {/* ========= BAR ========= */}
              <TabPanel value="bar">
                <ChartGrid>
                  <ChartCard kicker="default" title={t("pages.charts.bar.var1")}>
                    <BarChart
                      data={D_BAR_GROW}
                      labels={months}
                      accentIndex={6}
                      valueLabel={t("pages.charts.units.editions")}
                    />
                  </ChartCard>
                  <ChartCard kicker="quarterly" title={t("pages.charts.bar.var2")}>
                    <BarChart
                      data={D_BAR_QTR}
                      labels={QTR_PT}
                      accentIndex={3}
                      valueLabel={t("pages.charts.units.subscribers")}
                    />
                  </ChartCard>
                  <ChartCard kicker="weekly" title={t("pages.charts.bar.var3")}>
                    <BarChart
                      data={D_BAR_DAILY}
                      labels={SHORT_PT}
                      accentIndex={1}
                      valueLabel={t("pages.charts.units.visits")}
                    />
                  </ChartCard>
                  <ChartCard kicker="flat" title={t("pages.charts.bar.var4")}>
                    <BarChart
                      data={D_BAR_FLAT}
                      labels={months}
                      showValues
                      valueLabel={t("pages.charts.units.reads")}
                    />
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= LINE ========= */}
              <TabPanel value="line">
                <ChartGrid>
                  <ChartCard kicker="growth" title={t("pages.charts.line.var1")}>
                    <LineChart
                      data={D_LINE_GROW}
                      labels={months}
                      valueLabel={t("pages.charts.units.subscribers")}
                    />
                  </ChartCard>
                  <ChartCard kicker="decay" title={t("pages.charts.line.var2")}>
                    <LineChart
                      data={D_LINE_DROP}
                      labels={months}
                      valueLabel={t("pages.charts.units.bounce")}
                    />
                  </ChartCard>
                  <ChartCard kicker="oscillation" title={t("pages.charts.line.var3")}>
                    <LineChart
                      data={D_LINE_WAVE}
                      labels={months}
                      showDots={false}
                      valueLabel={t("pages.charts.units.engagement")}
                    />
                  </ChartCard>
                  <ChartCard kicker="long" title={t("pages.charts.line.var4")}>
                    <LineChart
                      data={[28, 32, 30, 35, 41, 47, 52, 58, 62, 68, 71, 76]}
                      labels={[
                        "J", "F", "M", "A", "M", "J",
                        "J", "A", "S", "O", "N", "D",
                      ]}
                      valueLabel={t("pages.charts.units.subscribers")}
                    />
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= AREA ========= */}
              <TabPanel value="area">
                <ChartGrid>
                  <ChartCard kicker="growth" title={t("pages.charts.area.var1")}>
                    <AreaChart
                      data={D_AREA_GROW}
                      labels={months}
                      valueLabel={t("pages.charts.units.reads")}
                    />
                  </ChartCard>
                  <ChartCard kicker="stable" title={t("pages.charts.area.var2")}>
                    <AreaChart
                      data={D_AREA_FLAT}
                      labels={months}
                      valueLabel={t("pages.charts.units.engagement")}
                    />
                  </ChartCard>
                  <ChartCard kicker="oscillation" title={t("pages.charts.area.var3")}>
                    <AreaChart
                      data={D_LINE_WAVE}
                      labels={months}
                      valueLabel={t("pages.charts.units.engagement")}
                    />
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= PIE / DONUT ========= */}
              <TabPanel value="pie">
                <ChartGrid columns={2}>
                  <ChartCard kicker="pie" title={t("pages.charts.pie.var1")}>
                    <div className="ds-chart-pie-row">
                      <PieChart data={pieData} height={220} />
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
                  </ChartCard>
                  <ChartCard kicker="donut" title={t("pages.charts.pie.var2")}>
                    <div className="ds-chart-pie-row">
                      <DonutChart data={pieData} height={220} />
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
                  </ChartCard>
                  <ChartCard kicker="binary" title={t("pages.charts.pie.var3")}>
                    <div className="ds-chart-pie-row">
                      <PieChart data={PIE_TWO} height={200} />
                      <ChartLegend>
                        <ChartLegendItem
                          color="var(--accent)"
                          label={`${PIE_TWO[0].label} · ${PIE_TWO[0].value}%`}
                        />
                        <ChartLegendItem
                          color="var(--ink-faint)"
                          label={`${PIE_TWO[1].label} · ${PIE_TWO[1].value}%`}
                        />
                      </ChartLegend>
                    </div>
                  </ChartCard>
                  <ChartCard kicker="solo" title={t("pages.charts.pie.var4")}>
                    <div className="ds-chart-pie-row">
                      <DonutChart data={PIE_TWO} height={200} />
                      <ChartLegend>
                        <ChartLegendItem
                          color="var(--accent)"
                          label={`${PIE_TWO[0].label} · ${PIE_TWO[0].value}%`}
                        />
                        <ChartLegendItem
                          color="var(--ink-faint)"
                          label={`${PIE_TWO[1].label} · ${PIE_TWO[1].value}%`}
                        />
                      </ChartLegend>
                    </div>
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= RADAR ========= */}
              <TabPanel value="radar">
                <ChartGrid columns={2}>
                  <ChartCard kicker="single" title={t("pages.charts.radar.var1")}>
                    <div className="ds-chart-pie-row">
                      <RadarChart
                        axes={radarAxes}
                        series={[RADAR_SERIES[0]]}
                        height={280}
                        max={10}
                      />
                      <ChartLegend>
                        <ChartLegendItem
                          color="var(--accent)"
                          label={RADAR_SERIES[0].name}
                        />
                      </ChartLegend>
                    </div>
                  </ChartCard>
                  <ChartCard kicker="comparison" title={t("pages.charts.radar.var2")}>
                    <div className="ds-chart-pie-row">
                      <RadarChart
                        axes={radarAxes}
                        series={RADAR_SERIES}
                        height={280}
                        max={10}
                      />
                      <ChartLegend>
                        <ChartLegendItem
                          color="var(--accent)"
                          label={RADAR_SERIES[0].name}
                        />
                        <ChartLegendItem
                          color="var(--ink)"
                          label={RADAR_SERIES[1].name}
                        />
                      </ChartLegend>
                    </div>
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= RADIAL ========= */}
              <TabPanel value="radial">
                <ChartGrid columns={2}>
                  <ChartCard kicker="kpi" title={t("pages.charts.radial.var1")}>
                    <div className="ds-chart-pie-row">
                      <RadialChart
                        data={radialData}
                        height={280}
                        centerLabel={t("pages.charts.radial.average")}
                      />
                      <ChartLegend>
                        {radialData.map((d, i) => (
                          <ChartLegendItem
                            key={d.label}
                            color={[
                              "var(--accent)",
                              "var(--ink)",
                              "var(--ink-soft)",
                            ][i]}
                            label={`${d.label} · ${d.value}%`}
                          />
                        ))}
                      </ChartLegend>
                    </div>
                  </ChartCard>
                  <ChartCard kicker="single" title={t("pages.charts.radial.var2")}>
                    <div className="ds-chart-pie-row">
                      <RadialChart
                        data={[{ label: t("pages.charts.radial.completion"), value: 67, max: 100 }]}
                        height={240}
                        centerLabel={t("pages.charts.radial.completion")}
                      />
                    </div>
                  </ChartCard>
                </ChartGrid>
              </TabPanel>

              {/* ========= TOOLTIPS ========= */}
              <TabPanel value="tooltips">
                <p className="ds-chart-tab-intro">
                  {tr("pages.charts.tooltips.intro")}
                </p>
                <ChartGrid columns={2}>
                  <ChartCard kicker="default" title={t("pages.charts.tooltips.var1")}>
                    <BarChart
                      data={D_BAR_GROW}
                      labels={months}
                      accentIndex={6}
                    />
                  </ChartCard>
                  <ChartCard kicker="with unit" title={t("pages.charts.tooltips.var2")}>
                    <BarChart
                      data={D_BAR_GROW}
                      labels={months}
                      accentIndex={6}
                      valueLabel={t("pages.charts.units.subscribers")}
                    />
                  </ChartCard>
                  <ChartCard kicker="line guideline" title={t("pages.charts.tooltips.var3")}>
                    <LineChart
                      data={D_LINE_GROW}
                      labels={months}
                      valueLabel="%"
                    />
                  </ChartCard>
                  <ChartCard kicker="pie percentage" title={t("pages.charts.tooltips.var4")}>
                    <div className="ds-chart-pie-row">
                      <PieChart data={pieData} height={220} />
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
                            label={d.label}
                          />
                        ))}
                      </ChartLegend>
                    </div>
                  </ChartCard>
                </ChartGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Section>

      {/* Sparkline em seção própria — não cabe nas tabs porque tem
          uso muito específico (acompanhar uma métrica) */}
      <Section
        num="ii"
        title={<>{t("pages.charts.spark.title")}</>}
        kicker={t("pages.charts.spark.kicker")}
      >
        <Example
          caption={t("pages.charts.spark.caption")}
          tech="<Sparkline />"
          stack
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
        num="iii"
        i18nPrefix="pages.charts.composition"
        root="Chart"
        nodes={[
          {
            name: "ChartHeader",
            children: [{ name: "ChartKicker" }, { name: "ChartTitle" }],
          },
          {
            name: "BarChart · LineChart · AreaChart",
          },
          {
            name: "PieChart · DonutChart",
          },
          {
            name: "RadarChart · RadialChart",
          },
          {
            name: "ChartLegend",
            children: [{ name: "ChartLegendItem" }],
          },
        ]}
      />
    </>
  );
}

/* ================================================================
   Helpers locais
   ================================================================ */

function ChartGrid({ children, columns = 2 }) {
  return (
    <div
      className="ds-chart-grid"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

function ChartCard({ kicker, title, children }) {
  return (
    <Chart>
      <ChartHeader>
        <ChartKicker>{kicker}</ChartKicker>
        <ChartTitle>{title}</ChartTitle>
      </ChartHeader>
      {children}
    </Chart>
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
