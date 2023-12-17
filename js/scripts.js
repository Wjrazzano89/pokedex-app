var pokemonRepository = (function () {
 let repository = [
  { 
    name: "Bulbasaur",
    height: " .7",
    types: ["Grass", " Poison"] 
  },
  { 
    name: "Squirtle", 
    height: " .5", 
    types: ["Water"] 
  },
  { 
    name: "Charmander", 
    height: " .6", 
    types: ["Fire"] 
  }
 ];

 function add(pokemon) {
  if (
    typeof pokemon ==="object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  ) {
    repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
 }
 function getAll() {
  return repository;
 }
 function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon)
 }
 return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
 };
})();

 console.log(pokemonRepository.getAll());
 pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

 console.log(pokemonRepository.getAll());

 pokemonRepository.getAll().forEach(function (pokemon) {
  
  pokemonRepository.addListItem(pokemon);
  });