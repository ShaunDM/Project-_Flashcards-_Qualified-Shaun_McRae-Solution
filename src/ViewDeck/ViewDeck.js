import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, deleteCard } from "../utils/api";
import CardList from "./CardList";

export default function ViewDeck({deckDelete}) {

    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cardToDelete, setCardToDelete] = useState(-1);

    useEffect(() =>{
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck(result));
        }
        async function deletion(){
            deleteCard(cardToDelete, signal)
            .then(() => setCardToDelete(-1));
        }
        if(cardToDelete !== -1) deletion();
        else loadDeck();
    }, [cardToDelete])

    if(!deck.id) return "Loading...";

    const handleClick = (event) => {
        if(!window.confirm("Delete this deck? \n \n You will not be able to recover it.")){
            return ;
        } 
        deckDelete(deckId);
    };

    const cardDelete = (cardId) => setCardToDelete(cardId);

    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
        </nav>
    );
    const deckDescription = (
        <div>
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-primary">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            <button onClick={handleClick} className="btn btn-primary">Delete</button>
        </div>
    );
    const cardList = (
        <div>
            <h3>Cards</h3>
            <CardList cards={deck.cards} cardDelete={cardDelete}/>
        </div>
    );
    return (
        <div>
            {nav}
            {deckDescription}
            {cardList}
        </div>
    );
}