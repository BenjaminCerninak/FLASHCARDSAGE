import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
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
  const decks = await Deck.find(); // Získá všechny decky
  res.json(decks); // Vrátí decky jako JSON
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  app.listen(PORT);
});
