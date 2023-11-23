let pokemonList = [
    { name: "Bulbasaur", height: " .7", types: ["grass", "poison"] },
    { name: "Squirtle", height: " .5", types: ["water"] },
    { name: "Charmander", height: " .6", types: ["fire"] }
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < .7 && pokemonList[i].height > .5) {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + " - Height:" + pokemonList[i].height + "<br/>")
    } else if (pokemonList[i].height < .6) {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + " - Height:" + pokemonList[i].height + "<br/>" )
    } else {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + " - Height:" + pokemonList[i].height + " (Wow, that's a big Pokemon)" + "<br/>")
    }
}