import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import type { DropzoneProps, DropzoneMetaItem } from "./types.ts";

interface SlotProps {
  children?: ReactNode;
}
interface DropzoneMetaProps {
  items?: DropzoneMetaItem[];
}
interface DropzoneMetaRowProps extends DropzoneMetaItem {}

/* ================================================================
   Dropzone — API composable.
   ----------------------------------------------------------------
   Estado vazio:
     <Dropzone accept=".csv" onSelect={setFile}>
       <DropzoneIcon>csv<span className="dot">.</span></DropzoneIcon>
       <DropzoneTitle>Solte aqui ou <em>escolha</em></DropzoneTitle>
       <DropzoneHint>ou arraste um CSV aqui</DropzoneHint>
     </Dropzone>

   Estado preenchido:
     <DropzoneFile>
       <DropzoneFilename>{file.name}</DropzoneFilename>
       <DropzoneMeta items={[...]} />
       <DropzoneActions>
         <Button onClick={...}>Trocar</Button>
       </DropzoneActions>
     </DropzoneFile>
   ================================================================ */

export function Dropzone({
  accept,
  onSelect,
  children,
  className = "",
  ...rest
}: DropzoneProps) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = () => inputRef.current?.click();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onSelect?.(f);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onSelect?.(f);
  };

  const cls = ["dropzone"];
  if (drag) cls.push("drag");
  if (className) cls.push(className);

  return (
    <div
      className={cls.join(" ")}
      onClick={open}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      {...rest}
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInput}
      />
    </div>
  );
}

export function DropzoneIcon({ children }: SlotProps) {
  return <div className="icon">{children}</div>;
}

export function DropzoneTitle({ children }: SlotProps) {
  return <div className="title">{children}</div>;
}

export function DropzoneHint({ children }: SlotProps) {
  return <div className="sub">{children}</div>;
}

/* ---------- Estado preenchido ---------- */

export function DropzoneFile({ children }: SlotProps) {
  return (
    <div
      className="dropzone has-file"
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        textAlign: "left",
        padding: 24,
        minHeight: 200,
      }}
    >
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
}

export function DropzoneFilename({ children }: SlotProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 22,
        fontStyle: "italic",
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

export function DropzoneMeta({ items = [] }: DropzoneMetaProps) {
  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "110px 1fr",
        gap: "6px 16px",
        padding: "14px 0",
        borderTop: "1px solid var(--rule-soft)",
        borderBottom: "1px solid var(--rule-soft)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      {items.map(({ label, value }, i) => (
        <DropzoneMetaRow key={i} label={label} value={value} />
      ))}
    </dl>
  );
}

function DropzoneMetaRow({ label, value }: DropzoneMetaRowProps) {
  return (
    <>
      <dt
        style={{
          color: "var(--ink-faint)",
          textTransform: "uppercase",
          fontSize: 10,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </dt>
      <dd>{value}</dd>
    </>
  );
}

export function DropzoneActions({ children }: SlotProps) {
  return <div style={{ marginTop: 16 }}>{children}</div>;
}
