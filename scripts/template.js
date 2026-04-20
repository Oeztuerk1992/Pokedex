



const createPokemonCard = (allPokemons) => {
    const types = getTypesOfPokemon(allPokemons);
    return `
    <div class="pokemonCard ${types}" onclick="openModal(${allPokemons.id})">
        <p class="pokemonId">#${allPokemons.id}</p>
        <div class="pokemonName">
        <h2>${allPokemons.name}</h2>
        </div>
        <img src="${allPokemons.sprites.other['official-artwork'].front_default}" alt="${allPokemons.name}">
        <div class="pokemonType">
            <p>${types}</p>
        </div>
    </div>
    `;
};


const pokemonModal = (pokemon) => {
    const types = getTypesOfPokemon(pokemon);
    return `
    <div class="modal-content ${types}">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${pokemon.name}</h2>
        <div class="pokemonImage">
        <img id="modal-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        </div>
        <p>Types: ${getTypesOfPokemon(pokemon)}</p>
        <div class="tab-container">
            <button onclick="showAbout(${pokemon.id})">About</button>
            <button onclick="showStats(${pokemon.id})">Base Stats</button>
            <button onclick="showGender(${pokemon.id})">Gender</button>
        </div>
        <div class="tab-content" id="tab-content">
        </div>
    </div>
    `;
};


const aboutContent = (pokemon) => {
    let height = pokemon.height / 10;
    let weight = pokemon.weight / 10;
    let abilities = getAbilities(pokemon)
    return `
            <div class="info-row">
                <span class="label">Height:</span>
                <span class="value">${height} m</span>
            </div>
            <div class="info-row">
                <span class="label">Weight:</span>
                <span class="value">${weight} kg</span>
            </div>
            <div class="info-row">
                <span class="label">Abilities:</span>
                <span class="value">${abilities}</span>
            </div>
        `;

};


const statsContent = (pokemon) => {
    let statsHtml = "";
    for (let indexStats = 0; indexStats < pokemon.stats.length; indexStats++) { 
        let statName = pokemon.stats[indexStats].stat.name;
        let value = pokemon.stats[indexStats].base_stat;
        let percent = (value / 255) * 100;
        statsHtml += ` 
                    <div class="info-row">
                        <span class="label">${statName}:</span>
                        <span class="value">${value}</span>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${percent}%"></div>
                        </div>
                    </div> `;
                        
    }
    statsHtml += "";
    return statsHtml;
}


const getGender = (pokemon) => { 
    return `
        <p><strong>Gender:</strong></p>
    `;
}