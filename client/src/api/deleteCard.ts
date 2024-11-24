import { API_URL } from "./config";
import { TDeck } from "./getDecks";

// Delete a card from a specific deck by its index.
export async function deleteCard(
  deckId: string, // The ID of the deck from which the card will be deleted.
  index: number // The index of the card.
): Promise<TDeck> {
  try {
    // Sending a DELETE request to the API to remove the card from the deck.
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete card: ${response.status} ${response.statusText}`
      );
    }

    // Returning the response from the API as JSON, which contains the updated deck data.
    return await response.json();
  } catch (error) {
    console.error("Error deleting card:", error);

    throw error;
  }
}
