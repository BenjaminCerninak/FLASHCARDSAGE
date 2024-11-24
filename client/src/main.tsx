import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Deck from "./components/Deck/Deck.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // React Router for routing
import { Header } from "./components/Header/Header.tsx";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Root path ("/") for the main app
    element: <App />, // Render the App component for the root path
  },
  {
    path: "/decks/:deckId", // Dynamic route for individual deck pages, used in App.tsx
    element: (
      <>
        <Header />
        <Deck />
      </>
    ),
  },
]);

// Render the application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="page">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
