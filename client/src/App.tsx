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
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

  async function handleDelete(deckId: string) {
    deleteDeck(deckId);

    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setIsEmptyTitle(true);
      return;
    }
    const createdDeck = await createDeck(title);
    setIsEmptyTitle(false);
    setTitle("");
    setDecks([...decks, createdDeck]);
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
      <h1>Your Decks</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDelete(deck._id)}>x</button>
            <p>
              {" "}
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-id">Deck Title</label>{" "}
        <input
          className={isEmptyTitle ? "input-error" : ""}
          id="deck-id"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            setIsEmptyTitle(false);
          }}
          value={title}
        />
        {isEmptyTitle && (
          <p className="error-message">This field cannot be empty!</p>
        )}
        <button>Add Deck</button>
      </form>
    </div>
  );
}

export default App;
