import { useLayoutEffect } from "react";
import {useHistory} from "react-router-dom";


export default function End({deck, card, flipHandler, reset}){
    let history = useHistory();
    useLayoutEffect (() => {
        setTimeout(() => {
            if(!window.confirm("Restart cards? \n \n Click 'cancel' to return to the home page.")){
                history.push("/");
            }
            else reset();
        }, "100")
    })
    
    return (
        <div className="card-body">
            <h5 className="card-title">Card {card + 1} of {deck.cards.length}</h5>
            <p className="card-text">{deck.cards[card].back}</p>
            <button onClick={flipHandler} className="btn btn-primary">Flip</button>
        </div>
    );
}