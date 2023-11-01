import React, {useEffect, useState} from "react";
import { Link, Switch, useHistory, useParams, Route } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";
import CardList from "./CardList";
import EditDeck from "../Screens/EditDeck";

export default function ViewDeck() {
    let history = useHistory();

    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cardToDelete, setCardToDelete] = useState(-1);

    useEffect(() =>{
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck({flashDeck: result}));
        }
        async function deletion(){
            deleteCard(cardToDelete, signal)
            .then(() => setCardToDelete(-1));
        }
        if(cardToDelete !== -1) deletion();
        else loadDeck();
    }, [cardToDelete])

    console.log(deck);

    if(!deck.flashDeck) return "Loading...";

    console.log(deck);

    const handleClick = (event) => {
        if(!window.confirm("Delete this deck? \n \n You will not be able to recover it.")){
            return ;
        } 
        const deckId = event.target.parentElement.value;
        const controller = new AbortController();
        const signal = controller.signal;
        deleteDeck(deckId, signal).then(() => history.push("/"));
    };

    const deckObject = deck.flashDeck;

    const cardDelete = (cardId) => setCardToDelete(cardId);

    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">{deckObject.name}</li>
            </ol>
        </nav>
    );
    const deckDescription = (
        <div>
            <h5 className="card-title">{deckObject.name}</h5>
            <p className="card-text">{deckObject.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-primary">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            <button onClick={handleClick} className="btn btn-primary">Delete</button>
        </div>
    );
    const cardList = (
        <div>
            <h3>Cards</h3>
            <CardList cards={deckObject.cards} cardDelete={cardDelete}/>
        </div>
    );
    console.log(deckObject);
    return (
        <Switch>
            <Route exact path="/decks/:deckId">
                {nav}
                {deckDescription}
                {cardList}
            </Route>
            <Route  path="/decks/:deckId/edit">
                <EditDeck deck={deckObject}/>
            </Route>
        </Switch>
    );
}