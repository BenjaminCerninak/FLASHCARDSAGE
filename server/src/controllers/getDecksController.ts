import Deck from "../models/Deck";
import { Request, Response } from "express";

// Get all decks from DB
export async function getDecksController(req: Request, res: Response) {
  const decks = await Deck.find(); // Get all decks from DB
  res.json(decks); // Returns decks
}
