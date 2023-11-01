
export default function Back({deck, card, flipHandler, nextHandler}){
    return (
        <div className="card-body">
            <h5 className="card-title">Card {card + 1} of {deck.flashDeck.cards.length}</h5>
            <p className="card-text">{deck.flashDeck.cards[card].back}</p>
            <button onClick={flipHandler} className="btn btn-primary">Flip</button>
            <button onClick={nextHandler} className="btn btn-grey">Next</button>
        </div>
    );
}