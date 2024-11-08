import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

async function handleDelete(cardId: string) {
  await fetch(`http://localhost:5000/decks/${cardId}`, {
    method: "DELETE",
  });

  setDecks(decks.filter((deck)=>deck._id !== cardId))
  
}

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const createdDeck = await response.json();
    setTitle("");
    setDecks([...decks,createdDeck])
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
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
