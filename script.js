let currentPokemon = 1;
const limit = 25;
let allPokemons = [];
const pokemonContainer = document.getElementById('pokemon-container');
const morePokemons = document.getElementById('load-more');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const spinner = document.querySelector('.spinner-container');
const xbtn = document.getElementById('searchInput');
const searchContainer = document.getElementById('mySidebar');
const searchInputDesktop = document.getElementById('searchInput');
const searchInput = document.getElementById('searchInputMobile');
let currentIndex = 0;


async function fetchPokemonData() {
    let endPokemon = currentPokemon + limit - 1;
    checkPokemon();
    try {
        const minumumWait = new Promise(resolve => setTimeout(resolve, 2000));
        for (let pokemon = currentPokemon; pokemon <= endPokemon; pokemon++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const data = await response.json();
            allPokemons.push(data);
            let indexLastPokemon = allPokemons.length - 1;
            pokemonContainer.innerHTML += createPokemonCard(data,indexLastPokemon); 
        }
        await minumumWait;
        } catch (error) {
        pokemonContainer.innerHTML = `<p>Pokemon not found</p>`; 
        } finally { 
            spinner.classList.add('hidden');
    }
};


function checkPokemon() { 
    spinner.classList.remove('hidden');
    if (currentPokemon === 1) { 
        spinner.classList.add('fullscreen');
    }
};


function getTypesOfPokemon(pokemon) {
    let types = pokemon.types[0].type.name;
    return types;
};


function loadedMorePokemons() {
    currentPokemon += limit;
    fetchPokemonData();
};


function openModal(index) {
    currentIndex = index;
    const findPokemon = allPokemons[currentIndex];
    console.log(findPokemon);
    if (findPokemon) { 
        modal.innerHTML = pokemonModal(findPokemon);
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }  
};


function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
};


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
};


function showAbout(id){
    const findPokemon = allPokemons.find(pokemon => pokemon.id === id);
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = aboutContent(findPokemon);
};


function showStats(id){
    const findPokemon = allPokemons.find(pokemon => pokemon.id === id);
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = statsContent(findPokemon);
};


function goToPrevious() { 
    if (currentIndex > 0) { 
        currentIndex--;
        openModal(currentIndex);
    }
};


function goToNext() { 
    if (currentIndex < allPokemons.length - 1) { 
        currentIndex++;
        openModal(currentIndex);
        document.body.classList.add('no-scroll');
    }
};


function renderSearch(filteredList){
    pokemonContainer.innerHTML = '';
    for (let indexPokemon = 0; indexPokemon < filteredList.length; indexPokemon++) { 
        let pokemon = filteredList[indexPokemon];
        let oldIndex = allPokemons.indexOf(pokemon);
        pokemonContainer.innerHTML += createPokemonCard(pokemon,oldIndex);
    }
};


function searchDesktop() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    if (input.length === 0) {
        renderSearch(allPokemons);
        morePokemons.style.display = 'flex';
    } else if (input.length >= 3) {
        const filteredPokemon = allPokemons.filter(pokemonName => pokemonName.name.toLowerCase().includes(input));
        if (filteredPokemon.length > 0) {
            renderSearch(filteredPokemon);
        } else { 
            pokemonContainer.innerHTML = pokemonNotFound();
            input.innerHTML = "";
        }
        morePokemons.style.display = 'none';
    } 
};


function searchMobile(){
    const input = document.getElementById('searchInputMobile').value.toLowerCase().trim();
    if (input.length === 0) {
        renderSearch(allPokemons);
        morePokemons.style.display = 'flex';
    } else if (input.length >= 3) {
        const filteredPokemon = allPokemons.filter(pokemonName => pokemonName.name.toLowerCase().includes(input));
        if (filteredPokemon.length > 0) {
            renderSearch(filteredPokemon);
            searchContainer.style.display = 'none';
        } else { 
            pokemonContainer.innerHTML = pokemonNotFound();
        }
        morePokemons.style.display = 'none';
    } 
};


function goBack() { 
    pokemonContainer.innerHTML = '';
    searchInputDesktop.value = '';
    renderSearch(allPokemons);
    morePokemons.style.display = 'flex';
    searchContainer.style.display = 'none';
    searchInput.value = '';
};


function searchReset() { 
    if(searchInput.value === '') {
        renderSearch(allPokemons);
        morePokemons.style.display = 'flex';
        searchContainer.style.display = 'none';
    }
};