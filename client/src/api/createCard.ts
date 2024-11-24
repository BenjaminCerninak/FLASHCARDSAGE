import { API_URL } from "./config";
import { TDeck } from "./getDecks";

// Creates a new card in the specified deck.
export async function createCard(deckId: string, text: string): Promise<TDeck> {
  try {
    // Sending a POST request to the API to create a new card in the deck.
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }), // The card data(text field).
    });
    if (!response.ok) {
      throw new Error(
        `Failed to create card: ${response.status} ${response.statusText}`
      );
    }
    // Parsing the JSON response from the API.
    return await response.json();
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
}
