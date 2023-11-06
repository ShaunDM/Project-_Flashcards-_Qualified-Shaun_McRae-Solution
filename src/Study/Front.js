import React from "react";

export default function Front({deck, card, flipHandler}){
    return (
        <div className="card-body">
            <h5 className="card-title">Card {card + 1} of {deck.cards.length}</h5>
            <p className="card-text">{deck.cards[card].front}</p>
            <button onClick={flipHandler} className="btn btn-primary">Flip</button>
        </div>
    );
}