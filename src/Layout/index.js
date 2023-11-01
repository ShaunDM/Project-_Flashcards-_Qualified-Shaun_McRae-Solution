import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Home/Home";
import Study from "../Study/Study";
import CreateDeck from "../Screens/CreateDeck";
import NotFound from "../Screens/NotFound";
import ViewDeck from "../ViewDeck/ViewDeck";
import EditDeck from "../Screens/EditDeck";
import AddCard from "../Screens/AddCard";
import EditCard from "../Screens/EditCard";
import db from "../data/db.json";
import {listDecks, deleteDeck} from "../utils/api/index";

function Layout() {
  const [cards, setCards] = useState(db.cards);
  const [decks, setDecks] = useState([]);
  const [toDelete, setToDelete] = useState(-1);

    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      async function getDecks() {
          listDecks(signal).then((result) =>
              setDecks(result)
          );
      }
      async function deletion(){
          deleteDeck(toDelete, signal)
          .then(() => setToDelete(-1));
      }
      if(toDelete !== -1) deletion();
      else getDecks();
    }, [toDelete])

  const deckDelete = (deckId) => setToDelete(deckId); 

  const deleteCard = (indexToDelete) => (
    setCards(cards.filter((card, index) => index !== indexToDelete))
  );
  const createCard = (newCard) => (
    setCards([...newCard, ...cards])
  ); 

  if(!decks.length) return "Loading";
  console.log(decks);
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} deckDelete={deckDelete}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>        
        </Switch>
      </div>
    </>
  );
}

export default Layout;
