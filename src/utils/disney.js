import { useState } from "react";
import uniqid from "uniqid";

export default async function fetchDisney(amount){
    const getCharacter = async ({id}) => {
        try {
            const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
            const data = await response.json();
            const name = data.data.name;
            const image = data.data.imageUrl;
            return {id: uniqid(), name, image};
        } catch (error) {
            console.error("Error fetching character:", error);
            return null;
        }
    };

    return {getCharacter};
}