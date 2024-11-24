import Deck from "../models/Deck";
import { Request, Response } from "express";

// Create a card for a specific deck
export async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId; // Extract the deckId from the URL parameters (/decks/:deckId)
  const deck = await Deck.findById(deckId); // Retrieve the deck from the database using the deckId

  const { text } = req.body; // Extract the 'text' field from the request body, which contains the card content

  if (deck) {
    // Check if the deck exists in the database
    deck.cards.push(text); // Add the new card (text) to the deck's array of cards
    await deck.save(); // Save the updated deck back to the database
    res.json(deck); // Return the updated deck as the JSON response
  } else {
    // If no deck is found, return a 404 error with a descriptive message
    res.status(404).json({ message: "Deck not found" });
  }
}
