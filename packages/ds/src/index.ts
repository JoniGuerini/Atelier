/* ================================================================
   @atelier/ds — Public API barrel
   ----------------------------------------------------------------
   Re-exporta tudo: componentes, hooks, tokens e utilitarios.
   Para tree-shaking otimo, prefira importar dos sub-paths:

       import { Button } from "@atelier/ds/components";
       import { useDebounce } from "@atelier/ds/hooks";
       import { tokensByCategory } from "@atelier/ds/tokens";
       import { contrastRatio } from "@atelier/ds/contrast";

   Mas o barrel raiz tambem funciona (sideEffects: false no
   package.json garante tree-shaking nesse caso tambem).
   ================================================================ */

export * from "./components.ts";
export * from "./hooks.ts";
export * as tokens from "./tokens.ts";
export * as contrast from "./contrast.ts";
