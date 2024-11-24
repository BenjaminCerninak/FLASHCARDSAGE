import Deck from "../models/Deck";
import { Request, Response } from "express";

// Retrieve a deck by its ID
export async function getDeckController(req: Request, res: Response) {
  // Destructuring deckId from the request parameters
  const { deckId } = req.params;

  // Finding the deck by its ID in the database
  const deck = await Deck.findById(deckId);

  // Returning the found deck as a JSON response
  res.json(deck);
}
