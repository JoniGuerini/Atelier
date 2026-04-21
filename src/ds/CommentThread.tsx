/* ================================================================
   CommentThread — discussão / anotações em lista
   ----------------------------------------------------------------
   Composição leve: thread (feed) + comentário com cabeçalho
   (autor + tempo) e corpo. Sem estado — o app controla dados.
   ================================================================ */

import type { ReactNode } from "react";

export interface CommentThreadProps {
  children?: ReactNode;
  "aria-label"?: string;
  className?: string;
}

export function CommentThread({ children, "aria-label": ariaLabel, className }: CommentThreadProps) {
  return (
    <div
      className={["ds-comment-thread", className].filter(Boolean).join(" ")}
      role="feed"
      aria-busy="false"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export interface CommentProps {
  author: string;
  time: string;
  children?: ReactNode;
  className?: string;
}

export function Comment({ author, time, children, className }: CommentProps) {
  return (
    <article className={["ds-comment", className].filter(Boolean).join(" ")}>
      <header className="ds-comment-hd">
        <span className="ds-comment-author">{author}</span>
        <span className="ds-comment-time">{time}</span>
      </header>
      <div className="ds-comment-body">{children}</div>
    </article>
  );
}
