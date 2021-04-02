import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api";

function DeckCards({ deck, setDeck, deckId }) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (deckId) {
      try {
        readDeck(deckId, signal).then((data) => {
          setDeck(data);
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deck);
        } else {
          throw error;
        }
      }
    }
    return () => controller.abort();
  }, [deckId]);
  return (
    <div>
      <h1>Cards</h1>
      <ul class="list-group">
        {deck.cards &&
          deck.cards.map((card, index) => {
            return (
              <li key={index} class="list-group-item">
                <div className="row">
                  <div className="col-6 d-flex-wrap">{card.front}</div>
                  <div className="col-6 d-flex-wrap">{card.back}</div>
                </div>
                <button
                  className="btn btn-danger float-right"
                  onClick={() =>
                    window.confirm(
                      "Delete this card? You will not be able to recover it."
                    )
                      ? deleteCard(card.id)
                      : null
                  }
                >
                  Delete
                </button>
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary float-right mx-2"
                >
                  Edit
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default DeckCards;
