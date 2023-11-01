import { Link } from "react-router-dom";

export default function DeckView({deck, deckDelete}){
    const handleClick = (event) => {
        if(!window.confirm("Delete this deck? \n \n You will not be able to recover it.")){
            return ;
        } 
        const deckId = event.target.parentElement.value;
        deckDelete(deckId);
    }
    return(
        <li className="card-body border" value={deck.id} id={deck.id} name={deck.name}>
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
            <button onClick={handleClick} className="btn btn-primary">Delete</button>
        </li>
    );
}