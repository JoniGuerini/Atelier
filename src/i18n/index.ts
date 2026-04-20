/* ================================================================
   i18n — registry e lazy loader (Roadmap · fase 8.1, code splitting)
   ----------------------------------------------------------------
   Os dicionários ficam em chunks separados; só o locale ativo é
   baixado. Cache em memória evita rebaixar quando o usuário troca
   de volta.

   Antes (entry monolítico): pt-BR + en juntos = ~260 KB minified.
   Depois: ~130 KB cada, baixados sob demanda.

   Para adicionar um novo locale, registre em LOCALE_LIST e em
   LOCALE_LOADERS. O dicionário pode ser pt-BR.ts ou .ts qualquer.
   ================================================================ */

export const LOCALE_LIST = [
  { id: "pt-BR", label: "Português", short: "PT" },
  { id: "en", label: "English", short: "EN" },
];

export const DEFAULT_LOCALE = "en";

export type LocaleId = "pt-BR" | "en";

const LOCALE_LOADERS: Record<LocaleId, () => Promise<{ default: any }>> = {
  "pt-BR": () => import("./pt-BR.ts"),
  en: () => import("./en.ts"),
};

const cache: Partial<Record<LocaleId, any>> = {};

/** Carrega (ou devolve do cache) o dicionário de `id`. */
export async function loadLocale(id: LocaleId): Promise<any> {
  if (cache[id]) return cache[id];
  const loader = LOCALE_LOADERS[id];
  if (!loader) throw new Error(`Unknown locale: ${id}`);
  const mod = await loader();
  cache[id] = mod.default;
  return mod.default;
}

/** Lookup síncrono (devolve o cache se já existe; senão undefined). */
export function getCachedLocale(id: LocaleId): any | undefined {
  return cache[id];
}
