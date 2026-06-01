let currentPokemon = 1;
const limit = 25;
let allPokemons = [];
let filteredPokemon = [];
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
    checkPokemon();
    try {
        const minumumWait = new Promise(resolve => setTimeout(resolve, 2000));
        morePokemons.style.display = 'none';
        let collectionBox = await renderPokemons();
        await minumumWait;
        pokemonContainer.innerHTML += collectionBox;
        morePokemons.style.display = 'block';
        } catch (error) {
        pokemonContainer.innerHTML = `<p>Pokemon not found</p>`; 
        } finally { 
            spinner.classList.add('hidden');
    }
};


async function renderPokemons() { 
    let endPokemon = currentPokemon + limit - 1;
    let collectionBox = '';
    for (let pokemon = currentPokemon; pokemon <= endPokemon; pokemon++) {
            const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const data = await response.json();
            allPokemons.push(data);
            let indexLastPokemon = allPokemons.length - 1;
            collectionBox += createPokemonCard(data,indexLastPokemon); 
        }
    return collectionBox;
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
    const filteredList = showFilteredPokemonModal();
    const findPokemon = filteredList[currentIndex];
    if (findPokemon) {
        modal.innerHTML = pokemonModal(findPokemon);
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
        checkModalButtons();
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


function showTabContent(id, tagName){
    const findPokemon = allPokemons.find(pokemon => pokemon.id === id);
    const tabContent = document.getElementById('tab-content');

    if (!findPokemon) { 
        tabContent.innerHTML = `<p>Pokemon not found</p>`;
        return;
    }
    if (tagName === 'about') {
        tabContent.innerHTML = aboutContent(findPokemon);

    } else if (tagName === 'stats') {
        tabContent.innerHTML = statsContent(findPokemon);
    }
};


function checkModalButtons() { 
    let prevButton = document.getElementById('prev-button');
    let nextButton = document.getElementById('next-button');
    const filteredList = showFilteredPokemonModal();
    if (currentIndex === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    if (currentIndex === filteredList.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}


function goToPrevious() { 
    if (currentIndex > 0) { 
        currentIndex--;
        openModal(currentIndex);
        checkModalButtons();
    }
};


function goToNext() { 
    const filteredList = showFilteredPokemonModal();
    if (currentIndex < filteredList.length - 1) { 
        currentIndex++;
        openModal(currentIndex);
        document.body.classList.add('no-scroll');
        checkModalButtons();
    }
};


function renderSearch(filteredList){
    pokemonContainer.innerHTML = '';
    for (let indexPokemon = 0; indexPokemon < filteredList.length; indexPokemon++) { 
        let pokemon = filteredList[indexPokemon];
        pokemonContainer.innerHTML += createPokemonCard(pokemon,indexPokemon);
    }
};


function searchFunction(inputId) { 
    const input = document.getElementById(inputId).value.toLowerCase().trim();
    if (input.length < 3) {
        renderSearch(allPokemons);
        morePokemons.style.display = 'flex';
        return;
    }
    filteredPokemon = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));
    if (filteredPokemon.length > 0) {
        renderSearch(filteredPokemon);
    } else { 
        pokemonContainer.innerHTML = pokemonNotFound();
    }
    morePokemons.style.display = 'none';
}


function searchDesktop() {
    searchFunction('searchInput');
};


function searchMobile(){
    searchFunction('searchInputMobile');
};


function showFilteredPokemonModal() { 
    if (filteredPokemon.length > 0) {
        return filteredPokemon;
    } else { 
        return allPokemons;
    }
}


function goBack() { 
    pokemonContainer.innerHTML = '';
    searchInputDesktop.value = '';
    filteredPokemon = [];
    renderSearch(allPokemons);
    morePokemons.style.display = 'flex';
    searchContainer.style.display = 'none';
    searchInput.value = '';
};


function searchReset() { 
    if (searchInput.value === '') {
        filteredPokemon = [];
        renderSearch(allPokemons);
        morePokemons.style.display = 'flex';
        searchContainer.style.display = 'none';
    }
};