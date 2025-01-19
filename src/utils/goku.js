import { isValidElement, useEffect, useState } from "react";
import uniqid from "uniqid";


const TOTAL_CHARACTERS = 50;


export default async function fetchGoku() {

    const getCharacter = async ({id}) => {
        try {
            const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
            const data = await response.json();
            const name = data.name || "Unkown Character";
            const image = data.image;

            // verify the image url is accessible
            const isImageValid = await new Promise((resolve) => {
                const img = new Image();
                img.src = image;
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
            });

            if (!isImageValid) {
                console.warn(`Image is not found for character ${name} ID ${id}`);
                return null;
            }
            return {id: uniqid(), name, image};
        } catch (error) {
            console.error("Couln't fetch character", error);
            return null;
        }
    };

    const getRandomCharacters = async (amount) => {
        const charactersToShow = [];
        const seenIds = new Set(); // Track fetched IDs for uniqueness
        let attempts = 0;

        while (charactersToShow.length < amount && attempts < 100) {
            const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;

            // check for unique ID
            if (!seenIds.has(randomId)) {
                seenIds.add(randomId);

                // Fetch and add character if valid
                const character = await getCharacter({ id: randomId });
                if (character) {
                    const isValidImage = await validateImage(character.image);
                    if (isValidImage) {
                        charactersToShow.push(character);
                    }
                }
            }

            attempts++;
        }

        if (charactersToShow.length < amount){
            console.warn("Not enough characters found");
        }

        return charactersToShow;
    }

    const validateImage = async (imageUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    };

    return {getCharacter, getRandomCharacters};
}