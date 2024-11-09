import Deck from "../models/Deck";
import { Request, Response } from "express";
export async function createCardForDeckContoller (req: Request, res: Response){
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    const {text} = req.body
    if (deck) {
        
        deck.cards.push(text);
        await deck.save();
        res.json(deck);
    }
  }

  