import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory } from "react-router-dom";
import {updateCard, readDeck, readCard} from "../utils/api/index"

export default function EditCard({formUpdate}){

    let {deckId, cardId} = useParams();
    let history = useHistory();

    
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

    const changeHandler = ({target}) => {
        setCard({
            ...card, [target.name]: target.value
        });
    }
    const submitHandler = () => {
        formUpdate(card);
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
            <div>
                <label htmlFor="front">Front</label>
                <br />
                <textarea type="text" name="front" id="front" value={card.front} rows={3} cols={50} onChange={changeHandler} />
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <br />
                <textarea type="text" name="back" id="back" value={card.back} rows={3} cols={50} onChange={changeHandler} />
            </div>
            <div>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                <button type="submit" onClick={submitHandler} className="btn btn-primary">Save</button>
            </div>
        </div>
    );
}
