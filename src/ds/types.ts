/* ================================================================
   Atelier — Public types
   ----------------------------------------------------------------
   All public types exported by the design system. Consumers can
   import from "./ds/types" to get the full surface area:

     import type { ButtonVariant, AlertProps, ChartData } from "./ds/types";

   Types are organized by family. Each component file re-uses the
   types defined here so there's a single source of truth.
   ================================================================ */

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  CSSProperties,
} from "react";

/* ----------------- App-level ----------------- */
export type Locale = "pt-BR" | "en";
export type Theme = "light" | "dark";
export type NavMode = "sidebar" | "navbar";

/* ----------------- Button ----------------- */
export type ButtonVariant = "default" | "primary" | "accent" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

/* ----------------- Field / Input ----------------- */
export interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children?: ReactNode;
  className?: string;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/* ----------------- Controls ----------------- */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}
export interface SwitchProps {
  label?: ReactNode;
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/* ----------------- Badge ----------------- */
export type BadgeVariant =
  | "default"
  | "solid"
  | "accent"
  | "ok"
  | "warn"
  | "info"
  | "danger";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  children?: ReactNode;
}

/* ----------------- Avatar ----------------- */
export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "default" | "solid" | "accent";
export type AvatarShape = "square" | "circle";
export interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  className?: string;
}
export interface AvatarGroupProps {
  max?: number;
  children?: ReactNode;
}

/* ----------------- Alert ----------------- */
export type AlertVariant = "default" | "info" | "ok" | "warn" | "danger";
export interface AlertProps {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/* ----------------- Card ----------------- */
export interface CardProps {
  children?: ReactNode;
  className?: string;
}

/* ----------------- Tabs ----------------- */
export type TabsVariant =
  | "underline"
  | "enclosed"
  | "pills"
  | "segmented"
  | "minimal";
export type TabsOrientation = "horizontal" | "vertical";
export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
  className?: string;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
}
export interface TabProps {
  value: string;
  children?: ReactNode;
  glyph?: ReactNode;
  count?: number | string;
}
export interface TabPanelProps {
  value: string;
  children?: ReactNode;
}

/* ----------------- Table ----------------- */
export type TableAlign = "left" | "right" | "center";
export interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  width?: number | string;
  align?: TableAlign;
}
export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  mono?: boolean;
  align?: TableAlign;
}

/* ----------------- Charts ----------------- */
export type SimpleChartData = number[];
export type LabelledChartData = { label: string; value: number }[];
export type AxisChartData = { axis: string; value: number }[];
export type ChartData = SimpleChartData | LabelledChartData | AxisChartData;

export interface ChartCommonProps {
  height?: number;
  accentIndex?: number;
  valueLabel?: string;
  className?: string;
}
export interface BarChartProps extends ChartCommonProps {
  data: SimpleChartData | LabelledChartData;
  labels?: string[];
}
export interface LineChartProps extends ChartCommonProps {
  data: SimpleChartData | LabelledChartData;
  labels?: string[];
  filled?: boolean;
}
export interface AreaChartProps extends ChartCommonProps {
  data: SimpleChartData | LabelledChartData;
  labels?: string[];
}
export interface PieChartProps extends ChartCommonProps {
  data: LabelledChartData;
  size?: number;
}
export interface DonutChartProps extends PieChartProps {
  thickness?: number;
  centerLabel?: ReactNode;
}
export interface RadarChartProps extends ChartCommonProps {
  axes: string[];
  series: { name: string; values: number[] }[];
  size?: number;
}
export interface RadialChartProps extends ChartCommonProps {
  value: number;
  max?: number;
  size?: number;
  label?: ReactNode;
}
export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  filled?: boolean;
  className?: string;
}

/* ----------------- Overlays ----------------- */
export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}
export interface ModalProps extends DialogProps {
  /** Forma curta retrocompatível. */
  title?: ReactNode;
  foot?: ReactNode;
}
export interface TooltipProps {
  tip: ReactNode;
  children: ReactNode;
}

/* ----------------- Feedback ----------------- */
export interface ToastProps {
  visible?: boolean;
  message?: ReactNode;
  children?: ReactNode;
  className?: string;
}
export interface ProgressProps {
  value: number;
  label?: ReactNode;
  className?: string;
}

/* ----------------- Dropzone ----------------- */
export interface DropzoneProps {
  accept?: string;
  multiple?: boolean;
  onSelect?: (file: File) => void;
  children?: ReactNode;
  className?: string;
}
export interface DropzoneMetaItem {
  label: ReactNode;
  value: ReactNode;
}

/* ----------------- Pagination ----------------- */
export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  siblings?: number;
  boundaries?: number;
  showLabels?: boolean;
  className?: string;
}

/* ----------------- Breadcrumbs ----------------- */
export interface BreadcrumbsProps {
  items: ReactNode[];
  separator?: ReactNode;
  className?: string;
}
export interface BreadcrumbProps {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

/* ----------------- Skeleton ----------------- */
export type SkeletonVariant = "rect" | "circle";
export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  size?: number | string;
  pulse?: boolean;
  className?: string;
  style?: CSSProperties;
}
export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/* ----------------- Stepper ----------------- */
export type StepperOrientation = "horizontal" | "vertical";
export interface StepperProps {
  current?: number;
  orientation?: StepperOrientation;
  children?: ReactNode;
  className?: string;
}
export interface StepProps {
  n?: string;
  label?: ReactNode;
  description?: ReactNode;
}

/* ----------------- Form pattern ----------------- */
export interface FormRowProps {
  cols?: number;
  children?: ReactNode;
  className?: string;
}
export interface FormFieldProps extends FieldProps {}
export type FormActionsAlign = "start" | "end" | "between";
export interface FormActionsProps {
  align?: FormActionsAlign;
  children?: ReactNode;
  className?: string;
}

/* ----------------- Sidebar ----------------- */
export interface SidebarProps {
  collapsed?: boolean;
  children?: ReactNode;
  className?: string;
}
export interface SidebarNavItemProps {
  n?: string;
  active?: boolean;
  onClick?: () => void;
  isNew?: boolean;
  children?: ReactNode;
}

/* ----------------- Navbar ----------------- */
export interface NavbarProps {
  current: string;
  onNavigate: (route: string) => void;
  children?: ReactNode;
  /** Quando true, o navbar ocupa 100% do viewport (em vez de ficar
      limitado pelo --content-max). Útil em monitores grandes. */
  wide?: boolean;
}
export interface NavbarDropdownProps {
  label: ReactNode;
  cols?: 1 | 2 | 3;
  children?: ReactNode;
}
export interface NavbarDropdownItemProps {
  slug: string;
  n?: string;
  description?: ReactNode;
  isNew?: boolean;
  children?: ReactNode;
}

/* ----------------- Editorial primitives ----------------- */
export interface PageHeadProps {
  lead?: ReactNode;
  title?: ReactNode;
  metaLabel?: ReactNode;
  meta?: ReactNode;
  intro?: ReactNode;
}
export interface SectionProps {
  num?: ReactNode;
  title?: ReactNode;
  kicker?: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  className?: string;
}
export interface ExampleProps {
  caption?: ReactNode;
  tech?: ReactNode;
  code?: string;
  lang?: string;
  stack?: boolean;
  center?: boolean;
  children?: ReactNode;
}
export interface CodeProps {
  lang?: "jsx" | "css" | "shell" | "html" | "ts" | "tsx";
  copy?: boolean;
  children?: string;
}
export interface CompositionNode {
  name: string;
  description?: ReactNode;
  children?: CompositionNode[];
}
export interface CompositionTreeProps {
  root: string;
  nodes: CompositionNode[];
}
export interface CompositionSectionProps {
  num?: ReactNode;
  i18nPrefix: string;
  root: string;
  nodes: CompositionNode[];
}

/* ----------------- Popover ----------------- */
export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";
export type PopoverPlacement = `${PopoverSide}-${PopoverAlign}`;
export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children?: ReactNode;
}
export interface PopoverContentProps {
  children?: ReactNode;
  placement?: PopoverPlacement;
  offset?: number;
  arrow?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  minWidth?: number;
  className?: string;
  role?: string;
  ariaLabel?: string;
}

/* ----------------- DropdownMenu ----------------- */
export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children?: ReactNode;
}
export interface DropdownMenuItemProps {
  children?: ReactNode;
  onSelect?: () => void;
  glyph?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
}
export interface DropdownMenuCheckboxItemProps {
  children?: ReactNode;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  shortcut?: string;
  disabled?: boolean;
}

/* ----------------- ContextMenu ----------------- */
export interface ContextMenuItemProps {
  children?: ReactNode;
  onSelect?: () => void;
  glyph?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
}

/* ----------------- Combobox ----------------- */
export type ComboboxOption = {
  value: string;
  label: string;
  group?: string;
  glyph?: ReactNode;
  disabled?: boolean;
};

/* ----------------- RangeSlider ----------------- */
export type SliderValue = number | [number, number];
export type SliderOrientation = "horizontal" | "vertical";

/* ----------------- Drawer ----------------- */
export type DrawerSide = "top" | "right" | "bottom" | "left";
export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  side?: DrawerSide;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
}
export interface DrawerContentProps {
  children?: ReactNode;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

/* ----------------- Toaster ----------------- */
export type ToastVariant = "default" | "info" | "ok" | "warn" | "danger";
export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export interface ToastAction {
  label: string;
  onClick: () => void;
}
export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
  glyph?: ReactNode;
}
export interface ToasterProps {
  position?: ToasterPosition;
  defaultDuration?: number;
  limit?: number;
  children?: ReactNode;
}

/* ----------------- Tools (Search / Settings) ----------------- */
export interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}
export interface SearchTriggerProps {
  onClick: () => void;
  compact?: boolean;
  className?: string;
}
export type SettingsPlacement = "top-end" | "bottom-end";
export interface SettingsMenuProps {
  navMode?: NavMode;
  onToggleNavMode?: (mode: NavMode) => void;
  placement?: SettingsPlacement;
}
