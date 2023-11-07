import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {updateDeck, readDeck} from "../utils/api/index"

export default function EditDeck(){

    let history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})

    useEffect (() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function loadDeck(){
            const newDeck = readDeck(deckId, signal);
            newDeck.then((result) => setDeck(result))
        }
        loadDeck();
    }, [])

    if(!deck.id) return "Loading...";

    const changeHandler = ({target}) => {
        setDeck({
            ...deck, [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
        async function deckUpdate() {
            updateDeck(deck, signal)
                .then(() => history.push(`/decks/${deckId}`))
        }
        deckUpdate();
    }
    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
        </nav>
    );
    return (
        <div>
            {nav}
            <h1>Edit Deck</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input type="text" name="name" id="name" value={deck.name} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea type="text" name="description" id="description" value={deck.description} rows={5} cols={30} onChange={changeHandler} />
                </div>
                <div>
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}