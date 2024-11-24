import { API_URL } from "./config";

// Create a new deck with title as an argument.
export async function createDeck(title: string) {
  try {
    const response = await fetch(`${API_URL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create deck: ${response.status} ${response.statusText}`
      );
    }

    // Returning the response parsed as JSON, which contains the created deck's data.
    return await response.json();
  } catch (error) {
    console.error("Error creating deck:", error);
    throw error;
  }
}
