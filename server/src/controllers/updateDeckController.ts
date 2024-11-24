import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function updateDeckController(req: Request, res: Response) {
  // Get the deckId from URL parameters
  const { deckId } = req.params;

  // Get the new title from the request body
  const { title } = req.body;

  // Find the deck by ID and update it
  const updatedDeck = await Deck.findByIdAndUpdate(
    deckId, // Search by deckId
    { title }, // Fields to update
    { new: true } // Return the updated deck
  );

  // Send the updated deck back as a response
  res.json(updatedDeck);
}
