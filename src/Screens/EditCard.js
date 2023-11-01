import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {updateCard, readDeck, readCard} from "../utils/api/index"

export default function EditCard(){
    const initFormData = {
        front: "",
        back: ""
    }
    let history = useHistory();
    let {deckId, cardId} = useParams();
    
    const [formData, setFormData] = useState({...initFormData});
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck({flashDeck: result}));
        }
        async function loadCard(){
            const newCard = readCard(cardId, signal);
            newCard.then((result) => setCard({flashCard: result}));
        }
        loadDeck();
        loadCard();
    }, [])

    if(!deck.flashDeck && !card.flashCard) return "Loading";

    setFormData({front: card.flashCard.front, back: card.flashCard.back});

    const changeHandler = ({target}) => {
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
        async function cardUpdate() {
            updateCard(cardId, {...formData}, signal)
                .then(() => history.push(`/decks/${deckId}`))
        }
        cardUpdate();
    }
    
    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.flashDeck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Card {card.flashCard.id}</li>
            </ol>
        </nav>
    );
    console.log(formData);
    return (
        <div>
            {nav}
            <h1>Edit Card</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label for="front">Front</label>
                    <br />
                    <textarea type="text" name="front" id="front" value={formData.front} rows={3} cols={50} onChange={changeHandler} />
                </div>
                <div>
                    <label for="back">Back</label>
                    <br />
                    <textarea type="text" name="back" id="back" value={formData.back} rows={3} cols={50} onChange={changeHandler} />
                </div>
                <div>
                    <Link to={`/decks/${deckId}`} className="btn btn-primary">Cancel</Link>
                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}
