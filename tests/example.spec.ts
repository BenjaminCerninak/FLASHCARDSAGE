import { test, expect } from "@playwright/test";

const BASE_URL = "https://flashcardsben.cfd/";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });
  const deckTitle = "Test Deck1";
  const cardTitle = "Test Card1";

  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("Flashcards App");
    await expect(
      page.getByRole("heading", {
        name: "Your Decks",
      })
    ).toBeVisible();
  });

  test("should have correct form and button", async ({ page }) => {
    // Check if the form is present
    const form = await page.locator("form");
    await expect(form).toBeVisible();

    // Check if the "Add Decks" button is present inside the form
    const addDecksButton = form.locator("button", { hasText: "Add Deck" });
    await expect(addDecksButton).toBeVisible();
  });

  test("should create a new deck", async ({ page }) => {
    await page.fill("#deck-id", deckTitle);
    await page.click('button:has-text("Add Deck")');
    const newDeck = await page.locator(`text=${deckTitle}`).last();
    await expect(newDeck).toBeVisible();
  });

  test("should go to the deck via link and check functionality", async ({
    page,
  }) => {
    await page.click(`text=${deckTitle}`);

    // Verify the page title is the deck's title
    await expect(
      page.getByRole("heading", {
        name: `${deckTitle}`,
      })
    ).toBeVisible();
    const form = await page.locator("form");
    await expect(form).toBeVisible();
    await page.fill("#card-text", cardTitle);
    await page.click('button:has-text("Add Card")');
    const newCard = await page.locator(`text=${cardTitle}`).last();
    await expect(newCard).toBeVisible();

    const deleteButton = await page.locator(
      `li:has-text("${cardTitle}") button:has-text("x")`
    );
    await deleteButton.click();
    await page.waitForSelector(`text=${cardTitle}`, { state: "detached" });

    await page.click('button:has-text("Add Card")');
    const errorMessage = await page.locator(".error-message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("This field cannot be empty!");
    const inputField = page.locator("#card-text");
    await expect(inputField).toHaveClass(/input-error/);

    const emptyDeckTitle = "";
    const deckList = await page.locator(".decks");
    const emptyDeck = deckList.locator(`text=${emptyDeckTitle}`);
    await expect(emptyDeck).not.toBeVisible();

    await page.click("#return-button");
    await expect(page).toHaveTitle("Flashcards App");
  });

  test("should delete the deck which was created", async ({ page }) => {
    const deleteButton = await page.locator(
      `li:has-text("${deckTitle}") button:has-text("x")`
    );
    await deleteButton.click();
    await page.waitForSelector(`text=${deckTitle}`, { state: "detached" });
  });

  test("should not create empty deck", async ({ page }) => {
    await page.click('button:has-text("Add Deck")');
    const errorMessage = await page.locator(".error-message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("This field cannot be empty!");
    const inputField = page.locator("#deck-id");
    await expect(inputField).toHaveClass(/input-error/);

    const emptyDeckTitle = "";
    const deckList = await page.locator(".decks");
    const emptyDeck = deckList.locator(`text=${emptyDeckTitle}`);
    await expect(emptyDeck).not.toBeVisible();
  });
});
