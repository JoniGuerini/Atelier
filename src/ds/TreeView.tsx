import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ================================================================
   TreeView — árvore de nós hierárquicos com expand/collapse,
   seleção (single ou multi) e navegação completa por teclado.
   ----------------------------------------------------------------
   API por DATA (recomendado):
     <TreeView
       data={[
         { id: "src", label: "src", children: [
           { id: "ds",  label: "ds/", children: [
             { id: "btn", label: "Button.tsx" }
           ]},
         ]}
       ]}
       selectionMode="multi"
       value={selected}
       onChange={setSelected}
     />

   Behavior:
     · Indentação automática por nível (--space-4 por nível)
     · Chevron rotaciona 90° quando expandido
     · Single ou multi seleção
     · Keyboard:
        ↑↓ navega (incluindo descendentes expandidos)
        ← colapsa (se aberto) OU sobe pro pai
        → expande (se fechado) OU desce pro 1º filho
        Home/End primeiro/último visível
        Enter/Space seleciona
================================================================ */

export interface TreeNode {
  id: string;
  label: ReactNode;
  /** Glifo opcional à esquerda (ex: § ¶ ▸). */
  glyph?: ReactNode;
  /** Filhos. Folhas: undefined ou []. */
  children?: TreeNode[];
  /** Bloqueia clique e nav. */
  disabled?: boolean;
}

export type TreeSelectionMode = "single" | "multi" | "none";

interface TreeViewCommonProps {
  data: TreeNode[];
  /** IDs expandidos por padrão. Default: nenhum. */
  defaultExpanded?: string[];
  /** Controle externo dos expandidos. */
  expanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  selectionMode?: TreeSelectionMode;
  className?: string;
  ariaLabel?: string;
}

export interface TreeViewSingleProps extends TreeViewCommonProps {
  selectionMode?: "single";
  value?: string | null;
  onChange?: (id: string | null) => void;
}

export interface TreeViewMultiProps extends TreeViewCommonProps {
  selectionMode: "multi";
  value?: string[];
  onChange?: (ids: string[]) => void;
}

export interface TreeViewNoneProps extends TreeViewCommonProps {
  selectionMode: "none";
}

export type TreeViewProps =
  | TreeViewSingleProps
  | TreeViewMultiProps
  | TreeViewNoneProps;

/* ----------------------------------------------------------------
   Context — compartilha state entre TreeView e os nós recursivos
---------------------------------------------------------------- */
interface TreeContextValue {
  expandedSet: Set<string>;
  toggleExpanded: (id: string) => void;
  selectionMode: TreeSelectionMode;
  isSelected: (id: string) => boolean;
  toggleSelected: (id: string) => void;
  /** Lista achatada de IDs visíveis (na ordem de render) — pra keyboard nav. */
  visibleIds: string[];
  /** ID do nó atualmente focado pelo teclado. */
  focusedId: string | null;
  setFocusedId: (id: string) => void;
}
const TreeContext = createContext<TreeContextValue | null>(null);
function useTreeCtx(component: string) {
  const ctx = useContext(TreeContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <TreeView>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */
function flattenVisible(
  nodes: TreeNode[],
  expandedSet: Set<string>,
): string[] {
  const out: string[] = [];
  const walk = (arr: TreeNode[]) => {
    arr.forEach((n) => {
      out.push(n.id);
      if (n.children?.length && expandedSet.has(n.id)) {
        walk(n.children);
      }
    });
  };
  walk(nodes);
  return out;
}

/** Acha o nó pelo id e devolve { node, parent, index, depth } */
function findNode(
  nodes: TreeNode[],
  id: string,
  parent: TreeNode | null = null,
  depth = 0,
): { node: TreeNode; parent: TreeNode | null; depth: number } | null {
  for (const n of nodes) {
    if (n.id === id) return { node: n, parent, depth };
    if (n.children?.length) {
      const found = findNode(n.children, id, n, depth + 1);
      if (found) return found;
    }
  }
  return null;
}

/* ----------------------------------------------------------------
   TreeView — componente principal
---------------------------------------------------------------- */
export function TreeView(props: TreeViewProps) {
  const {
    data,
    defaultExpanded = [],
    expanded: expandedProp,
    onExpandedChange,
    selectionMode = "single",
    className = "",
    ariaLabel,
  } = props;

  const [expandedInternal, setExpandedInternal] = useState<string[]>(
    defaultExpanded,
  );
  const isExpandedControlled = expandedProp !== undefined;
  const expandedArr = isExpandedControlled ? expandedProp! : expandedInternal;
  const expandedSet = useMemo(() => new Set(expandedArr), [expandedArr]);

  const setExpanded = useCallback(
    (next: string[]) => {
      if (!isExpandedControlled) setExpandedInternal(next);
      onExpandedChange?.(next);
    },
    [isExpandedControlled, onExpandedChange],
  );

  const toggleExpanded = useCallback(
    (id: string) => {
      const has = expandedSet.has(id);
      const next = has
        ? expandedArr.filter((x) => x !== id)
        : [...expandedArr, id];
      setExpanded(next);
    },
    [expandedSet, expandedArr, setExpanded],
  );

  /* ---- selection ---- */
  const isSelected = useCallback(
    (id: string): boolean => {
      if (selectionMode === "none") return false;
      if (selectionMode === "single") {
        return (props as TreeViewSingleProps).value === id;
      }
      const arr = (props as TreeViewMultiProps).value ?? [];
      return arr.includes(id);
    },
    [selectionMode, props],
  );

  const toggleSelected = useCallback(
    (id: string) => {
      if (selectionMode === "none") return;
      if (selectionMode === "single") {
        const sp = props as TreeViewSingleProps;
        sp.onChange?.(sp.value === id ? null : id);
      } else {
        const mp = props as TreeViewMultiProps;
        const arr = mp.value ?? [];
        mp.onChange?.(
          arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
        );
      }
    },
    [selectionMode, props],
  );

  /* ---- keyboard nav ---- */
  const visibleIds = useMemo(
    () => flattenVisible(data, expandedSet),
    [data, expandedSet],
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    visibleIds[0] ?? null,
  );

  // Garante que o focusedId continua válido quando a estrutura muda
  useEffect(() => {
    if (focusedId && !visibleIds.includes(focusedId)) {
      setFocusedId(visibleIds[0] ?? null);
    }
  }, [visibleIds, focusedId]);

  return (
    <TreeContext.Provider
      value={{
        expandedSet,
        toggleExpanded,
        selectionMode,
        isSelected,
        toggleSelected,
        visibleIds,
        focusedId,
        setFocusedId,
      }}
    >
      <ul
        className={`ds-tree ${className}`.trim()}
        role="tree"
        aria-label={ariaLabel}
        aria-multiselectable={selectionMode === "multi" || undefined}
      >
        {data.map((node) => (
          <TreeNodeView
            key={node.id}
            node={node}
            depth={0}
            data={data}
          />
        ))}
      </ul>
    </TreeContext.Provider>
  );
}

/* ----------------------------------------------------------------
   TreeNodeView — recursivo
---------------------------------------------------------------- */
interface TreeNodeViewProps {
  node: TreeNode;
  depth: number;
  data: TreeNode[];
}

function TreeNodeView({ node, depth, data }: TreeNodeViewProps) {
  const ctx = useTreeCtx("TreeNodeView");
  const isExpanded = ctx.expandedSet.has(node.id);
  const hasChildren = !!node.children?.length;
  const isSelected = ctx.isSelected(node.id);
  const isFocused = ctx.focusedId === node.id;
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Refoca quando ganha o focusedId (mantém o cursor visível)
  useEffect(() => {
    if (isFocused) buttonRef.current?.focus({ preventScroll: false });
  }, [isFocused]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (node.disabled) return;
    const idx = ctx.visibleIds.indexOf(node.id);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = ctx.visibleIds[idx + 1];
      if (next) ctx.setFocusedId(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = ctx.visibleIds[idx - 1];
      if (prev) ctx.setFocusedId(prev);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (hasChildren && !isExpanded) {
        ctx.toggleExpanded(node.id);
      } else if (hasChildren && isExpanded) {
        // Já expandido: vai pro primeiro filho
        const firstChildId = node.children![0].id;
        ctx.setFocusedId(firstChildId);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (hasChildren && isExpanded) {
        ctx.toggleExpanded(node.id);
      } else {
        // Sobe pro pai
        const found = findNode(data, node.id);
        if (found?.parent) ctx.setFocusedId(found.parent.id);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const first = ctx.visibleIds[0];
      if (first) ctx.setFocusedId(first);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = ctx.visibleIds[ctx.visibleIds.length - 1];
      if (last) ctx.setFocusedId(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (ctx.selectionMode !== "none") {
        ctx.toggleSelected(node.id);
      } else if (hasChildren) {
        ctx.toggleExpanded(node.id);
      }
    }
  };

  const cls = ["ds-tree-node"];
  if (isSelected) cls.push("selected");
  if (node.disabled) cls.push("disabled");
  if (isFocused) cls.push("focused");

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <button
        ref={buttonRef}
        type="button"
        tabIndex={isFocused ? 0 : -1}
        disabled={node.disabled}
        aria-selected={ctx.selectionMode !== "none" ? isSelected : undefined}
        className={cls.join(" ")}
        style={{ paddingLeft: `calc(var(--space-3) + ${depth} * 18px)` }}
        onClick={() => {
          if (node.disabled) return;
          ctx.setFocusedId(node.id);
          if (hasChildren) {
            ctx.toggleExpanded(node.id);
          }
          if (ctx.selectionMode !== "none") {
            ctx.toggleSelected(node.id);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <span
          className={`ds-tree-chevron ${isExpanded ? "open" : ""} ${
            !hasChildren ? "leaf" : ""
          }`}
          aria-hidden="true"
        >
          {hasChildren ? "▸" : ""}
        </span>
        {node.glyph != null && (
          <span className="ds-tree-glyph" aria-hidden="true">
            {node.glyph}
          </span>
        )}
        <span className="ds-tree-label">{node.label}</span>
        {ctx.selectionMode === "multi" && isSelected && (
          <span className="ds-tree-mark" aria-hidden="true">
            ✓
          </span>
        )}
      </button>
      {hasChildren && isExpanded && (
        <ul role="group">
          {node.children!.map((child) => (
            <TreeNodeView
              key={child.id}
              node={child}
              depth={depth + 1}
              data={data}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
