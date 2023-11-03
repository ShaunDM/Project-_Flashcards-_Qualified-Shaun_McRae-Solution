import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function CardForm({deckId, submission, card}) {

    const [formData, setFormData] = useState(card);
    
    const changeHandler = ({target}) => {
        console.log("change", formData);
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    // const formHandler = ({target}) => {
    //     console.log("change", target.value)
    //     updateForm(target)
    // }

    const submitHandler = (event) => {
        event.preventDefault();
        submission(formData);
        setFormData(card);
    }

    console.log("Formdata: ", formData, card)

    const form = (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="front">Front</label>
                <br />
                <textarea type="text" name="front" id="front" value={formData.front} rows={3} cols={50} onChange={changeHandler} />
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <br />
                <textarea type="text" name="back" id="back" value={formData.back} rows={3} cols={50} onChange={changeHandler} />
            </div>
            <div>
                <Link to={`/decks/${deckId}`} className="btn btn-primary">Done</Link>
                <button type="submit" onClick={submitHandler} className="btn btn-primary">Save</button>
            </div>
        </form>
    );

    return form;
}