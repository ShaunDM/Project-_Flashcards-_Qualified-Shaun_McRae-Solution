import React from "react";

export default function Back({deck, card, flipHandler, nextHandler}){
    return (
        <div className="card-body">
            <h5 className="card-title">Card {card + 1} of {deck.cards.length}</h5>
            <p className="card-text">{deck.cards[card].back}</p>
            <button onClick={flipHandler} className="btn btn-primary">Flip</button>
            <button onClick={nextHandler} className="btn btn-dark">Next</button>
        </div>
    );
}