// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './index.css'
// import GamePage from './pages/GamePage';
// import LoadingPage from './pages/LoadingPage';

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     // Load new Cards at the start of the game
//     const fetchCards = async () => {
//         const {getRandomCharacters} = await fetchNaruto();
//         const newCards = await getRandomCharacters(8);
//         setCards(newCards);
//         setGameFinished(false);
//     };
    
//     if (gameFinished || cards.length === 0) {
//         fetchCards();
//     }

// }, [gameFinished]);
  
//   return (
//     <div className='app min-h-screen'>
//       <GamePage />
//     </div>
//   );
// }

// export default App

import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import GamePage from './pages/GamePage';
import LoadingPage from './pages/LoadingPage';
import fetchNaruto from './utils/naruto';
import bgVideo from './assets/bgVideo.mp4';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false); // Use to reset the game

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const { getRandomCharacters } = await fetchNaruto();
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
        <GamePage cards={cards} setCards={setCards} setGameFinished={setGameFinished} />
      )}
    </div>
  );
}

export default App;
