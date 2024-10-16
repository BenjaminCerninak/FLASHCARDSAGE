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

const db = mongoose
  .connect(
    "mongodb+srv://benflashcardsage:p4bcEynG3oiERGWG@cluster0.a1wp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
