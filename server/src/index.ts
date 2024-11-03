import express, { Request, Response } from "express";

import mongoose from "mongoose";

import Deck from "./models/Deck";
const PORT = 5000;
const app = express();

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://benflashcardsage:3TASauNjZfe9HOdG@cluster0.a1wp9.mongodb.net/"
  )
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    app.listen(PORT);
  });
