import React from "react";
import Decks from "./ViewDeck/Decks";
import { Link } from "react-router-dom";

function Home({ decks, setDecks }) {
  return (
    <div>
      <div>
        <Link to="/decks/new" className="btn btn-secondary m-3">
          Create Deck
        </Link>
      </div>
      <div>
        <Decks decks={decks} setDecks={setDecks} />
      </div>
    </div>
  );
}

export default Home;
