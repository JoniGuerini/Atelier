import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "./primitives.tsx";
import { AVATAR_PRESETS, groupAvatarPresets } from "./avatarPresets.tsx";
import { useT } from "../lib/i18n.tsx";

/* Lê um File como dataURL — Promise wrapper do FileReader. */
function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- AvatarCropper ----------
   Recebe uma imagem (dataURL) e devolve outra (dataURL recortado)
   via callback `onConfirm`. Estado interno:
     • zoom (1..3)
     • offset (x, y) em pixels relativos ao centro da viewport
   Renderização sempre em viewport circular (220px) com máscara SVG.
*/
const VIEW = 220;
const OUTPUT = 256;

interface AvatarCropperProps {
  src: string;
  onConfirm: (cropped: string) => void;
  onCancel: () => void;
}
function AvatarCropper({ src, onConfirm, onCancel }: AvatarCropperProps) {
  const { t } = useT();
  const [img, setImg] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    const el = new Image();
    el.onload = () => {
      setImg(el);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    el.src = src;
  }, [src]);

  const onPointerDown = (e: any) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: offset.x,
      origY: offset.y,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: any) => {
    if (!dragRef.current) return;
    const { startX, startY, origX, origY } = dragRef.current;
    setOffset({ x: origX + (e.clientX - startX), y: origY + (e.clientY - startY) });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  // Escala base: "cover" no viewport
  const cover = img
    ? Math.max(VIEW / img.naturalWidth, VIEW / img.naturalHeight)
    : 1;
  const scale = cover * zoom;
  const w = img ? img.naturalWidth * scale : 0;
  const h = img ? img.naturalHeight * scale : 0;

  const handleConfirm = useCallback(() => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = OUTPUT / VIEW;

    // Desenha a imagem com as mesmas transformações da preview,
    // porém escaladas para OUTPUT.
    ctx.save();
    ctx.beginPath();
    ctx.arc(OUTPUT / 2, OUTPUT / 2, OUTPUT / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUTPUT, OUTPUT);

    const drawW = w * ratio;
    const drawH = h * ratio;
    const dx = (OUTPUT - drawW) / 2 + offset.x * ratio;
    const dy = (OUTPUT - drawH) / 2 + offset.y * ratio;
    ctx.drawImage(img, dx, dy, drawW, drawH);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const reader = new FileReader();
        reader.onload = () => onConfirm?.(reader.result as string);
        reader.readAsDataURL(blob);
      },
      "image/png",
      0.92
    );
  }, [img, w, h, offset, onConfirm]);

  return (
    <div className="ds-avatar-cropper">
      <div
        className="ds-avatar-cropper-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {img && (
          <img
            src={src}
            alt=""
            draggable={false}
            style={{
              width: w,
              height: h,
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
            }}
          />
        )}
        <div className="ds-avatar-cropper-mask" aria-hidden="true" />
      </div>

      <div className="ds-avatar-cropper-controls">
        <label className="ds-avatar-zoom">
          <span>{t("pages.avatars.picker.zoom")}</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
        </label>
        <div className="ds-avatar-cropper-actions">
          <button type="button" className="ds-btn link" onClick={onCancel}>
            {t("pages.avatars.picker.cancel")}
          </button>
          <button
            type="button"
            className="ds-btn"
            onClick={handleConfirm}
            disabled={!img}
          >
            {t("pages.avatars.picker.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- AvatarPicker ----------
   Componente completo: preview + upload (clique ou drag&drop) +
   galeria de presets + cropper em etapa.
   Props:
     • value:    avatar atual  { kind: "image"|"preset"|"initials", src?, presetId?, initials? }
     • onChange: chamado com novo value
     • initials: fallback quando nada está selecionado
     • presets:  lista de presets (usa AVATAR_PRESETS por padrão)
*/
interface AvatarPickerProps {
  value?: any;
  onChange?: (value: any) => void;
  initials?: string;
  presets?: any[];
}
export function AvatarPicker({
  value,
  onChange,
  initials = "",
  presets = AVATAR_PRESETS,
}: AvatarPickerProps) {
  const { t } = useT();
  const [drag, setDrag] = useState(false);
  const [pending, setPending] = useState(null); // dataURL aguardando crop
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = await fileToDataURL(file);
    setPending(url as any);
  }, []);

  const handleInput = (e: any) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const pickPreset = (preset: any) => {
    onChange?.({ kind: "preset", presetId: preset.id });
  };

  const clear = () => onChange?.({ kind: "initials", initials });

  const groups = groupAvatarPresets(presets);
  const current = value ?? { kind: "initials", initials };
  const currentPreset =
    current.kind === "preset" ? presets.find((p: any) => p.id === current.presetId) : null;

  const previewNode =
    current.kind === "image" && current.src ? (
      <Avatar src={current.src} size="xl" shape="circle" alt={initials} />
    ) : currentPreset ? (
      <Avatar size="xl" shape="circle" initials={initials}>
        {currentPreset.render()}
      </Avatar>
    ) : (
      <Avatar size="xl" shape="circle" initials={initials || "—"} variant="solid" />
    );

  return (
    <div className="ds-avatar-picker">
      {pending ? (
        <AvatarCropper
          src={pending}
          onConfirm={(dataUrl) => {
            onChange?.({ kind: "image", src: dataUrl });
            setPending(null);
          }}
          onCancel={() => setPending(null)}
        />
      ) : (
        <>
          <div className="ds-avatar-picker-preview">
            {previewNode}
            <div className="ds-avatar-picker-meta">
              <div className="kicker">{t("pages.avatars.picker.currentLabel")}</div>
              <div className="state">
                {current.kind === "image" && t("pages.avatars.picker.stateImage")}
                {current.kind === "preset" && t("pages.avatars.picker.statePreset")}
                {current.kind === "initials" && t("pages.avatars.picker.stateInitials")}
              </div>
              {current.kind !== "initials" && (
                <button type="button" className="ds-btn link" onClick={clear}>
                  {t("pages.avatars.picker.remove")}
                </button>
              )}
            </div>
          </div>

          <div
            className={`ds-avatar-upload ${drag ? "drag" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
          >
            <div className="ds-avatar-upload-title">
              {t("pages.avatars.picker.uploadA")}
              <em>{t("pages.avatars.picker.uploadB")}</em>
              {t("pages.avatars.picker.uploadC")}
            </div>
            <div className="ds-avatar-upload-sub">
              {t("pages.avatars.picker.uploadHint")}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleInput}
            />
          </div>

          <div className="ds-avatar-presets">
            {["monogram", "geometric", "ornament"].map((kind: any) =>
              groups[kind]?.length ? (
                <div key={kind} className="ds-avatar-presets-group">
                  <div className="ds-avatar-presets-label">
                    {t(`pages.avatars.picker.groups.${kind}`)}
                  </div>
                  <div className="ds-avatar-presets-grid">
                    {groups[kind].map((p: any) => {
                      const active =
                        current.kind === "preset" && current.presetId === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className={`ds-avatar-preset ${active ? "active" : ""}`}
                          onClick={() => pickPreset(p)}
                          aria-label={p.label}
                          aria-pressed={active}
                        >
                          {p.render()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
}
