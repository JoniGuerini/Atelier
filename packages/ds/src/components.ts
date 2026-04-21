/* ================================================================
   @atelier/ds — Components barrel
   ----------------------------------------------------------------
   Re-exporta todos os componentes publicos do DS.

   NAO inclui (sao internos do app de docs):
     - SearchPalette, SettingsMenu, PageNav, LayoutToggle
     - SidebarToggle, NavModeToggle, BackToTop, ThemeToggle
     - CompositionTree, CompositionSection, Example

   Hooks vivem em "@atelier/ds/hooks". Tokens em "@atelier/ds/tokens".

   Os imports apontam para src/_app/, sincronizado em build time
   via scripts/sync-sources.mjs (regenerado a cada build).
   ================================================================ */

/* ---- Primitives (Button, Input, Code, Avatar...) ---- */
export {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Badge,
  Progress,
  Tooltip,
  Avatar,
  AvatarGroup,
  Divider,
  CopyButton,
  Code,
  Section,
  PageHead,
} from "./_app/ds/primitives.tsx";

/* ---- Card ---- */
export {
  Card,
  CardHeader,
  CardKicker,
  CardTitle,
  CardBody,
  CardFooter,
} from "./_app/ds/Card.tsx";

/* ---- Tabs ---- */
export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "./_app/ds/Tabs.tsx";

/* ---- Dialog + Modal ---- */
export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
  Modal,
} from "./_app/ds/Dialog.tsx";

/* ---- Drawer ---- */
export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerBody,
  DrawerFooter,
} from "./_app/ds/Drawer.tsx";

/* ---- Popover ---- */
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  usePopover,
} from "./_app/ds/Popover.tsx";

/* ---- DropdownMenu ---- */
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./_app/ds/DropdownMenu.tsx";

/* ---- ContextMenu ---- */
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
} from "./_app/ds/ContextMenu.tsx";

/* ---- Form ---- */
export {
  Form,
  FormStep,
  FormRow,
  FormField,
  FormDivider,
  FormActions,
} from "./_app/ds/Form.tsx";

/* ---- Field ---- */
export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
} from "./_app/ds/Field.tsx";

/* ---- EmptyState ---- */
export {
  EmptyState,
  EmptyGlyph,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from "./_app/ds/EmptyState.tsx";

/* ---- Skeleton ---- */
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "./_app/ds/Skeleton.tsx";

/* ---- Stepper ---- */
export { Stepper, Step } from "./_app/ds/Stepper.tsx";

/* ---- Table ---- */
export {
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeader,
  TableCell,
} from "./_app/ds/Table.tsx";

/* ---- Alert ---- */
export {
  Alert,
  AlertMark,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
} from "./_app/ds/Alert.tsx";

/* ---- Toast / Toaster ---- */
export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastActions,
} from "./_app/ds/Toast.tsx";
export { Toaster, useToast } from "./_app/ds/Toaster.tsx";

/* ---- Dropzone ---- */
export {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneHint,
  DropzoneFile,
  DropzoneFilename,
  DropzoneMeta,
  DropzoneActions,
} from "./_app/ds/Dropzone.tsx";

/* ---- KBD / InlineCode ---- */
export { KBD, KbdCombo, InlineCode } from "./_app/ds/KBD.tsx";

/* ---- TagInput ---- */
export { TagInput, Tag } from "./_app/ds/TagInput.tsx";

/* ---- Combobox ---- */
export { Combobox } from "./_app/ds/Combobox.tsx";

/* ---- RangeSlider ---- */
export { RangeSlider } from "./_app/ds/RangeSlider.tsx";

/* ---- TreeView ---- */
export { TreeView } from "./_app/ds/TreeView.tsx";

/* ---- VirtualList ---- */
export { VirtualList } from "./_app/ds/VirtualList.tsx";

/* ---- Pagination (i18n-shimmed) ---- */
export {
  Pagination,
  PaginationRoot,
  PaginationItem,
  PaginationEllipsis,
  PaginationPrev,
  PaginationNext,
  getPaginationRange,
} from "./_app/ds/Pagination.tsx";

/* ---- Breadcrumbs (i18n-shimmed) ---- */
export {
  Breadcrumbs,
  BreadcrumbsRoot,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbSeparator,
} from "./_app/ds/Breadcrumbs.tsx";

/* ---- Calendar / DatePicker (i18n-shimmed) ---- */
export { Calendar } from "./_app/ds/Calendar.tsx";
export {
  DatePicker,
  DateRangePicker,
} from "./_app/ds/DatePicker.tsx";

/* ---- Carousel (i18n-shimmed) ---- */
export { Carousel, CarouselSlide } from "./_app/ds/Carousel.tsx";

/* ---- Timeline (i18n-shimmed) ---- */
export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  TimelineDate,
  TimelineTitle,
  TimelineNow,
} from "./_app/ds/Timeline.tsx";

/* ---- Shortcuts (i18n-shimmed) ---- */
export {
  ShortcutsProvider,
  useShortcut,
  useShortcutsContext,
  ShortcutCombo,
} from "./_app/ds/Shortcuts.tsx";

/* ---- Resizable (i18n-shimmed) ---- */
export {
  ResizablePanel,
  ResizablePanels,
} from "./_app/ds/ResizablePanels.tsx";
export { ResizableJunction } from "./_app/ds/ResizableJunction.tsx";

/* ---- DragDrop (i18n-shimmed) ---- */
export {
  Sortable,
  DragDropProvider,
  DragSource,
  DropZone,
  DragGhost,
} from "./_app/ds/DragDrop.tsx";

/* ---- AvatarPicker ---- */
export { AvatarPicker } from "./_app/ds/AvatarPicker.tsx";

/* ---- ColorPicker ---- */
export { ColorPicker } from "./_app/ds/ColorPicker.tsx";

/* ---- MarkdownViewer ---- */
export { MarkdownViewer } from "./_app/ds/MarkdownViewer.tsx";

/* ---- DataTable ---- */
export {
  DataTable,
  DataTableToolbar,
  DataTableHeader,
  DataTableFilters,
  DataTableBody,
  DataTableEmpty,
  DataTablePagination,
  useDataTable,
} from "./_app/ds/DataTable.tsx";

/* ---- Chart family ---- */
export {
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
} from "./_app/ds/Chart.tsx";

/* ---- Motion ---- */
export {
  Transition,
  Fade,
  Slide,
  Scale,
  Collapse,
  ScrollReveal,
} from "./_app/ds/Motion.tsx";

/* ---- Disclosure & navigation (phase 15.1) ---- */
export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "./_app/ds/Accordion.tsx";
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./_app/ds/HoverCard.tsx";
export { Banner, BannerMessage, BannerAction } from "./_app/ds/Banner.tsx";
export {
  SegmentedControl,
  SegmentedControlItem,
} from "./_app/ds/SegmentedControl.tsx";
export { DescriptionList, DescriptionRow } from "./_app/ds/DescriptionList.tsx";
export { Mark, Highlight } from "./_app/ds/Mark.tsx";

/* ---- Advanced inputs (phase 15.2) ---- */
export { NumberInput } from "./_app/ds/NumberInput.tsx";
export { PinInput } from "./_app/ds/PinInput.tsx";
export { PasswordInput } from "./_app/ds/PasswordInput.tsx";
export {
  PhoneInput,
  phoneToE164,
  DEFAULT_COUNTRIES,
} from "./_app/ds/PhoneInput.tsx";
export type { PhoneCountryId, PhoneCountry } from "./_app/ds/PhoneInput.tsx";
export {
  TimePicker,
  parseTime,
  formatTime,
} from "./_app/ds/TimePicker.tsx";
export { EditableText } from "./_app/ds/EditableText.tsx";
export { MentionInput } from "./_app/ds/MentionInput.tsx";
export type { MentionOption } from "./_app/ds/MentionInput.tsx";

/* ---- Advanced data display (phase 15.3) ---- */
export {
  Stat,
  StatKicker,
  StatLabel,
  StatValue,
  StatDelta,
  StatSpark,
} from "./_app/ds/Stat.tsx";
export type { StatDeltaTrend } from "./_app/ds/Stat.tsx";
export {
  PricingTable,
  PricingTableHead,
  PricingTableBody,
  PricingTableRow,
  PricingTableTh,
  PricingTableTd,
} from "./_app/ds/PricingTable.tsx";
export type { PricingTableThProps, PricingTableTdProps } from "./_app/ds/PricingTable.tsx";
export { DiffViewer, diffLines } from "./_app/ds/DiffViewer.tsx";
export type { DiffLine, DiffLineType } from "./_app/ds/DiffViewer.tsx";
export { Lightbox } from "./_app/ds/Lightbox.tsx";
export { CircularProgress } from "./_app/ds/CircularProgress.tsx";

/* ---- App shell (phase 15.4) ---- */
export {
  NotificationBell,
  InboxPanel,
  InboxHeader,
  InboxItem,
  InboxFooter,
} from "./_app/ds/NotificationInbox.tsx";
export { CommentThread, Comment } from "./_app/ds/CommentThread.tsx";
export { Snackbar } from "./_app/ds/Snackbar.tsx";
export {
  FileUploadQueue,
  FileUploadQueueItemRow,
} from "./_app/ds/FileUploadQueue.tsx";
export type { FileUploadQueueItem } from "./_app/ds/types.ts";

/* ---- Provider for i18n + theme (shims) ---- */
export {
  AtelierProvider,
  LocaleProvider,
  useT,
  useLocale,
} from "./shims/i18n.tsx";
export { ThemeProvider, useTheme, THEME_LIST } from "./shims/theme.tsx";
