/* ================================================================
   NotificationInbox — bell + inbox panel primitives
   ----------------------------------------------------------------
   Peças para montar com Popover (PopoverTrigger + PopoverContent).
   Badge opcional; InboxItem como botão (abre URL ou marca lido).
   ================================================================ */

import type { ReactNode } from "react";

function BellGlyph() {
  return (
    <svg
      className="ds-notif-bell-svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export interface NotificationBellProps {
  count: number;
  /** aria-label completo do trigger */
  label: string;
  className?: string;
}

export function NotificationBell({ count, label, className }: NotificationBellProps) {
  const show = count > 0;
  return (
    <button
      type="button"
      className={["ds-notif-bell", className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <span className="ds-notif-bell-icon" aria-hidden>
        <BellGlyph />
      </span>
      {show ? (
        <span className="ds-notif-badge">{count > 99 ? "99+" : String(count)}</span>
      ) : null}
    </button>
  );
}

export function InboxPanel({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={["ds-inbox-panel", className].filter(Boolean).join(" ")}>{children}</div>
  );
}

export function InboxHeader({ children }: { children?: ReactNode }) {
  return <div className="ds-inbox-hd">{children}</div>;
}

export interface InboxItemProps {
  title: string;
  meta: string;
  unread?: boolean;
  onClick?: () => void;
}

export function InboxItem({ title, meta, unread, onClick }: InboxItemProps) {
  return (
    <button
      type="button"
      className={["ds-inbox-item", unread ? "is-unread" : ""].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      <span className="ds-inbox-item-title">{title}</span>
      <span className="ds-inbox-item-meta">{meta}</span>
    </button>
  );
}

export function InboxFooter({ children }: { children?: ReactNode }) {
  return <div className="ds-inbox-ft">{children}</div>;
}
