import React from "react";
import Decks from "./ViewDeck/Decks";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Link to="/decks/new" className="btn btn-secondary m-3">
          Create Deck
        </Link>
      </div>
      <div>
        <Decks />
      </div>
    </div>
  );
}

export default Home;
