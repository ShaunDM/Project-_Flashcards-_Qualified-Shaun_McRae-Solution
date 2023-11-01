import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {createCard, readDeck} from "../utils/api/index"

export default function AddCard(){
    const initFormData = {
        front: "",
        back: ""
    }
    let history = useHistory();
    let {deckId} = useParams();
    
    const [formData, setFormData] = useState({...initFormData});
    const [deck, setDeck] = useState({});

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck({flashDeck: result}));
        }
        loadDeck();
    }, [])

    if(!deck.flashDeck) return "Loading";

    const changeHandler = ({target}) => {
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
        async function cardCreate() {
            createCard(deckId, {...formData}, signal)
                .then(() => setFormData({...initFormData}))
        }
        cardCreate();
    }
    
    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.flashDeck.name}</Link></li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
        </nav>
    );
    console.log(formData);
    return (
        <div>
            {nav}
            <h1>{deck.flashDeck.name}: Add Card</h1>
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
                    <Link to={`/decks/${deckId}`} className="btn btn-primary">Done</Link>
                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}
