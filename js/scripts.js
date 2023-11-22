let pokemonList = [
    { name: "Bulbasaur", height: " (Height .7)", types: ["grass", "poison"] },
    { name: "Squirtle", height: " (Height .5)", types: ["water"] },
    { name: "Charmander", height: " (Height .6)", types: ["fire"] }
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < .7 && pokemonList[i].height > .5) {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + pokemonList[i].height)
    } else if (pokemonList[i].height < .6) {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + pokemonList[i].height)
    } else {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + pokemonList[i].height)
    }
}