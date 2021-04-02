import React, { useEffect } from "react";
import { deleteDeck, readDeck } from "../../utils/api";
import { Link } from "react-router-dom";

function DeckTitle({ deck, setDeck, deckId }) {
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <div>
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">
            Study
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
          <span className="float-right">
            <Link
              to="/"
              className="btn btn-danger"
              onClick={() =>
                window.confirm("Confirm Delete?") ? deleteDeck(deck.id) : null
              }
            >
              Delete
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeckTitle;
