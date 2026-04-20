import { useCallback, useEffect, useState } from "react";

/* ================================================================
   useLocalStorage (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Estado React sincronizado com window.localStorage. API mimetiza
   useState — `[value, setValue]` com setValue aceitando função
   updater (val => next).

   - SSR-safe: server retorna defaultValue, sincroniza em useEffect
   - Sincroniza entre abas via storage event (browser-native)
   - Tratamento de erro silencioso em quota/parse — sempre devolve
     o defaultValue se algo falhar (não quebra a app)

   Exemplo:
     const [theme, setTheme] = useLocalStorage<"light"|"dark">(
       "atelier:theme", "light"
     );
   ================================================================ */

type Setter<T> = (value: T | ((prev: T) => T)) => void;

function read<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded ou storage indisponível — silencia */
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Setter<T>] {
  const [stored, setStored] = useState<T>(() => read(key, defaultValue));

  /* atualiza se a key mudar (raro mas possível) */
  useEffect(() => {
    setStored(read(key, defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  /* sincroniza entre abas */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setStored(e.newValue === null ? defaultValue : (JSON.parse(e.newValue) as T));
      } catch {
        setStored(defaultValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback<Setter<T>>(
    (next) => {
      setStored((prev) => {
        const value =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        write(key, value);
        return value;
      });
    },
    [key]
  );

  return [stored, setValue];
}
