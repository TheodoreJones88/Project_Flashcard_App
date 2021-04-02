import React, { useState } from "react";
import DeckNav from "./DeckNav";
import DeckTitle from "./DeckTitle";
import { useParams } from "react-router-dom";
import DeckCards from "./DeckCards";

function DeckView() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();

  return (
    <section className="container">
      <DeckNav deck={deck} />
      <DeckTitle deck={deck} setDeck={setDeck} deckId={deckId} />
      <DeckCards deck={deck} setDeck={setDeck} deckId={deckId} />
    </section>
  );
}

export default DeckView;
