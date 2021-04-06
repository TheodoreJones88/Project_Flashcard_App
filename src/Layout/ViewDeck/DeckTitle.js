/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

function DeckTitle({ deck, setDeck, setDecks, deckId }) {
  const history = useHistory();

  function loadDecks() {
    listDecks().then(setDecks);
  }

  function handleDelete(deckId) {
    const confirmed = window.confirm("Comfirm Delete?");
    if (confirmed) {
      deleteDeck(deckId)
        .then(() => loadDecks())
        .then(() => history.push("/"));
    }
  }

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
              onClick={() => handleDelete(deck.id)}
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
