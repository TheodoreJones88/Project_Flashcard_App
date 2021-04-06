import React, { useState, useEffect } from "react";
import DeckNav from "./DeckNav";
import DeckTitle from "./DeckTitle";
import { useParams } from "react-router-dom";
import DeckCards from "./DeckCards";
import { readDeck } from "../../utils/api";

function DeckView({ setDecks }) {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  useEffect(loadDeck, [deckId]);
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  return (
    <section className="container">
      <DeckNav deck={deck} />
      <DeckTitle
        deck={deck}
        setDeck={setDeck}
        setDecks={setDecks}
        deckId={deckId}
      />
      <DeckCards deck={deck} setDeck={setDeck} deckId={deckId} />
    </section>
  );
}

export default DeckView;
