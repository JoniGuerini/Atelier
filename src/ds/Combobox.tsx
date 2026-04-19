import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ================================================================
   Combobox — Select com busca em tempo real.
   ----------------------------------------------------------------
   Modo single (default):
     <Combobox
       options={[{ value: "br", label: "Brazil" }, ...]}
       value={value}
       onChange={setValue}
       placeholder="Pick a country"
     />

   Modo multi:
     <Combobox multi options={...} value={values} onChange={setValues} />
     value e onChange viram array.

   Items customizados:
     <Combobox
       options={items}
       getOptionValue={(item) => item.id}
       getOptionLabel={(item) => item.name}
       renderOption={(item) => <Avatar … />}
     />

   Behavior:
     · Type-to-filter (case + accent insensitive)
     · ↑ ↓ navega, Enter seleciona, Esc fecha, Tab confirma + fecha
     · Empty state quando filtro não retorna nada
     · Clear button quando há valor (single) ou items (multi)
     · Multi: chips com × dentro do input + Backspace remove o último
================================================================ */

export type ComboboxOption = {
  value: string;
  label: string;
  /** Categoria/grupo opcional pra renderizar separadores. */
  group?: string;
  /** Glifo opcional à esquerda do label. */
  glyph?: ReactNode;
  /** Desabilitado — não selecionável. */
  disabled?: boolean;
};

export interface ComboboxPropsCommon<T = ComboboxOption> {
  options: T[];
  /** Placeholder do input quando vazio. */
  placeholder?: string;
  /** Mensagem quando nada bate com o filtro. Default: i18n ou "No results". */
  emptyMessage?: ReactNode;
  /** Disabled total. */
  disabled?: boolean;
  /** Custom: como extrair o valor único. Default: option.value */
  getOptionValue?: (opt: T) => string;
  /** Custom: como extrair o label. Default: option.label */
  getOptionLabel?: (opt: T) => string;
  /** Custom: como renderizar a row da opção. Default: glifo + label */
  renderOption?: (opt: T, isActive: boolean) => ReactNode;
  /** Largura do input. Default: "100%" do container. */
  width?: number | string;
  /** ID do field (associa com Field wrapper). */
  id?: string;
  /** Classe CSS extra. */
  className?: string;
  /** Permite criar valores novos digitados pelo usuário. Quando o
      query não bate exatamente com nenhuma opção, o painel mostra
      uma "creation row" no topo. Enter ou click cria. Em multi,
      adiciona à lista; em single, vira o valor único. */
  creatable?: boolean;
  /** Função opcional pra construir o label da creation row.
      Default: t("ds.combobox.create") + " ‘query’" */
  createLabel?: (query: string) => ReactNode;
}

export interface ComboboxSingleProps<T = ComboboxOption>
  extends ComboboxPropsCommon<T> {
  multi?: false;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export interface ComboboxMultiProps<T = ComboboxOption>
  extends ComboboxPropsCommon<T> {
  multi: true;
  value?: string[];
  onChange?: (values: string[]) => void;
}

export type ComboboxProps<T = ComboboxOption> =
  | ComboboxSingleProps<T>
  | ComboboxMultiProps<T>;

/* ----------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */
function normalize(s: string): string {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const defaultGetValue = (o: ComboboxOption) => o.value;
const defaultGetLabel = (o: ComboboxOption) => o.label;

function defaultRenderOption(opt: ComboboxOption) {
  return (
    <>
      {opt.glyph != null && (
        <span className="ds-combo-opt-glyph" aria-hidden="true">
          {opt.glyph}
        </span>
      )}
      <span className="ds-combo-opt-label">{opt.label}</span>
    </>
  );
}

/* ----------------------------------------------------------------
   Combobox — implementação principal
---------------------------------------------------------------- */
export function Combobox<T extends ComboboxOption = ComboboxOption>(
  props: ComboboxProps<T>,
) {
  const {
    options,
    placeholder,
    emptyMessage,
    disabled = false,
    getOptionValue = defaultGetValue as (opt: T) => string,
    getOptionLabel = defaultGetLabel as (opt: T) => string,
    renderOption,
    width = "100%",
    id,
    className = "",
    creatable = false,
    createLabel,
  } = props;

  const isMulti = props.multi === true;
  const value = props.value;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const listboxId = useId();

  // Mapa por valor pra lookup rápido
  const byValue = useMemo(() => {
    const m = new Map<string, T>();
    options.forEach((o) => m.set(getOptionValue(o), o));
    return m;
  }, [options, getOptionValue]);

  // Lista filtrada pelo query
  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = normalize(query);
    return options.filter((o) => normalize(getOptionLabel(o)).includes(q));
  }, [options, query, getOptionLabel]);

  // creatable: detectar se podemos oferecer criação
  // Mostra a creation row quando:
  //   1. creatable está ligado
  //   2. query tem conteúdo (depois de trim)
  //   3. nenhum option existente bate exatamente (case-insensitive)
  //   4. em multi: o valor ainda não está nos selecionados
  const trimmedQuery = query.trim();
  const canCreate = useMemo(() => {
    if (!creatable || !trimmedQuery) return false;
    const qNorm = normalize(trimmedQuery);
    const exact = options.find(
      (o) => normalize(getOptionLabel(o)) === qNorm,
    );
    if (exact) return false;
    if (isMulti) {
      const curr = (value as string[]) ?? [];
      if (curr.some((v) => normalize(v) === qNorm)) return false;
    } else {
      if (typeof value === "string" && normalize(value) === qNorm) return false;
    }
    return true;
  }, [creatable, trimmedQuery, options, getOptionLabel, isMulti, value]);

  // Total de itens "selecionáveis" no painel (criação conta como item 0)
  const totalItems = filtered.length + (canCreate ? 1 : 0);
  // Index real do item ativo:
  //   - se canCreate, índice 0 = creation row, 1+ = filtered[i-1]
  //   - se !canCreate, índice i = filtered[i]
  const creationIndex = canCreate ? 0 : -1;
  const filteredOffset = canCreate ? 1 : 0;

  // Reset active quando filtra
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Fechar ao clicar fora
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const id = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // Auto-scroll do item ativo
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      ".ds-combo-opt.active",
    );
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  /* ---------- seleção ---------- */
  const selectOne = (opt: T) => {
    const v = getOptionValue(opt);
    if (isMulti) {
      const curr = (value as string[]) ?? [];
      const next = curr.includes(v)
        ? curr.filter((x) => x !== v)
        : [...curr, v];
      (props as ComboboxMultiProps<T>).onChange?.(next);
      setQuery("");
      // Em multi, mantém aberto pra continuar selecionando
      inputRef.current?.focus();
    } else {
      (props as ComboboxSingleProps<T>).onChange?.(v);
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const removeMulti = (val: string) => {
    if (!isMulti) return;
    const curr = (value as string[]) ?? [];
    (props as ComboboxMultiProps<T>).onChange?.(curr.filter((x) => x !== val));
    inputRef.current?.focus();
  };

  const clearAll = () => {
    if (isMulti) {
      (props as ComboboxMultiProps<T>).onChange?.([]);
    } else {
      (props as ComboboxSingleProps<T>).onChange?.(null);
    }
    setQuery("");
    inputRef.current?.focus();
  };

  /** Cria um novo valor (livre, não vindo do array `options`).
      Em multi, adiciona à lista; em single, vira o valor único. */
  const createNew = () => {
    const v = trimmedQuery;
    if (!v) return;
    if (isMulti) {
      const curr = (value as string[]) ?? [];
      if (!curr.includes(v)) {
        (props as ComboboxMultiProps<T>).onChange?.([...curr, v]);
      }
      setQuery("");
      inputRef.current?.focus();
    } else {
      (props as ComboboxSingleProps<T>).onChange?.(v);
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(totalItems - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      setActiveIndex(totalItems - 1);
    } else if (e.key === "Enter") {
      if (open) {
        e.preventDefault();
        if (canCreate && activeIndex === creationIndex) {
          createNew();
        } else {
          const opt = filtered[activeIndex - filteredOffset];
          if (opt && !opt.disabled) selectOne(opt);
        }
      } else {
        e.preventDefault();
        setOpen(true);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setQuery("");
      }
    } else if (e.key === "Tab") {
      // Tab só fecha (não seleciona) — confirmar é Enter
      if (open) setOpen(false);
    } else if (e.key === "Backspace" && isMulti && !query) {
      // Remove último chip se input está vazio
      const curr = (value as string[]) ?? [];
      if (curr.length > 0) {
        e.preventDefault();
        removeMulti(curr[curr.length - 1]);
      }
    }
  };

  /* ---------- render ---------- */
  // Em creatable, o value pode conter strings que não estão em options
  // (criadas livremente). Pra esses casos, materializamos um option
  // sintético usando o próprio valor como label.
  const resolveValue = (v: string): T => {
    const found = byValue.get(v);
    if (found) return found;
    return { value: v, label: v } as unknown as T;
  };

  const selectedSingle = !isMulti
    ? value
      ? resolveValue(value as string)
      : null
    : null;
  const selectedMulti = isMulti
    ? ((value as string[]) ?? []).map(resolveValue)
    : [];

  const hasValue = isMulti
    ? selectedMulti.length > 0
    : Boolean(selectedSingle);

  // Em single, mostra o label do selecionado como placeholder visual
  // quando o input está fechado e sem query.
  const showSingleLabel =
    !isMulti && selectedSingle && !query && !open;

  const cls = ["ds-combo"];
  if (open) cls.push("open");
  if (disabled) cls.push("disabled");
  if (className) cls.push(className);

  return (
    <div ref={wrapperRef} className={cls.join(" ")} style={{ width }}>
      <div
        className="ds-combo-input-wrap"
        onClick={() => {
          if (disabled) return;
          inputRef.current?.focus();
          setOpen(true);
        }}
      >
        {isMulti && selectedMulti.length > 0 && (
          <div className="ds-combo-chips">
            {selectedMulti.map((opt) => (
              <span key={getOptionValue(opt)} className="ds-combo-chip">
                <span>{getOptionLabel(opt)}</span>
                <button
                  type="button"
                  aria-label={`Remove ${getOptionLabel(opt)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMulti(getOptionValue(opt));
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[activeIndex]
              ? `${listboxId}-${activeIndex}`
              : undefined
          }
          className="ds-combo-input"
          value={
            showSingleLabel
              ? getOptionLabel(selectedSingle as T)
              : query
          }
          placeholder={
            isMulti && selectedMulti.length > 0 ? "" : placeholder
          }
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
        {hasValue && !disabled && (
          <button
            type="button"
            className="ds-combo-clear"
            aria-label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              clearAll();
            }}
          >
            ×
          </button>
        )}
        <span className="ds-combo-chev" aria-hidden="true">
          ▾
        </span>
      </div>

      {open && !disabled && (
        <div className="ds-combo-panel">
          {filtered.length === 0 && !canCreate ? (
            <div className="ds-combo-empty">
              {emptyMessage ?? "No results"}
              {query && (
                <span className="ds-combo-empty-q"> · "{query}"</span>
              )}
            </div>
          ) : (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              className="ds-combo-list"
              aria-multiselectable={isMulti || undefined}
            >
              {/* Creation row — primeiro item quando `creatable` está
                  ativo e o query não bate com nenhuma opção existente. */}
              {canCreate && (
                <li role="presentation">
                  <ul role="presentation">
                    <li
                      id={`${listboxId}-${creationIndex}`}
                      role="option"
                      aria-selected={false}
                      className={`ds-combo-opt creation ${
                        activeIndex === creationIndex ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(creationIndex)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        createNew();
                      }}
                    >
                      <span
                        className="ds-combo-opt-glyph"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span className="ds-combo-opt-label">
                        {createLabel ? (
                          createLabel(trimmedQuery)
                        ) : (
                          <>
                            Criar <em>"{trimmedQuery}"</em>
                          </>
                        )}
                      </span>
                    </li>
                  </ul>
                </li>
              )}
              {(() => {
                /* Agrupa por `group` se houver. */
                const groups: { group: string | null; items: T[] }[] = [];
                const seen = new Map<string | null, T[]>();
                filtered.forEach((o) => {
                  const g = o.group ?? null;
                  if (!seen.has(g)) {
                    seen.set(g, []);
                    groups.push({ group: g, items: seen.get(g)! });
                  }
                  seen.get(g)!.push(o);
                });

                let cursor = filteredOffset;
                return groups.map((g, gi) => (
                  <li key={`g-${gi}`} role="presentation">
                    {g.group && (
                      <div className="ds-combo-group-label">{g.group}</div>
                    )}
                    <ul role="presentation">
                      {g.items.map((opt) => {
                        const idx = cursor++;
                        const v = getOptionValue(opt);
                        const isSelected = isMulti
                          ? ((value as string[]) ?? []).includes(v)
                          : value === v;
                        const isActive = idx === activeIndex;
                        const cls = ["ds-combo-opt"];
                        if (isActive) cls.push("active");
                        if (isSelected) cls.push("selected");
                        if (opt.disabled) cls.push("disabled");
                        return (
                          <li
                            key={v}
                            id={`${listboxId}-${idx}`}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={opt.disabled || undefined}
                            className={cls.join(" ")}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (!opt.disabled) selectOne(opt);
                            }}
                          >
                            {(renderOption ?? defaultRenderOption)(opt, isActive)}
                            {isMulti && isSelected && (
                              <span
                                className="ds-combo-opt-mark"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ));
              })()}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
