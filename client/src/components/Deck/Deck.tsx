import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Deck.css";
import { deleteCard } from "../../api/deleteCard";
import { TDeck } from "../../api/getDecks";
import { createCard } from "../../api/createCard";
import { getDeck } from "../../api/getDeck";

export default function Deck() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<String[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>(); // Current deck object
  const { deckId } = useParams(); // DeckId from the URL parameters
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

  // Deleting a card from the deck
  async function handleDeleteCard(index: number) {
    if (!deckId) return; // If there's no deckId, exit
    const newDeck = await deleteCard(deckId, index); // Deleting the card using API
    setCards(newDeck.cards); // Updating the local state with the new list of cards
  }

  // Creating a new card and adding it to the deck
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      // If the card text is empty, set an error state
      setIsEmptyTitle(true);
      return;
    }

    const { cards: serverCards } = await createCard(deckId!, text); // Creating a new card via API
    setIsEmptyTitle(false); // Resetting the error state

    setText("");
    setCards(serverCards);
  }

  // fetch the deck details and cards when the component is mounted
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return; // If no deckId, exit the function
      const newDeck = await getDeck(deckId!); // Fetching the deck details from the API
      setDeck(newDeck); // Setting the deck state with the fetched data
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
        <label htmlFor="card-text">Card Text</label>
        <input
          className={isEmptyTitle ? "input-error" : ""} // Adds error styling when user tries to submit empty input
          id="card-text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
            setIsEmptyTitle(false);
          }}
          value={text}
        />
        {isEmptyTitle && (
          <p className="error-message">This field cannot be empty!</p>
        )}
        <button>Add Card</button>{" "}
      </form>
    </div>
  );
}
