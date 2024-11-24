import { API_URL } from "./config";

// TypeScript type for a deck.
export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

// Fetch all decks from the API
export async function getDecks(): Promise<TDeck[]> {
  try {
    // Sending a GET request to the API to fetch all decks
    const response = await fetch(`${API_URL}/decks`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch decks: ${response.status} ${response.statusText}`
      );
    }
    // Returning the parsed JSON response from the API as an array of TDeck objects
    return await response.json();
  } catch (error) {
    console.error("Error fetching decks:", error);
    throw error;
  }
}
