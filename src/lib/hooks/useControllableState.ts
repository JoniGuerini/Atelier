import { useCallback, useRef, useState } from "react";

/* ================================================================
   useControllableState (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Padroniza o "componente que pode ser controlled OU uncontrolled".
   Se `value` é fornecido (não-undefined), o componente está
   controlado pelo pai; caso contrário, mantém estado interno
   inicializado em `defaultValue`.

   `setValue` SEMPRE chama `onChange` quando definido — controlled
   ou uncontrolled. Padrão herdado de Radix/React Aria, simplificado.

   Decisão: refazemos in-house (vs. importar) por princípio
   zero-deps do Atelier.

   Exemplo (componente):
     export function MyToggle({ pressed, defaultPressed, onChange }: P) {
       const [isOn, setOn] = useControllableState({
         value: pressed, defaultValue: defaultPressed ?? false, onChange,
       });
       return <button onClick={() => setOn(!isOn)}>{isOn ? "on" : "off"}</button>;
     }
   ================================================================ */

export interface UseControllableStateProps<T> {
  /** Valor controlado pelo pai. Se undefined, o componente é uncontrolled. */
  value?: T;
  /** Valor inicial quando uncontrolled. */
  defaultValue: T;
  /** Chamado em todo set, controlled ou não. */
  onChange?: (value: T) => void;
}

type Setter<T> = (next: T | ((prev: T) => T)) => void;

export function useControllableState<T>(
  props: UseControllableStateProps<T>
): [T, Setter<T>] {
  const { value, defaultValue, onChange } = props;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const current = isControlled ? (value as T) : internal;

  const setValue = useCallback<Setter<T>>(
    (next) => {
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(current) : next;
      if (!isControlled) setInternal(resolved);
      onChangeRef.current?.(resolved);
    },
    [current, isControlled]
  );

  return [current, setValue];
}
