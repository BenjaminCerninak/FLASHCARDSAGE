import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Deck from './Deck.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
  path: "/",
    element:  <App/>,
  },
  {
  path: "/decks/:deckId",
    element:  <Deck/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
  <RouterProvider router={router} />
</StrictMode>
)
