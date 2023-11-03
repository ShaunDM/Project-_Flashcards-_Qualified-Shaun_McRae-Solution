import React, {useState, useEffect} from "react";
import {Link, useParams } from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index"
import CardForm from "./CardForm";

export default function AddCard(){

    const initFormData = {front: "", back: ""};

    let {deckId} = useParams();
    
    const [deck, setDeck] = useState({});

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck(result));
        }
        loadDeck();
    }, [])

    if(!deck.id) return "Loading";
    
    const addCard = (newCard) => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function cardCreate() {
            createCard(deckId, {...newCard}, signal)
        }
        cardCreate();
    }

    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
        </nav>
    );

    return (
        <div>
            {nav}
            <h1>{deck.name}: Add Card</h1>
            <CardForm deckId={deckId} submission={addCard} card={{...initFormData}}/>
        </div>
    );
}
