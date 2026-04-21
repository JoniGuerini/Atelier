import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ================================================================
   MentionInput — @com autocomplete simples (Fase 15.2)
   ----------------------------------------------------------------
   Textarea controlada. Ao digitar @palavra, abre painel com
   sugestões filtradas; seleção insere @label + espaço.
   Posicionamento fixo abaixo do campo (viewport).
   ================================================================ */

export interface MentionOption {
  id: string;
  label: string;
}

export interface MentionInputProps {
  value: string;
  onChange: (next: string) => void;
  suggestions: MentionOption[];
  disabled?: boolean;
  className?: string;
  rows?: number;
  placeholder?: string;
}

export function MentionInput({
  value,
  onChange,
  suggestions,
  disabled = false,
  className = "",
  rows = 3,
  placeholder,
}: MentionInputProps) {
  const uid = useId();
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [caret, setCaret] = useState(0);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return suggestions.slice(0, 8);
    return suggestions.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, suggestions]);

  const detectMention = useCallback((text: string, pos: number) => {
    const before = text.slice(0, pos);
    const at = before.lastIndexOf("@");
    if (at < 0) return null;
    const prev = at > 0 ? before[at - 1] : " ";
    if (prev !== " " && prev !== "\n" && prev !== "\t") return null;
    const token = before.slice(at + 1);
    if (/\s/.test(token)) return null;
    return { at, token };
  }, []);

  const updatePanel = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPanelPos({ top: r.bottom + 6, left: r.left, width: r.width });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePanel();
    const onScroll = () => updatePanel();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePanel]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (taRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const onInput = (text: string, pos: number) => {
    onChange(text);
    setCaret(pos);
    const m = detectMention(text, pos);
    if (m) {
      setQuery(m.token);
      setOpen(true);
      setActive(0);
      updatePanel();
    } else {
      setOpen(false);
      setQuery("");
    }
  };

  const insert = (opt: MentionOption) => {
    const text = value;
    const m = detectMention(text, caret);
    if (!m) {
      setOpen(false);
      return;
    }
    const before = text.slice(0, m.at);
    const after = text.slice(caret);
    const insertText = `@${opt.label} `;
    const next = before + insertText + after;
    const newPos = before.length + insertText.length;
    onChange(next);
    setOpen(false);
    setQuery("");
    requestAnimationFrame(() => {
      const el = taRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(newPos, newPos);
      setCaret(newPos);
    });
  };

  return (
    <div className={`ds-mention-input ${className}`.trim()}>
      <textarea
        ref={taRef}
        id={uid}
        className="ds-textarea ds-mention-textarea"
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInput(e.target.value, e.target.selectionStart ?? value.length)}
        onSelect={(e) => setCaret((e.target as HTMLTextAreaElement).selectionStart ?? 0)}
        onKeyDown={(e) => {
          if (!open || filtered.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % filtered.length);
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + filtered.length) % filtered.length);
          }
          if (e.key === "Enter" && open) {
            e.preventDefault();
            insert(filtered[active]);
          }
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && panelPos && filtered.length > 0 && (
        <div
          ref={panelRef}
          className="ds-mention-panel"
          style={{
            position: "fixed",
            top: panelPos.top,
            left: panelPos.left,
            width: panelPos.width,
            zIndex: "var(--z-popover)",
          }}
          role="listbox"
        >
          {filtered.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={i === active}
              className={`ds-mention-option ${i === active ? "is-active" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insert(opt)}
            >
              @{opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
