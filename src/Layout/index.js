import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import DeckView from "./ViewDeck/DeckView";
import Header from "./Header";
import StudyDeck from "./StudyDeck";
import NotFound from "./NotFound";
import Forms from "./Forms";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <Forms
              decks={decks}
              setDecks={setDecks}
              newItem={true}
              isDeck={true}
            />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Forms
              decks={decks}
              setDecks={setDecks}
              newItem={false}
              isDeck={true}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Forms newItem={true} isDeck={false} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Forms newItem={false} isDeck={false} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
