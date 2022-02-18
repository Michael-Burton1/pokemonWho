let gameData;
const main =document.querySelector('main');
const playBtn =document.querySelector('#play');
const PokemopnImage = document.querySelector('#pokemon-image')
const choices = document.querySelector('#choices');

playBtn.addEventListener('click', fetchData);

async function fetchData(){
  gameData = await window.getPokeData();
  showSil();
  displayChoices();
}

function showSil() {
  PokemopnImage.src = gameData.correct.image
}

function displayChoices(){
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({name}) =>{
    return `<button data-name= "${name}">${name}</button>`
  }).join('');

  choices.innerHTML =choicesHTML;
}