import { API_URL } from "./config";

// Function to delete a deck by its ID.
export async function deleteDeck(deckId: string) {
  try {
    // Sending a DELETE request to the API to remove the deck by `deckId`.
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete deck: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting deck:", error);
    throw error;
  }
}
