import React from "react";

function StudyCardFront({ deck, index, flip, setFlip }) {
  return (
    <div className="card" key={index}>
      <div className="card-body">
        <h5 className="card-title">
          Card {`${index + 1} of ${deck.cards.length}`}
        </h5>
        <p className="card-text">{deck.cards[index].front}</p>
        <button className="btn btn-secondary" onClick={() => setFlip(!flip)}>
          Flip
        </button>
      </div>
    </div>
  );
}

export default StudyCardFront;
