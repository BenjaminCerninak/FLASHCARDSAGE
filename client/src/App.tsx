import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { createDeck } from "./api/createDeck";
import { getDecks } from "./api/getDecks";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck } from "./api/getDecks";
function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

async function handleDelete(cardId: string) {
  deleteDeck(cardId)

  setDecks(decks.filter((deck)=>deck._id !== cardId))
  
}

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const createdDeck = await createDeck(title);
    setTitle("");
    setDecks([...decks, createdDeck])
  }

  useEffect(() => {
    async function fetchDecks() {
    const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
          <button onClick={()=>handleDelete(deck._id)}>x</button>
            <p>              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-id">Deck Title</label>{" "}
        <input
          id="deck-id"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <button>Add Deck</button>
      </form>
    </div>
  );
}

export default App;
