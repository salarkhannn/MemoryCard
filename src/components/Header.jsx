export default function Header({ score, bestScore, round }){
    return (
        <div className="header flex flex-col items-center ">
            <h1>Score: {score}</h1>
            <h2>Best Score: {bestScore}</h2>
            <h3>Round: {round}</h3>
        </div>
    )
}