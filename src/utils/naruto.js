import { useEffect } from "react";
import uniqid from "uniqid";


export default async function fetchNaruto(amount) {
    const getCharacter = async ({id}) => {
        try {
            const response = await fetch(`https://narutodb.xyz/api/character/${id}`);
            const data = await response.json();
            const name = data.name;
            const image = data.images[0];
            return {id: uniqid(), name, image};
        } catch (error) {
            console.error("Couln't fetch character", error);
            return null;
        }
    };

    return {getCharacter};
}