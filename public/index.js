let gameData;
const main =document.querySelector('main');
const playBtn =document.querySelector('#play');
const PokemopnImage = document.querySelector('#pokemon-image')
const choices = document.querySelector('#choices');
const textOverlay = document.querySelector('#text-overlay');
loadVoice();

addAnsHandler();
playBtn.addEventListener('click', fetchData);

async function fetchData(){
  unRevealPokemon();
  gameData = await window.getPokeData();
  showSil();
  displayChoices();
  
}

function showSil() {
  main.classList.remove('fetching');

  PokemopnImage.src = gameData.correct.image
}

function displayChoices(){
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({name}) =>{
    return `<button data-name= "${name}">${name}</button>`
  }).join('');

  choices.innerHTML =choicesHTML;
} 
function addAnsHandler (){
  choices.addEventListener('click', e => {
    const { name } = e.target.dataset; 
    const resultClass = (name === gameData.correct.name) ?
      'correct':'incorrect';
    e.target.classList.add(resultClass);  
    revealPokemon();
    speakAns();
  })
}
function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}
function unRevealPokemon() {
  PokemopnImage.src = 'data:image/gif;base64,r0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
  
}

function loadVoice() {
  window.speechSynthesis.onvoiceschanged = () => {
    window.femaleVoice = speechSynthesis.getVoices()[3];
  };
}

function speakAns() {
  const utterance = new SpeechSynthesisUtterance(gameData.correct.name);
  utterance.voice = window.femaleVoice;
  utterance.pitch = .9;
  utterance.rate= .85;
  speechSynthesis.speak(utterance);

}