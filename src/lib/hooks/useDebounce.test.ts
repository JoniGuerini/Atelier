import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce.ts";

/* ================================================================
   useDebounce — testes (Roadmap · fase 6.4)
   ----------------------------------------------------------------
   Smoke test usando timers fakes do vitest. Verifica:
     - valor inicial é propagado imediatamente
     - mudanças subsequentes esperam o delay
     - mudanças repetidas resetam o timer
   ================================================================ */

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 200));
    expect(result.current).toBe("hello");
  });

  it("debounces subsequent updates by `delay` ms", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      { initialProps: { value: "a" } }
    );
    expect(result.current).toBe("a");

    rerender({ value: "b" });
    expect(result.current).toBe("a"); // ainda não passou o delay

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(result.current).toBe("b");
  });

  it("resets the timer on rapid updates", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(150));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe("a"); // ainda não publicou

    act(() => vi.advanceTimersByTime(60));
    expect(result.current).toBe("c"); // só publica o último
  });
});
