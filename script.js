let currentPokemon = 1;
const limit = 20;
let allPokemons = [];
const morePokemons = document.getElementById('load-more');
const modal = document.querySelector('.modal');




async function fetchPokemonData() {
    const pokemonContainer = document.getElementById('pokemon-container');
    console.log(allPokemons);
    let endPokemon = currentPokemon + limit - 1;
    try {
        for (let pokemon = currentPokemon; pokemon <= endPokemon; pokemon++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const data = await response.json();
            allPokemons.push(data);

            pokemonContainer.innerHTML += createPokemonCard(data);
        }
    } catch (error) {
        pokemonContainer.innerHTML = `<p>Not pokemon found</p>`;
    }
};


function getTypesOfPokemon(pokemon) {
    let types = pokemon.types[0].type.name;

    if (pokemon.types[1]) {
        types += ', ' + pokemon.types[1].type.name;
    }
    return types;
}


function loadedMorePokemons() {
    currentPokemon += limit;
    fetchPokemonData();
}


function openModal(id) {
    modal.style.display = 'block';

    const findPokemon = allPokemons.find(p => p.id === id);
    console.log(findPokemon);
    console.log("wurde geklickt");

    if (findPokemon) { 
        modal.innerHTML = pokemonModal(findPokemon);
        modal.style.display = "flex";
        
    }  
    
}


function closeModal() {
    modal.style.display = 'none';
}


function getAbilities(pokemon) { 
    let abilityText = "";

    for (let indexAbilitiy = 0; indexAbilitiy < pokemon.abilities.length; indexAbilitiy++) { 
        let pokemonName = pokemon.abilities[indexAbilitiy].ability.name;

        if (indexAbilitiy === 0) {
            abilityText += pokemonName
        } else { 
            abilityText += ", " + pokemonName;
        }
        
    }
    return abilityText;
}


const showAbout = (id) => {
    const findPokemon = allPokemons.find(p => p.id === id);
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = aboutContent(findPokemon);
};





const showStats = (id) => { 
    const findPokemon = allPokemons.find(p => p.id === id);
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = statsContent(findPokemon);
}




const showGender = (id) => { 
    const findPokemon = allPokemons.find(p => p.id === id)
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = getGender();
}