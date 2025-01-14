const fetchPokemonData = async (count) => {
    const responses = await Promise.all(
        Array.from({length: count}, (_, i) => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => res.json())
        )
    );
    return responses.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        imgSrc: pokemon.sprites.fron_default,
    }));
};