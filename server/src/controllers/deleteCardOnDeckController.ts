import Deck from "../models/Deck";
import express, { Request, Response } from "express";

// Delete a card from a deck
export async function deleteCardOnDeckController(req: Request, res: Response) {
  // Extracting the deckId and index from the URL parameters
  const deckId = req.params.deckId;
  const index = req.params.index;

  // Finding the deck in the database by its ID
  const deck = await Deck.findById(deckId);

  // If the deck exists, remove the card at the specified index
  if (deck) {
    // The splice method removes the card at the given index
    deck.cards.splice(parseInt(index), 1);

    // Saving the updated deck to the database
    await deck.save();

    // Returning the updated deck as a JSON response
    res.json(deck);
  }
}
