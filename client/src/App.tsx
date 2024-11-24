import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { createDeck } from "./api/createDeck"; // API call to create a new deck
import { getDecks } from "./api/getDecks"; // API call to fetch existing decks
import { deleteDeck } from "./api/deleteDeck"; // API call to delete a deck
import { TDeck } from "./api/getDecks"; // Type definition

function App() {
  const [title, setTitle] = useState(""); // New deck
  const [decks, setDecks] = useState<TDeck[]>([]); // All decks
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

  // Delete a deck by its ID
  async function handleDelete(deckId: string) {
    deleteDeck(deckId); // Call API to delete the deck
    setDecks(decks.filter((deck) => deck._id !== deckId)); // Remove the deleted deck
  }

  // Create a new deck
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      // Check if title is empty
      setIsEmptyTitle(true);
      return;
    }

    // Call API to create a deck and get the created deck object
    const createdDeck = await createDeck(title);
    setIsEmptyTitle(false); // Reset error state
    setTitle("");
    // Add the newly created deck to the local state
    setDecks((prevDecks) => [...prevDecks, createdDeck]);
  }

  // Fetch all decks when the component is first rendered
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks(); // Call API to fetch decks
      setDecks(newDecks); // Set the fetched decks
    }
    fetchDecks();
  }, []);

  // TODO Sorting the decks alphabetically (in Phase 2)
  //TODO  decks.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="App">
      <h1>Your Decks</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDelete(deck._id)}>x</button>
            <p>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-id">Deck Title</label>
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
