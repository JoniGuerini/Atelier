import { useEffect, useState } from "react";

/* ================================================================
   useDebounce (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Atrasa a propagação de um valor: só publica quando ele para de
   mudar por `delay` ms. Padrão clássico para inputs de busca,
   filters em tabela, qualquer trabalho caro disparado por digit.

   Exemplo:
     const [query, setQuery] = useState("");
     const debounced = useDebounce(query, 300);
     useEffect(() => {
       fetchSearch(debounced);
     }, [debounced]);
   ================================================================ */

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
