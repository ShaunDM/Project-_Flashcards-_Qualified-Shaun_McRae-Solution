import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import {readDeck} from "../utils/api/index";
import Front from "./Front";
import Back from "./Back";
import End from "./End";

export default function Study() {
    const [flipped, setFlipped] = useState(false);
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState(0);
    const {deckId} = useParams();
    const flipHandler = () => {
        setFlipped(!flipped);
    }
    const nextHandler = () => {
        setCard(card + 1);
        setFlipped(!flipped);
    }

    const reset = () => {
        setCard(0);
        setFlipped(false);
    }

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck(result));
        }
        loadDeck();
    }, [])

    if(!deck.id) return "Loading...";

    const deckLength = deck.cards.length;

    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
        </nav>
    );

    const title = <h3>Study: {deck.name}</h3>;

    if(deckLength < 3){
        return (
            <div>
                {nav}
                {title}
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {deckLength} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">+Add Cards</Link>
            </div>
        );
    }

    if(!flipped){
        return (
            <div>
               {nav}
               {title}
               <Front deck={deck} card={card} flipHandler={flipHandler}/>
            </div>
        );
    } else if(card + 1 !== deckLength || !flipped){
        return (
            <div>
               {nav}
               {title}
               <Back deck={deck} card={card} flipHandler={flipHandler} nextHandler={nextHandler}/>
            </div>
        );
    } else {
        return (
            <div>
               {nav}
               {title}
               <End deck={deck} card={card} flipHandler={flipHandler} reset={reset}/>
            </div>
        );
    }  
}