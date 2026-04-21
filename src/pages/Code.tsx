import { PageHead, Section, Code, Divider } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Code — guia técnico para devs.
   ----------------------------------------------------------------
   Estrutura:
     i.   Install — como começar
     ii.  Tokens — bloco CSS canônico
     iii. API — todos os componentes agrupados por família
     iv.  Decisions — ADRs editoriais (por que zero deps, etc.)
     v.   Conventions — regras de uso
   ================================================================ */

const TOKENS = `:root {
  /* Surface */
  --bg: #f4f1ea;
  --bg-panel: #faf8f3;
  --bg-sunken: #efeadc;
  --bg-inverse: #1a1a1a;

  /* Ink */
  --ink: #1a1a1a;
  --ink-soft: #5a5754;
  --ink-faint: #9a958d;
  --ink-inverse: #e8e3d6;

  /* Rules */
  --rule: #1a1a1a;
  --rule-soft: #d9d3c4;
  --rule-faint: #e6e0d0;

  /* Accent */
  --accent: #c8361d;
  --accent-soft: #f1ddd5;
  --accent-ink: #8c2414;

  /* Semantic */
  --ok: #2d6a3e;        --ok-soft: #dbe8d8;
  --warn: #8a6d1a;      --warn-soft: #f0e6c8;
  --danger: #c8361d;    --danger-soft: #f1ddd5;
  --info: #2e5a8a;      --info-soft: #d9e3ee;

  /* Typography */
  --font-serif: "Fraunces", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Spacing (8pt base) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 48px;  --space-8: 64px;  --space-9: 96px;

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 120ms;
  --dur: 200ms;
  --dur-slow: 320ms;

  /* Layout */
  --sidebar-w: 260px;
  --content-max: clamp(1200px, 70vw, 1600px);
}`;

const FONT_IMPORT = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>`;

const INSTALL = `$ npm create vite@latest my-app -- --template react
$ cd my-app
$ npm install`;

const IMPORT_CSS = `/* src/main.jsx */
import "./index.css";`;

/* ================================================================
   API — agrupada por família. Cada entry tem nome, imports,
   props mais relevantes e snippet de uso.
   ================================================================ */
const API = [
  {
    id: "buttons",
    name: "Button",
    route: "buttons",
    imports: `import { Button, SidebarToggle, BackToTop } from "./ds/primitives";`,
    props: [
      ["variant", "'default' | 'primary' | 'accent' | 'ghost' | 'link'", "'default'"],
      ["size", "'sm' | 'md' | 'lg'", "'md'"],
      ["disabled", "boolean", "false"],
      ["onClick", "(e) => void", "—"],
    ],
    code: `<Button variant="primary">Confirm</Button>
<Button>Secondary</Button>
<Button variant="accent">Featured</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Editorial link</Button>

<Button size="sm" variant="primary">Small</Button>
<Button size="lg" variant="primary">Large</Button>`,
  },
  {
    id: "fields",
    name: "Field · Input · Textarea · Select",
    route: "inputs",
    imports: `import { Field, Input, Textarea, Select, FieldLabel, FieldHint, FieldError } from "./ds/primitives";`,
    props: [
      ["label", "ReactNode", "—"],
      ["hint", "ReactNode", "—"],
      ["error", "ReactNode", "—"],
      ["invalid", "boolean", "false"],
    ],
    code: `<Field label="Email" hint="Used only for the edition.">
  <Input type="email" placeholder="you@atelier.com" />
</Field>

<Field label="About" error="Required">
  <Textarea rows={4} invalid />
</Field>

<Field label="Plan">
  <Select defaultValue="quarterly">
    <option value="monthly">Monthly</option>
    <option value="quarterly">Quarterly</option>
    <option value="annual">Annual</option>
  </Select>
</Field>`,
  },
  {
    id: "controls",
    name: "Checkbox · Radio · Switch",
    route: "controls",
    imports: `import { Checkbox, Radio, Switch } from "./ds/primitives";`,
    props: [
      ["label", "string", "—"],
      ["checked", "boolean", "—"],
      ["onChange", "(e) => void · for Switch: (boolean) => void", "—"],
      ["disabled", "boolean", "false"],
    ],
    code: `<Checkbox label="Subscribe" checked={a} onChange={(e) => setA(e.target.checked)} />
<Radio name="plan" label="Quarterly" checked={p === "q"} onChange={() => setP("q")} />
<Switch label="Notifications" checked={n} onChange={setN} />`,
  },
  {
    id: "badges",
    name: "Badge",
    route: "badges",
    imports: `import { Badge } from "./ds/primitives";`,
    props: [
      ["variant", "'default' | 'solid' | 'accent' | 'ok' | 'warn' | 'info' | 'danger'", "'default'"],
      ["dot", "boolean", "false"],
    ],
    code: `<Badge>Default</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="accent">Accent</Badge>
<Badge dot variant="ok">Published</Badge>
<Badge dot variant="warn">Draft</Badge>`,
  },
  {
    id: "avatars",
    name: "Avatar · AvatarGroup",
    route: "avatars",
    imports: `import { Avatar, AvatarGroup } from "./ds/primitives";`,
    props: [
      ["initials", "string", "—"],
      ["src", "string", "—"],
      ["size", "'sm' | 'md' | 'lg' | 'xl'", "'md'"],
      ["variant", "'default' | 'solid' | 'accent'", "'default'"],
      ["shape", "'square' | 'circle'", "'square'"],
    ],
    code: `<Avatar initials="CA" />
<Avatar src="/photo.jpg" alt="Clara A." size="lg" />
<Avatar initials="JO" variant="accent" shape="circle" />

<AvatarGroup max={4}>
  <Avatar initials="CA" />
  <Avatar initials="JO" variant="solid" />
  <Avatar initials="MR" />
  <Avatar initials="LP" />
  <Avatar initials="XX" />
</AvatarGroup>`,
  },
  {
    id: "alerts",
    name: "Alert",
    route: "alerts",
    imports: `import { Alert, AlertMark, AlertContent, AlertTitle, AlertDescription, AlertActions } from "./ds/Alert";`,
    props: [
      ["variant", "'default' | 'info' | 'ok' | 'warn' | 'danger'", "'default'"],
      ["title", "ReactNode (forma curta)", "—"],
    ],
    code: `<Alert variant="info" title="Heads up">
  Atelier publishes once per quarter.
</Alert>

{/* Composable */}
<Alert variant="ok">
  <AlertMark>✓</AlertMark>
  <AlertContent>
    <AlertTitle>Saved</AlertTitle>
    <AlertDescription>The article was published.</AlertDescription>
    <AlertActions>
      <Button variant="link">Undo</Button>
    </AlertActions>
  </AlertContent>
</Alert>`,
  },
  {
    id: "cards",
    name: "Card family",
    route: "cards",
    imports: `import { Card, CardKicker, CardTitle, CardBody, CardFooter } from "./ds/Card";`,
    props: [
      ["Card", "container", "—"],
      ["CardKicker", "small mono header", "—"],
      ["CardTitle", "serif title (as: 'h3' default)", "—"],
      ["CardBody", "main content", "—"],
      ["CardFooter", "actions / meta", "—"],
    ],
    code: `<Card>
  <CardKicker>Chronicle · 04</CardKicker>
  <CardTitle>On <em>type</em></CardTitle>
  <CardBody>A well-chosen typeface solves half the problems.</CardBody>
  <CardFooter>read →</CardFooter>
</Card>`,
  },
  {
    id: "tabs",
    name: "Tabs family",
    route: "tabs",
    imports: `import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./ds/Tabs";`,
    props: [
      ["value", "string (controlled)", "—"],
      ["onChange", "(value) => void", "—"],
      ["variant", "'underline' | 'enclosed' | 'pills' | 'segmented' | 'minimal'", "'underline'"],
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'"],
      ["Tab glyph", "ReactNode (símbolo opcional antes do label)", "—"],
      ["Tab count", "number | string (badge depois do label)", "—"],
    ],
    code: `const [tab, setTab] = useState("a");

{/* Default — underline */}
<Tabs value={tab} onChange={setTab}>
  <TabList>
    <Tab value="a">Foundations</Tab>
    <Tab value="b">Components</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="a"><p>...</p></TabPanel>
    <TabPanel value="b"><p>...</p></TabPanel>
  </TabPanels>
</Tabs>

{/* Other variants */}
<Tabs variant="enclosed"  value={tab} onChange={setTab}>…</Tabs>
<Tabs variant="pills"     value={tab} onChange={setTab}>…</Tabs>
<Tabs variant="segmented" value={tab} onChange={setTab}>…</Tabs>
<Tabs variant="minimal"   value={tab} onChange={setTab}>…</Tabs>

{/* Vertical orientation (works with any variant) */}
<Tabs orientation="vertical" value={tab} onChange={setTab}>…</Tabs>

{/* Tab with glyph + count */}
<Tab value="a" glyph="§" count={4}>Foundations</Tab>`,
  },
  {
    id: "tables",
    name: "Table family",
    route: "tables",
    imports: `import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./ds/Table";`,
    props: [
      ["TableHeader", "width, align", "—"],
      ["TableCell", "mono (boolean), align", "—"],
    ],
    code: `<Table>
  <TableHead>
    <TableRow>
      <TableHeader width={80}>n</TableHeader>
      <TableHeader>Title</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((r: any) => (
      <TableRow key={r.n}>
        <TableCell mono>{r.n}</TableCell>
        <TableCell><em>{r.title}</em></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
  },
  {
    id: "charts",
    name: "Charts (Bar · Line · Area · Pie · Donut · Radar · Radial · Sparkline)",
    route: "charts",
    imports: `import {
  Chart, ChartHeader, ChartKicker, ChartTitle, ChartLegend, ChartLegendItem,
  BarChart, LineChart, AreaChart, PieChart, DonutChart, RadarChart, RadialChart, Sparkline,
} from "./ds/Chart";`,
    props: [
      ["data", "number[] | { label, value }[] | { axis, value }[]", "—"],
      ["labels", "string[]", "—"],
      ["height", "number", "180-280"],
      ["accentIndex", "number — qual elemento ganha --accent", "last"],
      ["valueLabel", "string — sufixo no tooltip ('subscribers')", "—"],
    ],
    code: `<Chart>
  <ChartHeader>
    <ChartKicker>Q3 · 2026</ChartKicker>
    <ChartTitle>Editions per month</ChartTitle>
  </ChartHeader>
  <BarChart
    data={[42, 58, 35, 72, 89, 65, 94, 78]}
    labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
    accentIndex={6}
    valueLabel="editions"
  />
</Chart>

<RadarChart axes={["A","B","C","D"]} series={[{ name: "Atelier", values: [9,8,7,6] }]} />
<DonutChart data={[{ label: "Done", value: 73 }, { label: "Left", value: 27 }]} />
<Sparkline data={[12, 15, 14, 18, 22, 26, 30, 38]} filled />`,
  },
  {
    id: "overlays",
    name: "Dialog · Modal · Tooltip",
    route: "overlays",
    imports: `import { Dialog, DialogHeader, DialogTitle, DialogClose, DialogBody, DialogFooter, Modal, Tooltip } from "./ds/Dialog";`,
    props: [
      ["Dialog open", "boolean", "false"],
      ["Dialog onClose", "() => void", "—"],
      ["Modal", "alias retrocompatível com title / foot props", "—"],
      ["Tooltip tip", "string", "—"],
    ],
    code: `<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>Discard changes?</DialogTitle>
    <DialogClose />
  </DialogHeader>
  <DialogBody>Anything unsaved will be lost.</DialogBody>
  <DialogFooter>
    <Button variant="ghost" onClick={...}>Cancel</Button>
    <Button variant="primary" onClick={...}>Discard</Button>
  </DialogFooter>
</Dialog>

<Tooltip tip="Copy URL">
  <Button>Copy</Button>
</Tooltip>`,
  },
  {
    id: "popover",
    name: "Popover family",
    route: "popover",
    imports: `import { Popover, PopoverTrigger, PopoverContent } from "./ds/Popover";
import type { PopoverPlacement } from "./ds/types";`,
    props: [
      ["Popover open / onOpenChange / defaultOpen", "controlado ou descontrolado", "—"],
      ["PopoverContent placement", "12 opções: \"${side}-${align}\"", "'bottom-start'"],
      ["PopoverContent offset", "number (px entre trigger e content)", "6"],
      ["PopoverContent arrow", "boolean", "false"],
      ["PopoverContent closeOnClickOutside / closeOnEscape", "boolean", "true"],
    ],
    code: `<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent placement="bottom-start" arrow>
    <p>Anything goes here.</p>
  </PopoverContent>
</Popover>

{/* Controlled */}
<Popover open={open} onOpenChange={setOpen}>…</Popover>`,
  },
  {
    id: "dropdownMenu",
    name: "DropdownMenu family",
    route: "dropdown-menu",
    imports: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuLabel, DropdownMenuSeparator,
} from "./ds/DropdownMenu";`,
    props: [
      ["Item onSelect", "() => void", "—"],
      ["Item glyph", "ReactNode (símbolo serif)", "—"],
      ["Item shortcut", "string ('⌘K')", "—"],
      ["Item destructive", "boolean (cor accent)", "false"],
      ["CheckboxItem checked / onCheckedChange", "boolean / callback", "—"],
      ["RadioGroup value / onValueChange", "string / callback", "—"],
    ],
    code: `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem glyph="§" shortcut="⌘P">Profile</DropdownMenuItem>
    <DropdownMenuItem glyph="¶" shortcut="⌘,">Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={dark} onCheckedChange={setDark}>
      Dark mode
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    id: "drawer",
    name: "Drawer family",
    route: "drawer",
    imports: `import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerClose,
  DrawerBody, DrawerFooter,
} from "./ds/Drawer";`,
    props: [
      ["Drawer side", "'top' | 'right' | 'bottom' | 'left'", "'right'"],
      ["Drawer open / onOpenChange / defaultOpen", "controlado ou descontrolado", "—"],
      ["Drawer closeOnBackdrop / closeOnEscape", "boolean", "true"],
      ["DrawerContent size", "number (px)", "380"],
    ],
    code: `<Drawer side="right">
  <DrawerTrigger>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent size={420}>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <DrawerBody>…</DrawerBody>
    <DrawerFooter>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
  {
    id: "toaster",
    name: "Toaster (queue manager)",
    route: "toaster",
    imports: `import { Toaster, useToast } from "./ds/Toaster";
import type { ToastVariant, ToasterPosition } from "./ds/types";`,
    props: [
      ["Toaster position", "6 opções (top|bottom)-(left|center|right)", "'bottom-right'"],
      ["Toaster defaultDuration", "number (ms; 0 = no auto-dismiss)", "4000"],
      ["Toaster limit", "number (max simultâneos)", "5"],
      ["toast(input, opts?)", "string ou ToastOptions; retorna id", "—"],
      ["dismiss(id)", "remove um toast específico", "—"],
      ["clear()", "remove todos", "—"],
    ],
    code: `// 1) No root da app
<Toaster position="bottom-right">
  <App />
</Toaster>

// 2) Em qualquer descendente
const { toast, dismiss, clear } = useToast();

toast("Saved.");
toast("Connection lost", { variant: "danger" });
toast({
  title: "Item moved to trash.",
  description: "You can revert this for a few seconds.",
  variant: "ok",
  duration: 8000,
  action: { label: "Undo", onClick: () => undo() },
});`,
  },
  {
    id: "combobox",
    name: "Combobox",
    route: "combobox",
    imports: `import { Combobox, type ComboboxOption } from "./ds/Combobox";`,
    props: [
      ["options", "ComboboxOption[] (value, label, group?, glyph?, disabled?)", "—"],
      ["value", "string | null (single) | string[] (multi)", "—"],
      ["onChange", "(value) => void", "—"],
      ["multi", "boolean", "false"],
      ["creatable", "boolean — aceita valores novos digitados", "false"],
      ["createLabel", "(query) => ReactNode — label da creation row", "—"],
      ["placeholder", "string", "—"],
      ["disabled", "boolean", "false"],
      ["getOptionValue / getOptionLabel / renderOption", "customização avançada", "defaults"],
    ],
    code: `// Single
<Combobox
  options={[
    { value: "br", label: "Brazil" },
    { value: "us", label: "United States" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Pick a country"
/>

// Multi com chips
<Combobox
  multi
  options={tags}
  value={selected}
  onChange={setSelected}
/>

// Creatable — aceita valores novos digitados pelo usuário
<Combobox
  multi
  creatable
  options={tags}
  value={selected}
  onChange={setSelected}
  createLabel={(q) => <>Criar <em>"{q}"</em></>}
/>

// Com grupos (separadores no painel)
const langs = [
  { value: "ts", label: "TypeScript", group: "Typed" },
  { value: "py", label: "Python", group: "Dynamic" },
];

// Com glifos serifados
const tags = [
  { value: "design", label: "Design", glyph: "§" },
  { value: "code",   label: "Code",   glyph: "¶" },
];`,
  },
  {
    id: "slider",
    name: "RangeSlider",
    route: "slider",
    imports: `import { RangeSlider } from "./ds/RangeSlider";
import type { SliderValue, SliderOrientation } from "./ds/types";`,
    props: [
      ["value", "number (single) | [number, number] (dual)", "—"],
      ["onChange", "(value) => void", "—"],
      ["min / max / step", "number", "0 / 100 / 1"],
      ["marks", "number[] (ticks visuais com label)", "—"],
      ["showValue", "'always' | 'active' | 'never'", "'active'"],
      ["formatValue", "(n) => string", "String"],
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'"],
      ["size", "number | string (length da dimensão principal)", "—"],
      ["disabled", "boolean", "false"],
    ],
    code: `// Single
<RangeSlider min={0} max={100} value={vol} onChange={setVol} />

// Dual (range)
<RangeSlider
  min={0} max={1000} step={50}
  value={[200, 800]}
  onChange={setBudget}
  formatValue={(v) => \`\\$\${v}\`}
/>

// Com marks
<RangeSlider
  min={1900} max={2025}
  value={year} onChange={setYear}
  marks={[1900, 1950, 2000, 2025]}
/>

// Vertical
<RangeSlider orientation="vertical" size={200} … />`,
  },
  {
    id: "calendar",
    name: "Calendar",
    route: "calendar",
    imports: `import { Calendar, type CalendarRange } from "./ds/Calendar";
import { addDays, today, type DateFormat } from "./ds/calendarUtils";`,
    props: [
      ["mode", "'single' | 'range' | 'multiple'", "'single'"],
      ["value", "Date | null (single) | [start, end] (range) | Date[] (multi)", "—"],
      ["onChange", "(value) => void", "—"],
      ["minDate / maxDate", "Date — limites navegáveis", "—"],
      ["disabledDays", "(date: Date) => boolean — predicado custom", "—"],
      ["weekStartsOn", "0 (domingo) | 1 (segunda)", "0"],
      ["showTodayButton", "boolean", "true"],
      ["defaultMonth", "Date — mês inicial visível", "today"],
    ],
    code: `// Single
const [date, setDate] = useState<Date | null>(today());
<Calendar value={date} onChange={setDate} />

// Range
const [range, setRange] = useState<CalendarRange>([null, null]);
<Calendar mode="range" value={range} onChange={setRange} />

// Multiple
const [dates, setDates] = useState<Date[]>([]);
<Calendar mode="multiple" value={dates} onChange={setDates} />

// Bounded + custom disabled
<Calendar
  value={date}
  onChange={setDate}
  minDate={today()}
  maxDate={addDays(today(), 60)}
  disabledDays={(d) => d.getDay() === 0 || d.getDay() === 6}
/>`,
  },
  {
    id: "datePicker",
    name: "DatePicker · DateRangePicker",
    route: "date-picker",
    imports: `import { DatePicker, DateRangePicker } from "./ds/DatePicker";
import { formatDate, parseDate, type DateFormat } from "./ds/calendarUtils";`,
    props: [
      ["value", "Date | null (DatePicker) | CalendarRange (DateRangePicker)", "—"],
      ["onChange", "(value) => void", "—"],
      ["format", "'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'", "'DD/MM/YYYY'"],
      ["minDate / maxDate / disabledDays / weekStartsOn", "como Calendar", "—"],
      ["placement", "PopoverPlacement", "'bottom-start'"],
      ["placeholder / disabled / id / ariaLabel", "input attrs", "—"],
    ],
    code: `// Single date com input mascarado
const [date, setDate] = useState<Date | null>(null);
<DatePicker value={date} onChange={setDate} />

// Formato ISO
<DatePicker value={date} onChange={setDate} format="YYYY-MM-DD" />

// Range — 2 calendars side-by-side
const [range, setRange] = useState<CalendarRange>([null, null]);
<DateRangePicker value={range} onChange={setRange} />

// Bounded
<DatePicker
  value={date}
  onChange={setDate}
  minDate={today()}
  maxDate={addDays(today(), 60)}
  disabledDays={(d) => d.getDay() === 0 || d.getDay() === 6}
/>`,
  },
  {
    id: "carousel",
    name: "Carousel",
    route: "carousel",
    imports: `import { Carousel, CarouselSlide } from "./ds/Carousel";`,
    props: [
      ["loop", "boolean — wrap-around no fim/início", "false"],
      ["autoPlay", "boolean — avança sozinho", "false"],
      ["interval", "number (ms entre auto-advances)", "5000"],
      ["showDots / showArrows", "boolean", "true / true"],
      ["transition", "'slide' | 'fade'", "'slide'"],
      ["defaultIndex", "number — slide inicial", "0"],
      ["onChange", "(index) => void", "—"],
    ],
    code: `<Carousel loop autoPlay interval={4000}>
  <CarouselSlide>
    <img src="/01.jpg" alt="…" />
  </CarouselSlide>
  <CarouselSlide>
    <img src="/02.jpg" alt="…" />
  </CarouselSlide>
  <CarouselSlide>
    <img src="/03.jpg" alt="…" />
  </CarouselSlide>
</Carousel>

// Fade entre slides em vez de deslizar
<Carousel transition="fade">…</Carousel>

// Carousel cru — só swipe e teclado
<Carousel showDots={false} showArrows={false}>…</Carousel>`,
  },
  {
    id: "tree",
    name: "TreeView",
    route: "tree",
    imports: `import { TreeView, type TreeNode } from "./ds/TreeView";`,
    props: [
      ["data", "TreeNode[] — id, label, children?, glyph?, disabled?", "—"],
      ["selectionMode", "'single' | 'multi' | 'none'", "'single'"],
      ["value", "string | null (single) | string[] (multi)", "—"],
      ["onChange", "(value) => void", "—"],
      ["defaultExpanded / expanded / onExpandedChange", "controlled or uncontrolled", "—"],
    ],
    code: `const data: TreeNode[] = [
  { id: "src", label: "src/", children: [
    { id: "ds", label: "ds/", children: [
      { id: "btn", label: "Button.tsx" },
    ]},
  ]},
];

// Single
<TreeView
  data={data}
  selectionMode="single"
  value={selected}
  onChange={setSelected}
  defaultExpanded={["src", "ds"]}
/>

// Multi
<TreeView
  data={cats}
  selectionMode="multi"
  value={selected}
  onChange={setSelected}
/>

// Sem seleção (só nav)
<TreeView data={outline} selectionMode="none" />`,
  },
  {
    id: "resizable",
    name: "ResizablePanels",
    route: "resizable",
    imports: `import { ResizablePanels, ResizablePanel } from "./ds/ResizablePanels";`,
    props: [
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'"],
      ["defaultSizes", "number[] — % por painel (soma 100)", "dividir igual"],
      ["sizes / onSizesChange", "controlado", "—"],
      ["minSize", "% mínimo por painel", "10"],
      ["storageKey", "persiste em localStorage", "—"],
    ],
    code: `// Horizontal — 2 panels
<ResizablePanels defaultSizes={[60, 40]}>
  <ResizablePanel>Left</ResizablePanel>
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanels>

// Vertical
<ResizablePanels orientation="vertical" defaultSizes={[40, 60]}>
  <ResizablePanel>Top</ResizablePanel>
  <ResizablePanel>Bottom</ResizablePanel>
</ResizablePanels>

// 3 panels (2 handles)
<ResizablePanels defaultSizes={[20, 60, 20]}>
  <ResizablePanel>Sidebar</ResizablePanel>
  <ResizablePanel>Content</ResizablePanel>
  <ResizablePanel>Inspector</ResizablePanel>
</ResizablePanels>

// Persiste em localStorage
<ResizablePanels storageKey="my.split">…</ResizablePanels>`,
  },
  {
    id: "colorPicker",
    name: "ColorPicker",
    route: "color-picker",
    imports: `import { ColorPicker } from "./ds/ColorPicker";
import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from "./ds/colorUtils";`,
    props: [
      ["value", "string (#rrggbb ou #rrggbbaa)", "—"],
      ["onChange", "(hex: string) => void", "—"],
      ["alpha", "boolean — slider de transparência", "false"],
      ["presets", "string[] — array de hex pra renderizar como swatches", "—"],
      ["size", "number — width/height do plane SV", "240"],
    ],
    code: `// Single picker
const [color, setColor] = useState("#c8361d");
<ColorPicker value={color} onChange={setColor} />

// Com presets
<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#ff3b30", "#34c759", "#007aff"]}
/>

// Com alpha (#rrggbbaa)
<ColorPicker value={color} onChange={setColor} alpha />

// Compacto pra painéis estreitos
<ColorPicker value={color} onChange={setColor} size={160} />

// Conversões podem ser usadas standalone
const rgb = hexToRgb("#c8361d");      // { r: 200, g: 54, b: 29 }
const hex = rgbToHex({ r: 0, g: 122, b: 255 });`,
  },
  {
    id: "markdown",
    name: "MarkdownViewer",
    route: "markdown",
    imports: `import { MarkdownViewer } from "./ds/MarkdownViewer";`,
    props: [
      ["children", "string — conteúdo markdown", "—"],
      ["maxWidth", "number | string — limita largura do conteúdo", "'65ch'"],
    ],
    code: `<MarkdownViewer>{\`# Hello

A **markdown** viewer with [zero deps](https://example).

- Item 1
- Item 2

\\\`\\\`\\\`tsx
const x = 42;
\\\`\\\`\\\`
\`}</MarkdownViewer>

// Com largura customizada
<MarkdownViewer maxWidth={800}>{md}</MarkdownViewer>`,
  },
  {
    id: "shortcuts",
    name: "Shortcuts (system)",
    route: "shortcuts",
    imports: `import {
  ShortcutsProvider,
  useShortcut,
  useShortcutsContext,
  ShortcutCombo,
} from "./ds/Shortcuts";`,
    props: [
      ["useShortcut(combo, handler, opts?)", "registra um atalho com auto-cleanup", "—"],
      ["combo string", "ex: 'cmd+k', 'shift+?', 'alt+arrowup'", "—"],
      ["opts.label / .group", "metadados pro help dialog", "—"],
      ["opts.ignoreInInputs", "boolean (não dispara em input/textarea)", "true"],
      ["opts.allowRepeat", "boolean (auto-fire ao segurar tecla)", "false"],
      ["opts.disabled", "boolean", "false"],
      ["useShortcutsContext()", "{ openHelp, closeHelp, register, list }", "—"],
      ["<ShortcutCombo combo='cmd+k' />", "render visual com <kbd>", "—"],
    ],
    code: `// 1) Setup no root
<ShortcutsProvider>
  <App />
</ShortcutsProvider>

// 2) Registra atalho em qualquer componente
useShortcut("cmd+s", () => save(), {
  label: "Salvar",
  group: "Editor",
});

// 3) Built-in: Shift+? abre o help dialog automaticamente

// Programaticamente
const { openHelp } = useShortcutsContext();
<Button onClick={openHelp}>Atalhos</Button>

// Render visual de um combo
<ShortcutCombo combo="cmd+shift+k" />  // ⌘ ⇧ K`,
  },
  {
    id: "virtualList",
    name: "VirtualList<T>",
    route: "virtual-list",
    imports: `import { VirtualList } from "./ds/VirtualList";`,
    props: [
      ["items", "T[] — qualquer tipo de item", "—"],
      ["itemHeight", "number | (i: number) => number", "—"],
      ["renderItem", "(item, index) => ReactNode", "—"],
      ["height", "number | string — altura do container", "400"],
      ["overscan", "number — items extras pra cima/baixo", "3"],
      ["onEndReached", "() => void — chamado perto do fim", "—"],
      ["endThreshold", "number — items do fim pra disparar", "5"],
      ["getKey", "(item, i) => string | number", "i (index)"],
    ],
    code: `// Altura fixa
<VirtualList
  items={tenThousandRows}
  itemHeight={64}
  height={400}
  renderItem={(row) => <Row data={row} />}
/>

// Altura variável (mais lento — só se precisar)
<VirtualList
  items={items}
  itemHeight={(i) => (i % 3 === 0 ? 96 : 56)}
  renderItem={(item) => <Card item={item} />}
/>

// Infinite scroll
<VirtualList
  items={items}
  itemHeight={64}
  onEndReached={loadMore}
  endThreshold={5}
  renderItem={(item) => <Row item={item} />}
/>`,
  },
  {
    id: "dragDrop",
    name: "DragDrop kit (Sortable + DropZone)",
    route: "drag-drop",
    imports: `import {
  Sortable,
  DragDropProvider,
  DragSource, DropZone, DragGhost,
} from "./ds/DragDrop";`,
    props: [
      ["<Sortable items onChange>", "lista reordenável", "—"],
      ["Sortable.orientation", "'vertical' | 'horizontal'", "'vertical'"],
      ["Sortable.dragThreshold", "px que o cursor anda antes de drag", "4"],
      ["<DragDropProvider>", "envolve áreas com DragSource/DropZone", "—"],
      ["<DragSource data type?>", "marca um elemento como arrastável", "—"],
      ["<DropZone onDrop accepts?>", "recebe drops; filtra por type", "—"],
      ["keyboard (Sortable)", "Tab + Space pra pegar, ↑↓ pra mover, Esc cancela", "—"],
    ],
    code: `// Sortable simples
<Sortable items={list} onChange={setList} getKey={(c) => c.id}>
  {(card) => <Card>{card.title}</Card>}
</Sortable>

// Cross-container (kanban)
<DragDropProvider>
  <DropZone onDrop={(c) => moveTo("doing", c)} accepts="card">
    {doing.map((c) => (
      <DragSource key={c.id} data={c} type="card">
        <Card>{c.title}</Card>
      </DragSource>
    ))}
  </DropZone>
  <DragGhost />  {/* preview seguindo o cursor — opcional */}
</DragDropProvider>`,
  },
  {
    id: "contextMenu",
    name: "ContextMenu family",
    route: "context-menu",
    imports: `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel,
  ContextMenuCheckboxItem, ContextMenuSeparator,
} from "./ds/ContextMenu";`,
    props: [
      ["Trigger", "wraps qualquer ReactElement; intercepta onContextMenu", "—"],
      ["Content", "abre nas coords do clique, com clamp de viewport", "—"],
      ["Item / CheckboxItem", "mesma API do DropdownMenu", "—"],
      ["keyboard", "Shift+F10 / tecla ContextMenu também abre", "—"],
    ],
    code: `<ContextMenu>
  <ContextMenuTrigger>
    <div>Right-click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem shortcut="⌘X">Cut</ContextMenuItem>
    <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
    <ContextMenuItem shortcut="⌘V">Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem destructive>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  {
    id: "feedback",
    name: "Toast · Progress",
    route: "feedback",
    imports: `import { Toast, ToastTitle, ToastDescription, ToastActions, Progress } from "./ds/primitives";`,
    props: [
      ["Toast visible", "boolean", "false"],
      ["Toast message", "string (forma curta)", "—"],
      ["Progress value", "number 0..100", "0"],
    ],
    code: `<Toast message="Copied." visible={visible} />

<Toast visible={open}>
  <ToastTitle>Saved</ToastTitle>
  <ToastDescription>The article was published.</ToastDescription>
  <ToastActions><Button variant="link">Undo</Button></ToastActions>
</Toast>

<Progress value={42} label="Loading" />`,
  },
  {
    id: "dropzone",
    name: "Dropzone family",
    route: "dropzone",
    imports: `import {
  Dropzone, DropzoneIcon, DropzoneTitle, DropzoneHint,
  DropzoneFile, DropzoneFilename, DropzoneMeta, DropzoneActions,
} from "./ds/Dropzone";`,
    props: [
      ["Dropzone accept", "string ('.csv,.txt')", "—"],
      ["Dropzone onSelect", "(file) => void", "—"],
    ],
    code: `<Dropzone accept=".csv,.tsv,.txt" onSelect={setFile}>
  <DropzoneIcon>csv<span className="dot">.</span></DropzoneIcon>
  <DropzoneTitle>Drop here or <em>pick</em></DropzoneTitle>
  <DropzoneHint>or drag a CSV file</DropzoneHint>
</Dropzone>

{file && (
  <DropzoneFile>
    <DropzoneFilename>{file.name}</DropzoneFilename>
    <DropzoneMeta items={[{ label: "Size", value: ... }]} />
    <DropzoneActions><Button variant="link" onClick={reset}>Reset</Button></DropzoneActions>
  </DropzoneFile>
)}`,
  },
  {
    id: "pagination",
    name: "Pagination family",
    route: "pagination",
    imports: `import {
  Pagination,
  PaginationRoot, PaginationItem, PaginationPrev, PaginationNext, PaginationEllipsis,
} from "./ds/Pagination";`,
    props: [
      ["current", "number", "—"],
      ["total", "number", "—"],
      ["onChange", "(page) => void", "—"],
      ["siblings", "number — vizinhos do atual", "1"],
      ["boundaries", "number — quantos das pontas", "1"],
      ["showLabels", "boolean — mostra Anterior/Próximo", "false"],
    ],
    code: `<Pagination
  current={page}
  total={20}
  onChange={setPage}
  siblings={1}
  showLabels
/>`,
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs family",
    route: "breadcrumbs",
    imports: `import {
  Breadcrumbs,
  BreadcrumbsRoot, Breadcrumb, BreadcrumbCurrent, BreadcrumbSeparator,
} from "./ds/Breadcrumbs";`,
    props: [
      ["items", "string[] (forma curta)", "—"],
      ["separator", "string ('/' default, '·', '→')", "'/'"],
      ["Breadcrumb href", "string", "—"],
    ],
    code: `<Breadcrumbs items={["Atelier", "Components", "Tabs"]} />
<Breadcrumbs items={["A", "B", "C"]} separator="·" />

<BreadcrumbsRoot>
  <Breadcrumb href="#/home">Atelier</Breadcrumb>
  <BreadcrumbSeparator />
  <BreadcrumbCurrent>Tabs</BreadcrumbCurrent>
</BreadcrumbsRoot>`,
  },
  {
    id: "skeleton",
    name: "Skeleton family",
    route: "skeleton",
    imports: `import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from "./ds/Skeleton";`,
    props: [
      ["variant", "'rect' | 'circle'", "'rect'"],
      ["width / height", "number | string", "100% / 16px"],
      ["pulse", "boolean", "true"],
      ["lines (text)", "number", "3"],
    ],
    code: `<Skeleton width={120} height={20} />
<Skeleton variant="circle" size={40} />
<SkeletonText lines={3} />
<SkeletonAvatar size={48} />
<SkeletonCard />`,
  },
  {
    id: "stepper",
    name: "Stepper · Step",
    route: "stepper",
    imports: `import { Stepper, Step } from "./ds/Stepper";`,
    props: [
      ["Stepper current", "number — index", "0"],
      ["Stepper orientation", "'horizontal' | 'vertical'", "'horizontal'"],
      ["Step n", "string ('01')", "—"],
      ["Step label", "string", "—"],
      ["Step description", "string", "—"],
    ],
    code: `<Stepper current={1}>
  <Step n="01" label="Account" description="Your basic data" />
  <Step n="02" label="Plan" description="Frequency and format" />
  <Step n="03" label="Confirm" description="Review and send" />
</Stepper>`,
  },
  {
    id: "form",
    name: "Form pattern",
    route: "forms",
    imports: `import { Form, FormStep, FormRow, FormField, FormDivider, FormActions } from "./ds/Form";`,
    props: [
      ["FormRow cols", "number", "2"],
      ["FormActions align", "'start' | 'end' | 'between'", "'end'"],
    ],
    code: `<Form onSubmit={handleSubmit}>
  <FormStep>i · Your details</FormStep>
  <FormRow cols={2}>
    <FormField label="First name"><Input /></FormField>
    <FormField label="Last name"><Input /></FormField>
  </FormRow>
  <FormDivider>preferences</FormDivider>
  <FormField label="Email" hint="Only used to send the edition">
    <Input type="email" />
  </FormField>
  <FormActions>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Subscribe</Button>
  </FormActions>
</Form>`,
  },
  {
    id: "empty",
    name: "EmptyState family",
    route: "empty-states",
    imports: `import { EmptyState, EmptyGlyph, EmptyTitle, EmptyDescription, EmptyActions } from "./ds/EmptyState";`,
    props: [
      ["composable — sem props específicas", "—", "—"],
    ],
    code: `<EmptyState>
  <EmptyGlyph>¶</EmptyGlyph>
  <EmptyTitle>No <em>articles</em> yet</EmptyTitle>
  <EmptyDescription>Invite an author to publish the first piece.</EmptyDescription>
  <EmptyActions>
    <Button variant="primary">Invite an author</Button>
  </EmptyActions>
</EmptyState>`,
  },
  {
    id: "sidebar",
    name: "Sidebar family",
    route: "sidebar",
    imports: `import {
  Sidebar, SidebarHead, SidebarBrand,
  SidebarNav, SidebarGroup, SidebarGroupTitle, SidebarNavItem,
  SidebarLocale, SidebarTheme, SidebarNavMode, SidebarFooter,
} from "./components/Sidebar";`,
    props: [
      ["Sidebar collapsed", "boolean", "false"],
      ["SidebarNavItem n / active / onClick", "—", "—"],
    ],
    code: `<Sidebar collapsed={collapsed}>
  <SidebarHead>
    <SidebarBrand onNavigate={navigate} />
    <SidebarToggle collapsed={collapsed} onToggle={toggle} />
  </SidebarHead>
  <SidebarNav>
    <SidebarGroup>
      <SidebarGroupTitle>Foundations</SidebarGroupTitle>
      <SidebarNavItem n="02" active>Colors</SidebarNavItem>
      <SidebarNavItem n="03">Typography</SidebarNavItem>
    </SidebarGroup>
  </SidebarNav>
  <SidebarFooter />
</Sidebar>`,
  },
  {
    id: "navbar",
    name: "Navbar family",
    route: "navbar",
    imports: `import {
  Navbar, NavbarBrand, NavbarNav,
  NavbarDropdown, NavbarDropdownItem, NavbarActions,
} from "./components/Navbar";`,
    props: [
      ["Navbar current / onNavigate", "—", "—"],
      ["NavbarDropdown cols", "1 | 2 | 3", "1"],
      ["NavbarDropdownItem isNew / description", "—", "—"],
    ],
    code: `<Navbar current={current} onNavigate={navigate}>
  <NavbarBrand />
  <NavbarNav>
    <NavbarDropdown label="Components" cols={3}>
      <NavbarDropdownItem slug="buttons" n="06" description="Primary, ghost, link…">
        Buttons
      </NavbarDropdownItem>
    </NavbarDropdown>
  </NavbarNav>
  <NavbarActions>{/* SettingsMenu, etc. */}</NavbarActions>
</Navbar>`,
  },
  {
    id: "editorial",
    name: "Editorial primitives",
    route: "code",
    imports: `import {
  PageHead, Section, Example, Code, CopyButton, Divider,
  CompositionTree, CompositionSection,
} from "./ds/primitives";`,
    props: [
      ["PageHead lead / title / metaLabel / meta / intro", "—", "—"],
      ["Section num / title / kicker / desc", "—", "—"],
      ["Example caption / tech / code / lang / stack / center", "—", "—"],
      ["Code lang / copy", "'jsx' | 'css' | 'shell'", "'jsx'"],
      ["CompositionTree root / nodes", "—", "—"],
    ],
    code: `<PageHead
  lead="Pattern · 22"
  title={<>The <em>forms</em></>}
  metaLabel="Composition"
  meta="Fields + actions"
  intro="A form is a staged narrative…"
/>

<Section num="i" title="Complete form" kicker="pattern">
  <Example caption="Full subscription" tech="form pattern" stack code={...}>
    {/* ... */}
  </Example>
</Section>

<CompositionSection
  num="ii"
  i18nPrefix="pages.forms.composition"
  root="Form"
  nodes={[{ name: "FormStep" }, { name: "FormActions" }]}
/>`,
  },
  {
    id: "search",
    name: "SearchPalette · SettingsMenu",
    route: "code",
    imports: `import { SearchPalette, SearchTrigger, useSearchHotkey } from "./ds/SearchPalette";
import { SettingsMenu } from "./ds/SettingsMenu";`,
    props: [
      ["SearchPalette open / onClose / onNavigate", "—", "—"],
      ["SearchTrigger compact", "boolean", "false"],
      ["SettingsMenu navMode / onToggleNavMode / placement", "—", "—"],
    ],
    code: `// Hotkey global Cmd+K
useSearchHotkey(() => setSearchOpen(true));

<SearchTrigger onClick={() => setSearchOpen(true)} />
<SearchPalette
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
  onNavigate={navigate}
/>

<SettingsMenu
  navMode={navMode}
  onToggleNavMode={setNavMode}
  placement="bottom-end"  // ou "top-end" pra sidebar
/>`,
  },
];

/* ================================================================
   ApiTable — utilizada em cada card da seção API
   ================================================================ */
function ApiTable({ rows, labels }: any) {
  return (
    <div className="ds-table-wrap" style={{ marginBottom: 0 }}>
      <table className="ds-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>{labels.prop}</th>
            <th>{labels.type}</th>
            <th style={{ width: "20%" }}>{labels.default}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, i: any) => (
            <tr key={i}>
              <td className="mono" style={{ color: "var(--accent)" }}>
                {row[0]}
              </td>
              <td className="mono" style={{ fontSize: 11 }}>
                {row[1]}
              </td>
              <td className="mono" style={{ color: "var(--ink-faint)" }}>
                {row[2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CodePage({ onNavigate }: any) {
  const { t, tr, raw } = useT();
  const conventions = raw("pages.code.conventions.items") || [];
  const decisions = raw("pages.code.decisions.items") || [];
  const tableLabels = {
    prop: t("common.prop"),
    type: t("common.type"),
    default: t("common.default"),
  };

  return (
    <>
      <PageHead
        lead={t("pages.code.lead")}
        title={
          <>
            {tr("pages.code.titleA")}
            <em>{t("pages.code.titleB")}</em>
          </>
        }
        metaLabel={t("pages.code.metaLabel")}
        meta={t("pages.code.meta")}
        intro={tr("pages.code.intro")}
      />

      {/* i · Install */}
      <Section
        num="i"
        title={<>{t("pages.code.start.title")}</>}
        kicker={t("pages.code.start.kicker")}
      >
        <p className="section-desc">{tr("pages.code.start.desc")}</p>

        <h3 className="sub">{t("pages.code.start.step1")}</h3>
        <Code lang="shell">{INSTALL}</Code>

        <h3 className="sub">{t("pages.code.start.step2")}</h3>
        <Code lang="jsx">{FONT_IMPORT}</Code>

        <h3 className="sub">{t("pages.code.start.step3")}</h3>
        <Code lang="jsx">{IMPORT_CSS}</Code>
      </Section>

      {/* ii · Tokens */}
      <Section
        num="ii"
        title={
          <>
            {tr("pages.code.tokens.titleA")}
            <em>{t("pages.code.tokens.titleB")}</em>
          </>
        }
        kicker={t("pages.code.tokens.kicker")}
      >
        <p className="section-desc">{tr("pages.code.tokens.desc")}</p>
        <Code lang="css">{TOKENS}</Code>
      </Section>

      <Divider>{t("pages.code.divider")}</Divider>

      {/* iii · API */}
      <Section
        num="iii"
        title={
          <>
            {tr("pages.code.api.titleA")}
            <em>{t("pages.code.api.titleB")}</em>
          </>
        }
        kicker={t("pages.code.api.kicker")}
      >
        <p className="section-desc">{tr("pages.code.api.desc")}</p>

        {API.map((c: any) => (
          <article key={c.id} className="api-card">
            <header className="api-card-head">
              <div>
                <div className="api-card-import">{t("common.import")}</div>
                <button
                  type="button"
                  onClick={() => onNavigate?.(c.route)}
                  className="api-card-name"
                >
                  {c.name}
                </button>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.(c.route)}
                className="api-card-view"
              >
                {t("pages.code.api.view")}
              </button>
            </header>

            <div className="api-card-body">
              <h4 className="api-card-section-label">{t("common.import")}</h4>
              <Code lang="jsx">{c.imports}</Code>

              <h4 className="api-card-section-label">{t("common.props")}</h4>
              <ApiTable rows={c.props} labels={tableLabels} />

              <h4 className="api-card-section-label">{t("common.example")}</h4>
              <Code lang="jsx">{c.code}</Code>
            </div>
          </article>
        ))}
      </Section>

      <Divider>{t("pages.code.dividerDecisions")}</Divider>

      {/* iv · Decision log (ADRs) */}
      <Section
        num="iv"
        title={
          <>
            {tr("pages.code.decisions.titleA")}
            <em>{t("pages.code.decisions.titleB")}</em>
          </>
        }
        kicker={t("pages.code.decisions.kicker")}
      >
        <p className="section-desc">{tr("pages.code.decisions.desc")}</p>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          {decisions.map((d: any, i: any) => (
            <article key={d.n} className="adr-card">
              <header className="adr-card-head">
                <span className="adr-card-n">{d.n}</span>
                <span className="adr-card-status">{d.status}</span>
              </header>
              <h3 className="adr-card-title">
                {d.titleA}
                <em>{d.titleB}</em>
                {d.titleC || ""}
              </h3>
              <p className="adr-card-body">
                {tr(`pages.code.decisions.items.${i}.body`)}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* v · Conventions */}
      <Section
        num="v"
        title={<>{t("pages.code.conventions.title")}</>}
        kicker={t("pages.code.conventions.kicker")}
      >
        <div className="grid cols-3">
          {conventions.map((rule: any) => (
            <div
              key={rule.n}
              style={{
                border: "1px solid var(--rule-soft)",
                background: "var(--bg-panel)",
                padding: "var(--space-5)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 36,
                  color: "var(--accent)",
                  marginBottom: 10,
                }}
              >
                {rule.n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {rule.titleA}
                <em style={{ fontStyle: "italic" }}>{rule.titleB}</em>
                {rule.titleC || ""}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                }}
              >
                {(() => {
                  const parts = rule.body.split(/\[em\]|\[\/em\]/);
                  return parts.map((p: any, i: any) =>
                    i % 2 === 1 ? (
                      <em key={i} style={{ fontStyle: "italic" }}>
                        {p}
                      </em>
                    ) : (
                      p
                    )
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
