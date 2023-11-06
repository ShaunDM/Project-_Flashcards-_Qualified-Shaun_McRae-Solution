import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function CreateDeck({deckCreate}){
    const initFormData={name: "", description: ""};
    const [formData, setFormData] = useState({initFormData});

    const changeHandler = ({target}) => {
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        deckCreate(formData);
    }

    const nav = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
        </nav>
    );
    return (
        <div>
            {nav}
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name
                        <br />
                        <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} />
                    </label>
                    <br />
                    <label htmlFor="description">Description
                        <br />
                        <textarea type="text" name="description" id="description" value={formData.description} rows={5} cols={30} onChange={changeHandler} />
                    </label>
                </div>
                <div>
                    <Link to="/" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}