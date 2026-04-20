import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { useIntersectionObserver } from "../lib/hooks/index.ts";
import { usePrefersReducedMotion } from "../lib/hooks/index.ts";

/* ================================================================
   Motion — primitivos de transição (Roadmap · fase 4)
   ----------------------------------------------------------------
   Camada formal de animação do Atelier. Substitui transitions
   ad-hoc por wrappers declarativos, todos zero-deps:

     · <Transition>   controlador genérico (mount/unmount + classes)
     · <Fade>         atalho — opacity
     · <Slide>        atalho — translate
     · <Scale>        atalho — scale + opacity
     · <Collapse>     anima height: auto corretamente
     · <ScrollReveal> entra na tela via IntersectionObserver

   Todos respeitam prefers-reduced-motion: desligam transforms,
   mantêm só opacity (ou skip total quando o usuário pede).

   Vocabulário CSS:
     .ds-motion              container
     .ds-motion.is-entering  primeiro frame após mount (state: "from")
     .ds-motion.is-entered   após duração (state: "to")
     .ds-motion.is-exiting   antes do unmount
     .ds-motion.is-exited    depois (apenas se keepMounted=true)

   Princípio: o COMPONENTE filho recebe o ref e a className. Não há
   wrapper extra no DOM — preserva a hierarquia visual editorial.
   ================================================================ */

type TransitionState = "entering" | "entered" | "exiting" | "exited";

const STATE_CLASS: Record<TransitionState, string> = {
  entering: "is-entering",
  entered:  "is-entered",
  exiting:  "is-exiting",
  exited:   "is-exited",
};

export interface TransitionProps {
  /** Quando true, o conteúdo está visível. Toggle para animar entrada/saída. */
  in: boolean;
  /** Duração total em ms. Se omitido, lê var(--dur) (200ms padrão). */
  duration?: number;
  /** Easing CSS — qualquer string. Default: var(--ease). */
  easing?: string;
  /** Prefixo de className aplicado ao filho. Default: "ds-motion". */
  classNames?: string;
  /**
   * Se true, mantém o filho montado mesmo quando in=false (em estado
   * "exited" — útil para preservar foco/scroll). Default: false.
   */
  keepMounted?: boolean;
  /** Hooks de ciclo. */
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  /**
   * Filho ÚNICO. Recebe `className` e `ref` injetados — pode ser
   * qualquer elemento que aceita ref (ou um componente que faz
   * forwardRef).
   */
  children: ReactElement<any>;
}

/**
 * Transition — controlador de mount/unmount com classes por estado.
 * Zero deps, sem CSSTransition de react-transition-group.
 */
export function Transition({
  in: inProp,
  duration,
  easing,
  classNames = "ds-motion",
  keepMounted = false,
  onEnter,
  onEntered,
  onExit,
  onExited,
  children,
}: TransitionProps) {
  const reduceMotion = usePrefersReducedMotion();
  const effectiveDuration = reduceMotion ? 0 : duration ?? 200;

  /* mounted: existe no DOM. visible: in=true a algum momento. */
  const [mounted, setMounted] = useState(inProp);
  const [state, setState] = useState<TransitionState>(
    inProp ? "entered" : "exited"
  );

  /* Quando in muda, dispara enter ou exit. */
  useEffect(() => {
    if (inProp) {
      if (!mounted) setMounted(true);
      /* tick 1 — força "entering" no próximo frame (DOM já tem o nó) */
      requestAnimationFrame(() => {
        setState("entering");
        onEnter?.();
        /* tick 2 — após próxima paint, marca como "entered" pra disparar
           a transição CSS. RAF dobrado garante que o estilo "from" pintou. */
        requestAnimationFrame(() => setState("entered"));
      });
    } else {
      if (state === "exited") return;
      setState("exiting");
      onExit?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProp]);

  /* Quando entered, chama onEntered. Quando exiting termina, unmount. */
  useEffect(() => {
    if (state === "entering" || state === "entered") {
      const id = window.setTimeout(() => {
        if (state === "entered") onEntered?.();
      }, effectiveDuration);
      return () => window.clearTimeout(id);
    }
    if (state === "exiting") {
      const id = window.setTimeout(() => {
        setState("exited");
        if (!keepMounted) setMounted(false);
        onExited?.();
      }, effectiveDuration);
      return () => window.clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, effectiveDuration]);

  if (!mounted && !keepMounted) return null;

  const child = Children.only(children);
  if (!isValidElement<any>(child)) return null;

  const childClassName = (child.props as any).className ?? "";
  const childStyle = ((child.props as any).style as CSSProperties) ?? {};
  const merged = `${childClassName} ${classNames} ${STATE_CLASS[state]}`.trim();

  /* Injeta duration / easing como CSS vars no próprio elemento — assim
     o CSS dos atalhos (Fade, Slide, etc) consome var(--motion-dur). */
  const motionStyle: CSSProperties = {
    ...childStyle,
    /* Cast pra index signature aceitar custom props sem erro TS */
    ["--motion-dur" as any]: `${effectiveDuration}ms`,
    ["--motion-ease" as any]: easing ?? "var(--ease)",
  };

  return cloneElement(child, {
    className: merged,
    style: motionStyle,
  });
}

/* ================================================================
   Atalhos — Fade / Slide / Scale
   ================================================================ */

export interface FadeProps extends Omit<TransitionProps, "classNames"> {}
export function Fade(props: FadeProps) {
  return <Transition {...props} classNames="ds-motion ds-motion--fade" />;
}

export interface SlideProps extends Omit<TransitionProps, "classNames"> {
  /** Direção da entrada — o elemento começa deslocado dessa direção. */
  from?: "top" | "bottom" | "left" | "right";
  /** Distância em px do offset inicial. Default: 12. */
  distance?: number;
}
export function Slide({ from = "bottom", distance = 12, ...rest }: SlideProps) {
  /* Aplica direção como atributo data-* — CSS faz o trabalho */
  const child = Children.only(rest.children);
  if (!isValidElement<any>(child)) return null;
  const enriched = cloneElement(child, {
    "data-slide-from": from,
    style: {
      ...(child.props as any).style,
      ["--motion-slide-distance" as any]: `${distance}px`,
    },
  });
  return (
    <Transition {...rest} classNames="ds-motion ds-motion--slide">
      {enriched}
    </Transition>
  );
}

export interface ScaleProps extends Omit<TransitionProps, "classNames"> {
  /** Escala inicial. Default: 0.96. */
  from?: number;
}
export function Scale({ from = 0.96, ...rest }: ScaleProps) {
  const child = Children.only(rest.children);
  if (!isValidElement<any>(child)) return null;
  const enriched = cloneElement(child, {
    style: {
      ...(child.props as any).style,
      ["--motion-scale-from" as any]: String(from),
    },
  });
  return (
    <Transition {...rest} classNames="ds-motion ds-motion--scale">
      {enriched}
    </Transition>
  );
}

/* ================================================================
   Collapse — anima height: auto corretamente
   ----------------------------------------------------------------
   getBoundingClientRect mede a altura natural do conteúdo, define
   como pixel exato, e dispara transition para 0 (ou vice-versa).
   Após terminar, desativa height fixo pra permitir layout fluido
   (ResizeObserver futuro pode reagir, mas evitamos a complexidade).
   ================================================================ */

export interface CollapseProps {
  /** Quando true, expande pro tamanho natural. False colapsa pra 0. */
  open: boolean;
  /** Duração ms. Default 200. */
  duration?: number;
  /** Easing. Default var(--ease). */
  easing?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Collapse({
  open,
  duration = 200,
  easing,
  children,
  className = "",
  style,
}: CollapseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle-open" | "idle-closed" | "animating">(
    open ? "idle-open" : "idle-closed"
  );

  /* useLayoutEffect pra mexer em height ANTES da paint */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      el.style.height = open ? "auto" : "0";
      el.style.overflow = open ? "" : "hidden";
      setPhase(open ? "idle-open" : "idle-closed");
      return;
    }

    if (open && phase !== "idle-open") {
      /* expandir: 0 → measured → auto */
      const target = el.scrollHeight;
      el.style.height = "0px";
      el.style.overflow = "hidden";
      /* força reflow */
      void el.offsetHeight;
      setPhase("animating");
      el.style.height = `${target}px`;
      const id = window.setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.height = "auto";
        ref.current.style.overflow = "";
        setPhase("idle-open");
      }, duration);
      return () => window.clearTimeout(id);
    }

    if (!open && phase !== "idle-closed") {
      /* colapsar: auto → measured → 0 */
      const current = el.scrollHeight;
      el.style.height = `${current}px`;
      el.style.overflow = "hidden";
      void el.offsetHeight;
      setPhase("animating");
      el.style.height = "0px";
      const id = window.setTimeout(() => {
        setPhase("idle-closed");
      }, duration);
      return () => window.clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      ref={ref}
      className={`ds-collapse ${className}`.trim()}
      aria-hidden={!open}
      style={{
        ...style,
        transition: `height ${duration}ms ${easing ?? "var(--ease)"}`,
        height: open && phase === "idle-open" ? "auto" : phase === "idle-closed" ? "0" : undefined,
        overflow: phase === "idle-open" ? undefined : "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ================================================================
   ScrollReveal — anima entrada quando o elemento aparece na tela
   ----------------------------------------------------------------
   Usa useIntersectionObserver (Fase 10.1). once=true desconecta
   após primeira entrada. Direção controla o offset inicial.
   ================================================================ */

export type ScrollRevealDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  /** Tag a renderizar. Default: div. */
  as?: keyof JSX.IntrinsicElements;
  /** Direção de entrada. Default: "up". */
  direction?: ScrollRevealDirection;
  /** Delay em ms antes da animação iniciar. */
  delay?: number;
  /** Duração ms. Default --dur-xl (480). */
  duration?: number;
  /** Threshold do IntersectionObserver. Default 0.15. */
  threshold?: number;
  /** Se true, anima só uma vez (default true). */
  once?: boolean;
  /** Distância do offset inicial. Default 24. */
  distance?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function ScrollReveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 480,
  threshold = 0.15,
  once = true,
  distance = 24,
  className = "",
  style,
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const entry = useIntersectionObserver(ref, { threshold });
  const [hasEntered, setHasEntered] = useState(false);

  const visible = entry?.isIntersecting ?? false;

  useEffect(() => {
    if (visible && once && !hasEntered) setHasEntered(true);
  }, [visible, once, hasEntered]);

  const isVisible = once ? hasEntered || visible : visible;
  const effectiveDuration = reduceMotion ? 0 : duration;
  const effectiveDistance = reduceMotion ? 0 : distance;

  const merged = `ds-scroll-reveal ${isVisible ? "is-visible" : ""} ${className}`.trim();

  const composedStyle: CSSProperties = {
    ...style,
    ["--motion-dur" as any]: `${effectiveDuration}ms`,
    ["--motion-ease" as any]: "var(--ease-out)",
    ["--motion-delay" as any]: `${delay}ms`,
    ["--motion-reveal-distance" as any]: `${effectiveDistance}px`,
  };

  /* Tag dinâmica via JSX */
  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={merged}
      data-direction={direction}
      style={composedStyle}
    >
      {children}
    </Component>
  );
}
