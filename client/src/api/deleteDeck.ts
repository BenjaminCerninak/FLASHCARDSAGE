import { API_URL } from "./config";

export async function deleteDeck(cardId:string) {

    return (await fetch(`${API_URL}/decks/${cardId}`, {
        method: "DELETE",
      }))
}