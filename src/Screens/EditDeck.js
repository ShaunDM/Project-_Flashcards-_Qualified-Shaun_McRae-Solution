import React, {useState} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {updateDeck} from "../utils/api/index"

export default function EditDeck({deckObject}){
    let history = useHistory();
    const {deckId} = useParams();
    const [formData, setFormData] = useState(deckObject);
    
    console.log(deckObject);

    const changeHandler = ({target}) => {
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
        async function deckUpdate() {
            updateDeck(formData, signal)
                .then((result) => history.push(`/decks/${result.id}`))
        }
        deckUpdate();
    }
    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{formData.name}</Link></li>
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
                    <label for="name">Name</label>
                    <br />
                    <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} />
                </div>
                <div>
                    <label for="description">Description</label>
                    <br />
                    <textarea type="text" name="description" id="description" value={formData.description} rows={5} cols={30} onChange={changeHandler} />
                </div>
                <div>
                    <Link to={`/decks/${deckId}`} className="btn btn-primary">Cancel</Link>
                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}