import Card from "../components/Card";
import Header from "../components/Header";

export default function GamePage( cards, onCardClick, score, bestScore, onReset ){
    return (
        <div className="game-page">
            <Header />
            <main className="grid grid-cols-4 gap-4 p-4">
                {cards.map((card) => (
                    <Card key={card.id} card={card} onCardClick={onCardClick} />
                ))}
            </main>
        </div>
    );
}