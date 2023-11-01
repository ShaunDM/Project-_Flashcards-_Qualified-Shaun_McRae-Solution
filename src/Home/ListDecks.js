import React from "react";
import DeckView from "./DeckView";

export default function ListDecks({decks, deckDelete}){

    return (
        <ul className="list-unstyled">
            {decks.map((deck) => <DeckView deck={deck} deckDelete={deckDelete} key={deck.id}/>)}
        </ul>
    );
}