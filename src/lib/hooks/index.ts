/* ================================================================
   Atelier — Public hooks (Roadmap · fase 10 + 6.2)
   ----------------------------------------------------------------
   Barrel de re-export. Apps consumidoras importam de um caminho
   único:
       import { useMediaQuery, useDebounce, useFocusTrap } from "@/lib/hooks";

   Convenção:
     - 10.1 hooks de ambiente   (matchMedia / observer / window)
     - 10.2 hooks de DOM        (event listener / scroll / key)
     - 10.3 hooks de estado     (storage / debounce / controllable)
     - 6.2  hooks de foco/a11y  (focus trap / return / roving)

   Hooks de domínio específico (useT, useTheme, useShortcut,
   useDataTable, useToast, usePopover, useSearchHotkey, useCopy,
   useHashRoute) NÃO entram aqui — vivem nos seus respectivos
   módulos por proximidade ao componente que os exporta.
   ================================================================ */

/* ---- 10.1 — Ambiente ---- */
export { useMediaQuery } from "./useMediaQuery.ts";
export { usePrefersReducedMotion } from "./usePrefersReducedMotion.ts";
export { useWindowSize, type WindowSize } from "./useWindowSize.ts";
export { useIntersectionObserver } from "./useIntersectionObserver.ts";
export { useResizeObserver, type ResizeObserverSize } from "./useResizeObserver.ts";

/* ---- 10.2 — DOM / interação ---- */
export { useClickOutside } from "./useClickOutside.ts";
export { useScrollLock } from "./useScrollLock.ts";
export { useEventListener } from "./useEventListener.ts";
export { useKeyPress, type UseKeyPressOptions } from "./useKeyPress.ts";

/* ---- 10.3 — Estado ---- */
export { useLocalStorage } from "./useLocalStorage.ts";
export { useDebounce } from "./useDebounce.ts";
export { useThrottle } from "./useThrottle.ts";
export {
  useControllableState,
  type UseControllableStateProps,
} from "./useControllableState.ts";
export { usePrevious } from "./usePrevious.ts";
export { useUpdateEffect } from "./useUpdateEffect.ts";

/* ---- 6.2 — Foco e a11y ---- */
export { useFocusTrap } from "./useFocusTrap.ts";
export { useFocusReturn } from "./useFocusReturn.ts";
export {
  useRovingTabIndex,
  type RovingOrientation,
  type RovingItemProps,
  type UseRovingTabIndexOptions,
} from "./useRovingTabIndex.ts";
