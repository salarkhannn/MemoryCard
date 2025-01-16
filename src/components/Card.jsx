import { useEffect, useState } from "react";
import fetchNaruto from "../utils/naruto";

// export default function Card({ character, onCardClick}){
export default function Card(){
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const {getRandomCharacters} = await fetchNaruto();
            try{
                const fetchedCharacters = await getRandomCharacters(8);
                setCharacters(fetchedCharacters);
            } catch (error) {
                console.error("Failed to fetch characters: ", error);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading){
        return <div>Loadding...</div>
    }

    if (!characters.length){
        return <div>No characters found</div>
    }

    return (
        // <div className="card" onClick={() => onCardClick(id)} style={{ cursor: "pointer" }}>
        <div className="card-container">
            {characters.map((character) => (
                <div key={character.id} className="card" style={{ cursor: "pointer" }}>
                    <img
                        src={character.image}
                        alt={character.name}
                        className="card-image"
                    />
                    <h3 className="card-name">{character.name}</h3>
                </div>
            ))}
        </div>
    );
}