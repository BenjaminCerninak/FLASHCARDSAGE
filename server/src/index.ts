import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckContoller } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", getDecksController);
app.get("/decks/:deckId", getDeckController);

app.delete("/decks/:deckId", deleteDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

app.post("/decks", createDeckContoller);
app.post("/decks/:deckId/cards", createCardForDeckController);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  app.listen(PORT);
});
