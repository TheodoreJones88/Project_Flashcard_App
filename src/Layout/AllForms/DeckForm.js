/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AddEditNav from "./AddEditNav";
import { readDeck, updateDeck, createDeck } from "../../utils/api";

function DeckForm({
  isDeck,
  decks,
  setDecks,
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
}) {
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
          title: "Create",
          firstLabel: "Name",
          secondLabel: "Description",
          titleDeck: "Deck",
        })
      : setFormNames({
          title: "Edit",
          firstLabel: "Name",
          secondLabel: "Description",
          titleDeck: "Deck",
        });
  }, []);

  useEffect(() => {
    if (!newItem)
      setFormFields({
        firstInput: deck.name,
        secondInput: deck.description,
      });
  }, [deck]);
  const newDecks = [...decks];
  function submitHandler(event) {
    event.preventDefault();
    if (newItem) {
      createDeck({
        name: formFields.firstInput,
        description: formFields.secondInput,
      }).then((res) => {
        newDecks.push(res);
        setDecks(() => newDecks);
      });
      history.push(`/`);
    } else {
      updateDeck({
        name: formFields.firstInput,
        description: formFields.secondInput,
        id: deckId,
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
      <h1>{`${formNames.title} ${formNames.titleDeck}`}</h1>
      <form>
        <div className="form-group">
          <label for="deckName">{formNames.labelFirst}</label>
          <input
            placeholder="Deck Name"
            className="form-control"
            type="text"
            id="deckName"
            value={formFields.firstInput}
            onChange={(event) =>
              setFormFields({
                ...formFields,
                firstInput: event.target.value,
              })
            }
          ></input>
        </div>
        <div className="form-group">
          <label for="openTextArea">{formNames.secondLabel}</label>
          <textarea
            placeholder={isDeck ? "Description of deck" : "Back side of card"}
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
            onClick={() =>
              isDeck ? history.push("/") : history.push(`/decks/${deckId}`)
            }
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

export default DeckForm;
