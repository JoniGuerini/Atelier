import { useEffect, useState } from "react";
import { useCopy } from "../lib/useCopy.js";
import { useT } from "../lib/i18n.jsx";
import { useTheme } from "../lib/theme.jsx";

/* ---------- Button ---------- */
export function Button({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...rest
}) {
  const classes = ["ds-btn"];
  if (variant !== "default") classes.push(variant);
  if (size !== "md") classes.push(size);
  if (className) classes.push(className);
  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
}

/* ---------- SidebarToggle ----------
   Botão dedicado para retrair/expandir a sidebar. Faz rotação do
   chevron via CSS (.is-collapsed). Totalmente controlado:
     <SidebarToggle collapsed={bool} onToggle={fn} />
   Pode ser usado em qualquer layout com sidebar — não acopla DOM. */
export function SidebarToggle({
  collapsed = false,
  onToggle,
  className = "",
  title,
  ...rest
}) {
  const { t } = useT();
  const label = collapsed
    ? t("common.expandSidebar")
    : t("common.collapseSidebar");
  const classes = ["ds-sidebar-toggle"];
  if (collapsed) classes.push("is-collapsed");
  if (className) classes.push(className);
  return (
    <button
      type="button"
      className={classes.join(" ")}
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!collapsed}
      aria-controls="app-sidebar"
      title={title ?? label}
      {...rest}
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M10 3.5 5.5 8 10 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ---------- NavModeToggle ----------
   Segmented control entre "sidebar" (menu lateral) e "navbar" (barra
   superior com dropdowns). Persistência e reatividade ficam a cargo
   do pai — este componente é puramente controlado.
     <NavModeToggle mode="sidebar" onChange={setMode} />
*/
function NavModeGlyph({ id }) {
  if (id === "sidebar") {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
        <rect x="1.5" y="2" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <rect x="6.5" y="2" width="8" height="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  // navbar — barra horizontal no topo
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <rect x="1.5" y="2" width="13" height="3" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.5" y="6" width="13" height="8" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function NavModeToggle({ mode = "sidebar", onChange, className = "" }) {
  const { t } = useT();
  const modes = [
    { id: "sidebar", labelKey: "nav.mode.sidebar" },
    { id: "navbar", labelKey: "nav.mode.navbar" },
  ];
  const classes = ["theme-switch", "theme-switch-bi"];
  if (className) classes.push(className);
  return (
    <div
      className={classes.join(" ")}
      role="group"
      aria-label={t("nav.mode.label")}
    >
      {modes.map((m) => {
        const label = t(m.labelKey);
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            className={`theme-btn ${active ? "active" : ""}`}
            onClick={() => onChange?.(m.id)}
            aria-pressed={active}
            title={label}
          >
            <NavModeGlyph id={m.id} />
            <span className="theme-btn-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- BackToTop ----------
   Botão que aparece após o usuário rolar `threshold` pixels e,
   ao ser clicado, rola a página de volta ao topo.
     • autocontido (listener de scroll + smooth scroll)
     • respeita prefers-reduced-motion (scroll instantâneo)
     • totalmente opcional: se `onClick` for passado, substitui a
       ação padrão (útil para rolar containers customizados)
     • a11y: aria-label traduzido, focus-visible, não recebe foco
       enquanto invisível
*/
export function BackToTop({
  threshold = 320,
  onClick,
  className = "",
  scrollTarget,
  ...rest
}) {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = scrollTarget ?? window;
    const getY = () =>
      target === window
        ? window.scrollY || document.documentElement.scrollTop || 0
        : target.scrollTop || 0;

    const check = () => setVisible(getY() > threshold);
    check();
    target.addEventListener("scroll", check, { passive: true });
    return () => target.removeEventListener("scroll", check);
  }, [threshold, scrollTarget]);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const target = scrollTarget ?? window;
    const behavior = prefersReduced ? "auto" : "smooth";
    if (target === window) {
      window.scrollTo({ top: 0, behavior });
    } else {
      target.scrollTo({ top: 0, behavior });
    }
  };

  const classes = ["ds-back-to-top"];
  if (visible) classes.push("is-visible");
  if (className) classes.push(className);

  const label = t("common.backToTop");

  return (
    <button
      type="button"
      className={classes.join(" ")}
      onClick={handleClick}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? "false" : "true"}
      {...rest}
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M8 11.5V4.5 M4.5 8 8 4.5 11.5 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ---------- ThemeToggle ----------
   Dois modos: "light" e "dark". Sem opção "system".
   Usa glifos tipográficos simples (sol, lua) em vez de SVGs
   coloridos — preserva a linguagem editorial "silenciosa".

   Props:
     • variant: "segmented" (padrão) | "compact"
       - segmented: dois botões lado a lado, um ativo
       - compact:   um único botão que alterna light/dark
*/
function ThemeGlyph({ id, className = "" }) {
  if (id === "dark") {
    return (
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12.5 9.5A5 5 0 1 1 6.5 3.5a4 4 0 0 0 6 6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // "light" — sol estilizado (padrão e fallback)
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="8"
        cy="8"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M8 1.5V3 M8 13v1.5 M1.5 8H3 M13 8h1.5 M3.2 3.2l1.1 1.1 M11.7 11.7l1.1 1.1 M3.2 12.8l1.1-1.1 M11.7 4.3l1.1-1.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThemeToggle({ variant = "segmented", className = "" }) {
  const { t } = useT();
  const { theme, setTheme, resolved, toggle, themes } = useTheme();

  if (variant === "compact") {
    const isDark = resolved === "dark";
    const label = isDark ? t("theme.switchToLight") : t("theme.switchToDark");
    return (
      <button
        type="button"
        className={`ds-theme-toggle-compact ${className}`.trim()}
        onClick={toggle}
        aria-label={label}
        title={label}
      >
        <ThemeGlyph id={isDark ? "light" : "dark"} />
      </button>
    );
  }

  const classes = ["theme-switch"];
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")} role="group" aria-label={t("theme.label")}>
      {themes.map((m) => {
        const label = t(m.labelKey);
        const active = theme === m.id;
        return (
          <button
            key={m.id}
            type="button"
            className={`theme-btn ${active ? "active" : ""}`}
            onClick={() => setTheme(m.id)}
            aria-pressed={active}
            title={label}
          >
            <ThemeGlyph id={m.id} />
            <span className="theme-btn-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Field wrapper + Input + Textarea + Select ---------- */
export function Field({ label, hint, error, children }) {
  return (
    <label className="ds-field">
      {label && <span className="ds-label">{label}</span>}
      {children}
      {error ? (
        <span className="ds-hint error">{error}</span>
      ) : hint ? (
        <span className="ds-hint">{hint}</span>
      ) : null}
    </label>
  );
}

export function Input({ invalid, className = "", ...rest }) {
  return (
    <input
      className={`ds-input ${invalid ? "invalid" : ""} ${className}`}
      {...rest}
    />
  );
}

export function Textarea({ invalid, className = "", ...rest }) {
  return (
    <textarea
      className={`ds-textarea ${invalid ? "invalid" : ""} ${className}`}
      {...rest}
    />
  );
}

export function Select({ invalid, className = "", children, ...rest }) {
  return (
    <select
      className={`ds-select ${invalid ? "invalid" : ""} ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

/* ---------- Checkbox / Radio ---------- */
export function Checkbox({ label, disabled, ...rest }) {
  return (
    <label className={`ds-check ${disabled ? "disabled" : ""}`}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span>{label}</span>
    </label>
  );
}

export function Radio({ label, disabled, ...rest }) {
  return (
    <label className={`ds-check ${disabled ? "disabled" : ""}`}>
      <input type="radio" disabled={disabled} {...rest} />
      <span>{label}</span>
    </label>
  );
}

/* ---------- Switch ---------- */
export function Switch({ label, checked, onChange, disabled }) {
  return (
    <label className="ds-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="track">
        <span className="thumb" />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

/* ---------- Badge ---------- */
export function Badge({ variant = "default", dot, children }) {
  const cls = `ds-badge${variant !== "default" ? " " + variant : ""}`;
  return (
    <span className={cls}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

/* ---------- Alert ---------- */
const ALERT_MARK = {
  info: "i",
  ok: "✓",
  warn: "!",
  danger: "!",
  default: "—",
};
export function Alert({ variant = "default", title, children }) {
  return (
    <div className={`ds-alert ${variant}`}>
      <div className="alert-mark">{ALERT_MARK[variant] || "—"}</div>
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-text">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Card ---------- */
export function Card({ kicker, title, children, foot }) {
  return (
    <article className="ds-card">
      {kicker && <div className="card-kicker">{kicker}</div>}
      {title && <h3 className="card-title">{title}</h3>}
      {children && <div className="card-body">{children}</div>}
      {foot && <div className="card-foot">{foot}</div>}
    </article>
  );
}

/* ---------- Tabs ---------- */
export function Tabs({ value, onChange, items }) {
  return (
    <>
      <div className="ds-tabs">
        {items.map((it) => (
          <button
            key={it.value}
            type="button"
            className={`ds-tab ${value === it.value ? "active" : ""}`}
            onClick={() => onChange?.(it.value)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="ds-tab-panel">
        {items.find((i) => i.value === value)?.panel}
      </div>
    </>
  );
}

/* ---------- Breadcrumb ---------- */
export function Breadcrumbs({ items }) {
  return (
    <nav className="ds-crumbs" aria-label="breadcrumb">
      {items.map((it, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span
            className={`crumb ${i === items.length - 1 ? "current" : ""}`}
          >
            {it}
          </span>
          {i < items.length - 1 && <span className="sep">→</span>}
        </span>
      ))}
    </nav>
  );
}

/* ---------- Progress ---------- */
export function Progress({ value = 0, label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="ds-progress" role="progressbar" aria-valuenow={pct}>
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="ds-progress-meta">
        <span>{label || "Progress"}</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, foot }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="ds-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="ds-modal" role="dialog" aria-modal="true">
        <div className="ds-modal-head">
          <h3>{title}</h3>
          <button
            className="ds-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="ds-modal-body">{children}</div>
        {foot && <div className="ds-modal-foot">{foot}</div>}
      </div>
    </div>
  );
}

/* ---------- Toast ---------- */
export function Toast({ message, visible }) {
  return <div className={`ds-toast ${visible ? "show" : ""}`}>{message}</div>;
}

/* ---------- Tooltip ---------- */
export function Tooltip({ tip, children }) {
  return (
    <span className="ds-tt" data-tip={tip} tabIndex={0}>
      {children}
    </span>
  );
}

/* ---------- Avatar ----------
   Um retrato — iniciais, imagem (src) ou um SVG customizado (children).
   Ordem de prioridade de renderização:
     1. `src` (se carrega sem erro)  →  <img />
     2. `children` (SVG/preset customizado)
     3. `initials` (fallback tipográfico)
   Props:
     • initials: string (ex: "CA")
     • src:      URL ou dataURL da imagem
     • size:     "sm" | "md" (default) | "lg" | "xl"
     • variant:  "default" | "solid" | "accent"
     • shape:    "square" (default) | "circle"
     • alt:      texto alternativo da imagem (fallback: initials)
     • onClick:  se definido, o avatar vira <button> (útil para pickers)
*/
export function Avatar({
  initials,
  src,
  size,
  variant = "default",
  shape = "square",
  alt,
  children,
  onClick,
  className = "",
  style,
  ...rest
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const cls = ["ds-avatar"];
  if (size) cls.push(size);
  if (variant !== "default") cls.push(variant);
  if (shape === "circle") cls.push("circle");
  if (onClick) cls.push("interactive");
  if (className) cls.push(className);

  const showImage = src && !imgFailed;

  const content = showImage ? (
    <img
      src={src}
      alt={alt ?? initials ?? ""}
      onError={() => setImgFailed(true)}
      draggable={false}
    />
  ) : children ? (
    <span className="ds-avatar-inner">{children}</span>
  ) : (
    <span className="ds-avatar-initials">{initials}</span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cls.join(" ")}
        onClick={onClick}
        style={style}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={cls.join(" ")} style={style} {...rest}>
      {content}
    </span>
  );
}

/* ---------- AvatarGroup ----------
   Coleção de avatares sobrepostos (times, colaboradores). */
export function AvatarGroup({ children, max = 4, size, className = "" }) {
  const kids = Array.isArray(children) ? children : [children].filter(Boolean);
  const visible = kids.slice(0, max);
  const rest = kids.length - visible.length;
  const cls = ["ds-avatar-group"];
  if (size) cls.push(size);
  if (className) cls.push(className);
  return (
    <div className={cls.join(" ")}>
      {visible.map((child, i) => (
        <span key={i} className="ds-avatar-group-slot">
          {child}
        </span>
      ))}
      {rest > 0 && (
        <span className="ds-avatar-group-slot">
          <Avatar size={size} initials={`+${rest}`} variant="solid" />
        </span>
      )}
    </div>
  );
}

/* ---------- Divider ---------- */
export function Divider({ children }) {
  return (
    <div className="ds-divider">
      <span className="ornament">§</span>
      {children && <span>{children}</span>}
      <span className="ornament">§</span>
    </div>
  );
}

/* ---------- Copy button ---------- */
export function CopyButton({ text, label, copiedLabel }) {
  const { copy, copied } = useCopy();
  const { t } = useT();
  const l = label ?? t("common.copy");
  const lc = copiedLabel ?? t("common.copied");
  return (
    <button
      type="button"
      className={`copy-btn ${copied ? "copied" : ""}`}
      onClick={() => copy(text)}
      aria-label={copied ? lc : l}
    >
      <span className="copy-mark" aria-hidden>
        {copied ? "✓" : "❐"}
      </span>
      <span>{copied ? lc : l}</span>
    </button>
  );
}

/* ---------- Lightweight syntax highlighter (JSX / CSS) ---------- */
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightJsx(src) {
  let s = escapeHtml(src);
  s = s.replace(/(\{\/\*[\s\S]*?\*\/\})/g, '<span class="c">$1</span>');
  s = s.replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`[^`]*`)/g, '<span class="s">$1</span>');
  s = s.replace(
    /\b(import|from|export|default|const|let|var|function|return|if|else|true|false|null)\b/g,
    '<span class="k">$1</span>'
  );
  s = s.replace(/(&lt;\/?)([A-Z][A-Za-z0-9]*)/g, '$1<span class="t">$2</span>');
  s = s.replace(/\b([a-zA-Z][a-zA-Z0-9]*)=(?=&quot;|\{)/g, '<span class="n">$1</span>=');
  return s;
}

function highlightCss(src) {
  let s = escapeHtml(src);
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c">$1</span>');
  s = s.replace(/(--[a-z0-9-]+)/gi, '<span class="n">$1</span>');
  s = s.replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="s">$1</span>');
  s = s.replace(/(:\s*)([a-z-]+)(?=[;\s])/g, '$1<span class="t">$2</span>');
  return s;
}

function highlightShell(src) {
  const s = escapeHtml(src);
  return s
    .replace(/^(\$\s.*)$/gm, '<span class="c">$1</span>')
    .replace(/\b(npm|npx|pnpm|yarn|vite|git)\b/g, '<span class="k">$1</span>');
}

/* ---------- Code block ---------- */
export function Code({ children, lang = "jsx", copy = true }) {
  const raw = typeof children === "string" ? children : String(children);
  let html;
  if (lang === "css") html = highlightCss(raw);
  else if (lang === "shell") html = highlightShell(raw);
  else html = highlightJsx(raw);

  return (
    <div className="code-wrap">
      <pre className="ds-code" dangerouslySetInnerHTML={{ __html: html }} />
      {copy && (
        <div className="code-toolbar">
          <CopyButton text={raw} />
        </div>
      )}
    </div>
  );
}

/* ---------- Example block: preview + caption + optional code ---------- */
export function Example({
  caption,
  tech,
  children,
  stack,
  center,
  code,
  lang = "jsx",
}) {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const cls = ["example-preview"];
  if (stack) cls.push("stack");
  if (center) cls.push("center");

  return (
    <div className="example">
      <div className={cls.join(" ")}>{children}</div>
      {(caption || tech || code) && (
        <div className="example-caption">
          <span>{caption}</span>
          <div className="caption-right">
            {tech && <b>{tech}</b>}
            {code && (
              <button
                type="button"
                className={`code-toggle ${open ? "open" : ""}`}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? t("common.hideCode") : t("common.viewCode")}{" "}
                <span className="chev" aria-hidden>
                  ↓
                </span>
              </button>
            )}
          </div>
        </div>
      )}
      {code && open && (
        <div className="example-code">
          <Code lang={lang}>{code}</Code>
        </div>
      )}
    </div>
  );
}

/* ---------- Section header helper ---------- */
export function Section({ num, title, kicker, desc, children }) {
  return (
    <section className="section">
      <div className="section-head">
        {num && <div className="num">{num}</div>}
        <h2>{title}</h2>
        {kicker && <div className="kicker">{kicker}</div>}
      </div>
      {desc && <p className="section-desc">{desc}</p>}
      {children}
    </section>
  );
}

/* ---------- Page header ---------- */
export function PageHead({ lead, title, meta, metaLabel, intro }) {
  return (
    <>
      <header className="page-head">
        <div>
          {lead && <div className="lead">{lead}</div>}
          <h1>{title}</h1>
        </div>
        {(meta || metaLabel) && (
          <div className="meta">
            {metaLabel}
            {meta && <b>{meta}</b>}
          </div>
        )}
      </header>
      {intro && <p className="page-intro">{intro}</p>}
    </>
  );
}
