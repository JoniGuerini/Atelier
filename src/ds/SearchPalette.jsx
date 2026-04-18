import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "../lib/i18n.jsx";
import { buildSearchIndex, searchIndex } from "../lib/searchIndex.js";

/* ================================================================
   SearchPalette — command palette ⌘K.
   ----------------------------------------------------------------
   <SearchPalette open={open} onClose={...} onNavigate={...} />

   Controlado pelo App. O atalho ⌘/Ctrl + K é exposto via
   useSearchHotkey(onOpen). O trigger visual usa <SearchTrigger />.
   ================================================================ */

export function SearchPalette({ open, onClose, onNavigate }) {
  const { t, locale } = useT();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Constrói o índice (depende do locale para resolver labels)
  const allItems = useMemo(() => buildSearchIndex(t), [t, locale]);
  const results = useMemo(
    () => searchIndex(allItems, query),
    [allItems, query]
  );

  // Reset state ao abrir
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Pequeno delay pra garantir que o input está montado
      const timer = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Reset active quando os resultados mudam
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Auto-scroll do item ativo
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(".search-result.active");
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  // Teclas globais quando aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const pick = results[active];
        if (pick) {
          e.preventDefault();
          onNavigate(pick.route);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, onNavigate]);

  if (!open) return null;

  return (
    <div
      className="search-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title")}
    >
      <div className="search-palette">
        <div className="search-input-row">
          <span className="search-input-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="search-input-kbd" aria-hidden="true">
            esc
          </kbd>
        </div>

        <div className="search-results" ref={listRef}>
          {results.length === 0 ? (
            <div className="search-empty">
              <span>{t("search.empty")}</span>
              <span className="search-empty-q">"{query}"</span>
            </div>
          ) : (
            <GroupedResults
              results={results}
              active={active}
              setActive={setActive}
              onPick={(item) => {
                onNavigate(item.route);
                onClose();
              }}
              groupLabels={{
                page: t("search.groups.pages"),
                component: t("search.groups.components"),
                token: t("search.groups.tokens"),
              }}
            />
          )}
        </div>

        <div className="search-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {t("search.foot.navigate")}
          </span>
          <span>
            <kbd>↵</kbd> {t("search.foot.select")}
          </span>
          <span>
            <kbd>esc</kbd> {t("search.foot.close")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Agrupa por type, mantendo a ordem original (que já vem com score). */
function GroupedResults({ results, active, setActive, onPick, groupLabels }) {
  // mantém ordem por type encontrado
  const groups = [];
  const seen = new Map();
  results.forEach((r) => {
    if (!seen.has(r.type)) {
      seen.set(r.type, []);
      groups.push({ type: r.type, items: seen.get(r.type) });
    }
    seen.get(r.type).push(r);
  });

  let cursor = 0;
  return (
    <>
      {groups.map((g) => (
        <div className="search-group" key={g.type}>
          <div className="search-group-label">
            {groupLabels[g.type] || g.type}
          </div>
          {g.items.map((it) => {
            const idx = cursor++;
            return (
              <ResultRow
                key={it.id}
                item={it}
                isActive={idx === active}
                onMouseEnter={() => setActive(idx)}
                onClick={() => onPick(it)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function ResultRow({ item, isActive, onMouseEnter, onClick }) {
  return (
    <button
      type="button"
      className={`search-result ${isActive ? "active" : ""}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {item.type === "token" && (
        <span
          className="search-result-swatch"
          aria-hidden="true"
          style={{ background: `var(${item.label})` }}
        />
      )}
      {item.type === "page" && item.n && (
        <span className="search-result-n" aria-hidden="true">
          {item.n}
        </span>
      )}
      <span className="search-result-label">{item.label}</span>
      <span className="search-result-meta">
        {item.sub || item.group}
      </span>
    </button>
  );
}

/* ================================================================
   SearchTrigger — botão visual que abre a palette. Mostra a
   sinalização visual do atalho ⌘K para descoberta.
   ================================================================ */

export function SearchTrigger({ onClick, compact = false }) {
  const { t } = useT();
  return (
    <button
      type="button"
      className={`search-trigger ${compact ? "compact" : ""}`}
      onClick={onClick}
      aria-label={t("search.trigger")}
      title={t("search.trigger")}
    >
      <span className="search-trigger-icon" aria-hidden="true">
        ⌕
      </span>
      {!compact && (
        <span className="search-trigger-label">
          {t("search.trigger")}
        </span>
      )}
      <kbd className="search-trigger-kbd" aria-hidden="true">
        ⌘K
      </kbd>
    </button>
  );
}

/* ================================================================
   useSearchHotkey — registra ⌘/Ctrl + K globalmente.
   ================================================================ */

export function useSearchHotkey(onOpen) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
        if (e.key === "k" || e.key === "K") {
          e.preventDefault();
          onOpen();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}
