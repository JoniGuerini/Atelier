/* ================================================================
   Home — entrada do site (hero + vitrine tipo “bento”).
   ----------------------------------------------------------------
   Showcase denso com componentes reais do DS (tokens, form, dados,
   navegação, feedback). Inspirado na ideia de vitrine — não cópia
   de terceiros.
   ================================================================ */

import { useMemo, useState } from "react";
import {
  Button,
  Badge,
  Field,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Progress,
  Avatar,
  AvatarGroup,
  Select,
  Radio,
  Divider,
  Tooltip,
  ThemeToggle,
  CopyButton,
  Code,
  BreadcrumbsRoot,
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
} from "../ds/primitives.tsx";
import { Card, CardKicker, CardTitle, CardBody } from "../ds/Card.tsx";
import { SkeletonText } from "../ds/Skeleton.tsx";
import { Alert } from "../ds/Alert.tsx";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "../ds/Tabs.tsx";
import { KbdCombo } from "../ds/KBD.tsx";
import { Stat, StatKicker, StatLabel, StatValue, StatDelta, StatSpark } from "../ds/Stat.tsx";
import { CircularProgress } from "../ds/CircularProgress.tsx";
import { Stepper, Step } from "../ds/Stepper.tsx";
import { Pagination } from "../ds/Pagination.tsx";
import { useToast } from "../ds/Toaster.tsx";
import { useT } from "../lib/i18n.tsx";

const SPARK_WEEK = [3, 5, 4, 6, 8, 7, 9, 11, 10, 12, 14, 13];

interface HomeProps {
  onNavigate?: (route: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { t, tr } = useT();
  const { toast } = useToast();
  const sc = useMemo(
    () => ({
      table: (k: keyof typeof TABLE_KEYS) => t(`pages.home.showcase.table.${k}`),
      select: (k: keyof typeof SELECT_KEYS) => t(`pages.home.showcase.select.${k}`),
      radio: (k: keyof typeof RADIO_KEYS) => t(`pages.home.showcase.radio.${k}`),
      tooltip: (k: keyof typeof TIP_KEYS) => t(`pages.home.showcase.tooltip.${k}`),
      copy: (k: keyof typeof COPY_KEYS) => t(`pages.home.showcase.copy.${k}`),
      theme: (k: keyof typeof THEME_KEYS) => t(`pages.home.showcase.theme.${k}`),
      stepper: (k: keyof typeof STEP_KEYS) => t(`pages.home.showcase.stepper.${k}`),
      stepperV: (k: keyof typeof STEPV_KEYS) => t(`pages.home.showcase.stepperV.${k}`),
      stat: (k: keyof typeof STAT_KEYS) => t(`pages.home.showcase.stat.${k}`),
      circular: (k: keyof typeof CIR_KEYS) => t(`pages.home.showcase.circular.${k}`),
      skeleton: (k: keyof typeof SK_KEYS) => t(`pages.home.showcase.skeleton.${k}`),
      code: (k: keyof typeof CODE_KEYS) => t(`pages.home.showcase.code.${k}`),
      crumbs: (k: keyof typeof CRUMB_KEYS) => t(`pages.home.showcase.crumbs.${k}`),
      alertInfo: (k: keyof typeof AL2_KEYS) => t(`pages.home.showcase.alertInfo.${k}`),
      toolbar: (k: keyof typeof TOOL_KEYS) => t(`pages.home.showcase.toolbar.${k}`),
      tabs2: (k: keyof typeof T2_KEYS) => t(`pages.home.showcase.tabs2.${k}`),
      badges2: (k: keyof typeof B2_KEYS) => t(`pages.home.showcase.badges2.${k}`),
      pagination: (k: keyof typeof PG_KEYS) => t(`pages.home.showcase.pagination.${k}`),
      kbd: (k: keyof typeof KBD_KEYS) => t(`pages.home.showcase.kbd.${k}`),
    }),
    [t],
  );

  const [tab, setTab] = useState("preview");
  const [tabDoc, setTabDoc] = useState("tokens");
  const [notifyOn, setNotifyOn] = useState(true);
  const [agree, setAgree] = useState(false);
  const [tier, setTier] = useState("studio");
  const [plan, setPlan] = useState("annual");
  const [page, setPage] = useState(3);
  const nav = (to: string) => onNavigate?.(to);

  const copySnippet = sc.copy("snippet");

  return (
    <div className="home-landing">
      <header className="home-hero">
        <p className="home-hero-badge">{t("pages.home.badge")}</p>
        <h1 className="home-hero-title">
          {tr("pages.home.titleA")}
          <br />
          <span className="home-hero-title-em">{t("pages.home.titleB")}</span>
        </h1>
        <p className="home-hero-lead">{tr("pages.home.lead")}</p>
        <div className="home-hero-actions">
          <Button type="button" variant="primary" size="lg" onClick={() => nav("overview")}>
            {t("pages.home.ctaManual")}
          </Button>
          <Button type="button" size="lg" onClick={() => nav("buttons")}>
            {t("pages.home.ctaComponents")}
          </Button>
        </div>
      </header>

      <section className="home-bento" aria-label={t("pages.home.bentoAria")}>
        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{t("pages.home.bento.formKicker")}</CardKicker>
          <CardTitle as="h2">{t("pages.home.bento.formTitle")}</CardTitle>
          <CardBody>
            <div className="home-bento-stack">
              <Field label={t("pages.home.bento.fieldName")}>
                <Input placeholder={t("pages.home.bento.placeholderName")} autoComplete="off" />
              </Field>
              <Field label={t("pages.home.bento.fieldNote")}>
                <Textarea rows={2} placeholder={t("pages.home.bento.placeholderNote")} />
              </Field>
              <div className="home-bento-inline">
                <Button type="button" variant="primary" size="sm" onClick={() => nav("forms")}>
                  {t("pages.home.bento.submit")}
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  {t("pages.home.bento.cancel")}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{t("pages.home.bento.badgesKicker")}</CardKicker>
          <CardTitle as="h2">{t("pages.home.bento.badgesTitle")}</CardTitle>
          <CardBody>
            <div className="home-bento-badges">
              <Badge dot>{t("pages.home.bento.badgeLive")}</Badge>
              <Badge variant="solid">{t("pages.home.bento.badgeStable")}</Badge>
              <Badge variant="accent">{t("pages.home.bento.badgeAccent")}</Badge>
            </div>
            <div className="home-bento-switch">
              <Switch
                label={t("pages.home.bento.switchLabel")}
                checked={notifyOn}
                onChange={setNotifyOn}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{t("pages.home.bento.tabsKicker")}</CardKicker>
          <CardTitle as="h2">{t("pages.home.bento.tabsTitle")}</CardTitle>
          <CardBody>
            <Tabs value={tab} onChange={setTab} variant="segmented">
              <TabList>
                <Tab value="preview">{t("pages.home.bento.tab1")}</Tab>
                <Tab value="code">{t("pages.home.bento.tab2")}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="preview">
                  <p className="home-bento-tab-text">{t("pages.home.bento.tabPanel1")}</p>
                </TabPanel>
                <TabPanel value="code">
                  <p className="home-bento-tab-text">{t("pages.home.bento.tabPanel2")}</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardBody>
            <Alert variant="ok" title={t("pages.home.bento.alertTitle")}>
              {t("pages.home.bento.alertBody")}
            </Alert>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{t("pages.home.bento.progressKicker")}</CardKicker>
          <CardTitle as="h2">{t("pages.home.bento.progressTitle")}</CardTitle>
          <CardBody>
            <Progress value={62} label={t("pages.home.bento.progressLabel")} />
            <div className="home-bento-check">
              <Checkbox
                label={t("pages.home.bento.checkboxLabel")}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--wide home-bento-cell--split">
          <div className="home-bento-split-pane">
            <CardKicker>{t("pages.home.bento.teamKicker")}</CardKicker>
            <CardTitle as="h2">{t("pages.home.bento.teamTitle")}</CardTitle>
            <CardBody>
              <p className="home-bento-muted">{t("pages.home.bento.teamBody")}</p>
              <AvatarGroup max={4}>
                <Avatar initials="MR" alt="Mara" shape="circle" />
                <Avatar initials="JN" alt="Jon" shape="circle" />
                <Avatar initials="LP" alt="Lu" shape="circle" />
              </AvatarGroup>
              <Button type="button" variant="accent" size="sm" className="home-bento-spaced" onClick={() => nav("avatars")}>
                {t("pages.home.bento.teamCta")}
              </Button>
            </CardBody>
          </div>
          <div className="home-bento-split-pane home-bento-split-pane--rule">
            <CardKicker>{t("pages.home.bento.paletteKicker")}</CardKicker>
            <CardTitle as="h2">{t("pages.home.bento.paletteTitle")}</CardTitle>
            <CardBody>
              <p className="home-bento-muted">{t("pages.home.bento.paletteBody")}</p>
              <div className="home-bento-palette-row">
                <Input readOnly value={t("pages.home.bento.paletteInputValue")} aria-label={t("pages.home.bento.paletteInputAria")} />
                <KbdCombo keys={["⌘", "K"]} size="sm" />
              </div>
              <Button type="button" variant="link" size="sm" onClick={() => nav("create")}>
                {t("pages.home.bento.paletteLink")}
              </Button>
            </CardBody>
          </div>
        </Card>

        {/* ——— Showcase extra ——— */}

        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{sc.table("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.table("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-table-wrap">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>{sc.table("col1")}</th>
                    <th>{sc.table("col2")}</th>
                    <th>{sc.table("col3")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">{sc.table("r1a")}</td>
                    <td>{sc.table("r1b")}</td>
                    <td>{sc.table("r1c")}</td>
                  </tr>
                  <tr>
                    <td className="mono">{sc.table("r2a")}</td>
                    <td>{sc.table("r2b")}</td>
                    <td>{sc.table("r2c")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button type="button" variant="link" size="sm" className="home-bento-spaced" onClick={() => nav("colors")}>
              {sc.table("link")}
            </Button>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.select("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.select("title")}</CardTitle>
          <CardBody>
            <Field label={sc.select("label")}>
              <Select value={tier} onChange={(e) => setTier(e.target.value)}>
                <option value="starter">{sc.select("opt1")}</option>
                <option value="studio">{sc.select("opt2")}</option>
                <option value="enterprise">{sc.select("opt3")}</option>
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.radio("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.radio("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-radio-stack" role="radiogroup" aria-label={sc.radio("title")}>
              <Radio
                name="home-plan"
                value="monthly"
                checked={plan === "monthly"}
                onChange={() => setPlan("monthly")}
                label={sc.radio("opt1")}
              />
              <Radio
                name="home-plan"
                value="annual"
                checked={plan === "annual"}
                onChange={() => setPlan("annual")}
                label={sc.radio("opt2")}
              />
              <Radio
                name="home-plan"
                value="custom"
                checked={plan === "custom"}
                onChange={() => setPlan("custom")}
                label={sc.radio("opt3")}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.tooltip("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.tooltip("title")}</CardTitle>
          <CardBody>
            <p className="home-bento-muted">
              <Tooltip tip={sc.tooltip("tip")}>
                <span className="home-bento-tooltip-hit" tabIndex={0}>
                  {sc.tooltip("trigger")}
                </span>
              </Tooltip>
            </p>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.copy("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.copy("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-copy-row">
              <code className="home-bento-code-inline">{copySnippet}</code>
              <CopyButton text={copySnippet} label={sc.copy("btn")} copiedLabel="✓" />
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.theme("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.theme("title")}</CardTitle>
          <CardBody>
            <ThemeToggle variant="segmented" />
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{sc.stepper("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.stepper("title")}</CardTitle>
          <CardBody>
            <Stepper current={1} orientation="horizontal">
              <Step n={sc.stepper("n1")} label={sc.stepper("l1")} description={sc.stepper("d1")} />
              <Step n={sc.stepper("n2")} label={sc.stepper("l2")} description={sc.stepper("d2")} />
              <Step n={sc.stepper("n3")} label={sc.stepper("l3")} description={sc.stepper("d3")} />
            </Stepper>
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--tall">
          <CardKicker>{sc.stepperV("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.stepperV("title")}</CardTitle>
          <CardBody>
            <Stepper current={0} orientation="vertical">
              <Step n={sc.stepperV("n1")} label={sc.stepperV("l1")} description={sc.stepperV("d1")} />
              <Step n={sc.stepperV("n2")} label={sc.stepperV("l2")} description={sc.stepperV("d2")} />
              <Step n={sc.stepperV("n3")} label={sc.stepperV("l3")} description={sc.stepperV("d3")} />
            </Stepper>
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{sc.stat("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.stat("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-metric">
              <Stat>
                <StatKicker>Git</StatKicker>
                <StatLabel>{sc.stat("label")}</StatLabel>
                <StatValue>{sc.stat("value")}</StatValue>
                <StatDelta trend="up">{sc.stat("delta")}</StatDelta>
                <StatSpark data={SPARK_WEEK} width={160} height={36} />
              </Stat>
              <div className="home-bento-circular">
                <p className="home-bento-muted home-bento-metric-label">
                  <span className="visually-hidden">{sc.circular("kicker")}</span>
                  {sc.circular("title")}
                </p>
                <CircularProgress value={72} size={72} aria-label={sc.circular("title")} />
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" className="home-bento-spaced" onClick={() => nav("data-display")}>
              {sc.circular("dataLink")}
            </Button>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.skeleton("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.skeleton("title")}</CardTitle>
          <CardBody>
            <p className="home-bento-muted">{sc.skeleton("body")}</p>
            <SkeletonText lines={3} pulse />
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.code("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.code("title")}</CardTitle>
          <CardBody>
            <Code lang="tsx" copy>
              {`<Field label="Email">
  <Input type="email" />
</Field>`}
            </Code>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.crumbs("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.crumbs("title")}</CardTitle>
          <CardBody>
            <BreadcrumbsRoot aria-label={sc.crumbs("title")}>
              <Breadcrumb href="#/home" onClick={() => nav("home")}>
                {sc.crumbs("root")}
              </Breadcrumb>
              <BreadcrumbSeparator />
              <Breadcrumb href="#/hooks" onClick={() => nav("hooks")}>
                {sc.crumbs("mid")}
              </Breadcrumb>
              <BreadcrumbSeparator />
              <BreadcrumbCurrent>{sc.crumbs("current")}</BreadcrumbCurrent>
            </BreadcrumbsRoot>
          </CardBody>
        </Card>

        <div className="home-bento-divider">
          <Divider>{t("pages.home.showcase.divider")}</Divider>
        </div>

        <Card className="home-bento-cell">
          <CardBody>
            <Alert variant="info" title={sc.alertInfo("title")}>
              {sc.alertInfo("body")}
            </Alert>
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{sc.toolbar("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.toolbar("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-toolbar">
              <Button type="button" variant="ghost" size="sm">
                {sc.toolbar("archive")}
              </Button>
              <Button type="button" variant="ghost" size="sm">
                {sc.toolbar("report")}
              </Button>
              <Button type="button" variant="ghost" size="sm">
                {sc.toolbar("snooze")}
              </Button>
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={() =>
                  toast({
                    title: sc.toolbar("toastTitle"),
                    description: sc.toolbar("toastBody"),
                    variant: "ok",
                    duration: 3500,
                  })
                }
              >
                {sc.toolbar("toast")}
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell home-bento-cell--wide">
          <CardKicker>{sc.tabs2("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.tabs2("title")}</CardTitle>
          <CardBody>
            <Tabs value={tabDoc} onChange={setTabDoc} variant="underline">
              <TabList>
                <Tab value="tokens">{sc.tabs2("t1")}</Tab>
                <Tab value="components">{sc.tabs2("t2")}</Tab>
                <Tab value="patterns">{sc.tabs2("t3")}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="tokens">
                  <p className="home-bento-tab-text">{sc.tabs2("p1")}</p>
                </TabPanel>
                <TabPanel value="components">
                  <p className="home-bento-tab-text">{sc.tabs2("p2")}</p>
                </TabPanel>
                <TabPanel value="patterns">
                  <p className="home-bento-tab-text">{sc.tabs2("p3")}</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.badges2("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.badges2("title")}</CardTitle>
          <CardBody>
            <div className="home-bento-badges">
              <Badge variant="ok" dot>
                {sc.badges2("ok")}
              </Badge>
              <Badge variant="warn" dot>
                {sc.badges2("warn")}
              </Badge>
              <Badge variant="info">{sc.badges2("info")}</Badge>
            </div>
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.pagination("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.pagination("title")}</CardTitle>
          <CardBody>
            <Pagination current={page} total={12} onChange={setPage} siblings={1} boundaries={1} />
          </CardBody>
        </Card>

        <Card className="home-bento-cell">
          <CardKicker>{sc.kbd("kicker")}</CardKicker>
          <CardTitle as="h2">{sc.kbd("title")}</CardTitle>
          <CardBody>
            <p className="home-bento-muted">{sc.kbd("body")}</p>
            <KbdCombo keys={["Ctrl", "B"]} size="sm" separator="+" />
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

/* Chaves só para inferência TypeScript nos helpers sc.* — espelham i18n */
const TABLE_KEYS = { kicker: 0, title: 0, col1: 0, col2: 0, col3: 0, r1a: 0, r1b: 0, r1c: 0, r2a: 0, r2b: 0, r2c: 0, link: 0 };
const SELECT_KEYS = { kicker: 0, title: 0, label: 0, opt1: 0, opt2: 0, opt3: 0 };
const RADIO_KEYS = { kicker: 0, title: 0, opt1: 0, opt2: 0, opt3: 0 };
const TIP_KEYS = { kicker: 0, title: 0, trigger: 0, tip: 0 };
const COPY_KEYS = { kicker: 0, title: 0, btn: 0, snippet: 0 };
const THEME_KEYS = { kicker: 0, title: 0 };
const STEP_KEYS = { kicker: 0, title: 0, n1: 0, l1: 0, d1: 0, n2: 0, l2: 0, d2: 0, n3: 0, l3: 0, d3: 0 };
const STEPV_KEYS = { kicker: 0, title: 0, n1: 0, l1: 0, d1: 0, n2: 0, l2: 0, d2: 0, n3: 0, l3: 0, d3: 0 };
const STAT_KEYS = { kicker: 0, title: 0, label: 0, value: 0, delta: 0 };
const CIR_KEYS = { kicker: 0, title: 0, dataLink: 0 };
const SK_KEYS = { kicker: 0, title: 0, body: 0 };
const CODE_KEYS = { kicker: 0, title: 0 };
const CRUMB_KEYS = { kicker: 0, title: 0, root: 0, mid: 0, current: 0 };
const AL2_KEYS = { title: 0, body: 0 };
const TOOL_KEYS = {
  kicker: 0,
  title: 0,
  archive: 0,
  report: 0,
  snooze: 0,
  toast: 0,
  toastTitle: 0,
  toastBody: 0,
};
const T2_KEYS = { kicker: 0, title: 0, t1: 0, t2: 0, t3: 0, p1: 0, p2: 0, p3: 0 };
const B2_KEYS = { kicker: 0, title: 0, ok: 0, warn: 0, info: 0 };
const PG_KEYS = { kicker: 0, title: 0 };
const KBD_KEYS = { kicker: 0, title: 0, body: 0 };
