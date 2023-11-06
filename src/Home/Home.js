import React from "react";
import { Link } from "react-router-dom";
import ListDecks from "./ListDecks";

export default function Home({decks, deckDelete}){
    return (
        <div>
            <Link to="/decks/new" className="btn btn-primary">+Create Deck</Link>
            <ListDecks decks={decks} deckDelete={deckDelete}/>
        </div>
    );
}