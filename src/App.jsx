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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false); // Use to reset the game

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { getRandomCharacters } = await fetchNaruto();
        const newCards = await getRandomCharacters(8);
        setCards(newCards); // Set fetched cards
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false); // Stop loading after cards are fetched
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="app min-h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <GamePage cards={cards} setGameFinished={setGameFinished} />
      )}
    </div>
  );
}

export default App;
