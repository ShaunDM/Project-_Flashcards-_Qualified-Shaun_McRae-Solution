import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory } from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index"

export default function AddCard({formUpdate}){

    const initCardData = {front: "", back: ""};

    let {deckId} = useParams();
    let history = useHistory();
    
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState(initCardData);

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
    
    const changeHandler = ({target}) => {
        setCard({
            ...card, [target.name]: target.value
        });
    }

    const submitHandler = () => {
        formUpdate(card);
        setCard(initCardData);
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
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Done</Link>
                <button type="submit" onClick={submitHandler} className="btn btn-primary">Save</button>
            </div>
        </div>
    );
}
