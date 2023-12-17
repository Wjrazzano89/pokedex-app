let pokemonRepository = (function () {
        let pokemonList = [];
      
          function add(pokemon) {
            pokemonList.push(pokemon);
          }

          function getAll() {
            return pokemonList;
          }

          return {
            add: add,
            getAll: getAll
          };
      })();

      console.log(pokemonRepository.getAll()); 
      pokemonRepository.add({ name: 'Pikachu', height: 0.3,
      types: ["electric"] });
      
      console.log(pokemonRepository.getAll());

let pokemonList = [
    { name: "Bulbasaur",
      height: " .7",
      types: ["Grass", " Poison"] 
    },
    { name: "Squirtle", 
      height: " .5", 
      types: ["Water"] 
    },
    { name: "Charmander", 
      height: " .6", 
    types: ["Fire"] 
    }
]

function myLoopFunction(pokemon) {
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = ""
        button.classList.add()
}
pokemonList.forEach(myLoopFunction)(document.querySelector('.pokemon.list'));