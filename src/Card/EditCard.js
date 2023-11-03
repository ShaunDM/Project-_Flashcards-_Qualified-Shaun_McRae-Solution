import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {updateCard, readDeck, readCard} from "../utils/api/index"
import CardForm from "./CardForm";

export default function EditCard(){

    let history = useHistory();
    let {deckId, cardId} = useParams();
    
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})

    useEffect (() => {
        const deckController = new AbortController();
        const deckSignal = deckController.signal;
        const cardController = new AbortController();
        const cardSignal = cardController.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, deckSignal);
            newDeck.then((result) => setDeck(result));
        }
        async function loadCard(){
            const newCard = readCard(cardId, cardSignal);
            newCard.then((result) => setCard(result));
        }
        loadDeck();
        loadCard();
    }, [])


    if(!deck.id && !card.id) return "Loading";

    console.log(card);

    const update = (cardToUpdate) => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function cardUpdate() {
            updateCard(cardId, {...cardToUpdate}, signal)
                .then(() => history.push(`/decks/${deckId}`))
        }
        cardUpdate();
    }
    
    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Card {card.id}</li>
            </ol>
        </nav>
    );
    
    return (
        <div>
            {nav}
            <h1>Edit Card</h1>
            <CardForm deckId={deckId} submission={update} card={card} />
        </div>
    );
}
