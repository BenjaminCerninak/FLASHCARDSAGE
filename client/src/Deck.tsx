import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Deck.css";
import { deleteCard } from "./api/deleteCard";
import { TDeck } from "./api/getDecks";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";

export default function Deck() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<String[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>();
  const { deckId } = useParams();

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
    //setDecks(decks.filter((deck)=>deck._id !== cardId))
  }

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setText("");
    setCards(serverCards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId!);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            <p>{card}</p>
            <button onClick={() => handleDeleteCard(index)}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text</label>{" "}
        <input
          id="card-text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button>Add Card</button>
      </form>
    </div>
  );
}
