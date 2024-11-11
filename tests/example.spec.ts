import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("basic test", async ({ page }) => {
  await page.goto(BASE_URL);
  const heading = await page.locator("h1");
  await expect(heading).toHaveText("Your Decks");
});

test("should create a new deck", async ({ page }) => {
  await page.goto(BASE_URL);
  const deckTitle = "Test Deck 123";
  await page.fill("#deck-id", deckTitle);
  await page.click('button:has-text("Add Deck")');
  const newDeck = await page.locator(`text=${deckTitle}`).last();
  await expect(newDeck).toBeVisible();
});
