import "./Header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <Link to="/" className="back-link">
          Back To Decks
        </Link>
      </div>
    </div>
  );
}
