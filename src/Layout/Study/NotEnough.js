import React from "react";
import { Link } from "react-router-dom";

function NotEnough({ deck }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>{`You need at least 3 cards to study. There are ${deck.cards.length} in this deck.`}</p>
      <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
        Add Cards
      </Link>
    </div>
  );
}

export default NotEnough;
