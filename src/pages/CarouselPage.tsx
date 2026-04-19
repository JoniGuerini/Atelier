import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { Carousel, CarouselSlide } from "../ds/Carousel.tsx";
import { useT } from "../lib/i18n.tsx";

const SLIDE_BG = [
  "var(--accent-soft)",
  "var(--bg-sunken)",
  "var(--bg-panel)",
];

function FakeSlide({
  index,
  text,
  bg,
}: {
  index: number;
  text: string;
  bg: string;
}) {
  return (
    <div
      style={{
        background: bg,
        padding: "var(--space-7) var(--space-6)",
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          marginBottom: 10,
        }}
      >
        Slide {String(index + 1).padStart(2, "0")}
      </div>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 28,
          fontStyle: "italic",
          color: "var(--ink)",
          maxWidth: 480,
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function CarouselPage() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.carousel.lead")}
        title={
          <>
            {tr("pages.carousel.titleA")}
            <em>{t("pages.carousel.titleB")}</em>
          </>
        }
        metaLabel={t("pages.carousel.metaLabel")}
        meta={t("pages.carousel.meta")}
        intro={tr("pages.carousel.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.carousel.basic.title")}</>}
        kicker={t("pages.carousel.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.carousel.basic.desc")}</p>
        <Example
          caption={t("pages.carousel.basic.caption")}
          tech="default"
          stack
          code={`<Carousel>
  <CarouselSlide>${t("pages.carousel.slides.0")}</CarouselSlide>
  <CarouselSlide>${t("pages.carousel.slides.1")}</CarouselSlide>
  <CarouselSlide>${t("pages.carousel.slides.2")}</CarouselSlide>
</Carousel>`}
        >
          <Carousel ariaLabel={t("pages.carousel.basic.label")}>
            {[0, 1, 2].map((i) => (
              <CarouselSlide key={i}>
                <FakeSlide
                  index={i}
                  text={t(`pages.carousel.slides.${i}`)}
                  bg={SLIDE_BG[i]}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Example>
      </Section>

      {/* ii · Loop */}
      <Section
        num="ii"
        title={<>{t("pages.carousel.loop.title")}</>}
        kicker={t("pages.carousel.loop.kicker")}
      >
        <p className="section-desc">{tr("pages.carousel.loop.desc")}</p>
        <Example
          caption={t("pages.carousel.loop.caption")}
          tech="loop"
          stack
          code={`<Carousel loop>…</Carousel>`}
        >
          <Carousel loop ariaLabel={t("pages.carousel.loop.label")}>
            {[0, 1, 2].map((i) => (
              <CarouselSlide key={i}>
                <FakeSlide
                  index={i}
                  text={t(`pages.carousel.slides.${i}`)}
                  bg={SLIDE_BG[i]}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Example>
      </Section>

      {/* iii · Auto-play */}
      <Section
        num="iii"
        title={<>{t("pages.carousel.auto.title")}</>}
        kicker={t("pages.carousel.auto.kicker")}
      >
        <p className="section-desc">{tr("pages.carousel.auto.desc")}</p>
        <Example
          caption={t("pages.carousel.auto.caption")}
          tech="autoPlay loop"
          stack
          code={`<Carousel autoPlay loop interval={3500}>…</Carousel>`}
        >
          <Carousel
            autoPlay
            loop
            interval={3500}
            ariaLabel={t("pages.carousel.auto.label")}
          >
            {[0, 1, 2].map((i) => (
              <CarouselSlide key={i}>
                <FakeSlide
                  index={i}
                  text={t(`pages.carousel.slides.${i}`)}
                  bg={SLIDE_BG[i]}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Example>
      </Section>

      {/* iv · Fade */}
      <Section
        num="iv"
        title={<>{t("pages.carousel.fade.title")}</>}
        kicker={t("pages.carousel.fade.kicker")}
      >
        <p className="section-desc">{tr("pages.carousel.fade.desc")}</p>
        <Example
          caption={t("pages.carousel.fade.caption")}
          tech='transition="fade"'
          stack
          code={`<Carousel transition="fade">…</Carousel>`}
        >
          <Carousel
            transition="fade"
            ariaLabel={t("pages.carousel.fade.label")}
          >
            {[0, 1, 2].map((i) => (
              <CarouselSlide key={i}>
                <FakeSlide
                  index={i}
                  text={t(`pages.carousel.slides.${i}`)}
                  bg={SLIDE_BG[i]}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Example>
      </Section>

      {/* v · Sem indicadores */}
      <Section
        num="v"
        title={<>{t("pages.carousel.bare.title")}</>}
        kicker={t("pages.carousel.bare.kicker")}
      >
        <p className="section-desc">{tr("pages.carousel.bare.desc")}</p>
        <Example
          caption={t("pages.carousel.bare.caption")}
          tech="showDots=false showArrows=false"
          stack
          code={`<Carousel showDots={false} showArrows={false}>…</Carousel>`}
        >
          <Carousel
            showDots={false}
            showArrows={false}
            ariaLabel={t("pages.carousel.bare.label")}
          >
            {[0, 1, 2].map((i) => (
              <CarouselSlide key={i}>
                <FakeSlide
                  index={i}
                  text={t(`pages.carousel.slides.${i}`)}
                  bg={SLIDE_BG[i]}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.carousel.composition"
        root="Carousel"
        nodes={[{ name: "CarouselSlide" }]}
      />
    </>
  );
}
