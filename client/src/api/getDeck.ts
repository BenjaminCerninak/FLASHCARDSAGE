import { API_URL } from "./config";
import { TDeck } from "./getDecks";

// Fetch a specific deck by its ID.
export async function getDeck(deckId: string): Promise<TDeck> {
  try {
    const response = await fetch(`${API_URL}/decks/${deckId}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch deck: ${response.status} ${response.statusText}`
      );
    }
    // Returning the parsed JSON response from the API.
    return await response.json();
  } catch (error) {
    console.error("Error fetching deck:", error);
    throw error;
  }
}
