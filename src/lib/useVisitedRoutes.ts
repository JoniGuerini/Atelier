/* ================================================================
   Atelier — useVisitedRoutes
   ----------------------------------------------------------------
   Mantem em localStorage o conjunto de rotas que o usuario ja
   visitou. Usado para "esconder" o badge NEW depois que a pagina
   foi acessada pela primeira vez.

   Editorial: o badge NEW deve significar "novidade pra voce", nao
   "isso entrou no app em algum momento". Sem esse hook, paginas
   marcadas como `isNew: true` em routes.ts ficariam "novas" para
   sempre — o que polui visualmente conforme o app cresce.

   Storage key: "atelier.visitedRoutes" (JSON array de slugs).
   API:
     const { visited, markVisited, isNewToUser, reset } = useVisitedRoutes();
     isNewToUser(slug, isNewFlag)  // true sse o flag esta on E o usuario nao visitou
     markVisited(slug)             // chame em useEffect ao trocar de rota
     reset()                       // limpa tudo (debug / settings)
   ================================================================ */

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "atelier.visitedRoutes";

/* Evento custom para sincronizar instancias do hook na mesma aba.
   localStorage so dispara "storage" entre abas — entre componentes
   da mesma pagina precisamos de algo manual. */
const CHANGE_EVENT = "atelier:visited-routes-change";

function readStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((x): x is string => typeof x === "string"));
    }
  } catch {
    /* JSON corrompido — comeca limpo. */
  }
  return new Set();
}

function writeStorage(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* localStorage quota ou modo privado — silenciosa. */
  }
}

export interface UseVisitedRoutesReturn {
  visited: Set<string>;
  markVisited: (slug: string) => void;
  isNewToUser: (slug: string, isNewFlag?: boolean) => boolean;
  reset: () => void;
}

export function useVisitedRoutes(): UseVisitedRoutesReturn {
  const [visited, setVisited] = useState<Set<string>>(readStorage);

  /* Sincroniza entre instancias do hook (mesma aba) + entre abas. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setVisited(readStorage());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) sync();
    });
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const markVisited = useCallback((slug: string) => {
    if (!slug) return;
    setVisited((prev) => {
      if (prev.has(slug)) return prev;
      const next = new Set(prev);
      next.add(slug);
      writeStorage(next);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
      }
      return next;
    });
  }, []);

  const isNewToUser = useCallback(
    (slug: string, isNewFlag?: boolean): boolean => {
      if (!isNewFlag) return false;
      return !visited.has(slug);
    },
    [visited]
  );

  const reset = useCallback(() => {
    setVisited(new Set());
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
    }
  }, []);

  return { visited, markVisited, isNewToUser, reset };
}
