/* ================================================================
   @atelier/ds — Hooks barrel (zero-deps).
   Imports apontam para src/_app/, sincronizado em build time.
   ================================================================ */

export {
  useMediaQuery,
  usePrefersReducedMotion,
  useWindowSize,
  type WindowSize,
  useIntersectionObserver,
  useResizeObserver,
  type ResizeObserverSize,
  useClickOutside,
  useScrollLock,
  useEventListener,
  useKeyPress,
  type UseKeyPressOptions,
  useLocalStorage,
  useDebounce,
  useThrottle,
  useControllableState,
  type UseControllableStateProps,
  usePrevious,
  useUpdateEffect,
  useFocusTrap,
  useFocusReturn,
  useRovingTabIndex,
  type RovingOrientation,
  type RovingItemProps,
  type UseRovingTabIndexOptions,
} from "./_app/lib/hooks/index.ts";

export { useCopy } from "./_app/lib/useCopy.ts";
