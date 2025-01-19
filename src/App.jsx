
import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import GamePage from './pages/GamePage';
import LoadingPage from './pages/LoadingPage';
import fetchGoku from './utils/goku';
import bgVideo from './assets/bgVideo.mp4';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false); // Use to reset the game

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const { getRandomCharacters } = await fetchGoku();
        const newCards = await getRandomCharacters(8);
        setCards(newCards); // Set fetched cards
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false); // Stop loading after cards are fetched
        setGameFinished(false);
      }
    };

    if (gameFinished || cards.length === 0){
      fetchCards();
    }
  }, [gameFinished]);

  return (
    <div className="app min-h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <GamePage cards={cards} setCards={setCards} gameFinished={gameFinished} setGameFinished={setGameFinished} />
      )}
    </div>
  );
}

export default App;
