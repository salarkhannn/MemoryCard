import { useEffect, useState } from "react";
import fetchNaruto from "../utils/naruto";
import "../styles/card.css"
import cardBack from "../assets/cardBack.jpg"

// export default function Card({ character, onCardClick}){
export default function Card({ card, onCardClick }){
    const handleClick = () => {
        onCardClick(card.id);
    };

    return (
        <div className="card-container">
            <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
                <div className="card-front">
                    <img src={card.image} alt={card.name} className="card-image" />
                    <h3 className="card-name">{card.name}</h3>
                </div>
                <div className="card-back">
                    <img src={cardBack} />
                </div>
            </div>
        </div>
    );
}