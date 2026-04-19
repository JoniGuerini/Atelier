import ptBR from "./pt-BR.ts";
import en from "./en.ts";

export const LOCALES = {
  "pt-BR": ptBR,
  en,
};

export const LOCALE_LIST = [
  { id: "pt-BR", label: "Português", short: "PT" },
  { id: "en", label: "English", short: "EN" },
];

export const DEFAULT_LOCALE = "en";
