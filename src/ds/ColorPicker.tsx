import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  hexToHsv,
  hsvToHex,
  hsvToRgb,
  rgbToHsv,
  type HSV,
} from "./colorUtils.ts";

/* ================================================================
   ColorPicker — picker visual de cor (HSV).
   ----------------------------------------------------------------
   Layout:
     +---------------+ +---+
     |               | | h |
     |    SV plane   | | u |     +-------+
     |               | | e |     | swatch|
     |               | |   |     +-------+
     +---------------+ +---+
     hex: #c8361d              [presets]
     R: 200  G: 54  B: 29

   Behavior:
     · SV plane: drag/click ajusta saturação (X) e value/brightness (Y)
     · Hue slider vertical: ajusta o matiz (0-360°)
     · Inputs hex e RGB (decimal) editáveis com parse robusto
     · Presets opcionais: array de hex que aparecem como swatches
     · Controlado: passe value (hex) + onChange
     · alpha: opcional (default false)

   Sem libs externas. Conversões HSV/RGB/HSL/hex em colorUtils.ts.
================================================================ */

export interface ColorPickerProps {
  /** Cor atual em hex (#rrggbb ou #rrggbbaa). */
  value?: string;
  /** Callback ao mudar cor — sempre retorna hex. */
  onChange?: (hex: string) => void;
  /** Mostrar slider de alpha. Default: false. */
  alpha?: boolean;
  /** Lista de presets (hex). Renderizados como swatches abaixo do picker. */
  presets?: string[];
  /** Largura do plane SV. Default: 240. */
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export function ColorPicker({
  value = "#c8361d",
  onChange,
  alpha = false,
  presets,
  size = 240,
  className = "",
  ariaLabel,
}: ColorPickerProps) {
  /* Internal state em HSV — fonte da verdade. Sincroniza com value externo. */
  const [hsv, setHsv] = useState<HSV>(
    () => hexToHsv(value) ?? { h: 0, s: 100, v: 80, a: 1 },
  );
  const [hexInput, setHexInput] = useState(value);

  // Sincroniza state interno quando value externo muda
  useEffect(() => {
    const next = hexToHsv(value);
    if (next) {
      setHsv((prev) => ({ ...next, a: alpha ? prev.a ?? 1 : undefined }));
      setHexInput(value);
    }
  }, [value, alpha]);

  const emit = useCallback(
    (next: HSV) => {
      const hex = hsvToHex(next);
      setHexInput(hex);
      onChange?.(hex);
    },
    [onChange],
  );

  const updateHsv = (next: HSV) => {
    setHsv(next);
    emit(next);
  };

  /* ---- SV plane drag ---- */
  const planeRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerId: number; type: "sv" | "hue" | "alpha" } | null>(
    null,
  );

  const planeFromClient = (clientX: number, clientY: number) => {
    const el = planeRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const yPct = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    return {
      s: Math.round(xPct * 100),
      v: Math.round((1 - yPct) * 100),
    };
  };

  const onPlanePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const pos = planeFromClient(e.clientX, e.clientY);
    if (!pos) return;
    dragRef.current = { pointerId: e.pointerId, type: "sv" };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateHsv({ ...hsv, s: pos.s, v: pos.v });
  };

  const onPlanePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId || drag.type !== "sv") return;
    const pos = planeFromClient(e.clientX, e.clientY);
    if (pos) updateHsv({ ...hsv, s: pos.s, v: pos.v });
  };

  const onPlanePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId === e.pointerId) {
      dragRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* ---- Hue slider drag ---- */
  const hueRef = useRef<HTMLDivElement | null>(null);

  const hueFromClient = (clientY: number): number => {
    const el = hueRef.current;
    if (!el) return hsv.h;
    const rect = el.getBoundingClientRect();
    const yPct = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    return Math.round(yPct * 360);
  };

  const onHuePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { pointerId: e.pointerId, type: "hue" };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateHsv({ ...hsv, h: hueFromClient(e.clientY) });
  };

  const onHuePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId || drag.type !== "hue") return;
    updateHsv({ ...hsv, h: hueFromClient(e.clientY) });
  };

  const onHuePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId === e.pointerId) {
      dragRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* ---- Alpha slider drag ---- */
  const alphaRef = useRef<HTMLDivElement | null>(null);

  const alphaFromClient = (clientX: number): number => {
    const el = alphaRef.current;
    if (!el) return hsv.a ?? 1;
    const rect = el.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(xPct * 100) / 100;
  };

  const onAlphaPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { pointerId: e.pointerId, type: "alpha" };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateHsv({ ...hsv, a: alphaFromClient(e.clientX) });
  };

  const onAlphaPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId || drag.type !== "alpha") return;
    updateHsv({ ...hsv, a: alphaFromClient(e.clientX) });
  };

  const onAlphaPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId === e.pointerId) {
      dragRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* ---- Inputs hex/RGB ---- */
  const onHexBlur = () => {
    const next = hexToHsv(hexInput);
    if (next) updateHsv({ ...next, a: alpha ? hsv.a ?? 1 : undefined });
    else setHexInput(hsvToHex(hsv)); // restaura último válido
  };

  const rgb = useMemo(() => hsvToRgb(hsv), [hsv]);

  const onRgbChannel = (channel: "r" | "g" | "b", str: string) => {
    const n = parseInt(str, 10);
    if (!Number.isFinite(n) || n < 0 || n > 255) return;
    const next = rgbToHsv({ ...rgb, [channel]: n });
    updateHsv({ ...next, a: alpha ? hsv.a ?? 1 : undefined });
  };

  /* ---- Render ---- */
  const planeBg: CSSProperties = {
    background: `
      linear-gradient(to top, #000, transparent),
      linear-gradient(to right, #fff, transparent),
      hsl(${hsv.h}, 100%, 50%)
    `,
  };

  const swatchBg = hsvToHex(hsv);

  const cls = ["ds-color-picker"];
  if (className) cls.push(className);

  return (
    <div className={cls.join(" ")} role="group" aria-label={ariaLabel}>
      <div className="ds-color-picker-row">
        {/* SV plane */}
        <div
          ref={planeRef}
          className="ds-color-picker-plane"
          style={{ ...planeBg, width: size, height: size }}
          onPointerDown={onPlanePointerDown}
          onPointerMove={onPlanePointerMove}
          onPointerUp={onPlanePointerUp}
          onPointerCancel={onPlanePointerUp}
          aria-label="Saturation and brightness"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={hsv.v}
          tabIndex={0}
        >
          <span
            className="ds-color-picker-plane-cursor"
            style={{
              left: `${hsv.s}%`,
              top: `${100 - hsv.v}%`,
              borderColor: hsv.v > 60 ? "#000" : "#fff",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Hue slider vertical */}
        <div
          ref={hueRef}
          className="ds-color-picker-hue"
          style={{ height: size }}
          onPointerDown={onHuePointerDown}
          onPointerMove={onHuePointerMove}
          onPointerUp={onHuePointerUp}
          onPointerCancel={onHuePointerUp}
          aria-label="Hue"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={hsv.h}
          tabIndex={0}
        >
          <span
            className="ds-color-picker-hue-cursor"
            style={{ top: `${(hsv.h / 360) * 100}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Swatch (cor atual) */}
        <div className="ds-color-picker-swatch-wrap">
          <div
            className="ds-color-picker-swatch"
            style={{ background: swatchBg }}
            aria-label={`Selected color: ${hexInput}`}
          />
        </div>
      </div>

      {/* Alpha slider opcional */}
      {alpha && (
        <div
          ref={alphaRef}
          className="ds-color-picker-alpha"
          style={{
            background: `linear-gradient(to right, transparent, ${hsvToHex({ ...hsv, a: 1 })})`,
          }}
          onPointerDown={onAlphaPointerDown}
          onPointerMove={onAlphaPointerMove}
          onPointerUp={onAlphaPointerUp}
          onPointerCancel={onAlphaPointerUp}
          aria-label="Alpha"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((hsv.a ?? 1) * 100)}
          tabIndex={0}
        >
          <span
            className="ds-color-picker-alpha-cursor"
            style={{ left: `${(hsv.a ?? 1) * 100}%` }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Inputs hex + RGB */}
      <div className="ds-color-picker-inputs">
        <label className="ds-color-picker-input">
          <span>HEX</span>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onBlur={onHexBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            spellCheck={false}
          />
        </label>
        <label className="ds-color-picker-input">
          <span>R</span>
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) => onRgbChannel("r", e.target.value)}
          />
        </label>
        <label className="ds-color-picker-input">
          <span>G</span>
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) => onRgbChannel("g", e.target.value)}
          />
        </label>
        <label className="ds-color-picker-input">
          <span>B</span>
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) => onRgbChannel("b", e.target.value)}
          />
        </label>
      </div>

      {/* Presets opcionais */}
      {presets && presets.length > 0 && (
        <div className="ds-color-picker-presets" role="group" aria-label="Presets">
          {presets.map((p) => {
            const isActive = p.toLowerCase() === hexInput.toLowerCase();
            return (
              <button
                key={p}
                type="button"
                className={`ds-color-picker-preset ${isActive ? "active" : ""}`}
                style={{ background: p }}
                aria-label={p}
                aria-pressed={isActive}
                onClick={() => {
                  const next = hexToHsv(p);
                  if (next)
                    updateHsv({ ...next, a: alpha ? hsv.a ?? 1 : undefined });
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
