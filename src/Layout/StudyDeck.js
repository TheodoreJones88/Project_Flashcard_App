import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyNav from "./Study/StudyNav";
import NotEnough from "./Study/NotEnough";
import StudyCardFront from "./Study/StudyCardFront";
import StudyCardBack from "./Study/StudyCardBack";

function StudyDeck() {
  const { deckId } = useParams();
  const [flip, setFlip] = useState(true);
  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

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
  }, [deckId]);

  return (
    <section className="container">
      <StudyNav deck={deck} />
      <h1>{`${deck.name}: Study`}</h1>
      {deck.cards.length < 3 ? (
        <NotEnough deck={deck} />
      ) : flip ? (
        <StudyCardFront
          deck={deck}
          index={index}
          flip={flip}
          setFlip={setFlip}
        />
      ) : (
        <StudyCardBack
          deck={deck}
          index={index}
          setIndex={setIndex}
          flip={flip}
          setFlip={setFlip}
        />
      )}
    </section>
  );
}

export default StudyDeck;
