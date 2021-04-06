/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";

function Decks({ decks, setDecks }) {
  useEffect(loadDecks, []);

  function loadDecks() {
    listDecks().then(setDecks);
  }

  function deleteHandler(deckId) {
    const comfirmed = window.confirm("Confirm Delete? test1");
    if (comfirmed) {
      deleteDeck(deckId).then(loadDecks);
    }
  }

  return (
    <section>
      {decks
        ? decks.map((deck) => {
            return (
              <div key={deck.id} className="card my-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {deck.name}
                    <span className="float-right">
                      {deck.cards ? `${deck.cards.length} cards` : "No cards!"}
                    </span>{" "}
                  </h5>
                  <p className="card-text">{deck.description}</p>
                  <div>
                    <Link
                      to={`/decks/${deck.id}`}
                      className="btn btn-secondary"
                    >
                      View
                    </Link>
                    <Link
                      to={`/decks/${deck.id}/study`}
                      className="btn btn-primary mx-2"
                    >
                      Study
                    </Link>
                    <span className="float-right">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(deck.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </section>
  );
}

export default Decks;
