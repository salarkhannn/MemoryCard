import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import fetchDisney from "../utils/disney";

export default function GamePage(){
    const [characters, setCharacters] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {getCharacter} = fetchDisney();
    //         const fetchedCharacters = [];

    //         while
    //     }
    // })
    return (
        <div className="game-page">
            <Header />
            <Card />
        </div>
    );
}