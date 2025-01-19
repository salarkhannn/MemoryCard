import { useEffect, useState } from "react";
import fetchNaruto from "../utils/naruto";
import "../styles/card.css"
// import cardBack from "../assets/cardBack.jpg"
import cardBack from "../assets/cardBack2.jpg"
import cardEffect from "../assets/effect.png"

import Tilt from "react-parallax-tilt";

// export default function Card({ character, onCardClick}){
export default function Card({ card, onCardClick, isFlipping, shouldFlipAll }){
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(shouldFlipAll);
    }, [shouldFlipAll]);

    const handleClick = () => {
        if (!isFlipping) {
            onCardClick(card.id);
        }
    };

    return (
        <Tilt
            className="tilt-container"
            glareEnable={false}
            // glareMaxOpacity={0.5}
            // glarePosition="all"
            // glareColor="#ffffff"
            // glareBorderRadius="10px"
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1}
            transitionSpeed={300}
        >
            <div className="card-container flex items-center">
                <div
                    className={`card ${isFlipped ? 'flipped' : ''}`}
                    onClick={handleClick}
                    style={{ cursor: isFlipping ? "default" : "pointer" }}
                >
                    <div className="card-front flex flex-col items-center">
                        <img src={cardEffect} className="card-effect absolute" />
                        <img src={card.image} alt={card.name} className="card-image" />
                        <h3 className="card-name">{card.name}</h3>
                    </div>
                    <div className="card-back">
                        <img src={cardBack} alt="Card Back" />
                    </div>
                </div>
            </div>
        </Tilt>
    );
}