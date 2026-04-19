import {
  Fragment,
  useMemo,
  type ReactNode,
} from "react";

/* ================================================================
   MarkdownViewer — render de Markdown em React puro.
   ----------------------------------------------------------------
   Parser próprio em ~150 linhas. Cobre o essencial do GFM:
     · Headings:    # ## ### #### ##### ######
     · Parágrafo:   blocos separados por linha vazia
     · Bold:        **texto** ou __texto__
     · Italic:      *texto* ou _texto_
     · Inline code: `code`
     · Link:        [label](url)
     · Image:       ![alt](url)
     · Lists:       - item / 1. item (até 1 nível de aninhamento)
     · Blockquote:  > linha
     · Code block:  ```lang\n...\n```
     · Hr:          --- ou *** numa linha
     · Quebra:      <br/> em \n duplo dentro do mesmo paragrafo

   Sem libs (zero dep). Não suporta tabelas, footnotes, GFM
   completo nem HTML inline — pra esses casos, use uma adapter
   específica (futuro Phase 5.3 com marked/remark).
================================================================ */

export interface MarkdownViewerProps {
  /** O markdown como string. */
  children?: string;
  /** Limita largura do conteúdo (default: 65ch — ideal pra leitura). */
  maxWidth?: number | string;
  className?: string;
}

export function MarkdownViewer({
  children = "",
  maxWidth = "65ch",
  className = "",
}: MarkdownViewerProps) {
  const blocks = useMemo(() => parseMarkdown(children), [children]);

  return (
    <div
      className={`ds-md ${className}`.trim()}
      style={{ maxWidth }}
    >
      {blocks}
    </div>
  );
}

/* ================================================================
   Parser
   ================================================================ */

interface CodeBlock {
  type: "code";
  lang: string;
  content: string;
}
interface HrBlock {
  type: "hr";
}
interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}
interface ListBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}
interface QuoteBlock {
  type: "quote";
  text: string;
}
interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

type Block =
  | CodeBlock
  | HrBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | ParagraphBlock;

function parseMarkdown(src: string): ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block ```lang...```
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      i++;
      const content: string[] = [];
      while (i < lines.length && !/^```/.test(lines[i])) {
        content.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", lang, content: content.join("\n") });
      continue;
    }

    // Linha em branco — pula
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Hr: --- ou ***
    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Heading
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      blocks.push({
        type: "heading",
        level: hMatch[1].length as HeadingBlock["level"],
        text: hMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const content: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        content.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: content.join(" ") });
      continue;
    }

    // List (unordered: -, *, +; ordered: 1.)
    if (/^(\s*)([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        /^(\s*)([-*+]|\d+\.)\s+/.test(lines[i])
      ) {
        items.push(lines[i].replace(/^(\s*)([-*+]|\d+\.)\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    // Parágrafo: junta linhas adjacentes não-vazias até a próxima linha em branco
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,6}\s|>\s?|```|---|\*\*\*|\s*([-*+]|\d+\.)\s+)/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join("\n") });
  }

  return blocks.map((b, idx) => renderBlock(b, idx));
}

/* ================================================================
   Render por tipo de bloco
   ================================================================ */
function renderBlock(b: Block, key: number): ReactNode {
  switch (b.type) {
    case "hr":
      return <hr key={key} className="ds-md-hr" />;

    case "heading": {
      const Tag = `h${b.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={key} className={`ds-md-h ds-md-h-${b.level}`}>
          {renderInline(b.text)}
        </Tag>
      );
    }

    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag key={key} className="ds-md-list">
          {b.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote key={key} className="ds-md-quote">
          {renderInline(b.text)}
        </blockquote>
      );

    case "code":
      return (
        <pre key={key} className="ds-md-code" data-lang={b.lang || undefined}>
          <code>{b.content}</code>
        </pre>
      );

    case "paragraph":
      return (
        <p key={key} className="ds-md-p">
          {renderInline(b.text)}
        </p>
      );
  }
}

/* ================================================================
   Inline parsing — bold, italic, code, links, images, line breaks.
   Funciona com regex sequencial + tokenização. Não é AST completa,
   mas dá conta dos casos do dia a dia.
   ================================================================ */
function renderInline(text: string): ReactNode {
  // Quebra em segmentos por padrões. Ordem importa: code primeiro
  // (porque seu conteúdo não deve ser parseado), depois links/imagens,
  // depois bold/italic.
  const tokens: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Image ![alt](url)
  const imgRe = /!\[([^\]]*)\]\(([^)]+)\)/;
  // Link [label](url)
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
  // Inline code `xxx`
  const codeRe = /`([^`]+)`/;
  // Bold **xxx** ou __xxx__
  const boldRe = /\*\*([^*]+)\*\*|__([^_]+)__/;
  // Italic *xxx* ou _xxx_ (não greedy)
  const italicRe = /\*([^*\n]+)\*|_([^_\n]+)_/;

  /** Encontra a próxima ocorrência (qualquer regex) e retorna o
      mais cedo. Devolve { regex, match, type } ou null. */
  type Hit = { type: string; match: RegExpExecArray };
  const findNext = (str: string): Hit | null => {
    const candidates: Hit[] = [];
    for (const [type, re] of [
      ["img", imgRe],
      ["link", linkRe],
      ["code", codeRe],
      ["bold", boldRe],
      ["italic", italicRe],
    ] as const) {
      const m = re.exec(str);
      if (m) candidates.push({ type, match: m });
    }
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => a.match.index - b.match.index);
    return candidates[0];
  };

  while (remaining.length > 0) {
    const next = findNext(remaining);
    if (!next) {
      tokens.push(renderText(remaining, key++));
      break;
    }
    const before = remaining.slice(0, next.match.index);
    if (before) tokens.push(renderText(before, key++));

    const m = next.match;
    switch (next.type) {
      case "img":
        tokens.push(
          <img
            key={key++}
            src={m[2]}
            alt={m[1]}
            className="ds-md-img"
          />,
        );
        break;
      case "link":
        tokens.push(
          <a
            key={key++}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-md-link"
          >
            {m[1]}
          </a>,
        );
        break;
      case "code":
        tokens.push(
          <code key={key++} className="ds-md-inline-code">
            {m[1]}
          </code>,
        );
        break;
      case "bold":
        tokens.push(
          <strong key={key++} className="ds-md-bold">
            {m[1] ?? m[2]}
          </strong>,
        );
        break;
      case "italic":
        tokens.push(
          <em key={key++} className="ds-md-italic">
            {m[1] ?? m[2]}
          </em>,
        );
        break;
    }
    remaining = remaining.slice(next.match.index + m[0].length);
  }

  return tokens;
}

/** Renderiza texto puro convertendo \n simples em <br/>. */
function renderText(s: string, key: number): ReactNode {
  if (!s.includes("\n")) return <Fragment key={key}>{s}</Fragment>;
  const parts = s.split("\n");
  return (
    <Fragment key={key}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </Fragment>
  );
}
