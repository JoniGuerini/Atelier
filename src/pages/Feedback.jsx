import { useCallback, useEffect, useRef, useState } from "react";
import {
  PageHead,
  Section,
  Progress,
  Toast,
  Button,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Feedback() {
  const { t, tr } = useT();
  const [progress, setProgress] = useState(42);
  const [toast, setToast] = useState({ message: "", visible: false });
  const timer = useRef(null);

  const show = useCallback((message) => {
    setToast({ message, visible: true });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setToast((s) => ({ ...s, visible: false })),
      1800
    );
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <PageHead
        lead={t("pages.feedback.lead")}
        title={
          <>
            {tr("pages.feedback.titleA")}
            <em>{t("pages.feedback.titleB")}</em>
          </>
        }
        metaLabel={t("pages.feedback.metaLabel")}
        meta={t("pages.feedback.meta")}
        intro={tr("pages.feedback.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.feedback.progress.title")}</>}
        kicker={t("pages.feedback.progress.kicker")}
      >
        <Example
          caption={t("pages.feedback.progress.caption")}
          tech="value prop"
          stack
          code={`const [progress, setProgress] = useState(42);

<Progress value={progress} label="${t("pages.feedback.progress.label")}" />`}
        >
          <div style={{ maxWidth: 520, width: "100%" }}>
            <Progress
              value={progress}
              label={t("pages.feedback.progress.label")}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <Button
                size="sm"
                onClick={() => setProgress((p) => Math.max(0, p - 10))}
              >
                − 10%
              </Button>
              <Button
                size="sm"
                onClick={() => setProgress((p) => Math.min(100, p + 10))}
              >
                + 10%
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setProgress(100)}
              >
                {t("pages.feedback.progress.finish")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setProgress(0)}
              >
                {t("pages.feedback.progress.reset")}
              </Button>
            </div>
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.feedback.toast.title")}</>}
        kicker={t("pages.feedback.toast.kicker")}
      >
        <Example
          caption={t("pages.feedback.toast.caption")}
          tech="bottom-center"
          center
          code={`const [toast, setToast] = useState({ message: "", visible: false });

function show(message) {
  setToast({ message, visible: true });
  setTimeout(() => setToast((s) => ({ ...s, visible: false })), 1800);
}

<Button onClick={() => show("${t("pages.feedback.toast.copied")}")}>
  ${t("pages.feedback.toast.confirm")}
</Button>

<Toast message={toast.message} visible={toast.visible} />`}
        >
          <Button onClick={() => show(t("pages.feedback.toast.copied"))}>
            {t("pages.feedback.toast.confirm")}
          </Button>
          <Button
            variant="primary"
            onClick={() => show(t("pages.feedback.toast.saved"))}
          >
            {t("pages.feedback.toast.save")}
          </Button>
          <Button
            variant="accent"
            onClick={() => show(t("pages.feedback.toast.lost"))}
          >
            {t("pages.feedback.toast.simulate")}
          </Button>
        </Example>
        <Toast message={toast.message} visible={toast.visible} />
      </Section>

      <CompositionSection
        num="iii"
        i18nPrefix="pages.feedback.composition"
        root="Toast"
        nodes={[
          { name: "ToastTitle" },
          { name: "ToastDescription" },
          { name: "ToastActions" },
        ]}
      />
    </>
  );
}
