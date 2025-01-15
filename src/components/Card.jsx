import { useEffect, useState } from "react";
import fetchDisney from "../utils/disney";
import fetchNaruto from "../utils/naruto";

// export default function Card({ character, onCardClick}){
export default function Card(){
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const id = Math.floor(Math.random() * 50) + 1;
            // const {getCharacter} = await fetchDisney(1);
            const {getCharacter} = await fetchNaruto(1);
            const fetchedCharacter = await getCharacter({id});
            setCharacter(fetchedCharacter);
        };

        fetchData();
    }, []);

    if (!character){
        return <div>Loadding...</div>
    }

    return (
        // <div className="card" onClick={() => onCardClick(id)} style={{ cursor: "pointer" }}>
        <div className="card" style={{ cursor: "pointer" }}>
            <img src={character.image} alt={character.name} className="card-image" />
            <h3 className="card-name">{character.name}</h3>
        </div>
    );
}