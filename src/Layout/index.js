import React, {useState, useEffect} from "react";
import Header from "./Header";
import Home from "../Home/Home";
import Study from "../Study/Study";
import CreateDeck from "../Deck/CreateDeck";
import NotFound from "./NotFound";
import ViewDeck from "../ViewDeck/ViewDeck";
import EditDeck from "../Deck/EditDeck";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";
import {listDecks, deleteDeck, createDeck} from "../utils/api/index";
import { Route, Switch, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Layout() {
  let history = useHistory();

  const [decks, setDecks] = useState([]);
  const [toDelete, setToDelete] = useState(-1);
  const [toCreate, setToCreate] = useState({});

    useEffect(() => {
      console.log(toCreate);
      const controller = new AbortController();
      const signal = controller.signal;
      async function getDecks() {
          listDecks(signal).then((result) =>
              setDecks(result)
          );
      }
      async function deletion(){
          deleteDeck(toDelete, signal)
          .then(() => {
            setToDelete(-1);
            history.push("/");
          });
      }
      async function creation(){
        createDeck(toCreate, signal)
        .then((result) => {
          console.log(result);
          setToCreate({});
          history.push(`/decks/${result.id}`);
        });
    }
      if(toDelete !== -1) deletion();
      else if(toCreate.name) creation();
      else getDecks();
    }, [toDelete, toCreate])

  const deckDelete = (deckId) => setToDelete(deckId); 

  const deckCreate = (newDeck) => {
    console.log(newDeck);
    setToCreate(newDeck);
  } 

  if(!decks.length) return "Loading";
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} deckDelete={deckDelete}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck deckCreate={deckCreate}/>
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck deckDelete={deckDelete}/>
          </Route>
          <Route  path="/decks/:deckId/edit">
              <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
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
