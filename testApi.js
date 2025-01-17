import fetch from 'node-fetch';

const BASE_URL = "https://ghibli.rest/people";

async function getCharacterById(id) {
    const url = `${BASE_URL}/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const character = await response.json();
        return character;
    } catch (error) {
        console.error("Error fetching character:", error.message);
        throw error;
    }
}

// Test the function
(async () => {
    const characterId = "1"; // Example ID
    try {
        const character = await getCharacterById(characterId);
        console.log("Character fetched:", character);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();
