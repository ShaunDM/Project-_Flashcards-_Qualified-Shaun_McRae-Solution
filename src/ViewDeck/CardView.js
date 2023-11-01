import { Link } from "react-router-dom/cjs/react-router-dom.min"

export default function CardView({card, cardDelete}) {
    const handleClick = (event) => {
        if(!window.confirm("Delete this card? \n \n You will not be able to recover it.")){
            return ;
        } 
        const cardId = event.target.parentElement.parentElement.value;
        cardDelete(cardId);
    }

    return (
        <li className="card-body border" value={card.id} id={card.id} name={card.deckId}>
            <div className="row">
                <p className="card-text col-6" >{card.front}</p>
                <p className="card-text">{card.back}</p>
            </div>
            <div className="row">
                <Link to={`/decks/${card.deckId}/cards/${card.id}`} className="btn btn-primary">Edit</Link>
                <button onClick={handleClick} className="btn btn-primary">Delete</button>
            </div>
        </li>
    );
}