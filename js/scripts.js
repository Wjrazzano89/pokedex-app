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
      pokemonRepository.add({ name: 'Pikachu' });
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
        console.log(pokemon.name + pokemon.height + pokemon.types);
        document.write("<p>" + pokemon.name + " - Height:" + pokemon.height + " (Type): " + pokemon.types + "</p>")
}
pokemonList.forEach(myLoopFunction);