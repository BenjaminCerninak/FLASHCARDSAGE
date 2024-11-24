import Deck from "../models/Deck";
import { Request, Response } from "express";

// Create a new deck
export async function createDeckController(req: Request, res: Response) {
  // Creating a new deck instance with the title from the request body
  const newDeck = new Deck({
    title: req.body.title, // Assigning the title from the request body to the deck
  });

  // Saving the new deck to the database
  const createdDeck = await newDeck.save();

  // Returning the newly created deck as a JSON response
  res.json(createdDeck);
}
