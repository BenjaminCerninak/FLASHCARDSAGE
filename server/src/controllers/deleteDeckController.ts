import Deck from "../models/Deck";
import express, { Request, Response } from "express";

// Delete a deck by its ID
export async function deleteDeckController(req: Request, res: Response) {
  // Extracting the deckId from the URL parameters
  const deckId = req.params.deckId;

  // Using Mongoose's findByIdAndDelete method to delete the deck by its ID
  const deck = await Deck.findByIdAndDelete(deckId);

  // Responding with the deleted deck
  res.json(deck);
}
