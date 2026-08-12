// Freiraum für die Werbeleiste.
//
// Das AdMob-Banner sitzt in der App bündig an der Fensterunterkante (siehe
// patches/@capacitor-community+admob+8.0.0.patch) und liegt damit ÜBER dem
// Inhalt. Der Platz dafür wird über --adbar-h reserviert; --adbar-h wird ab der
// Fensterunterkante gemessen, enthält die Sicherheitszone also bereits – Summen
// mit env(safe-area-inset-bottom) wären deshalb falsch.
//
// Diese Tests halten fest, dass nichts hinter dem Banner verschwindet.
import { test, expect } from "@playwright/test";

const bottomOf = async (page, sel) =>
  await page.locator(sel).evaluate(el => Math.round(el.getBoundingClientRect().bottom));

const nativeBanner = async (page, px) =>
  await page.evaluate(h => {
    document.documentElement.style.setProperty("--native-ad-h", h + "px");
    document.body.classList.add("native-ads");
    updateAdbarH();
  }, px);

test("Web-Version: Fußzeile bleibt über dem Werbeplatzhalter", async ({ page }) => {
  await page.goto("/");
  await page.click("#ob-skip");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const adbarTop = await page.locator("#adbar").evaluate(el => Math.round(el.getBoundingClientRect().top));
  expect(await bottomOf(page, "footer.app")).toBeLessThanOrEqual(adbarTop);
});

test("App-Version: Banner-Höhe wird als Freiraum reserviert", async ({ page }) => {
  await page.goto("/");
  await page.click("#ob-skip");
  await nativeBanner(page, 60);

  const h = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--adbar-h").trim());
  expect(h).toBe("60px");

  // Der HTML-Platzhalter verschwindet, das echte Banner übernimmt
  await expect(page.locator("#adbar")).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const vh = await page.evaluate(() => window.innerHeight);
  expect(await bottomOf(page, "footer.app")).toBeLessThanOrEqual(vh - 60);
});

test("App-Version: Fenster und Schublade reichen nicht hinter das Banner", async ({ page }) => {
  await page.goto("/");
  await page.click("#ob-skip");
  await nativeBanner(page, 60);
  const vh = await page.evaluate(() => window.innerHeight);

  await page.click("#btn-settings");
  expect(await bottomOf(page, "#modal-settings .drawer > :last-child")).toBeLessThanOrEqual(vh - 60);
  await page.click('#modal-settings [data-close="modal-settings"]');

  await page.click("#go-teilnehmer");
  await page.click("#t-limits-sum");
  await expect(page.locator("#t-limits-body")).toBeVisible();

  // Zusammenfassungsleiste sitzt genau auf dem Banner, nicht darunter
  await page.fill("#t-a", "48,2");
  await page.fill("#t-b", "22,4");
  await page.fill("#t-c", "60,6");
  await page.fill("#t-d", "15,4");
  await expect(page.locator("#t-sticky")).toBeVisible();
  expect(await bottomOf(page, "#t-sticky")).toBe(vh - 60);
});
