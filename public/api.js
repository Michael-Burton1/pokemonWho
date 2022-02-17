window.getpokeData =async function(){
  const pokemon = await getPokemon();
  const randomPokemon = shuffle(pokemon);
}

async function getPokemon(){
  const res =await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const pokemon = await res.json();
  return pokemon.results;
}

function shuffle(unshuffled){
  const shuffled= unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a,b) => a.sort -b.sort)
    .map(({value})=> value)
  return shuffled
}