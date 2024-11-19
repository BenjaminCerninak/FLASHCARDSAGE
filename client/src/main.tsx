import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Deck from "./components/Deck/Deck.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/decks/:deckId",

    element: (
      <>
        <Header />
        <Deck />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="page">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
