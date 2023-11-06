import React, { useState } from "react";
import { Link, useParams, Switch, Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { updateCard, createCard } from "../utils/api";

export default function CardForm({}) {

    let history = useHistory();

    const [formData, setFormData] = useState({});
    const {cardId, deckId} = useParams();

    const formUpdate = (newFormData) => {
        setFormData(newFormData);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
        if(cardId !== "new"){
            async function cardUpdate() {
                updateCard(formData, signal)
                    .then(() => history.push(`/decks/${deckId}`))
            }
            cardUpdate();
        } else{
            async function cardCreate() {
                createCard(deckId, {...formData}, signal);
            }
            cardCreate();
        }
    }

    const form = (
        <form onSubmit={submitHandler}>
            <Switch >
                <Route path = "/decks/:deckId/cards/new" >
                    <AddCard formUpdate={formUpdate}/>
                </Route>
                <Route path = "/decks/:deckId/cards/:cardId/edit" >
                    <EditCard formUpdate={formUpdate}/>
                </Route>
            </Switch>
        </form>
    );

    return form;
}

