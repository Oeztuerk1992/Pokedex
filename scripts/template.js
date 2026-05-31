function createPokemonCard (allPokemons,indexLastPokemon){
    const type = getTypesOfPokemon(allPokemons);
    return `
    <div class="pokemonCard ${type}" onclick="openModal(${indexLastPokemon})">
            <p class="pokemonId">#${allPokemons.id}</p>
            <h2 class="pokemonName">${allPokemons.name}</h2>
        <div>
            <img class="pokemonBackground" src="./logo/logo1.png" alt="">
            <img class="pokemonImg" src="${allPokemons.sprites.other['official-artwork'].front_default}" alt="${allPokemons.name}">
        </div>
        <div class="pokemonType">
            <p class="type">${type}</p>
        </div>
    </div>
    `;
};


function pokemonModal(pokemon){
    const type = getTypesOfPokemon(pokemon);
    return `
            <div class="modal-content ${type}">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>${pokemon.name}</h2>
        
                <div class="pokemonImage">
                    <button id="prev-button" onclick="goToPrevious()" class="a-button previous round">&#8249;</button>
                    <img class="modal-img" id="modal-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                    <button id="next-button" onclick="goToNext()" class="a-button next round">&#8250;</button>
                </div>
                <div class="typeContainer">
                    <p class="type">${getTypesOfPokemon(pokemon)}</p>
                </div>
                <div class="tab-container">
                    <button onclick="showTabContent(${pokemon.id}, 'about')">About</button>
                    <button onclick="showTabContent(${pokemon.id}, 'stats')">Base Stats</button>
                </div>
                <div class="tab-content" id="tab-content">
                </div>
            </div>
        `;
};


function aboutContent (pokemon){
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


function statsContent(pokemon){
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


function pokemonNotFound(){ 
    return `
            <div class="error">
                <p>pokémon not found...</p>
                <button onclick="goBack()">go back</button>
            </div>
    `;
};