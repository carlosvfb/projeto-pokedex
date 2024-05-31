import axios from 'axios';

export const fetchPokemonData = async (offset = 0, limit = 10) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const pokemonList = response.data.results;

        const detailedDataPromises = pokemonList.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            const types = pokemonDetails.data.types.map(type => type.type.name);

            return {
                name: pokemonDetails.data.name,
                url: pokemonDetails.data.sprites.other.dream_world.front_default,
                types: types,
            };
        });

        const detailedDataResponses = await Promise.all(detailedDataPromises);

        return detailedDataResponses;
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        throw error;
    }
};

export const fetchPokemonDetails = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonDetails = response.data;
        const types = pokemonDetails.types.map(type => type.type.name);

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const abilitiesPromises = pokemonDetails.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url);
            const abilityDetails = abilityResponse.data;
            return {
                name: capitalizeFirstLetter(abilityDetails.name),
                description: abilityDetails.effect_entries.find(entry => entry.language.name === 'en').effect
            };
        });

        const abilities = await Promise.all(abilitiesPromises);
        console.log(abilities)
        return {
            name: capitalizeFirstLetter(pokemonDetails.name),
            url: pokemonDetails.sprites.other.dream_world.front_default,
            types: types,
            height: pokemonDetails.height,
            weight: pokemonDetails.weight,
            abilities: abilities,
            moves: pokemonDetails.moves.map(move => move.move.name),
            stats: pokemonDetails.stats.map(stat => stat.stat.name),
        };
    } catch (error) {
        console.error('Erro ao buscar dados do Pokémon: ', error);
        throw error;
    }
};


// export const fetchPokemonDetails = async (name) => {
//     try {
//         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//         const pokemonDetails = response.data;
//         console.log(pokemonDetails)
//         const types = pokemonDetails.types.map(type => type.type.name);

//         return {
//             name: pokemonDetails.name,
//             url: pokemonDetails.sprites.other.dream_world.front_default,
//             types: types,
//             height: pokemonDetails.height,
//             weight: pokemonDetails.weight,
//             abilities: pokemonDetails.abilities.map(ability => ability.ability.name),
//             moves: pokemonDetails.moves.map(move => move.move.name),
//             stats: pokemonDetails.stats.map(stat => stat.stat.name),
//         };
//     } catch (error) {
//         console.error('Erro ao buscar dados do Pokémon: ', error);
//         throw error;
//     }
// };