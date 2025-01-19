const GameOver = ({ score, bestScore, isWin, onPlayAgain }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/50">
      <div className="bg-orange-100 p-8 rounded-lg shadow-2xl border-4 border-yellow-500 flex flex-col items-center gap-6 max-w-md w-full mx-4">
        <h1 className="text-4xl text-center text-yellow-600">
          {isWin ? "VICTORY!" : "GAME OVER!"}
        </h1>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-orange-700">Final Score: {score}</p>
          <p className="text-xl text-orange-600">Best Score: {bestScore}</p>
        </div>
        
        <p className="text-center text-lg text-orange-800">
          {isWin 
            ? "Congratulations! You've mastered the memory challenge!" 
            : "Don't give up! Try again to beat your high score!"}
        </p>
        
        <button 
          onClick={onPlayAgain}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;