import { test, expect, type Page } from "@playwright/test";

async function openSearchPalette(page: Page) {
  await page.getByRole("button", { name: "Search" }).first().click();
}

test.describe("fluxos críticos (roadmap 8.5)", () => {
  test("tema escuro persiste após reload", async ({ page }) => {
    await page.goto("/#/home");
    await page.getByRole("button", { name: "Settings" }).click();
    await page.getByRole("menu").getByRole("button", { name: "Dark", exact: true }).click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("atelier.theme"))).toBe("dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("command palette abre e navega", async ({ page }) => {
    await page.goto("/#/home");
    await openSearchPalette(page);
    const dialog = page.getByRole("dialog", { name: "Search" });
    await expect(dialog).toBeVisible();
    await dialog.locator(".search-input").fill("kanban");
    await expect(dialog.getByText("Drag & Drop")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#\/drag-drop/);
    await expect(dialog).toBeHidden();
  });

  test("drawer fecha com Escape", async ({ page }) => {
    await page.goto("/#/drawer");
    await page.getByRole("button", { name: "Open drawer" }).first().click();
    const panel = page.locator(".ds-drawer").filter({ has: page.getByText("Side panel") });
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
  });

  test("combobox creatable mantém chips ao criar tag nova", async ({ page }) => {
    await page.goto("/#/combobox");
    const field = page.locator("label.ds-field").filter({ hasText: "Article tags" });
    await expect(field.locator(".ds-combo-chip")).toHaveCount(2);
    await expect(field.locator(".ds-combo-chip").nth(0)).toContainText("Design");
    await expect(field.locator(".ds-combo-chip").nth(1)).toContainText("Writing");
    await field.getByRole("combobox").fill("e2e-new-tag");
    await expect(field.locator(".ds-combo-opt.creation")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(field.locator(".ds-combo-chip")).toHaveCount(3);
    await expect(field.getByText("e2e-new-tag", { exact: true })).toBeVisible();
    await expect(field.locator(".ds-combo-chip").nth(0)).toContainText("Design");
    await expect(field.locator(".ds-combo-chip").nth(1)).toContainText("Writing");
  });

  test("drag-drop kanban move cartão entre colunas", async ({ page }) => {
    await page.goto("/#/drag-drop");
    const todo = page.getByRole("region", { name: "To do" });
    const doing = page.getByRole("region", { name: "In progress" });
    const card = todo.getByText("Sketch grid");
    await card.dragTo(doing, { force: true, targetPosition: { x: 80, y: 120 } });
    await expect(doing.getByText("Sketch grid")).toBeVisible();
    await expect(todo.getByText("Sketch grid")).toHaveCount(0);
  });
});
