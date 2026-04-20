import { describe, expect, it } from "vitest";
import { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "./useFocusTrap.ts";

/* ================================================================
   useFocusTrap — testes (Roadmap · fase 6.4)
   ----------------------------------------------------------------
   Verifica o ciclo Tab/Shift+Tab dentro de um diálogo simulado.
   ================================================================ */

function Trapped() {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true);
  return (
    <div>
      <button>outside-before</button>
      <div ref={ref} role="dialog">
        <button>first</button>
        <button>second</button>
        <button>third</button>
      </div>
      <button>outside-after</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("focuses the first focusable inside on mount", () => {
    render(<Trapped />);
    expect(screen.getByText("first")).toHaveFocus();
  });

  it("wraps Tab from last back to first", async () => {
    const user = userEvent.setup();
    render(<Trapped />);

    /* foca no último */
    screen.getByText("third").focus();
    expect(screen.getByText("third")).toHaveFocus();

    /* Tab → deve voltar pro first */
    await user.tab();
    expect(screen.getByText("first")).toHaveFocus();
  });

  it("wraps Shift+Tab from first back to last", async () => {
    const user = userEvent.setup();
    render(<Trapped />);

    /* foca no primeiro (já é o default) */
    expect(screen.getByText("first")).toHaveFocus();

    /* Shift+Tab → deve ir pro last */
    await user.tab({ shift: true });
    expect(screen.getByText("third")).toHaveFocus();
  });
});
