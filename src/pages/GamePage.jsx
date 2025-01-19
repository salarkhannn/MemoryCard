import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import fetchNaruto from "../utils/naruto";
import Footer from "../components/Footer";

export default function GamePage({ cards, setCards, setGameFinished }){
    // const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCard] = useState(new Set());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const saveBestScore = localStorage.getItem('bestScore');
        return saveBestScore ? JSON.parse(saveBestScore) : 0;
    });
    const [round, setRound] = useState(1);
    // const [gameFinished, setGameFinished] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [shouldFlipAll, setShouldFlipAll] = useState(false);

    useEffect(() => {
        localStorage.setItem('bestScore', JSON.stringify(bestScore));
    }, [bestScore]);

    const shuffleCards = ({ cards }) => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--){
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[randomIndex]] = [shuffledCards[randomIndex], shuffledCards[i]];
        }
        return shuffledCards;
    };
    

    const handleCardClick = async (id) => {
        if (isFlipping) return; // prevent clicking during flip

        setIsFlipping(true);
        setShouldFlipAll(true);

        await new Promise(resolve => setTimeout(resolve, 500)); // simulate a flip animation

        if (selectedCards.has(id)) {
            // Game Over
            alert("You lost!");
            setBestScore(Math.max(bestScore, score));
            setScore(0);
            setSelectedCard(new Set());
            setRound(1);
            setGameFinished(true);
        } else {
            // Correct selection
            setSelectedCard((prev) => new Set(prev).add(id));
            setScore((prev) => prev + 1);
            setRound((prev) => prev + 1);

            const shuffled = shuffleCards({cards: cards});
            setCards(shuffled);

            if (score + 1 === cards.length) {
                alert("You won!");
                setBestScore(Math.max(bestScore, score + 1));
                setScore(0);
                setSelectedCard(new Set());
                setRound(1);
                setGameFinished(true);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        setShouldFlipAll(false);
        setIsFlipping(false);
    };

    return (
        <div className="game-page min-h-screen flex flex-col justify-between">
            <Header score={score} bestScore={bestScore} round={round} />
            <div className="cards-container flex flex-row justify-center items-center">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onCardClick={handleCardClick}
                        isFlipping={isFlipping}
                        shouldFlipAll={shouldFlipAll}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

