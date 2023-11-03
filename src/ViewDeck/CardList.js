import CardView from "./CardView";

export default function CardList({cards, cardDelete}) {
    return(
        <ul className="list-unstyled">
            {cards.map((card) => <CardView card={card} cardDelete={cardDelete} key={card.id}/>)}
        </ul>
    );
} 

