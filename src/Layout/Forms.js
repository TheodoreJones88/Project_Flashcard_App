import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import CardForm from "./AllForms/CardForm";
import DeckForm from "./AllForms/DeckForm";

function Forms({ isDeck, newItem, decks, setDecks }) {
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState();
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    firstInput: "",
    secondInput: "",
  });
  const [formNames, setFormNames] = useState({
    firstLabel: "",
    secondLabel: "",
    title: "",
    titleDeck: "",
  });

  return isDeck ? (
    <DeckForm
      decks={decks}
      setDecks={setDecks}
      isDeck={isDeck}
      deck={deck}
      card={card}
      newItem={newItem}
      setDeck={setDeck}
      deckId={deckId}
      cardId={cardId}
      history={history}
      formFields={formFields}
      setFormFields={setFormFields}
      formNames={formNames}
      setFormNames={setFormNames}
    />
  ) : (
    <CardForm
      isDeck={isDeck}
      newItem={newItem}
      deck={deck}
      card={card}
      setDeck={setDeck}
      setCard={setCard}
      deckId={deckId}
      cardId={cardId}
      history={history}
      formFields={formFields}
      setFormFields={setFormFields}
      formNames={formNames}
      setFormNames={setFormNames}
    />
  );
}
export default Forms;
