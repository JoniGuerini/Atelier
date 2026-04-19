import { createContext, useContext } from "react";

/* ================================================================
   Stepper — indicador de progresso multi-etapa.
   ----------------------------------------------------------------
   Editorial: cada etapa é uma "marca de margem" — número mono,
   título serif, descrição opcional. Filete entre etapas com
   --rule-soft, etapa atual ganha --accent.

     <Stepper current={2} orientation="horizontal">
       <Step n="01" label="Conta" description="Seus dados" />
       <Step n="02" label="Plano" description="Frequência e formato" />
       <Step n="03" label="Confirmar" description="Revisar e enviar" />
     </Stepper>

   Estados de cada Step:
     • completed — anteriores ao current (label em ink, número faint)
     • active    — o current (label em accent, número em accent)
     • pending   — futuros (label em ink-soft, número em ink-faint)
   ================================================================ */

const StepperContext = createContext({ current: 0, orientation: "horizontal" });

function useStepper() {
  return useContext(StepperContext);
}

export function Stepper({
  current = 0,
  orientation = "horizontal",
  children,
  className = "",
}: any) {
  // Resolve estado de cada step automaticamente baseado em sua posição
  const items = Array.isArray(children) ? children : [children];
  return (
    <StepperContext.Provider value={{ current, orientation }}>
      <ol
        className={`ds-stepper orientation-${orientation} ${className}`.trim()}
        role="list"
      >
        {items.map((child, i) => {
          if (!child) return null;
          let state = "pending";
          if (i < current) state = "completed";
          else if (i === current) state = "active";
          return (
            <StepperItem key={i} state={state} index={i}>
              {child}
            </StepperItem>
          );
        })}
      </ol>
    </StepperContext.Provider>
  );
}

/* Wrapper interno que provê o estado pra cada Step */
function StepperItem({ state, index, children }: any) {
  return (
    <li className={`ds-step state-${state}`} data-index={index}>
      {children}
    </li>
  );
}

export function Step({ n, label, description }: any) {
  return (
    <>
      <span className="ds-step-marker">
        <span className="ds-step-n">{n}</span>
      </span>
      <span className="ds-step-text">
        <span className="ds-step-label">{label}</span>
        {description && <span className="ds-step-desc">{description}</span>}
      </span>
      {/* Linha conectora — sai do número e termina no próximo step.
         Posicionada como child direto do .ds-step (li) que tem
         position: relative. CSS cuida do recorte na orientação. */}
      <span className="ds-step-line" aria-hidden="true" />
    </>
  );
}
