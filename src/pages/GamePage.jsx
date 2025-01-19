import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameOver from "../components/GameOver";

export default function GamePage({ cards, setCards, gameFinished, setGameFinished }) {
    const [selectedCards, setSelectedCard] = useState(new Set());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const saveBestScore = localStorage.getItem('bestScore');
        return saveBestScore ? JSON.parse(saveBestScore) : 0;
    });
    const [round, setRound] = useState(1);
    const [isFlipping, setIsFlipping] = useState(false);
    const [shouldFlipAll, setShouldFlipAll] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        localStorage.setItem('bestScore', JSON.stringify(bestScore));
    }, [bestScore]);


    const shuffleCards = () => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[randomIndex]] = 
                [shuffledCards[randomIndex], shuffledCards[i]];
        }
        return shuffledCards;
    };

    const handlePlayAgain = () => {
        setScore(0);
        setSelectedCard(new Set());
        setRound(1);
        setShowGameOver(false);
        setIsWin(false);
        setGameFinished(true);
    };

    const handleCardClick = async (id) => {
        if (isFlipping) return;

        setIsFlipping(true);
        setShouldFlipAll(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (selectedCards.has(id)) {
            setBestScore(Math.max(bestScore, score));
            setIsWin(false);
            setShowGameOver(true);
            // setGameFinished(true);
        } else {
            setSelectedCard(prev => new Set(prev).add(id));
            setScore(prev => prev + 1);
            setRound(prev => prev + 1);

            const shuffled = shuffleCards();
            setCards(shuffled);

            if (score + 1 === cards.length) {
                setBestScore(Math.max(bestScore, score + 1));
                setIsWin(true);
                setShowGameOver(true)
                // setGameFinished(true);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        setShouldFlipAll(false);
        setIsFlipping(false);
    };

    if (showGameOver) {
        return (
            <GameOver 
                score={score}
                bestScore={bestScore}
                isWin={isWin}
                onPlayAgain={handlePlayAgain}
            />
        );
    }

    return (
        <div className="game-page min-h-screen flex flex-col justify-between">
            <Header score={score} bestScore={bestScore} round={round} />
            <div className="cards-container">
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