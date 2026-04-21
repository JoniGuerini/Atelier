import { useCallback, useEffect, useRef, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
} from "../ds/primitives.tsx";
import {
  NotificationBell,
  InboxPanel,
  InboxHeader,
  InboxItem,
  InboxFooter,
} from "../ds/NotificationInbox.tsx";
import { Popover, PopoverTrigger, PopoverContent } from "../ds/Popover.tsx";
import { CommentThread, Comment } from "../ds/CommentThread.tsx";
import { Snackbar } from "../ds/Snackbar.tsx";
import {
  FileUploadQueue,
  FileUploadQueueItemRow,
} from "../ds/FileUploadQueue.tsx";
import type { FileUploadQueueItem } from "../ds/types.ts";
import { useT } from "../lib/i18n.tsx";

const initialQueue: FileUploadQueueItem[] = [
  { id: "1", name: "brief.pdf", sizeLabel: "240 KB", progress: 100, status: "done" },
  {
    id: "2",
    name: "palette-export.zip",
    sizeLabel: "1.2 MB",
    progress: 46,
    status: "uploading",
  },
  {
    id: "3",
    name: "notes.txt",
    sizeLabel: "2 KB",
    progress: 0,
    status: "error",
  },
];

export default function AppShellPage() {
  const { t, tr } = useT();
  const snackAnchor = useRef<HTMLDivElement>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [queue, setQueue] = useState<FileUploadQueueItem[]>(initialQueue);

  const bump = useCallback(() => {
    setQueue((rows) =>
      rows.map((r) => {
        if (r.status !== "uploading") return r;
        const next = Math.min(100, r.progress + 8);
        return { ...r, progress: next, status: next >= 100 ? "done" : "uploading" };
      }),
    );
  }, []);

  useEffect(() => {
    const id = window.setInterval(bump, 700);
    return () => window.clearInterval(id);
  }, [bump]);

  const onRemove = (id: string) => setQueue((q) => q.filter((r) => r.id !== id));
  const onRetry = (id: string) =>
    setQueue((q) =>
      q.map((r) => (r.id === id ? { ...r, status: "uploading", progress: 0 } : r)),
    );

  return (
    <>
      <PageHead
        lead={t("pages.appShell.lead")}
        title={
          <>
            {tr("pages.appShell.titleA")}
            <em>{t("pages.appShell.titleB")}</em>
          </>
        }
        metaLabel={t("pages.appShell.metaLabel")}
        meta={t("pages.appShell.meta")}
        intro={tr("pages.appShell.intro")}
      />

      <Section num="i" title={<>{t("pages.appShell.inbox.title")}</>} kicker={t("pages.appShell.inbox.kicker")}>
        <p className="section-desc">{t("pages.appShell.inbox.desc")}</p>
        <Example
          caption={t("pages.appShell.inbox.caption")}
          tech="<Popover> · <NotificationBell>"
          stack
          code={`<Popover>
  <PopoverTrigger><NotificationBell /></PopoverTrigger>
  <PopoverContent><InboxPanel>…</InboxPanel></PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger>
              <NotificationBell count={2} label={t("pages.appShell.inbox.bellAria")} />
            </PopoverTrigger>
            <PopoverContent placement="bottom-end" minWidth={280} ariaLabel={t("pages.appShell.inbox.panelAria")}>
              <InboxPanel>
                <InboxHeader>{t("pages.appShell.inbox.header")}</InboxHeader>
                <InboxItem
                  title={t("pages.appShell.inbox.item1Title")}
                  meta={t("pages.appShell.inbox.item1Meta")}
                  unread
                />
                <InboxItem title={t("pages.appShell.inbox.item2Title")} meta={t("pages.appShell.inbox.item2Meta")} />
                <InboxFooter>
                  <Button type="button" variant="link" size="sm">
                    {t("pages.appShell.inbox.markAll")}
                  </Button>
                </InboxFooter>
              </InboxPanel>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>

      <Section num="ii" title={<>{t("pages.appShell.comments.title")}</>} kicker={t("pages.appShell.comments.kicker")}>
        <p className="section-desc">{t("pages.appShell.comments.desc")}</p>
        <Example
          caption={t("pages.appShell.comments.caption")}
          tech="<CommentThread> · <Comment>"
          stack
          code={`<CommentThread aria-label="…">
  <Comment author="…" time="…">…</Comment>
</CommentThread>`}
        >
          <CommentThread aria-label={t("pages.appShell.comments.threadAria")}>
            <Comment author={t("pages.appShell.comments.a1")} time={t("pages.appShell.comments.t1")}>
              {t("pages.appShell.comments.body1")}
            </Comment>
            <Comment author={t("pages.appShell.comments.a2")} time={t("pages.appShell.comments.t2")}>
              {t("pages.appShell.comments.body2")}
            </Comment>
          </CommentThread>
        </Example>
      </Section>

      <Section num="iii" title={<>{t("pages.appShell.snackbar.title")}</>} kicker={t("pages.appShell.snackbar.kicker")}>
        <p className="section-desc">{t("pages.appShell.snackbar.desc")}</p>
        <Example
          caption={t("pages.appShell.snackbar.caption")}
          tech="<Snackbar>"
          stack
          code={`<Snackbar open anchorRef message actionLabel onAction />`}
        >
          <div className="ds-app-shell-example-stack ds-app-shell-example-stack--snack">
            <div ref={snackAnchor} className="ds-app-shell-anchor">
              <Button type="button" variant="ghost" onClick={() => setSnackOpen(true)}>
                {t("pages.appShell.snackbar.show")}
              </Button>
            </div>
          </div>
          <Snackbar
            open={snackOpen}
            onClose={() => setSnackOpen(false)}
            anchorRef={snackAnchor}
            message={t("pages.appShell.snackbar.message")}
            actionLabel={t("pages.appShell.snackbar.action")}
            onAction={() => setSnackOpen(false)}
            duration={6000}
            dismissLabel={t("pages.appShell.snackbar.dismiss")}
          />
        </Example>
      </Section>

      <Section num="iv" title={<>{t("pages.appShell.upload.title")}</>} kicker={t("pages.appShell.upload.kicker")}>
        <p className="section-desc">{t("pages.appShell.upload.desc")}</p>
        <Example
          caption={t("pages.appShell.upload.caption")}
          tech="<FileUploadQueue>"
          stack
          code={`<FileUploadQueue>
  <FileUploadQueueItemRow item={…} onRetry onRemove />
</FileUploadQueue>`}
        >
          <FileUploadQueue>
            {queue.map((item) => (
              <FileUploadQueueItemRow
                key={item.id}
                item={item}
                onRemove={onRemove}
                onRetry={onRetry}
                retryLabel={t("pages.appShell.upload.retry")}
                removeLabel={t("pages.appShell.upload.remove")}
                preview={
                  item.name.endsWith(".zip") ? (
                    <span className="ds-file-queue-thumb" aria-hidden>
                      ZIP
                    </span>
                  ) : item.name.endsWith(".pdf") ? (
                    <span className="ds-file-queue-thumb" aria-hidden>
                      PDF
                    </span>
                  ) : (
                    <span className="ds-file-queue-thumb" aria-hidden>
                      TXT
                    </span>
                  )
                }
              />
            ))}
          </FileUploadQueue>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.appShell.composition"
        root="NotificationBell"
        nodes={[
          { name: "InboxPanel" },
          { name: "InboxHeader" },
          { name: "InboxItem" },
          { name: "InboxFooter" },
          { name: "CommentThread" },
          { name: "Comment" },
          { name: "Snackbar" },
          { name: "FileUploadQueue" },
          { name: "FileUploadQueueItemRow" },
        ]}
      />
    </>
  );
}
