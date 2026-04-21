import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Collapse } from "./Motion.tsx";

/* ================================================================
   Accordion + Collapsible (Fase 15.1)
   ----------------------------------------------------------------
   Accordion anima painéis com <Collapse> (Motion · fase 4).

     <Accordion type="single" defaultValue="a" collapsible>
       <AccordionItem value="a">
         <AccordionHeader>
           <AccordionTrigger>Primeiro</AccordionTrigger>
         </AccordionHeader>
         <AccordionContent>…</AccordionContent>
       </AccordionItem>
     </Accordion>

   Collapsible — padrão Disclosure (um bloco):

     <Collapsible defaultOpen>
       <CollapsibleTrigger>Detalhes</CollapsibleTrigger>
       <CollapsibleContent>…</CollapsibleContent>
     </Collapsible>
   ================================================================ */

export type AccordionType = "single" | "multiple";

function toSet(type: AccordionType, v: string | string[] | null | undefined): Set<string> {
  if (v == null || v === "") return new Set();
  if (type === "single") return typeof v === "string" ? new Set([v]) : new Set();
  if (Array.isArray(v)) return new Set(v);
  if (typeof v === "string") return new Set([v]);
  return new Set();
}

interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  openSet: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion(name: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`[Atelier] <${name}> must be inside <Accordion>.`);
  return ctx;
}

export interface AccordionProps {
  type?: AccordionType;
  collapsible?: boolean;
  value?: string | string[] | null;
  onValueChange?: (next: string | string[] | null) => void;
  defaultValue?: string | string[] | null;
  className?: string;
  children?: ReactNode;
}

export function Accordion({
  type = "single",
  collapsible = true,
  value: valueProp,
  onValueChange,
  defaultValue = null,
  className = "",
  children,
}: AccordionProps) {
  const controlled = valueProp !== undefined;
  const [internalSet, setInternalSet] = useState<Set<string>>(() =>
    toSet(type, defaultValue ?? null)
  );

  const openSet = useMemo(() => {
    if (!controlled) return internalSet;
    return toSet(type, valueProp as string | string[] | null);
  }, [controlled, internalSet, type, valueProp]);

  const toggle = useCallback(
    (id: string) => {
      let next = new Set(openSet);
      if (type === "single") {
        if (next.has(id)) {
          if (collapsible) next.clear();
        } else {
          next = new Set([id]);
        }
      } else if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      if (controlled) {
        if (type === "single") {
          const first = [...next][0];
          if (collapsible) onValueChange?.(first ?? null);
          else onValueChange?.(first ?? id);
        } else {
          onValueChange?.([...next]);
        }
      } else {
        setInternalSet(next);
      }
    },
    [collapsible, controlled, onValueChange, openSet, type]
  );

  const ctx = useMemo<AccordionContextValue>(
    () => ({ type, collapsible, openSet, toggle }),
    [type, collapsible, openSet, toggle]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={`ds-accordion ${className}`.trim()}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextValue {
  value: string;
  triggerId: string;
  panelId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItem(name: string): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error(`[Atelier] <${name}> must be inside <AccordionItem>.`);
  return ctx;
}

export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: ReactNode;
}

export function AccordionItem({ value, className = "", children }: AccordionItemProps) {
  const uid = useId().replace(/:/g, "");
  const item = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      triggerId: `acc-t-${value}-${uid}`,
      panelId: `acc-p-${value}-${uid}`,
    }),
    [uid, value]
  );
  return (
    <AccordionItemContext.Provider value={item}>
      <div className={`ds-accordion-item ${className}`.trim()}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionHeader({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`ds-accordion-header ${className}`.trim()}>{children}</div>;
}

export interface AccordionTriggerProps {
  children?: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className = "" }: AccordionTriggerProps) {
  const { value, triggerId, panelId } = useAccordionItem("AccordionTrigger");
  const acc = useAccordion("AccordionTrigger");
  const open = acc.openSet.has(value);
  return (
    <button
      type="button"
      id={triggerId}
      className={`ds-accordion-trigger ${open ? "is-open" : ""} ${className}`.trim()}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => acc.toggle(value)}
    >
      <span className="ds-accordion-trigger-label">{children}</span>
      <span className="ds-accordion-trigger-chevron" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" focusable="false">
          <path
            d="M2 4.5 6 8.5 10 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      </span>
    </button>
  );
}

export interface AccordionContentProps {
  children?: ReactNode;
  className?: string;
  duration?: number;
}

export function AccordionContent({ children, className = "", duration = 220 }: AccordionContentProps) {
  const { value, triggerId, panelId } = useAccordionItem("AccordionContent");
  const acc = useAccordion("AccordionContent");
  const open = acc.openSet.has(value);
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      className={`ds-accordion-panel-outer ${className}`.trim()}
    >
      <Collapse open={open} duration={duration}>
        <div className="ds-accordion-panel">{children}</div>
      </Collapse>
    </div>
  );
}

/* ---------------- Collapsible (Disclosure) ---------------- */

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  contentId: string;
  triggerId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsible(name: string): CollapsibleContextValue {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error(`[Atelier] <${name}> must be inside <Collapsible>.`);
  return ctx;
}

export interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Collapsible({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  className = "",
  children,
}: CollapsibleProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? !!openProp : internal;
  const uid = useId().replace(/:/g, "");
  const triggerId = `col-t-${uid}`;
  const contentId = `col-c-${uid}`;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInternal(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange]
  );

  const ctx = useMemo<CollapsibleContextValue>(
    () => ({ open, setOpen, contentId, triggerId }),
    [open, setOpen, contentId, triggerId]
  );

  return (
    <CollapsibleContext.Provider value={ctx}>
      <div className={`ds-collapsible ${className}`.trim()}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

export interface CollapsibleTriggerProps {
  children?: ReactNode;
  className?: string;
}

export function CollapsibleTrigger({ children, className = "" }: CollapsibleTriggerProps) {
  const { open, setOpen, contentId, triggerId } = useCollapsible("CollapsibleTrigger");
  return (
    <button
      type="button"
      id={triggerId}
      className={`ds-collapsible-trigger ${open ? "is-open" : ""} ${className}`.trim()}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={() => setOpen(!open)}
    >
      <span className="ds-collapsible-trigger-label">{children}</span>
      <span className="ds-collapsible-trigger-chevron" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" focusable="false">
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </span>
    </button>
  );
}

export interface CollapsibleContentProps {
  children?: ReactNode;
  className?: string;
  duration?: number;
}

export function CollapsibleContent({ children, className = "", duration = 220 }: CollapsibleContentProps) {
  const { open, contentId, triggerId } = useCollapsible("CollapsibleContent");
  return (
    <div id={contentId} role="region" aria-labelledby={triggerId} className={`ds-collapsible-panel-outer ${className}`.trim()}>
      <Collapse open={open} duration={duration}>
        <div className="ds-collapsible-panel">{children}</div>
      </Collapse>
    </div>
  );
}

/** Alias semântico: mesmo componente que Collapsible. */
export const Disclosure = Collapsible;
export const DisclosureTrigger = CollapsibleTrigger;
export const DisclosureContent = CollapsibleContent;
