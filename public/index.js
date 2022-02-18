let gameData;
const main =document.querySelector('main');
const playBtn =document.querySelector('#play');
const PokemopnImage = document.querySelector('#pokemon-image')

playBtn.addEventListener('click', fetchData);

async function fetchData(){
  gameData = await window.getPokeData();
  showSil();
}

function showSil() {
  PokemopnImage.src = gameData.correct.image
}