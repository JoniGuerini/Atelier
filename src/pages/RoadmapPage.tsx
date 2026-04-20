import { useMemo, useState } from "react";
import { PageHead, Section, Badge } from "../ds/primitives.tsx";
import { Card, CardKicker, CardTitle, CardBody } from "../ds/Card.tsx";
import { useT } from "../lib/i18n.tsx";
import {
  ROADMAP,
  countProgress,
  type RoadmapPhase,
  type RoadmapStatus,
  type RoadmapPriority,
} from "../lib/roadmap.ts";
import type { BadgeVariant } from "../ds/types.ts";

/* ================================================================
   Roadmap — página /roadmap.
   ----------------------------------------------------------------
   Renderiza o conteúdo de src/lib/roadmap.ts com:
     - busca textual (nome, descrição, escopo)
     - filtro por status (entregue / próximo / contínuo)
     - filtro por prioridade (alta / média / contínuo)
     - toggle "só o que falta" (esconde fases done)
     - link direto pra docs de componentes entregues (routeId)

   Marcado como `tool: true` em routes.ts (fica fora da paginação
   editorial prev/next), mas SEM `fluid: true` — então mantém o
   bloco central de leitura como qualquer outra página de doc.
   O Studio (/create), em contraste, é `tool: true, fluid: true`.
   ================================================================ */

interface Filters {
  query: string;
  status: RoadmapStatus | "all";
  priority: RoadmapPriority | "all";
  pendingOnly: boolean;
}

const STATUS_BADGE: Record<RoadmapStatus, BadgeVariant> = {
  done: "ok",
  next: "accent",
  ongoing: "info",
};

const PRIORITY_BADGE: Record<RoadmapPriority, BadgeVariant> = {
  high: "warn",
  medium: "info",
  ongoing: "default",
  none: "default",
};

interface RoadmapPageProps {
  onNavigate?: (slug: string) => void;
}

export default function RoadmapPage({ onNavigate }: RoadmapPageProps) {
  const { t, tr } = useT();
  const [filters, setFilters] = useState<Filters>({
    query: "",
    status: "all",
    priority: "all",
    pendingOnly: false,
  });

  const { done, total } = useMemo(() => countProgress(ROADMAP), []);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const filteredPhases = useMemo(
    () => filterPhases(ROADMAP.phases, filters),
    [filters]
  );

  const statusLabels: Record<RoadmapStatus | "all", string> = {
    all: t("pages.roadmap.filters.all"),
    done: t("pages.roadmap.status.done"),
    next: t("pages.roadmap.status.next"),
    ongoing: t("pages.roadmap.status.ongoing"),
  };

  const priorityLabels: Record<RoadmapPriority | "all", string> = {
    all: t("pages.roadmap.filters.all"),
    high: t("pages.roadmap.priority.high"),
    medium: t("pages.roadmap.priority.medium"),
    ongoing: t("pages.roadmap.priority.ongoing"),
    none: t("pages.roadmap.priority.none"),
  };

  return (
    <>
      <PageHead
        lead={t("pages.roadmap.lead")}
        title={
          <>
            {t("pages.roadmap.titleA")} <em>{t("pages.roadmap.titleB")}</em>
          </>
        }
        metaLabel={t("pages.roadmap.metaLabel")}
        meta={ROADMAP.meta.updated}
        intro={tr("pages.roadmap.intro")}
      />

      {/* Progress global */}
      <div className="roadmap-progress" role="status" aria-live="polite">
        <div className="roadmap-progress-bar">
          <div
            className="roadmap-progress-fill"
            style={{ width: `${pct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="roadmap-progress-meta">
          <span className="roadmap-progress-num">
            {done} <span className="roadmap-progress-of">/</span> {total}
          </span>
          <span className="roadmap-progress-label">
            {t("pages.roadmap.progress.label")} · {pct}%
          </span>
        </div>
      </div>

      {/* Toolbar — busca + filtros */}
      <div className="roadmap-toolbar" role="search">
        <label className="roadmap-search">
          <span className="visually-hidden">
            {t("pages.roadmap.search.label")}
          </span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) =>
              setFilters((f) => ({ ...f, query: e.target.value }))
            }
            placeholder={t("pages.roadmap.search.placeholder")}
            className="roadmap-search-input"
            aria-label={t("pages.roadmap.search.label")}
          />
        </label>

        <FilterChipGroup
          label={t("pages.roadmap.filters.statusLabel")}
          value={filters.status}
          options={
            [
              { id: "all", label: statusLabels.all },
              { id: "done", label: statusLabels.done },
              { id: "next", label: statusLabels.next },
              { id: "ongoing", label: statusLabels.ongoing },
            ] as const
          }
          onChange={(v) =>
            setFilters((f) => ({ ...f, status: v as Filters["status"] }))
          }
        />

        <FilterChipGroup
          label={t("pages.roadmap.filters.priorityLabel")}
          value={filters.priority}
          options={
            [
              { id: "all", label: priorityLabels.all },
              { id: "high", label: priorityLabels.high },
              { id: "medium", label: priorityLabels.medium },
              { id: "ongoing", label: priorityLabels.ongoing },
            ] as const
          }
          onChange={(v) =>
            setFilters((f) => ({ ...f, priority: v as Filters["priority"] }))
          }
        />

        <label className="roadmap-toggle">
          <input
            type="checkbox"
            checked={filters.pendingOnly}
            onChange={(e) =>
              setFilters((f) => ({ ...f, pendingOnly: e.target.checked }))
            }
          />
          <span>{t("pages.roadmap.filters.pendingOnly")}</span>
        </label>
      </div>

      {/* i · Princípios */}
      <Section
        num="i"
        title={
          <>
            {t("pages.roadmap.principles.titleA")}{" "}
            <em>{t("pages.roadmap.principles.titleB")}</em>
          </>
        }
        kicker={t("pages.roadmap.principles.kicker")}
      >
        <p className="section-desc">{t("pages.roadmap.principles.desc")}</p>
        <div className="roadmap-principles-grid">
          {ROADMAP.principles.map((p, i) => (
            <Card key={p.id}>
              <CardKicker>{romanize(i + 1)}</CardKicker>
              <CardTitle>{p.title}</CardTitle>
              <CardBody>{p.description}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* ii · Fases */}
      <Section
        num="ii"
        title={
          <>
            {t("pages.roadmap.phases.titleA")}{" "}
            <em>{t("pages.roadmap.phases.titleB")}</em>
          </>
        }
        kicker={t("pages.roadmap.phases.kicker")}
      >
        <p className="section-desc">
          {filteredPhases.length === 0
            ? t("pages.roadmap.phases.empty")
            : tr("pages.roadmap.phases.count", {
                n: String(filteredPhases.length),
              })}
        </p>

        <div className="roadmap-phases">
          {filteredPhases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onNavigate={onNavigate}
              t={t}
              statusLabels={statusLabels}
              priorityLabels={priorityLabels}
            />
          ))}
        </div>
      </Section>

      {/* iii · Convenções */}
      <Section
        num="iii"
        title={
          <>
            {t("pages.roadmap.conventions.titleA")}{" "}
            <em>{t("pages.roadmap.conventions.titleB")}</em>
          </>
        }
        kicker={t("pages.roadmap.conventions.kicker")}
      >
        <p className="section-desc">{t("pages.roadmap.conventions.desc")}</p>
        <div className="roadmap-conventions">
          {ROADMAP.conventions.map((c, i) => (
            <div key={i} className="roadmap-convention">
              <h3 className="roadmap-convention-title">{c.title}</h3>
              <ul className="roadmap-convention-list">
                {c.items.map((it, j) => {
                  const label = typeof it === "string" ? it : it.label;
                  return (
                    <li key={j} className="roadmap-convention-item">
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* iv · Sequência recomendada */}
      <Section
        num="iv"
        title={
          <>
            {t("pages.roadmap.sequence.titleA")}{" "}
            <em>{t("pages.roadmap.sequence.titleB")}</em>
          </>
        }
        kicker={t("pages.roadmap.sequence.kicker")}
      >
        <p className="section-desc">{t("pages.roadmap.sequence.desc")}</p>
        <ol className="roadmap-sequence">
          {ROADMAP.sequence.map((step) => (
            <li key={step.order} className="roadmap-sequence-item">
              <span className="roadmap-sequence-num">
                {String(step.order).padStart(2, "0")}
              </span>
              <div className="roadmap-sequence-body">
                <div className="roadmap-sequence-ref">
                  {t("pages.roadmap.phases.singular")} {step.phaseRef}
                </div>
                <div className="roadmap-sequence-reason">{step.reason}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------
   PhaseCard — render de uma fase (entregue ou planejada).
---------------------------------------------------------------- */

interface PhaseCardProps {
  phase: RoadmapPhase;
  onNavigate?: (slug: string) => void;
  t: (k: string) => string;
  statusLabels: Record<RoadmapStatus | "all", string>;
  priorityLabels: Record<RoadmapPriority | "all", string>;
}

function PhaseCard({
  phase,
  onNavigate,
  t,
  statusLabels,
  priorityLabels,
}: PhaseCardProps) {
  return (
    <article className={`roadmap-phase roadmap-phase--${phase.status}`}>
      <header className="roadmap-phase-head">
        <div className="roadmap-phase-head-main">
          <div className="roadmap-phase-num">{phase.number}</div>
          <div>
            <h3 className="roadmap-phase-title">{phase.title}</h3>
            {phase.summary && (
              <p className="roadmap-phase-summary">{phase.summary}</p>
            )}
          </div>
        </div>
        <div className="roadmap-phase-badges">
          <Badge variant={STATUS_BADGE[phase.status]}>
            {statusLabels[phase.status]}
          </Badge>
          {phase.priority !== "none" && (
            <Badge variant={PRIORITY_BADGE[phase.priority]}>
              {priorityLabels[phase.priority]}
            </Badge>
          )}
        </div>
      </header>

      {phase.delivered && phase.delivered.length > 0 && (
        <ul className="roadmap-delivered">
          {phase.delivered.map((d, i) => {
            const isLink = !!d.routeId && !!onNavigate;
            const inner = (
              <>
                <span className="roadmap-delivered-name">{d.name}</span>
                {d.note && (
                  <span className="roadmap-delivered-note"> · {d.note}</span>
                )}
              </>
            );
            return (
              <li key={i} className="roadmap-delivered-item">
                <span className="roadmap-delivered-marker" aria-hidden="true">
                  ✓
                </span>
                {isLink ? (
                  <button
                    type="button"
                    className="roadmap-delivered-link"
                    onClick={() => onNavigate!(d.routeId!)}
                    title={t("pages.roadmap.delivered.openDoc")}
                  >
                    {inner}
                  </button>
                ) : (
                  <span>{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {phase.tasks && phase.tasks.length > 0 && (
        <div className="roadmap-tasks">
          {phase.tasks.map((task) => (
            <div key={task.id} className="roadmap-task">
              <header className="roadmap-task-head">
                <span className="roadmap-task-id">{task.id}</span>
                <h4 className="roadmap-task-title">{task.title}</h4>
                {task.size && (
                  <span className="roadmap-task-size">{task.size}</span>
                )}
              </header>
              {task.summary && (
                <p className="roadmap-task-summary">{task.summary}</p>
              )}

              {task.scope && task.scope.length > 0 && (
                <TaskBlock
                  label={t("pages.roadmap.task.scope")}
                  items={task.scope}
                />
              )}
              {task.deps && task.deps.length > 0 && (
                <TaskBlock
                  label={t("pages.roadmap.task.deps")}
                  items={task.deps}
                  inline
                />
              )}
              {task.acceptance && task.acceptance.length > 0 && (
                <TaskBlock
                  label={t("pages.roadmap.task.acceptance")}
                  items={task.acceptance}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

/* ----------------------------------------------------------------
   TaskBlock — sub-bloco de scope / deps / acceptance.
---------------------------------------------------------------- */

function TaskBlock({
  label,
  items,
  inline = false,
}: {
  label: string;
  items: string[];
  inline?: boolean;
}) {
  return (
    <div className={`roadmap-task-block ${inline ? "is-inline" : ""}`}>
      <div className="roadmap-task-block-label">{label}</div>
      {inline ? (
        <div className="roadmap-task-deps">
          {items.map((it, i) => (
            <span key={i} className="roadmap-task-dep">
              {it}
            </span>
          ))}
        </div>
      ) : (
        <ul className="roadmap-task-list">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------
   FilterChipGroup — chips segmentados (radio).
---------------------------------------------------------------- */

interface FilterChipGroupProps<T extends string> {
  label: string;
  value: T;
  options: ReadonlyArray<{ readonly id: T; readonly label: string }>;
  onChange: (v: T) => void;
}

function FilterChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterChipGroupProps<T>) {
  return (
    <div className="roadmap-chips" role="radiogroup" aria-label={label}>
      <span className="roadmap-chips-label">{label}</span>
      <div className="roadmap-chips-row">
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              className={`roadmap-chip ${active ? "is-active" : ""}`}
              onClick={() => onChange(opt.id)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Helpers de filtragem
---------------------------------------------------------------- */

function filterPhases(phases: RoadmapPhase[], filters: Filters): RoadmapPhase[] {
  const q = filters.query.trim().toLowerCase();

  return phases
    .filter((phase) => {
      if (filters.pendingOnly && phase.status === "done") return false;
      if (filters.status !== "all" && phase.status !== filters.status)
        return false;
      if (filters.priority !== "all" && phase.priority !== filters.priority)
        return false;
      return true;
    })
    .map((phase) => {
      if (!q) return phase;
      // Busca textual: filtra delivered/tasks que match e mantém a fase
      // se ela própria match no título/summary OU tem itens que match.
      const phaseMatches =
        phase.title.toLowerCase().includes(q) ||
        (phase.summary?.toLowerCase().includes(q) ?? false);

      const filteredDelivered = phase.delivered?.filter((d) =>
        [d.name, d.note].some((s) => s?.toLowerCase().includes(q))
      );

      const filteredTasks = phase.tasks?.filter((task) => {
        const inHead =
          task.title.toLowerCase().includes(q) ||
          (task.summary?.toLowerCase().includes(q) ?? false) ||
          task.id.toLowerCase().includes(q);
        const inScope = task.scope?.some((s) =>
          s.toLowerCase().includes(q)
        );
        const inDeps = task.deps?.some((s) => s.toLowerCase().includes(q));
        const inAcc = task.acceptance?.some((s) =>
          s.toLowerCase().includes(q)
        );
        return inHead || inScope || inDeps || inAcc;
      });

      const hasMatch =
        phaseMatches ||
        (filteredDelivered && filteredDelivered.length > 0) ||
        (filteredTasks && filteredTasks.length > 0);

      if (!hasMatch) return null;

      return {
        ...phase,
        delivered: phaseMatches
          ? phase.delivered
          : filteredDelivered ?? phase.delivered,
        tasks: phaseMatches ? phase.tasks : filteredTasks ?? phase.tasks,
      };
    })
    .filter((p): p is RoadmapPhase => p !== null);
}

/** Romaniza 1-30 — suficiente pra numerar princípios. */
function romanize(n: number): string {
  const numerals: [number, string][] = [
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let out = "";
  let rem = n;
  for (const [val, sym] of numerals) {
    while (rem >= val) {
      out += sym;
      rem -= val;
    }
  }
  return out;
}
