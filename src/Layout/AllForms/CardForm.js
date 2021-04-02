import React, { useEffect } from "react";
import AddEditNav from "./AddEditNav";
import { readCard, readDeck, updateCard, createCard } from "../../utils/api";

function CardForm({
  isDeck,
  newItem,
  deck,
  setDeck,
  deckId,
  history,
  cardId,
  formFields,
  setFormFields,
  formNames,
  setFormNames,
  card,
  setCard,
}) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (cardId) {
      try {
        readCard(cardId, signal).then((data) => {
          setCard(data);
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", card);
        } else {
          throw error;
        }
      }
    }
  }, [cardId]);
  console.log(cardId);
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
  }, [deckId]);

  useEffect(() => {
    newItem
      ? setFormNames({
          title: "New",
          firstLabel: "Front",
          secondLabel: "Back",
          titleCard: "Card",
        })
      : setFormNames({
          title: "Edit",
          firstLabel: "Front",
          secondLabel: "Back",
          titleCard: "Card",
        });
  }, []);

  useEffect(() => {
    if (!newItem)
      card && setFormFields({ firstInput: card.front, secondInput: card.back });
  }, [card]);
  console.log("card:", card);

  function submitHandler(event) {
    event.preventDefault();
    if (newItem) {
      createCard(deckId, {
        front: formFields.firstInput,
        back: formFields.secondInput,
      });
    } else {
      updateCard({
        ...card,
        front: formFields.firstInput,
        back: formFields.secondInput,
      });
      history.push(`/decks/${deckId}`);
    }
  }
  return (
    <section className="container">
      <AddEditNav
        newItem={newItem}
        isDeck={isDeck}
        deckId={deckId}
        cardId={cardId}
        deck={deck}
      />
      <h1>{`${formNames.title} ${formNames.titleCard}`}</h1>
      <form>
        <div className="form-group">
          <label for="frontTextArea">{formNames.labelFirst}</label>
          <textarea
            placeholder="Front side of card"
            className="form-control"
            id="frontTextArea"
            value={formFields.firstInput}
            onChange={(event) =>
              setFormFields({
                ...formFields,
                firstInput: event.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label for="openTextArea">{formNames.secondLabel}</label>
          <textarea
            placeholder="Back side of card"
            className="form-control"
            id="openTextArea"
            value={formFields.secondInput}
            onChange={(event) =>
              setFormFields({
                ...formFields,
                secondInput: event.target.value,
              })
            }
          ></textarea>
        </div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            {newItem ? "Done" : "Cancel"}
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={(event) => submitHandler(event)}
          >
            {newItem ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default CardForm;
