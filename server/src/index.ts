import { config } from "dotenv";
config();
import express, { Request, response, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";

const PORT = 5000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  // TODO fetch all decks and send back to the user

  const decks = await Deck.find(); // 1. how do we fetch the decks from mongo

  res.json(decks); // 2. how do we send back arr to the UI
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
