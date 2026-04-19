import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
} from "../ds/primitives.tsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ds/DropdownMenu.tsx";
import { useT } from "../lib/i18n.tsx";

export default function DropdownMenuPage() {
  const { t, tr } = useT();
  const [showHidden, setShowHidden] = useState(false);
  const [showRulers, setShowRulers] = useState(true);
  const [theme, setTheme] = useState("auto");

  return (
    <>
      <PageHead
        lead={t("pages.dropdownMenu.lead")}
        title={
          <>
            {tr("pages.dropdownMenu.titleA")}
            <em>{t("pages.dropdownMenu.titleB")}</em>
          </>
        }
        metaLabel={t("pages.dropdownMenu.metaLabel")}
        meta={t("pages.dropdownMenu.meta")}
        intro={tr("pages.dropdownMenu.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.dropdownMenu.basic.title")}</>}
        kicker={t("pages.dropdownMenu.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.dropdownMenu.basic.desc")}</p>
        <Example
          caption={t("pages.dropdownMenu.basic.caption")}
          tech="actions"
          stack
          code={`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>${t("pages.dropdownMenu.basic.btn")}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={...}>${t("pages.dropdownMenu.basic.cut")}</DropdownMenuItem>
    <DropdownMenuItem onSelect={...}>${t("pages.dropdownMenu.basic.copy")}</DropdownMenuItem>
    <DropdownMenuItem onSelect={...}>${t("pages.dropdownMenu.basic.paste")}</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>{t("pages.dropdownMenu.basic.btn")}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  {t("pages.dropdownMenu.basic.cut")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {t("pages.dropdownMenu.basic.copy")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {t("pages.dropdownMenu.basic.paste")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Example>
      </Section>

      {/* ii · Com shortcuts e glifos */}
      <Section
        num="ii"
        title={<>{t("pages.dropdownMenu.rich.title")}</>}
        kicker={t("pages.dropdownMenu.rich.kicker")}
      >
        <p className="section-desc">{tr("pages.dropdownMenu.rich.desc")}</p>
        <Example
          caption={t("pages.dropdownMenu.rich.caption")}
          tech="glyph + shortcut"
          stack
          code={`<DropdownMenuContent>
  <DropdownMenuLabel>${t("pages.dropdownMenu.rich.account")}</DropdownMenuLabel>
  <DropdownMenuItem glyph="§" shortcut="⌘P">${t("pages.dropdownMenu.rich.profile")}</DropdownMenuItem>
  <DropdownMenuItem glyph="¶" shortcut="⌘,">${t("pages.dropdownMenu.rich.settings")}</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem glyph="✦" destructive>${t("pages.dropdownMenu.rich.signOut")}</DropdownMenuItem>
</DropdownMenuContent>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  {t("pages.dropdownMenu.rich.btn")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {t("pages.dropdownMenu.rich.account")}
                </DropdownMenuLabel>
                <DropdownMenuItem glyph="§" shortcut="⌘P">
                  {t("pages.dropdownMenu.rich.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem glyph="¶" shortcut="⌘,">
                  {t("pages.dropdownMenu.rich.settings")}
                </DropdownMenuItem>
                <DropdownMenuItem glyph="❦" shortcut="⌘B">
                  {t("pages.dropdownMenu.rich.bookmarks")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem glyph="✦" destructive>
                  {t("pages.dropdownMenu.rich.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Example>
      </Section>

      {/* iii · Checkbox items */}
      <Section
        num="iii"
        title={<>{t("pages.dropdownMenu.checkbox.title")}</>}
        kicker={t("pages.dropdownMenu.checkbox.kicker")}
      >
        <p className="section-desc">
          {tr("pages.dropdownMenu.checkbox.desc")}
        </p>
        <Example
          caption={t("pages.dropdownMenu.checkbox.caption")}
          tech="checkbox items"
          stack
          code={`<DropdownMenuCheckboxItem
  checked={showRulers}
  onCheckedChange={setShowRulers}
>
  ${t("pages.dropdownMenu.checkbox.rulers")}
</DropdownMenuCheckboxItem>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  {t("pages.dropdownMenu.checkbox.btn")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {t("pages.dropdownMenu.checkbox.preferences")}
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showRulers}
                  onCheckedChange={setShowRulers}
                  shortcut="⌘R"
                >
                  {t("pages.dropdownMenu.checkbox.rulers")}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showHidden}
                  onCheckedChange={setShowHidden}
                  shortcut="⌘H"
                >
                  {t("pages.dropdownMenu.checkbox.hidden")}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Example>
      </Section>

      {/* iv · Radio group */}
      <Section
        num="iv"
        title={<>{t("pages.dropdownMenu.radio.title")}</>}
        kicker={t("pages.dropdownMenu.radio.kicker")}
      >
        <p className="section-desc">{tr("pages.dropdownMenu.radio.desc")}</p>
        <Example
          caption={t("pages.dropdownMenu.radio.caption")}
          tech="radio group"
          stack
          code={`<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
  <DropdownMenuRadioItem value="auto">${t("pages.dropdownMenu.radio.auto")}</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="light">${t("pages.dropdownMenu.radio.light")}</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="dark">${t("pages.dropdownMenu.radio.dark")}</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  {t("pages.dropdownMenu.radio.btn")}: <em>{theme}</em>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {t("pages.dropdownMenu.radio.label")}
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="auto">
                    {t("pages.dropdownMenu.radio.auto")}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    {t("pages.dropdownMenu.radio.light")}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    {t("pages.dropdownMenu.radio.dark")}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.dropdownMenu.composition"
        root="DropdownMenu"
        nodes={[
          { name: "DropdownMenuTrigger" },
          {
            name: "DropdownMenuContent",
            children: [
              { name: "DropdownMenuLabel" },
              { name: "DropdownMenuItem" },
              { name: "DropdownMenuCheckboxItem" },
              {
                name: "DropdownMenuRadioGroup",
                children: [{ name: "DropdownMenuRadioItem" }],
              },
              { name: "DropdownMenuSeparator" },
            ],
          },
        ]}
      />
    </>
  );
}
