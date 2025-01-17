import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import fetchNaruto from "../utils/naruto";

export default function GamePage(){
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCard] = useState(new Set());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [round, setRound] = useState(1);
    const [gameFinished, setGameFinished] = useState(false);

    useEffect(() => {
        // Load new Cards at the start of the game
        const fetchCards = async () => {
            const {getRandomCharacters} = await fetchNaruto();
            const newCards = await getRandomCharacters(8);
            setCards(newCards);
        };
        fetchCards();
    }, [gameFinished]);

    // using Fisher-Yates shuffle
    const shuffleCards = ({ cards }) => {
        console.log(`Initial cards: ${cards}`);
        let currentIndex = cards.length;
    
        // Fisher-Yates Shuffle Algorithm
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // Proper array destructuring to swap elements
            [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
            console.log(`Cards inside loop: ${cards}`);
        }
    
        console.log(`Shuffled cards: ${cards}`);
        return cards;
    };
    

    const handleCardClick = (id) => {
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
            console.log(`Before Shuffle: ${JSON.stringify(cards)}`);
            setCards(shuffleCards({ cards: cards }));
            console.log(`After Shuffle: ${JSON.stringify(cards)}`);

            if (score + 1 === cards.length) {
                alert("You won!");
                setBestScore(Math.max(bestScore, score + 1));
                setScore(0);
                setSelectedCard(new Set());
                setRound(1);
                setGameFinished(true);
            }
        }
    }

    return (
        <div className="game-page">
            <Header score={score} bestScore={bestScore} round={round} />
            <div className="cards-container flex flex-row justify-center ">
                {cards.map((card) => (
                    <Card key={card.id} card={card} onCardClick={handleCardClick} />
                ))}
            </div>
        </div>
    );
}