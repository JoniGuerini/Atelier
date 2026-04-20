import { useMemo, useState } from "react";
import { PageHead, Section, Button } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import {
  TOKENS,
  TOKEN_CATEGORIES,
  serializeCss,
  serializeJson,
  serializeTs,
  downloadText,
  type TokenCategory,
  type TokenDef,
} from "../lib/tokens.ts";
import { useCopy } from "../lib/useCopy.ts";

/* ================================================================
   Tokens — página /tokens (Reference · 58, fase 7.3)
   ----------------------------------------------------------------
   Visualização única de todas as escalas do DS. Lê o inventory
   estático de src/lib/tokens.ts (zero introspecção do CSS) e
   renderiza por categoria editorial, com:
     - swatch/preview por tipo (color/dimension/duration/etc)
     - valores light vs dark side-by-side quando houver
     - filtro por categoria + busca textual
     - copy individual e export agregado nos 3 formatos
   ================================================================ */

type Filter = TokenCategory | "all";

export default function Tokens() {
  const { t, tr } = useT();
  const { copy, copied } = useCopy();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  /* ---- Filtragem ---- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOKENS.filter((tk) => {
      if (activeFilter !== "all" && tk.category !== activeFilter) return false;
      if (!q) return true;
      const haystack = (tk.name + " " + (tk.note ?? "") + " " + tk.light + " " + (tk.dark ?? "")).toLowerCase();
      return haystack.includes(q);
    });
  }, [activeFilter, query]);

  const grouped = useMemo(() => {
    const out = new Map<TokenCategory, TokenDef[]>();
    for (const tk of filtered) {
      if (!out.has(tk.category)) out.set(tk.category, []);
      out.get(tk.category)!.push(tk);
    }
    return out;
  }, [filtered]);

  /* ---- Estatísticas ---- */
  const stats = useMemo(() => {
    const byCat = new Map<TokenCategory, number>();
    for (const tk of TOKENS) byCat.set(tk.category, (byCat.get(tk.category) ?? 0) + 1);
    return {
      total: TOKENS.length,
      categories: TOKEN_CATEGORIES.filter((c) => (byCat.get(c) ?? 0) > 0),
      byCat,
    };
  }, []);

  /* ---- Copy / export helpers ---- */
  const handleCopyToken = async (tk: TokenDef) => {
    const ok = await copy(tk.name);
    if (ok) {
      setLastCopied(tk.name);
      setTimeout(() => setLastCopied(null), 1400);
    }
  };

  const handleExport = (format: "css" | "json" | "ts") => {
    const subset = activeFilter === "all" ? TOKENS : TOKENS.filter((t) => t.category === activeFilter);
    if (format === "css") {
      downloadText("atelier-tokens.css", serializeCss(subset), "text/css");
    } else if (format === "json") {
      downloadText("atelier-tokens.json", serializeJson(subset), "application/json");
    } else {
      downloadText("atelier-tokens.ts", serializeTs(subset), "text/typescript");
    }
  };

  return (
    <>
      <PageHead
        lead={t("pages.tokens.lead")}
        title={
          <>
            {tr("pages.tokens.titleA")}
            <em>{t("pages.tokens.titleB")}</em>
          </>
        }
        metaLabel={t("pages.tokens.metaLabel")}
        meta={t("pages.tokens.meta", { count: stats.total })}
        intro={tr("pages.tokens.intro")}
      />

      {/* Toolbar — busca + filtros + export */}
      <div className="tokens-toolbar" role="search">
        <label className="tokens-search">
          <span className="visually-hidden">{t("pages.tokens.searchLabel")}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("pages.tokens.searchPlaceholder")}
            className="tokens-search-input"
          />
        </label>

        <div className="tokens-export">
          <span className="tokens-export-label">
            {t("pages.tokens.exportLabel")}
          </span>
          <Button onClick={() => handleExport("css")} variant="ghost" size="sm">
            CSS
          </Button>
          <Button onClick={() => handleExport("json")} variant="ghost" size="sm">
            JSON
          </Button>
          <Button onClick={() => handleExport("ts")} variant="ghost" size="sm">
            TS
          </Button>
        </div>
      </div>

      {/* Chips de categoria */}
      <div className="tokens-chips" role="tablist" aria-label={t("pages.tokens.categoryLabel")}>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === "all"}
          className={`tokens-chip ${activeFilter === "all" ? "is-active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          {t("pages.tokens.all")} <span className="tokens-chip-count">{stats.total}</span>
        </button>
        {stats.categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeFilter === cat}
            className={`tokens-chip ${activeFilter === cat ? "is-active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}{" "}
            <span className="tokens-chip-count">{stats.byCat.get(cat) ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Grupos */}
      {filtered.length === 0 && (
        <p className="tokens-empty">{t("pages.tokens.empty")}</p>
      )}

      {Array.from(grouped.entries()).map(([cat, items]) => (
        <Section
          key={cat}
          num={String(items.length).padStart(2, "0")}
          title={<>{cat}</>}
          kicker={t("pages.tokens.tokenCount", { count: items.length })}
        >
          <div className="tokens-table-wrap">
            <table className="tokens-table">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>{t("pages.tokens.col.token")}</th>
                  <th style={{ width: "8%" }}>{t("pages.tokens.col.preview")}</th>
                  <th>{t("pages.tokens.col.light")}</th>
                  <th>{t("pages.tokens.col.dark")}</th>
                  <th style={{ width: "12%" }}>{t("pages.tokens.col.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((tk) => (
                  <tr key={tk.name}>
                    <td>
                      <code className="tokens-name">{tk.name}</code>
                      {tk.note && <div className="tokens-note">{tk.note}</div>}
                    </td>
                    <td>
                      <TokenPreview token={tk} />
                    </td>
                    <td>
                      <code className="tokens-value">{tk.light}</code>
                    </td>
                    <td>
                      {tk.dark !== undefined ? (
                        <code className="tokens-value">{tk.dark}</code>
                      ) : (
                        <span className="tokens-value-empty">—</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="tokens-copy-btn"
                        onClick={() => handleCopyToken(tk)}
                        aria-label={t("pages.tokens.copyAria", { name: tk.name })}
                      >
                        {lastCopied === tk.name && copied
                          ? t("pages.tokens.copied")
                          : t("pages.tokens.copy")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}
    </>
  );
}

/* ================================================================
   Preview por tipo de token
   ================================================================ */

function TokenPreview({ token }: { token: TokenDef }) {
  const { type } = token;
  const value = token.light;

  if (type === "color") {
    /* Pares light/dark lado a lado se houver */
    if (token.dark !== undefined) {
      return (
        <div className="tokens-swatch-pair">
          <div
            className="tokens-swatch tokens-swatch--color"
            style={{ background: token.light }}
            title={`light · ${token.light}`}
          />
          <div
            className="tokens-swatch tokens-swatch--color"
            style={{ background: token.dark }}
            title={`dark · ${token.dark}`}
          />
        </div>
      );
    }
    return (
      <div
        className="tokens-swatch tokens-swatch--color"
        style={{ background: value }}
        title={value}
      />
    );
  }

  if (type === "shadow") {
    return (
      <div
        className="tokens-swatch tokens-swatch--shadow"
        style={{ boxShadow: value === "none" ? undefined : value }}
      />
    );
  }

  if (type === "dimension" && token.category === "spacing") {
    return (
      <div className="tokens-swatch-rule">
        <div
          className="tokens-swatch-bar"
          style={{ width: value }}
          aria-hidden="true"
        />
      </div>
    );
  }

  if (type === "dimension" && token.category === "radius") {
    return (
      <div
        className="tokens-swatch tokens-swatch--radius"
        style={{ borderRadius: value }}
      />
    );
  }

  if (type === "duration") {
    return <span className="tokens-swatch-text">{value}</span>;
  }

  if (type === "fontFamily") {
    return (
      <span
        className="tokens-swatch-text"
        style={{ fontFamily: value }}
      >
        Aa
      </span>
    );
  }

  if (type === "fontSize") {
    return (
      <span
        className="tokens-swatch-text"
        style={{ fontSize: value, fontFamily: "var(--font-serif)", lineHeight: 1 }}
      >
        Aa
      </span>
    );
  }

  /* default: dash discreto */
  return <span className="tokens-swatch-text tokens-value-empty">—</span>;
}
