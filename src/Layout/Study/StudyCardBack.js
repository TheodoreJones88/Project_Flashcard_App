import React from "react";
import { useHistory } from "react-router";

function StudyCardBack({ deck, index, setIndex, flip, setFlip }) {
  const history = useHistory();
  return (
    <div className="card" key={index}>
      <div className="card-body">
        <h5 className="card-title">
          Card {`${index + 1} of ${deck.cards.length}`}
        </h5>
        <p className="card-text">{deck.cards[index].back}</p>
        <button className="btn btn-secondary" onClick={() => setFlip(!flip)}>
          Flip
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (index + 1 === deck.cards.length) {
              if (window.confirm("Restart cards?")) {
                setIndex(0);
                setFlip(true);
              } else {
                history.push("/");
              }
            } else {
              setIndex(index + 1);
              setFlip(true);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudyCardBack;
