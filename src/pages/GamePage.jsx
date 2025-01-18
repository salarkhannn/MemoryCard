import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import fetchNaruto from "../utils/naruto";
import Footer from "../components/Footer";

export default function GamePage(){
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCard] = useState(new Set());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [round, setRound] = useState(1);
    const [gameFinished, setGameFinished] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [shouldFlipAll, setShouldFlipAll] = useState(false);

    useEffect(() => {
        // Load new Cards at the start of the game
        const fetchCards = async () => {
            const {getRandomCharacters} = await fetchNaruto();
            const newCards = await getRandomCharacters(8);
            setCards(newCards);
            setGameFinished(false);
        };
        
        if (gameFinished || cards.length === 0) {
            fetchCards();
        }

    }, [gameFinished]);

    // using Fisher-Yates shuffle
    const shuffleCards = ({ cards }) => {
        let currentIndex = cards.length;
        const cardsCopy = [...cards];
   
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [cardsCopy[currentIndex], cardsCopy[randomIndex]] = 
                [cardsCopy[randomIndex], cardsCopy[currentIndex]];
        }
   
        return cardsCopy;
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


            setCards(shuffleCards({ cards }));

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
        <div className="game-page min-h-screen flex flex-col">
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

