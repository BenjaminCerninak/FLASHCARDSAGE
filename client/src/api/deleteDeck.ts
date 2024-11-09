import { API_URL } from "./config";

export async function deleteDeck(deckId: string) {
  return await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}
