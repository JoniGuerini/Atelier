import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  ResizablePanels,
  ResizablePanel,
} from "../ds/ResizablePanels.tsx";
import { ResizableJunction } from "../ds/ResizableJunction.tsx";
import { useT } from "../lib/i18n.tsx";

function FakePanel({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      style={{
        background: bg ?? "var(--bg-panel)",
        padding: "var(--space-5)",
        height: "100%",
        fontFamily: "var(--font-serif)",
        fontSize: 14,
        color: "var(--ink-soft)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

export default function ResizablePage() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.resizable.lead")}
        title={
          <>
            {tr("pages.resizable.titleA")}
            <em>{t("pages.resizable.titleB")}</em>
          </>
        }
        metaLabel={t("pages.resizable.metaLabel")}
        meta={t("pages.resizable.meta")}
        intro={tr("pages.resizable.intro")}
      />

      {/* i · Horizontal 2 painéis */}
      <Section
        num="i"
        title={<>{t("pages.resizable.basic.title")}</>}
        kicker={t("pages.resizable.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.basic.desc")}</p>
        <Example
          caption={t("pages.resizable.basic.caption")}
          tech="2 panels"
          stack
          code={`<ResizablePanels defaultSizes={[60, 40]}>
  <ResizablePanel>${t("pages.resizable.labels.left")}</ResizablePanel>
  <ResizablePanel>${t("pages.resizable.labels.right")}</ResizablePanel>
</ResizablePanels>`}
        >
          <div style={{ height: 280, width: "100%" }}>
            <ResizablePanels
              defaultSizes={[60, 40]}
              ariaLabel={t("pages.resizable.basic.label")}
            >
              <ResizablePanel>
                <FakePanel bg="var(--bg-panel)">
                  <strong>{t("pages.resizable.labels.left")}</strong>
                  <br />
                  {t("pages.resizable.basic.lorem")}
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel bg="var(--bg-sunken)">
                  <strong>{t("pages.resizable.labels.right")}</strong>
                  <br />
                  {t("pages.resizable.basic.lorem")}
                </FakePanel>
              </ResizablePanel>
            </ResizablePanels>
          </div>
        </Example>
      </Section>

      {/* ii · Vertical */}
      <Section
        num="ii"
        title={<>{t("pages.resizable.vertical.title")}</>}
        kicker={t("pages.resizable.vertical.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.vertical.desc")}</p>
        <Example
          caption={t("pages.resizable.vertical.caption")}
          tech='orientation="vertical"'
          stack
          code={`<ResizablePanels orientation="vertical" defaultSizes={[40, 60]}>
  <ResizablePanel>…</ResizablePanel>
  <ResizablePanel>…</ResizablePanel>
</ResizablePanels>`}
        >
          <div style={{ height: 360, width: "100%" }}>
            <ResizablePanels
              orientation="vertical"
              defaultSizes={[40, 60]}
              ariaLabel={t("pages.resizable.vertical.label")}
            >
              <ResizablePanel>
                <FakePanel bg="var(--bg-panel)">
                  <strong>{t("pages.resizable.labels.top")}</strong>
                  <br />
                  {t("pages.resizable.basic.lorem")}
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel bg="var(--bg-sunken)">
                  <strong>{t("pages.resizable.labels.bottom")}</strong>
                  <br />
                  {t("pages.resizable.basic.lorem")}
                </FakePanel>
              </ResizablePanel>
            </ResizablePanels>
          </div>
        </Example>
      </Section>

      {/* iii · 3 painéis */}
      <Section
        num="iii"
        title={<>{t("pages.resizable.three.title")}</>}
        kicker={t("pages.resizable.three.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.three.desc")}</p>
        <Example
          caption={t("pages.resizable.three.caption")}
          tech="3 panels"
          stack
          code={`<ResizablePanels defaultSizes={[20, 60, 20]}>
  <ResizablePanel>Sidebar</ResizablePanel>
  <ResizablePanel>Content</ResizablePanel>
  <ResizablePanel>Inspector</ResizablePanel>
</ResizablePanels>`}
        >
          <div style={{ height: 280, width: "100%" }}>
            <ResizablePanels
              defaultSizes={[20, 60, 20]}
              ariaLabel={t("pages.resizable.three.label")}
            >
              <ResizablePanel>
                <FakePanel bg="var(--bg-panel)">
                  <strong>{t("pages.resizable.labels.sidebar")}</strong>
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel bg="var(--bg)">
                  <strong>{t("pages.resizable.labels.content")}</strong>
                  <br />
                  {t("pages.resizable.basic.lorem")}
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel bg="var(--bg-sunken)">
                  <strong>{t("pages.resizable.labels.inspector")}</strong>
                </FakePanel>
              </ResizablePanel>
            </ResizablePanels>
          </div>
        </Example>
      </Section>

      {/* iv · Junction handle (3 áreas com handle de junção) */}
      <Section
        num="iv"
        title={<>{t("pages.resizable.junction.title")}</>}
        kicker={t("pages.resizable.junction.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.junction.desc")}</p>
        <Example
          caption={t("pages.resizable.junction.caption")}
          tech="junction handle"
          stack
          code={`<ResizableJunction
  defaultHorizontal={50}
  defaultVertical={50}
>
  <ResizablePanel>One</ResizablePanel>      {/* coluna esquerda */}
  <ResizablePanel>Two</ResizablePanel>      {/* topo direita */}
  <ResizablePanel>Three</ResizablePanel>    {/* base direita */}
</ResizableJunction>`}
        >
          <div style={{ height: 360, width: "100%" }}>
            <ResizableJunction
              defaultHorizontal={50}
              defaultVertical={50}
              ariaLabel={t("pages.resizable.junction.label")}
            >
              <ResizablePanel>
                <FakePanel>
                  <strong>{t("pages.resizable.labels.one")}</strong>
                  <br />
                  {t("pages.resizable.junction.body")}
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel>
                  <strong>{t("pages.resizable.labels.two")}</strong>
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel>
                  <strong>{t("pages.resizable.labels.three")}</strong>
                </FakePanel>
              </ResizablePanel>
            </ResizableJunction>
          </div>
        </Example>
      </Section>

      {/* v · Aninhamento simples (sem junction) */}
      <Section
        num="v"
        title={<>{t("pages.resizable.nested.title")}</>}
        kicker={t("pages.resizable.nested.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.nested.desc")}</p>
        <Example
          caption={t("pages.resizable.nested.caption")}
          tech="nested"
          stack
          code={`<ResizablePanels orientation="horizontal" defaultSizes={[50, 50]}>
  <ResizablePanel>One</ResizablePanel>
  <ResizablePanel>
    <ResizablePanels orientation="vertical" defaultSizes={[50, 50]}>
      <ResizablePanel>Two</ResizablePanel>
      <ResizablePanel>Three</ResizablePanel>
    </ResizablePanels>
  </ResizablePanel>
</ResizablePanels>`}
        >
          <div style={{ height: 360, width: "100%" }}>
            <ResizablePanels
              orientation="horizontal"
              defaultSizes={[50, 50]}
              ariaLabel={t("pages.resizable.nested.label")}
            >
              <ResizablePanel>
                <FakePanel bg="var(--bg-panel)">
                  <strong>{t("pages.resizable.labels.one")}</strong>
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <ResizablePanels
                  orientation="vertical"
                  defaultSizes={[50, 50]}
                  ariaLabel={t("pages.resizable.nested.innerLabel")}
                >
                  <ResizablePanel>
                    <FakePanel bg="var(--bg-sunken)">
                      <strong>{t("pages.resizable.labels.two")}</strong>
                    </FakePanel>
                  </ResizablePanel>
                  <ResizablePanel>
                    <FakePanel bg="var(--bg)">
                      <strong>{t("pages.resizable.labels.three")}</strong>
                    </FakePanel>
                  </ResizablePanel>
                </ResizablePanels>
              </ResizablePanel>
            </ResizablePanels>
          </div>
        </Example>
      </Section>

      {/* vi · Persistência */}
      <Section
        num="vi"
        title={<>{t("pages.resizable.persist.title")}</>}
        kicker={t("pages.resizable.persist.kicker")}
      >
        <p className="section-desc">{tr("pages.resizable.persist.desc")}</p>
        <Example
          caption={t("pages.resizable.persist.caption")}
          tech="storageKey"
          stack
          code={`<ResizablePanels
  defaultSizes={[50, 50]}
  storageKey="atelier.docs.split"
>
  …
</ResizablePanels>`}
        >
          <div style={{ height: 240, width: "100%" }}>
            <ResizablePanels
              defaultSizes={[50, 50]}
              storageKey="atelier.docs.persistDemo"
              ariaLabel={t("pages.resizable.persist.label")}
            >
              <ResizablePanel>
                <FakePanel bg="var(--bg-panel)">
                  <strong>{t("pages.resizable.labels.left")}</strong>
                  <br />
                  {t("pages.resizable.persist.body")}
                </FakePanel>
              </ResizablePanel>
              <ResizablePanel>
                <FakePanel bg="var(--bg-sunken)">
                  <strong>{t("pages.resizable.labels.right")}</strong>
                  <br />
                  {t("pages.resizable.persist.body")}
                </FakePanel>
              </ResizablePanel>
            </ResizablePanels>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.resizable.composition"
        root="ResizablePanels · ResizableJunction"
        nodes={[{ name: "ResizablePanel" }]}
      />
    </>
  );
}
