import { useState } from "react";
import {
  PageHead,
  Section,
  Tooltip,
  Button,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "../ds/Dialog.tsx";
import { useT } from "../lib/i18n.tsx";

export default function Overlays() {
  const { t, tr } = useT();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead
        lead={t("pages.overlays.lead")}
        title={
          <>
            {tr("pages.overlays.titleA")}
            <em>{t("pages.overlays.titleB")}</em>
          </>
        }
        metaLabel={t("pages.overlays.metaLabel")}
        meta={t("pages.overlays.meta")}
        intro={tr("pages.overlays.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.overlays.modal.title")}</>}
        kicker={t("pages.overlays.modal.kicker")}
      >
        <Example
          caption={t("pages.overlays.modal.caption")}
          tech="Esc / backdrop close"
          center
          code={`const [open, setOpen] = useState(false);

<Button variant="primary" onClick={() => setOpen(true)}>
  ${t("pages.overlays.modal.open")}
</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <DialogTitle>${t("pages.overlays.modal.titleA")}<em>${t("pages.overlays.modal.titleB")}</em>${t("pages.overlays.modal.titleC")}</DialogTitle>
    <DialogClose />
  </DialogHeader>
  <DialogBody>${t("pages.overlays.modal.body")}</DialogBody>
  <DialogFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>${t("common.cancel")}</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>${t("common.discard")}</Button>
  </DialogFooter>
</Dialog>`}
        >
          <Button variant="primary" onClick={() => setOpen(true)}>
            {t("pages.overlays.modal.open")}
          </Button>
        </Example>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>
              {t("pages.overlays.modal.titleA")}
              <em>{t("pages.overlays.modal.titleB")}</em>
              {t("pages.overlays.modal.titleC")}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogBody>{t("pages.overlays.modal.body")}</DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              {t("common.discard")}
            </Button>
          </DialogFooter>
        </Dialog>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.overlays.tooltip.title")}</>}
        kicker={t("pages.overlays.tooltip.kicker")}
      >
        <Example
          caption={t("pages.overlays.tooltip.caption")}
          tech="CSS-only"
          center
          code={`<Tooltip tip="${t("pages.overlays.tooltip.copyTip")}">
  <Button>${t("pages.overlays.tooltip.copy")}</Button>
</Tooltip>

<Tooltip tip="${t("pages.overlays.tooltip.downloadTip")}">
  <Button variant="primary">${t("pages.overlays.tooltip.download")}</Button>
</Tooltip>`}
        >
          <Tooltip tip={t("pages.overlays.tooltip.copyTip")}>
            <Button>{t("pages.overlays.tooltip.copy")}</Button>
          </Tooltip>
          <Tooltip tip={t("pages.overlays.tooltip.downloadTip")}>
            <Button variant="primary">
              {t("pages.overlays.tooltip.download")}
            </Button>
          </Tooltip>
          <Tooltip tip={t("pages.overlays.tooltip.publishTip")}>
            <Button variant="accent">
              {t("pages.overlays.tooltip.publish")}
            </Button>
          </Tooltip>
        </Example>
      </Section>

      <CompositionSection
        num="iii"
        i18nPrefix="pages.overlays.composition"
        root="Dialog"
        nodes={[
          {
            name: "DialogHeader",
            children: [{ name: "DialogTitle" }, { name: "DialogClose" }],
          },
          { name: "DialogBody" },
          { name: "DialogFooter" },
        ]}
      />
    </>
  );
}
