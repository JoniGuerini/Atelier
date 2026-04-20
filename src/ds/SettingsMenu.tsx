import { useEffect, useRef, useState, type ReactNode } from "react";
import { useT, useLocale } from "../lib/i18n.tsx";
import { ThemeToggle, NavModeToggle } from "./primitives.tsx";
import type { SettingsMenuProps } from "./types.ts";

interface RowProps {
  label: ReactNode;
  children?: ReactNode;
}

/* ================================================================
   SettingsMenu — disparador único + popover com as 3 opções
   (idioma · tema · modo de navegação). Substitui o cluster solto
   que ocupava muito espaço na navbar e na sidebar.

   Props:
     • navMode / onToggleNavMode — opcional. Se omitido, a opção
       "Navegação" não aparece (útil pra ferramentas onde não faz
       sentido trocar o modo).
     • placement — "bottom-end" (default, navbar) ou "top-start"
       (sidebar — abre pra cima a partir do canto inferior).
   ================================================================ */

export function SettingsMenu({
  navMode,
  onToggleNavMode,
  placement = "bottom-end",
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { t, locale, setLocale, locales } = useT();
  const { dirMode, setDir } = useLocale();

  // Fecha ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={`settings-menu placement-${placement} ${open ? "open" : ""}`}
      ref={ref}
    >
      <button
        type="button"
        className="settings-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("nav.settings.label")}
        title={t("nav.settings.label")}
      >
        <span className="settings-menu-glyph" aria-hidden="true">
          ⋯
        </span>
      </button>

      {open && (
        <div className="settings-menu-panel" role="menu">
          <div className="settings-menu-head">
            <span className="settings-menu-kicker">
              {t("nav.settings.kicker")}
            </span>
            <span className="settings-menu-title">
              {t("nav.settings.title")}
            </span>
          </div>

          <Row label={t("nav.footer.language")}>
            <div
              className="locale-switch"
              role="group"
              aria-label={t("nav.footer.language")}
            >
              {locales.map((l: any) => (
                <button
                  key={l.id}
                  type="button"
                  className={`locale-btn ${locale === l.id ? "active" : ""}`}
                  onClick={() => setLocale(l.id as any)}
                  aria-pressed={locale === l.id}
                  title={l.label}
                >
                  {l.short}
                </button>
              ))}
            </div>
          </Row>

          <Row label={t("nav.footer.theme")}>
            <ThemeToggle />
          </Row>

          {onToggleNavMode && (
            <Row label={t("nav.mode.label")}>
              <NavModeToggle mode={navMode} onChange={onToggleNavMode} />
            </Row>
          )}

          <Row label={t("nav.settings.dir.label")}>
            <div
              className="locale-switch"
              role="group"
              aria-label={t("nav.settings.dir.label")}
            >
              {(["auto", "ltr", "rtl"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`locale-btn ${dirMode === m ? "active" : ""}`}
                  onClick={() => setDir(m)}
                  aria-pressed={dirMode === m}
                  title={t(`nav.settings.dir.${m}`)}
                >
                  {t(`nav.settings.dir.${m}`)}
                </button>
              ))}
            </div>
          </Row>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: RowProps) {
  return (
    <div className="settings-menu-row">
      <span className="settings-menu-label">{label}</span>
      <div className="settings-menu-control">{children}</div>
    </div>
  );
}

